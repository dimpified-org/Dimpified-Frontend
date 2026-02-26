import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaidOnboardingLayout from "./PaidOnboardingLayout";
import templates from "../../../../component/Templates";
import { Heading, Text } from "../../../../component/Text";
import { ButtonSmallPurple } from "../../../../component/Buttons";

const PaidSelectTemplate = () => {
  const navigate = useNavigate();
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const savedCategory = sessionStorage.getItem("selectedCategory") || "";
    setCategory(savedCategory);

    // Filter templates matching the selected category
    const matching = templates.filter(
      (t) => t.category === savedCategory
    );

    if (matching.length > 0) {
      setFilteredTemplates(matching);
      // Auto-select first matching template
      setSelectedTemplateId(matching[0].id);
      sessionStorage.setItem("templateId", String(matching[0].id));
    } else {
      // No matching templates - default to template 51
      const template51 = templates.find((t) => t.id === 51);
      setFilteredTemplates(template51 ? [template51] : []);
      setSelectedTemplateId(51);
      sessionStorage.setItem("templateId", "51");
    }
  }, []);

  const handleSelectTemplate = (id) => {
    setSelectedTemplateId(id);
    sessionStorage.setItem("templateId", String(id));
  };

  const handleSubmit = () => {
    if (!selectedTemplateId) return;
    navigate("/paid/auth/preview-template");
  };

  return (
    <PaidOnboardingLayout currentStep={6} rightImage={null}>
      <Heading
        level={2}
        size="4xl"
        weight="600"
        className="text-[#9F68FE] justify-center mt-4"
      >
        You're almost done
      </Heading>

      <Heading
        level={3}
        size="3xl"
        weight="600"
        className="justify-center text-[#2d1c4d] mt-10"
      >
        Choose Your Website Design
      </Heading>

      <Text className="text-gray-500 text-[16px] mt-3 mb-6">
        {category
          ? `Showing templates for: ${category}`
          : "Select a website design for your business"}
      </Text>

      {/* Template Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 overflow-y-auto pb-24">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleSelectTemplate(template.id)}
            className={`border rounded-lg overflow-hidden shadow-md cursor-pointer transition-all hover:shadow-lg ${
              selectedTemplateId === template.id
                ? "border-purple-500 ring-2 ring-purple-300"
                : "border-gray-200"
            }`}
          >
            {template.image ? (
              <img
                src={template.image}
                alt={template.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image Available
              </div>
            )}

            <div className="p-4">
              <Heading
                level={3}
                size="lg"
                className="text-[18px]"
                color="primary8"
              >
                {template.title}
              </Heading>

              <Text className="text-[14px] mt-1 text-gray-500">
                {template.description}
              </Text>

              {selectedTemplateId === template.id && (
                <div className="mt-2 text-purple-600 text-sm font-medium">
                  ✓ Selected
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Preview Button */}
      <div className="flex justify-center mt-6">
        <ButtonSmallPurple
          className="w-full max-w-md"
          onClick={handleSubmit}
          disabled={!selectedTemplateId}
        >
          Preview Template
        </ButtonSmallPurple>
      </div>
    </PaidOnboardingLayout>
  );
};

export default PaidSelectTemplate;
