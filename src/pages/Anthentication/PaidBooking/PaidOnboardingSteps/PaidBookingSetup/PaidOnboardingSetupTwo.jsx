// pages/auth/PaidOnboardingSetupTwo.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PaidOnboardingLayout from "../PaidOnboardingLayout";
import SubStepWrapper from "./SubStepWrapper";
import { ButtonLongPurple } from "../../../../../component/Buttons";
import { showToast } from "../../../../../component/ShowToast";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const generateTimeOptions = () => {
  const options = [];
  for (let h = 6; h < 23; h++) {
    const hour = h.toString().padStart(2, "0");
    options.push({
      value: `${hour}:00`,
      label: `${h === 0 ? 12 : h > 12 ? h - 12 : h}:00 ${
        h >= 12 ? "PM" : "AM"
      }`,
    });
    if (h < 23) {
      options.push({
        value: `${hour}:30`,
        label: `${h === 0 ? 12 : h > 12 ? h - 12 : h}:30 ${
          h >= 12 ? "PM" : "AM"
        }`,
      });
    }
  }
  return options;
};

const timeOptions = generateTimeOptions();

const PaidOnboardingSetupTwo = () => {
  const navigate = useNavigate();
  // Safely select creatorId from redux (use optional chaining to avoid
  // destructuring a primitive or undefined value)
  const creatorId = useSelector((state) => state.auth?.user?.creatorId);

  // Detect user's timezone automatically
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [selectedDays, setSelectedDays] = useState({
    Sunday: false,
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: false,
  });

  const [timeSlots, setTimeSlots] = useState({
    Sunday: { from: "09:00", to: "17:00" },
    Monday: { from: "09:00", to: "22:00" },
    Tuesday: { from: "09:00", to: "22:00" },
    Wednesday: { from: "09:00", to: "22:00" },
    Thursday: { from: "09:00", to: "22:00" },
    Friday: { from: "09:00", to: "22:00" },
    Saturday: { from: "09:00", to: "22:00" },
  });

  // Load from sessionStorage on mount
  useEffect(() => {
    const savedAvailability = sessionStorage.getItem("availability");
    if (savedAvailability) {
      const data = JSON.parse(savedAvailability);
      setSelectedDays(data.selectedDays);
      setTimeSlots(data.timeSlots);
    }
  }, []);

  // Auto-save to sessionStorage on change
  useEffect(() => {
    if (Object.values(selectedDays).some(Boolean)) {
      sessionStorage.setItem(
        "availability",
        JSON.stringify({
          selectedDays,
          timeSlots,
          timezone: userTimezone,
        })
      );
    }
  }, [selectedDays, timeSlots, userTimezone]);

  const toggleDay = (day) => {
    setSelectedDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const handleTimeChange = (day, type, value) => {
    setTimeSlots((prev) => ({
      ...prev,
      [day]: { ...prev[day], [type]: value },
    }));
  };

  const handleNext = () => {
    if (!Object.values(selectedDays).some(Boolean)) {
      showToast("Please select at least one available day", "error");
      return;
    }

    const userId = creatorId;
    console.log("Creator ID from Redux:", userId);
    if (!userId) {
      showToast("User not found. Please log in again.", "error");
      return;
    }

    const savedBusiness = sessionStorage.getItem("businessIdentity");
    if (!savedBusiness) {
      showToast("Business info missing. Please complete Step 1.", "error");
      navigate("/Paid/auth/business-identity");
      return;
    }

    // Save availability data to sessionStorage
    sessionStorage.setItem(
      "availability",
      JSON.stringify({
        selectedDays,
        timeSlots,
        timezone: userTimezone,
      })
    );

    showToast("Availability saved! Proceed to add services", "success");
    navigate("/Paid/auth/service-payment");
  };

  return (
    <PaidOnboardingLayout currentStep={3}>
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SubStepWrapper currentSubStep={2} />

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center sm:text-left">
          Set Your Availability
        </h1>
        <p className="text-gray-600 mb-8 sm:mb-10 text-center sm:text-left text-base sm:text-lg">
          Choose the days and times you're available for bookings
        </p>

        {/* Optional: Show detected timezone for transparency */}
        <div className="mb-6 text-center sm:text-left">
          <p className="text-sm text-gray-500">
            Detected timezone:{" "}
            <span className="font-medium text-purple-700">{userTimezone}</span>
          </p>
        </div>

        <div className="space-y-5">
          {daysOfWeek.map((day) => {
            const isSelected = selectedDays[day];

            return (
              <div
                key={day}
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border-2 transition-all duration-200 ${
                  isSelected
                    ? "border-purple-600 bg-purple-50 shadow-sm"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-8 py-3 rounded-xl font-medium min-w-[140px] transition-all ${
                    isSelected
                      ? "bg-purple-600 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {day}
                </button>

                {isSelected && (
                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto">
                    <select
                      value={timeSlots[day].from}
                      onChange={(e) =>
                        handleTimeChange(day, "from", e.target.value)
                      }
                      className="w-full sm:w-40 px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 focus:border-purple-600 focus:outline-none text-base font-medium"
                    >
                      {timeOptions.map((t) => (
                        <option key={`${day}-from-${t.value}`} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>

                    <span className="text-gray-600 font-medium">to</span>

                    <select
                      value={timeSlots[day].to}
                      onChange={(e) =>
                        handleTimeChange(day, "to", e.target.value)
                      }
                      className="w-full sm:w-40 px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 focus:border-purple-600 focus:outline-none text-base font-medium"
                    >
                      {timeOptions
                        .filter((t) => t.value > timeSlots[day].from)
                        .map((t) => (
                          <option key={`${day}-to-${t.value}`} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 sm:mt-12">
          <ButtonLongPurple
            width="w-full"
            onClick={handleNext}
            disabled={!Object.values(selectedDays).some(Boolean)}
            className="bg-purple-600 h-14 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            Next
          </ButtonLongPurple>
        </div>
      </div>
    </PaidOnboardingLayout>
  );
};

export default PaidOnboardingSetupTwo;
