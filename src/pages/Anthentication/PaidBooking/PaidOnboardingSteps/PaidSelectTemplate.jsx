import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaidOnboardingLayout from "./PaidOnboardingLayout";
import templates from "../../../../component/Templates";
import { Heading, Text } from "../../../../component/Text";
import { ButtonSmallPurple } from "../../../../component/Buttons";

// Categories that map to each template
const SPA_CATEGORIES = [
  "Spa and Wellness Center",
  "Massage Therapy",
  "Aromatherapy Services",
  "Reflexology Services",
];

const BARBER_CATEGORIES = [
  "Barber Shop",
  "Hair Salon",
];

// Get default template based on selected business category
const getDefaultTemplateForCategory = (category) => {
  if (SPA_CATEGORIES.includes(category)) return 54; // LightBlush
  if (BARBER_CATEGORIES.includes(category)) return 53; // SubtleGray
  return 52; // Minimalist (default)
};

// Template card display config
const templateCards = [
  {
    id: 52,
    gradient: "from-purple-100 to-pink-100",
    iconBg: "bg-gradient-to-r from-purple-500 to-pink-500",
    iconText: "BB",
    label: "Minimalist Booking Page",
    labelColor: "text-purple-600",
  },
  {
    id: 53,
    gradient: "from-gray-200 to-gray-300",
    iconBg: "bg-gradient-to-r from-gray-600 to-gray-800",
    iconText: "SG",
    label: "Subtle Gray Booking Page",
    labelColor: "text-gray-700",
  },
  {
    id: 54,
    gradient: "from-pink-50 to-orange-100",
    iconBg: "bg-gradient-to-r from-pink-300 to-orange-300",
    iconText: "LB",
    label: "Light Blush Booking Page",
    labelColor: "text-pink-500",
  },
];

const PaidSelectTemplate = () => {
  const navigate = useNavigate();
  const selectedCategory = sessionStorage.getItem("selectedCategory") || "";
  const [selectedTemplateId, setSelectedTemplateId] = useState(() =>
    getDefaultTemplateForCategory(selectedCategory)
  );

  useEffect(() => {
    sessionStorage.setItem("templateId", String(selectedTemplateId));
  }, [selectedTemplateId]);

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

      {/* Template Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 overflow-y-auto pb-24">
        {templateCards.map((card) => {
          const templateData = templates.find((t) => t.id === card.id);
          if (!templateData) return null;

          return (
            <div
              key={card.id}
              onClick={() => setSelectedTemplateId(card.id)}
              className={`border rounded-lg overflow-hidden shadow-md cursor-pointer transition-all hover:shadow-lg ${
                selectedTemplateId === card.id
                  ? "border-purple-500 ring-2 ring-purple-300"
                  : "border-gray-200"
              }`}
            >
              <div
                className={`w-full h-48 bg-gradient-to-br ${card.gradient} flex items-center justify-center`}
              >
                <div className="text-center">
                  <div
                    className={`w-16 h-16 mx-auto rounded-full ${card.iconBg} flex items-center justify-center text-white text-2xl font-bold mb-2`}
                  >
                    {card.iconText}
                  </div>
                  <p className={`${card.labelColor} font-medium text-sm`}>
                    {card.label}
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
                  {templateData.title}
                </Heading>

                <Text className="text-[14px] mt-1 text-gray-500">
                  {templateData.description}
                </Text>

                {selectedTemplateId === card.id && (
                  <div className="mt-2 text-purple-600 text-sm font-medium">
                    ✓ Selected
                  </div>
                )}
              </div>
            </div>
          );
        })}
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
