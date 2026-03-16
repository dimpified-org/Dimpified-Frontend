import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaidOnboardingLayout from "./PaidOnboardingLayout";
import templates from "../../../../component/Templates";
import { Heading, Text } from "../../../../component/Text";
import { ButtonSmallPurple } from "../../../../component/Buttons";

const PaidSelectTemplate = () => {
  const navigate = useNavigate();
  const [selectedTemplateId, setSelectedTemplateId] = useState(52);

  useEffect(() => {
    // For paid users, always use BerryBlast Template (id 52)
    sessionStorage.setItem("templateId", "52");
  }, []);

  const berryBlastTemplate = templates.find((t) => t.id === 52);

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
        Select a website design for your booking page
      </Text>

      {/* Single Template Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 overflow-y-auto pb-24">
        {berryBlastTemplate && (
          <div
            onClick={() => setSelectedTemplateId(52)}
            className={`border rounded-lg overflow-hidden shadow-md cursor-pointer transition-all hover:shadow-lg ${
              selectedTemplateId === 52
                ? "border-purple-500 ring-2 ring-purple-300"
                : "border-gray-200"
            }`}
          >
            <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold mb-2">
                  BB
                </div>
                <p className="text-purple-600 font-medium text-sm">
                  Minimalist Booking Page
                </p>
              </div>
            </div>

            <div className="p-4">
              <Heading
                level={3}
                size="lg"
                className="text-[18px]"
                color="primary8"
              >
                {berryBlastTemplate.title}
              </Heading>

              <Text className="text-[14px] mt-1 text-gray-500">
                {berryBlastTemplate.description}
              </Text>

              {selectedTemplateId === 52 && (
                <div className="mt-2 text-purple-600 text-sm font-medium">
                  ✓ Selected
                </div>
              )}
            </div>
          </div>
        )}
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
