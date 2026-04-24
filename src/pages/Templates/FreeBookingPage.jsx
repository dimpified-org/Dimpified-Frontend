import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import Calendar from "react-calendar";
import { Link, useParams } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import {
  FaCheckCircle,
  FaClock,
  FaUser,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaChevronRight,
  FaCreditCard,
  FaUniversity,
  FaCopy,
  FaMoneyBill,
} from "react-icons/fa";
import { showToast } from "../../component/ShowToast";
import DimpifiedLogo from "../../pages/LandingPages/images/dimp-blue.png";
import axios from "axios";
import { getCurrencySymbol } from "../../helper/getCurrencySymbol";
import api from "../../api/applicationFeature";

const FreeBookingPage = () => {
  const { subdomain } = useParams();

  const [businessInfo, setBusinessInfo] = useState({
    name: "",
    description: "",
    image: null,
    contact: {
      phone: "",
      email: "",
      address: "",
    },
    ecosystemDescription: "",
  });

  const [eServices, setEServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allBankDetails, setAllBankDetails] = useState(null);
  const [merchantDetails, setMerchantDetails] = useState({
    accountNumber: "N/A",
    accountName: "N/A",
    bankName: "N/A",
    whatsappNumber: "N/A",
  });

  const [paymentState, setPaymentState] = useState({
    paymentLoading: false,
  });
  const [uniqueID, setUniqueID] = useState("");

  const [fetchLoading, setFetchLoading] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [creatorId, setCreatorId] = useState(null);
  const lastFetchedParams = useRef(null);
  const fetchLoadingRef = useRef(false);

  // NEW: Store business hours
  const [businessHours, setBusinessHours] = useState(null);

  const normalizeDate = useCallback((date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  }, []);

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(normalizeDate(new Date()));
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [timeZones, setTimeZones] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    details: "",
  });

  const allTimeSlots = useMemo(() => {
    const generateTimeSlots = (startHour = 6, endHour = 22, interval = 30) => {
      const slots = [];
      // Convert start hour to minutes from midnight
      let totalMinutes = startHour * 60;
      const endTime = endHour * 60;

      while (totalMinutes < endTime) {
        const hour = Math.floor(totalMinutes / 60);
        const minute = totalMinutes % 60;

        // Calculate end time
        const endTotalMinutes = totalMinutes + interval;
        const endHour = Math.floor(endTotalMinutes / 60);
        const endMinute = endTotalMinutes % 60;

        // Format start time
        const time24 = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const period = hour >= 12 ? "PM" : "AM";

        // Format end time
        const endDisplayHour =
          endHour === 0 ? 12 : endHour > 12 ? endHour - 12 : endHour;
        const endPeriod = endHour >= 12 ? "PM" : "AM";

        slots.push({
          value: time24,
          label: `${displayHour}:${minute
            .toString()
            .padStart(2, "0")} - ${endDisplayHour}:${endMinute
            .toString()
            .padStart(2, "0")} ${period}`,
        });

        // Add the interval to get next slot
        totalMinutes += interval;
      }

      return slots;
    };

    // Use service's deliveryTime as interval, default to 30 minutes
    const interval = selectedService?.deliveryTime || 30;
    return generateTimeSlots(6, 22, interval);
  }, [selectedService?.deliveryTime]);

  // Convert 24h time string to minutes
  const timeToMinutes = useCallback((time24) => {
    const [h, m] = time24.split(":").map(Number);
    return h * 60 + m;
  }, []);

  // NEW: Get allowed slots based on business hours for the selected date
  const getAllowedSlotsForDate = useCallback(
    (date) => {
      if (!businessHours || !date) return [];

      const dayName = date
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase();
      const dayConfig = businessHours.week.find((d) => d.day === dayName);

      if (!dayConfig || !dayConfig.enabled || dayConfig.slots.length === 0) {
        return []; // Closed day
      }

      const slot = dayConfig.slots[0]; // Assuming one slot per day
      const startMinutes = timeToMinutes(slot.start);
      const endMinutes = timeToMinutes(slot.end);

      return allTimeSlots.filter((slot) => {
        const slotMinutes = timeToMinutes(slot.value);
        return slotMinutes >= startMinutes && slotMinutes < endMinutes;
      });
    },
    [businessHours, allTimeSlots, timeToMinutes],
  );

  const handlePayOnDelivery = useCallback(async () => {
    if (!formData.email || !formData.fullName || !formData.phone) {
      showToast(
        "Please fill in all required fields (email, name, phone)",
        "error",
      );
      return;
    }
    if (
      !selectedService?._id ||
      !selectedService?.name ||
      !selectedService?.price
    ) {
      showToast("Please select a service", "error");
      return;
    }
    if (!selectedTimeSlot) {
      showToast("Please select a time slot", "error");
      return;
    }

    setPaymentState((prev) => ({ ...prev, paymentLoading: true }));

    try {
      const response = await api.submitBooking({
        ecosystemDomain: subdomain?.toLowerCase() || "nil",
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: businessInfo?.contact?.address || "nil",
        description: formData.details || "Nil",
        location: "Shop",
        service: selectedService?.name,
        date: selectedDate ? selectedDate.toDateString() : "Not selected",
        time: selectedTimeSlot,
        bookingType: "Shop",
        servicePrice: parseFloat(selectedService.price),
        paymentAmount: parseFloat(selectedService.price),
        serviceCharge: 0,
        creatorId: creatorId,
        serviceId: selectedService?._id,
        timezone: timeZones,
        provider: "cash",
        currency: "NGN",
        paymentMethod: "pay_on_delivery",
      });

      setPaymentState((prev) => ({ ...prev, paymentLoading: false }));
      showToast("Booking submitted successfully!", "success");
      setUniqueID(response.data.booking?.bookingId || "N/A");
      handleNextStep(5);
    } catch (error) {
      setPaymentState((prev) => ({ ...prev, paymentLoading: false }));
      console.error("Pay on delivery error:", error);
      showToast(
        error.response?.data?.message ||
          "Failed to submit booking. Please try again.",
        "error",
      );
    }
  }, [
    formData,
    selectedService,
    selectedTimeSlot,
    selectedDate,
    subdomain,
    timeZones,
    creatorId,
  ]);

  useEffect(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZones(timeZone);
  }, []);

  // Updated fetchAvailableTimeSlots — now respects business hours first
  const fetchAvailableTimeSlots = useCallback(
    async (date) => {
      if (!selectedService?._id || !date || !creatorId) return;

      const paramsKey = JSON.stringify({
        date: date.toISOString(),
        serviceId: selectedService._id,
        creatorId: creatorId,
      });

      if (lastFetchedParams.current === paramsKey) return;
      if (fetchLoadingRef.current) return;

      fetchLoadingRef.current = true;
      setFetchLoading(true);

      try {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;

        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/get-available-time/${creatorId}/${formattedDate}/${
            selectedService._id
          }/${subdomain}`,
        );

        const { bookedTimes = [], duration: apiDuration } = response.data;
        const effectiveDuration =
          apiDuration || selectedService?.deliveryTime || 30;

        // Create a set of booked time windows using overlap detection
        const bookedWindows = bookedTimes.map((bookedTime) => {
          const startMinutes = timeToMinutes(bookedTime);
          const endMinutes = startMinutes + effectiveDuration;
          return { startMinutes, endMinutes };
        });

        // First: Filter by business hours
        const allowedSlots = getAllowedSlotsForDate(date);

        // Then: Mark booked if slot overlaps with any booked window
        const updatedSlots = allowedSlots.map((slot) => {
          const slotStartMinutes = timeToMinutes(slot.value);
          const slotEndMinutes = slotStartMinutes + effectiveDuration;

          // A slot is booked if it overlaps with any booked window
          // Overlap occurs when: slotStart < bookedEnd AND slotEnd > bookedStart
          const isBooked = bookedWindows.some(
            ({ startMinutes: bookedStart, endMinutes: bookedEnd }) =>
              slotStartMinutes < bookedEnd && slotEndMinutes > bookedStart,
          );

          return { ...slot, booked: isBooked };
        });

        setAvailableTimeSlots(updatedSlots.length > 0 ? updatedSlots : []);
        lastFetchedParams.current = paramsKey;
      } catch (error) {
        console.error("Error fetching available time slots:", error);
        const allowedSlots = getAllowedSlotsForDate(date);
        setAvailableTimeSlots(
          allowedSlots.map((s) => ({ ...s, booked: false })),
        );
      } finally {
        fetchLoadingRef.current = false;
        setFetchLoading(false);
      }
    },
    [
      selectedService,
      creatorId,
      subdomain,
      timeToMinutes,
      getAllowedSlotsForDate,
      allTimeSlots,
    ],
  );

  // Initialize and update slots when date/service changes
  useEffect(() => {
    if (step === 2 && selectedDate) {
      const allowed = getAllowedSlotsForDate(selectedDate);
      setAvailableTimeSlots(allowed.map((s) => ({ ...s, booked: false })));
      lastFetchedParams.current = null;

      if (selectedService?._id && creatorId) {
        fetchAvailableTimeSlots(selectedDate);
      }
    }
  }, [
    step,
    selectedDate,
    selectedService?._id,
    creatorId,
    fetchAvailableTimeSlots,
    getAllowedSlotsForDate,
  ]);

  // Fetch services + business info + business hours
  useEffect(() => {
    const fetchServicesAndBusinessInfo = async () => {
      if (!subdomain) return;

      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-all-services/${subdomain}`,
        );

        if (response.data && response.data.length > 0) {
          const serviceData = response.data[0];

          setEServices(serviceData.services || []);

          if (serviceData.creatorId) {
            setCreatorId(serviceData.creatorId);
          }

          // Extract business hours
          if (
            serviceData.businessHoursRecords &&
            serviceData.businessHoursRecords.length > 0
          ) {
            const hoursRecord = serviceData.businessHoursRecords[0];
            setBusinessHours({
              week: hoursRecord.week,
              timezone: hoursRecord.timezone,
            });
          }

          setBusinessInfo({
            name:
              serviceData?.businessHoursRecords[0]?.ecosystemName || "Business",
            description: serviceData.description || "Professional services",
            image: serviceData.serviceImage || null,
            contact: {
              phone: serviceData.phoneNumber || "",
              email: serviceData.email || "",
              address: serviceData.localGovernment || "Not available",
            },
            ecosystemDescription:
              serviceData.ecosystemDescription || "Professional services",
          });

          const contactInfo = {
            phone: serviceData.phoneNumber || "",
            email: serviceData.email || "",
            address: serviceData.localGovernment || "",
            ecosystemDomain: serviceData.ecosystemDomain || "",
            description: serviceData.description || "",
            creatorId: serviceData.creatorId || "",
          };
          localStorage.setItem(
            "businessContactInfo",
            JSON.stringify(contactInfo),
          );
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        showToast("Failed to load services", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchServicesAndBusinessInfo();
  }, [subdomain]);

  // Load from localStorage fallback
  useEffect(() => {
    const savedContactInfo = localStorage.getItem("businessContactInfo");
    if (savedContactInfo) {
      const contactInfo = JSON.parse(savedContactInfo);
      setBusinessInfo((prev) => ({
        ...prev,
        name: contactInfo.ecosystemDomain || prev.name,
        description: contactInfo.description || prev.description,
        contact: {
          phone: contactInfo.phone || prev.contact.phone,
          email: contactInfo.email || prev.contact.email,
          address: contactInfo.address || prev.contact.address,
        },
      }));
      if (contactInfo.creatorId) {
        setCreatorId(contactInfo.creatorId);
      }
    }
  }, []);

  // Bank details (unchanged)
  useEffect(() => {
    const getAllMerchantDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/bank-details/${subdomain}`,
        );
        setAllBankDetails(response.data);
      } catch (error) {
        console.error("Could not get all Bank Details:", error);
        showToast("Failed to fetch bank details", "error");
      }
    };

    if (subdomain) {
      getAllMerchantDetails();
    }
  }, [subdomain]);

  useEffect(() => {
    const [firstAccount] = allBankDetails?.accountDetails || [];
    setMerchantDetails({
      accountNumber: firstAccount?.accountNumber || "N/A",
      accountName: firstAccount?.accountName || "N/A",
      bankName: firstAccount?.bankName || "N/A",
      whatsappNumber: businessInfo.contact.phone || "N/A",
    });
  }, [allBankDetails, businessInfo]);

  const resetBooking = useCallback(() => {
    setStep(1);
    setSelectedService(null);
    setSelectedTimeSlot(null);
    setSelectedDate(normalizeDate(new Date()));
    setFormData({ fullName: "", email: "", phone: "", details: "" });
    setAvailableTimeSlots(allTimeSlots);
    setUniqueID("");
    lastFetchedParams.current = null;
  }, [normalizeDate, allTimeSlots]);

  const copyToClipboard = (text, label) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showToast(`${label} copied to clipboard!`, "success");
      })
      .catch(() => {
        showToast("Failed to copy to clipboard", "error");
      });
  };

  const handleServiceChange = (service) => {
    setSelectedService(service);
    setTimeout(() => handleNextStep(2), 300);
  };

  const handleDateChange = useCallback(
    (date) => {
      const normalizedDate = normalizeDate(date);
      setSelectedDate(normalizedDate);
      setSelectedTimeSlot(null);
      if (selectedService?._id && creatorId) {
        fetchAvailableTimeSlots(normalizedDate);
      }
    },
    [normalizeDate, selectedService?._id, fetchAvailableTimeSlots, creatorId],
  );

  const disablePastDates = ({ date, view }) => {
    return view === "month" && date < new Date().setHours(0, 0, 0, 0);
  };

  const handleNextStep = (nextStep) => {
    if (nextStep <= 5) setStep(nextStep);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const progressSteps = [
    { number: 1, label: "Service", icon: FaUser },
    { number: 2, label: "Time", icon: FaClock },
    { number: 3, label: "Details", icon: FaUser },
    { number: 4, label: "Review", icon: FaCheckCircle },
    { number: 5, label: "Confirm", icon: FaMoneyBill },
  ];

  const formatCurrency = (amount) => {
    const symbol = getCurrencySymbol("NGN");
    const formattedAmount = new Intl.NumberFormat().format(amount);
    return `${symbol}${formattedAmount}`;
  };

  const truncateDescription = (text, maxLength = 100) => {
    if (!text) return "";

    // Trim whitespace first
    const trimmedText = text.trim();

    // Return as-is if within limit
    if (trimmedText.length <= maxLength) return trimmedText;

    // Find the last space within the limit to avoid cutting words
    const truncated = trimmedText.substring(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(" ");

    // If there's a space, cut at that point; otherwise cut at maxLength
    const finalText =
      lastSpaceIndex > 0 ? truncated.substring(0, lastSpaceIndex) : truncated;

    return finalText.trim() + "...";
  };

  const PoweredByLogo = () => (
    <div className="text-gray-400 mt-8 pt-6 border-t border-gray-200">
      <div className="bg-white lg:hidden rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">
          Contact Information
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-3">
            <FaMapMarkerAlt className="text-purple-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600">
              {businessInfo.contact.address || "Not Available"}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <FaPhone className="text-purple-500 flex-shrink-0" />
            <span className="text-gray-600">{businessInfo.contact.phone}</span>
          </div>
          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-purple-500 flex-shrink-0" />
            <span className="text-gray-600">{businessInfo.contact.email}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center text-center mt-6">
        <span className="text-lg  ">
          Click{" "}
          <a
            href="https://dimpified.com"
            className="text-purple-600 font-bold hover:underline hover:text-purple-500"
          >
            here{" "}
          </a>
          to also get a free booking link for your business.
        </span>
      </div>

      <div className="flex items-center justify-center space-x-2 mt-4">
        <span className=" text-sm "> Powered by</span>
        <a href="https://dimpified.com">
          <img src={DimpifiedLogo} alt="Dimpified" className="h-5 w-auto" />
        </a>
      </div>
    </div>
  );

  const bankDetails = {
    accountName: merchantDetails.accountName,
    bankName: merchantDetails.bankName,
    accountNumber: merchantDetails.accountNumber,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className=" lg:px-32 px-4 sm:px-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {businessInfo.name.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {businessInfo.name}
                </h1>
                <p className="text-gray-600 text-sm hidden sm:block">
                  Book your appointment online
                </p>
              </div>
            </div>
            {/* <Link
              to="/"
              className="text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium"
            >
              ← Back to Home
            </Link> */}
          </div>
        </div>
      </div>

      <div className=" ">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 lg:px-8 py-8 px-6">
            <div className="max-w-4xl mx-auto">
              {/* Enhanced Progress Bar - Desktop with Connected Lines */}
              <div className="hidden lg:block mb-8">
                <div className="flex items-center justify-between relative max-w-2xl mx-auto">
                  {progressSteps.slice(0, 5).map((stepItem, index) => {
                    const Icon = stepItem.icon;
                    const isLast = index === progressSteps.length - 1;
                    const isActive = step >= stepItem.number;
                    const isCurrentStep = step === stepItem.number;

                    return (
                      <React.Fragment key={stepItem.number}>
                        <div className="flex flex-col items-center relative z-10">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                              isCurrentStep
                                ? "bg-purple-600 border-purple-600 text-white shadow-lg scale-110"
                                : isActive
                                  ? "bg-purple-100 border-purple-600 text-purple-600"
                                  : "bg-white border-gray-300 text-gray-400"
                            }`}
                          >
                            <Icon
                              className={`${
                                isCurrentStep ? "text-lg" : "text-base"
                              }`}
                            />
                          </div>
                          <span
                            className={`text-sm mt-2 font-medium transition-all duration-300 ${
                              isCurrentStep
                                ? "text-purple-600 font-bold"
                                : isActive
                                  ? "text-purple-600"
                                  : "text-gray-500"
                            }`}
                          >
                            {stepItem.label}
                          </span>
                        </div>
                        {!isLast && (
                          <div className="flex-1 mx-2 relative">
                            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 -z-10"></div>
                            <div
                              className="absolute top-1/2 left-0 h-0.5 bg-purple-600 -translate-y-1/2 -z-10 transition-all duration-500"
                              style={{ width: isActive ? "100%" : "0%" }}
                            ></div>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Progressive Line Bar Stepper - Mobile */}
              <div className="lg:hidden mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Step {step} of {progressSteps.length - 0}
                  </span>
                  <span className="text-sm text-gray-500">
                    {step}/{progressSteps.length - 0}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${
                        ((step - 1) / (progressSteps.length - 1)) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Step 1: Service Selection */}
              {step === 1 && (
                <div className="animate-fade-in">
                  <div className="text-start mb-8 lg:mb-12">
                    <h2 className="text-2xl lg:text-4xl font-bold leading-relaxed text-gray-900 mb-3 lg:mb-4">
                      Welcome to {businessInfo.name},
                    </h2>
                    <p className="text-base lg:text-xl text-gray-600 mb-6">
                      {businessInfo.ecosystemDescription}
                    </p>
                    <h2 className="text-2xl lg:text-4xl font-bold leading-relaxed text-gray-900 mb-3 lg:mb-4">
                      Kindly select a service to book
                    </h2>
                  </div>

                  {loading ? (
                    <div className="flex justify-center items-center h-48 lg:h-64">
                      <div className="animate-spin rounded-full h-8 w-8 lg:h-12 lg:w-12 border-b-2 border-purple-600"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-4xl mx-auto">
                      {eServices.map((service) => (
                        <div
                          key={service._id}
                          className={`group relative bg-white rounded-xl lg:rounded-2xl border-2 p-4 lg:p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                            selectedService?._id === service._id
                              ? "border-purple-500 shadow-md bg-purple-50"
                              : "border-gray-200 hover:border-purple-300"
                          }`}
                          onClick={() => handleServiceChange(service)}
                        >
                          {/* Service Image - Only show if available */}
                          {service.serviceImage &&
                            Array.isArray(service.serviceImage) &&
                            service.serviceImage.length > 0 &&
                            service.serviceImage[0] !== "null" && (
                              <div className="mb-4 -mx-4 lg:-mx-6 -mt-4 lg:-mt-6">
                                <img
                                  src={service.serviceImage[0]}
                                  alt={service.name}
                                  className="w-full h-40 lg:h-48 object-cover rounded-t-xl lg:rounded-t-2xl"
                                />
                              </div>
                            )}

                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                                {service.name}
                              </h3>

                              {/* Description - Show truncated with view more */}
                              {service.shortDescription && (
                                <p className="text-gray-600 text-sm lg:text-base mb-2">
                                  {truncateDescription(
                                    service.shortDescription,
                                    100,
                                  )}
                                  {service.shortDescription.length > 100 && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setShowFullDescription(
                                          showFullDescription === service._id
                                            ? null
                                            : service._id,
                                        );
                                      }}
                                      className="ml-1 text-purple-600 hover:text-purple-700 font-medium text-xs"
                                    >
                                      View more
                                    </button>
                                  )}
                                </p>
                              )}

                              {/* Full description modal - appears when view more is clicked */}
                              {showFullDescription === service._id && (
                                <div className="mb-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                                  <p className="text-sm text-gray-700 mb-2">
                                    {service.shortDescription}
                                  </p>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setShowFullDescription(null);
                                    }}
                                    className="text-xs text-purple-600 hover:text-purple-700 font-medium"
                                  >
                                    Show less
                                  </button>
                                </div>
                              )}

                              {/* <p className="text-gray-600 text-sm lg:text-base mb-2">
                                {service.shortDescription}
                              </p> */}
                              <div className="flex items-center justify-between mt-3">
                                <span className="text-lg font-bold text-purple-600">
                                  {formatCurrency(service.price)}
                                </span>
                                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                  {service.deliveryTime} mins
                                </span>
                              </div>
                            </div>
                            <FaChevronRight
                              className={`text-gray-400 group-hover:text-purple-500 transition-colors duration-200 flex-shrink-0 ml-2 ${
                                selectedService?._id === service._id
                                  ? "text-purple-500"
                                  : ""
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Powered by logo for Step 1 */}
                  <PoweredByLogo />
                </div>
              )}

              {/* Step 2: Date and Time Selection */}
              {step === 2 && (
                <div className="animate-fade-in">
                  <div className="text-start mb-8 lg:mb-12">
                    <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
                      Please Select Your Preferred Date & Time
                    </h2>
                    <p className="text-base lg:text-xl text-gray-600">
                      Choose when you'd like to visit us
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <FaCalendarAlt className="text-purple-500 mr-2" />
                        Select Date
                      </h3>
                      <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        className="border-none w-full react-calendar-custom"
                        tileDisabled={disablePastDates}
                        minDetail="month"
                      />
                    </div>

                    <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <FaClock className="text-purple-500 mr-2" />
                        Available Times
                      </h3>

                      {fetchLoading ? (
                        <div className="flex justify-center items-center h-32 lg:h-48">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                        </div>
                      ) : !selectedDate ? (
                        <p className="text-gray-500 text-center py-10">
                          Please select a date first
                        </p>
                      ) : availableTimeSlots.length === 0 ? (
                        <p className="text-gray-500 text-center py-10">
                          The business is not available on this date.
                        </p>
                      ) : (
                        <>
                          <p className="text-gray-700 font-medium mb-4 text-sm lg:text-base">
                            {selectedDate?.toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:gap-4">
                            {availableTimeSlots.map((slot) => {
                              const isSelected =
                                selectedTimeSlot === slot.value;

                              return (
                                <button
                                  key={slot.value}
                                  onClick={() =>
                                    !slot.booked &&
                                    setSelectedTimeSlot(slot.value)
                                  }
                                  disabled={slot.booked}
                                  className={`p-3 lg:p-4 rounded-lg lg:rounded-xl border-2 text-sm lg:text-base font-medium transition-all duration-200 relative
                            ${
                              isSelected
                                ? "bg-purple-600 text-white border-purple-600 shadow-lg"
                                : slot.booked
                                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                  : "bg-white text-gray-800 border-gray-300 hover:border-purple-400 hover:shadow-md hover:bg-purple-50"
                            }`}
                                >
                                  <div>{slot.label}</div>
                                  {slot.booked && (
                                    <div className="text-xs mt-1 opacity-80">
                                      Booked
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 lg:mt-12">
                    <button
                      onClick={() => handlePrevStep()}
                      className="px-6 lg:px-8 py-3 border border-gray-300 text-gray-700 rounded-lg lg:rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 order-2 sm:order-1"
                    >
                      Back to Services
                    </button>
                    <button
                      onClick={() => handleNextStep(3)}
                      disabled={!selectedTimeSlot}
                      className={`px-6 lg:px-8 py-3 rounded-lg lg:rounded-full font-semibold transition-all duration-300 order-1 sm:order-2 ${
                        selectedTimeSlot
                          ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Continue to Details
                    </button>
                  </div>

                  <PoweredByLogo />
                </div>
              )}
              {/* Step 3: Enter Details */}
              {step === 3 && (
                <div className="animate-fade-in max-w-2xl mx-auto">
                  <div className="text-start mb-8 lg:mb-12">
                    <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
                      Kindly Provide Your Basic Information
                    </h2>
                    <p className="text-base lg:text-xl text-gray-600">
                      Please provide your details to submit your booking
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleNextStep(4);
                    }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleFormChange}
                          required
                          className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          required
                          className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                          placeholder="Your phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        name="details"
                        value={formData.details}
                        onChange={handleFormChange}
                        rows={4}
                        className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="Any special requirements or notes for our team..."
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
                      <button
                        type="button"
                        onClick={() => handlePrevStep()}
                        className="px-6 lg:px-8 py-3 border border-gray-300 text-gray-700 rounded-lg lg:rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 order-2 sm:order-1"
                      >
                        ← Back to Time
                      </button>
                      <button
                        type="submit"
                        className="px-6 lg:px-12 py-3 lg:py-4 bg-purple-600 text-white rounded-lg lg:rounded-full font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 order-1 sm:order-2"
                      >
                        Continue to Review →
                      </button>
                    </div>
                  </form>

                  {/* Powered by logo for Step 3 */}
                  <PoweredByLogo />
                </div>
              )}

              {/* Step 4: Confirmation Preview */}
              {step === 4 && (
                <div className="animate-fade-in max-w-2xl mx-auto">
                  <div className="text-start mb-8 lg:mb-12">
                    <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
                      Please Review Your Booking Information
                    </h2>
                    <p className="text-base lg:text-xl text-gray-600">
                      Please review your details before confirming
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-gray-200 mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Appointment Details
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600">Service</p>
                            <p className="font-medium text-gray-900">
                              {selectedService?.name}
                            </p>
                            <p className="text-sm text-purple-600 font-semibold">
                              {formatCurrency(selectedService?.price)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Date & Time</p>
                            <p className="font-medium text-gray-900">
                              {selectedDate?.toLocaleDateString()} at{" "}
                              {selectedTimeSlot}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Your Information
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600">Full Name</p>
                            <p className="font-medium text-gray-900">
                              {formData.fullName}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="font-medium text-gray-900">
                              {formData.email}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Phone</p>
                            <p className="font-medium text-gray-900">
                              {formData.phone}
                            </p>
                          </div>
                          {formData.details && (
                            <div>
                              <p className="text-sm text-gray-600">
                                Additional Notes
                              </p>
                              <p className="font-medium text-gray-900">
                                {formData.details}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <button
                      onClick={() => handlePrevStep()}
                      className="px-6 lg:px-8 py-3 border border-gray-300 text-gray-700 rounded-lg lg:rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 order-2 sm:order-1"
                    >
                      ← Edit Details
                    </button>
                    <button
                      onClick={handlePayOnDelivery}
                      disabled={paymentState.paymentLoading}
                      className="px-6 lg:px-12 py-3 lg:py-4 bg-purple-600 text-white rounded-lg lg:rounded-full font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:bg-purple-400 flex items-center justify-center gap-3 order-1 sm:order-2"
                    >
                      {paymentState.paymentLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 lg:h-5 lg:w-5 border-b-2 border-white"></div>
                          Processing...
                        </>
                      ) : (
                        "Confirm Booking"
                      )}
                    </button>
                  </div>

                  {/* Powered by logo for Step 4 */}
                  <PoweredByLogo />
                </div>
              )}

              {/* Step 5: Success */}
              {step === 5 && (
                <div className="animate-fade-in text-center max-w-2xl mx-auto">
                  <div className="w-16 h-16 lg:w-24 lg:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 lg:mb-8">
                    <FaCheckCircle className="text-green-500 text-2xl lg:text-4xl" />
                  </div>

                  <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">
                    Your booking has been submitted!
                  </h2>

                  <p className="text-base lg:text-xl text-gray-600 mb-6 lg:mb-8">
                    To confirm your booking, kindly make payment to the bank
                    details below and send us the payment receipt.
                  </p>

                  {/* Amount to Pay */}
                  <div className="bg-yellow-50 rounded-xl lg:rounded-2xl p-6 mb-6 lg:mb-8 border border-yellow-200">
                    <div className="flex items-center justify-center mb-4">
                      <FaCreditCard className="text-yellow-600 text-xl mr-2" />
                      <h4 className="font-semibold text-yellow-800 text-lg">
                        Amount to Pay
                      </h4>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl lg:text-4xl font-bold text-yellow-700 mb-2">
                        {formatCurrency(selectedService?.price)}
                      </p>
                      <p className="text-yellow-600 text-sm">
                        Please pay the exact amount using the bank details below
                      </p>
                    </div>
                  </div>

                  {/* Bank Account Details */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl lg:rounded-2xl p-6 mb-6 lg:mb-8 border border-blue-200">
                    <div className="flex items-center justify-center mb-4">
                      <FaUniversity className="text-blue-500 text-xl mr-2" />
                      <h4 className="font-semibold text-blue-800 text-lg">
                        Bank Transfer Details
                      </h4>
                    </div>
                    <p className="text-blue-700 text-sm text-center mb-4">
                      Kindly make payment using the bank details below:
                    </p>
                    <div className="space-y-4 text-left text-sm">
                      <div className="flex justify-between items-center p-3">
                        <div>
                          <span className="text-blue-700 font-medium">
                            Account Name:
                          </span>
                          <span className="text-blue-900 ml-2">
                            {bankDetails.accountName}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              bankDetails.accountName,
                              "Account name",
                            )
                          }
                          className="text-blue-500 hover:text-blue-700 transition-colors p-1 rounded"
                          title="Copy account name"
                        >
                          <FaCopy />
                        </button>
                      </div>
                      <div className="flex justify-between items-center p-3">
                        <div>
                          <span className="text-blue-700 font-medium">
                            Bank Name:
                          </span>
                          <span className="text-blue-900 ml-2">
                            {bankDetails.bankName}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            copyToClipboard(bankDetails.bankName, "Bank name")
                          }
                          className="text-blue-500 hover:text-blue-700 transition-colors p-1 rounded"
                          title="Copy bank name"
                        >
                          <FaCopy />
                        </button>
                      </div>
                      <div className="flex justify-between items-center p-3">
                        <div>
                          <span className="text-blue-700 font-medium">
                            Account Number:
                          </span>
                          <span className="text-blue-900 ml-2">
                            {bankDetails.accountNumber}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              bankDetails.accountNumber,
                              "Account number",
                            )
                          }
                          className="text-blue-500 hover:text-blue-700 transition-colors p-1 rounded"
                          title="Copy account number"
                        >
                          <FaCopy />
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-blue-100 rounded-lg border border-blue-200">
                      <p className="text-blue-700 text-xs text-center">
                        Please include your name and preferred service as
                        reference when making the payment and bring your payment
                        receipt to your appointment.
                      </p>
                    </div>
                  </div>

                  {/* Payment Confirmation Button */}
                  <div className="bg-green-50 rounded-xl lg:rounded-2xl p-6 mb-6 lg:mb-8 border border-green-200">
                    <div className="flex items-center justify-center mb-3">
                      <FaCreditCard className="text-green-500 text-xl mr-2" />
                      <h4 className="font-semibold text-green-800 text-lg">
                        Payment Confirmation
                      </h4>
                    </div>
                    <p className="text-green-700 text-sm text-center mb-4">
                      Already made your payment? Click the button below to
                      notify us on WhatsApp and kindly attach your payment
                      receipt or screenshot to confirm.
                    </p>
                    <button
                      onClick={() => {
                        const merchantWhatsAppNumber =
                          merchantDetails.whatsappNumber;
                        const message = `*Payment Confirmation - Booking ID: ${uniqueID}*\n\nHello! I have made my payment for the following booking:\n\n📋 *Booking Details:*\n• Booking ID: ${uniqueID}\n• Service: ${
                          selectedService?.name
                        }\n• Amount: ${formatCurrency(
                          selectedService?.price,
                        )}\n• Appointment Date: ${selectedDate?.toLocaleDateString()}\n• Time: ${selectedTimeSlot}\n\n👤 *Customer Information:*\n• Name: ${
                          formData.fullName
                        }\n• Phone: ${formData.phone}\n• Email: ${
                          formData.email
                        }\n\n💳 *Payment Made:*\nI have transferred the amount of ${formatCurrency(
                          selectedService?.price,
                        )} to your bank account.\n\n📎 *Receipt Attached:*\nKindly find attached my payment receipt for verification.\n\nThank you!`;

                        const whatsappUrl = `https://wa.me/${merchantWhatsAppNumber}?text=${encodeURIComponent(
                          message,
                        )}`;
                        window.open(whatsappUrl, "_blank");
                      }}
                      className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <FaCheckCircle className="text-white" />I Have Made My
                      Payment
                    </button>
                  </div>

                  {/* Booking ID Display */}
                  {uniqueID && (
                    <div className="bg-purple-50 rounded-xl lg:rounded-2xl p-6 mb-6 lg:mb-8 border border-purple-200">
                      <div className="flex items-center justify-center mb-3">
                        <FaCheckCircle className="text-purple-500 text-xl mr-2" />
                        <h4 className="font-semibold text-purple-800 text-lg">
                          Booking Reference
                        </h4>
                      </div>
                      <p className="text-purple-700 text-sm text-center mb-2">
                        Your booking has been submitted with the following ID:
                      </p>
                      <div className="bg-white rounded-lg p-3 border border-purple-300">
                        <p className="text-purple-800 font-bold text-lg text-center">
                          {uniqueID}
                        </p>
                      </div>
                      <p className="text-purple-600 text-xs text-center mt-2">
                        Please keep this reference number for your records
                      </p>
                    </div>
                  )}

                  {/* Contact Information - Mobile Only on Success Page */}
                  <div className="lg:hidden bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
                    <h5 className="font-semibold text-blue-800 mb-3 flex items-center">
                      <FaPhone className="mr-2" />
                      Contact Information
                    </h5>
                    <div className="space-y-2 text-sm text-blue-700">
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="flex-shrink-0" />
                        <span>{businessInfo.contact.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaPhone className="flex-shrink-0" />
                        <span>{businessInfo.contact.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaEnvelope className="flex-shrink-0" />
                        <span>{businessInfo.contact.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg lg:rounded-xl p-4 mb-6 lg:mb-8 border border-blue-200">
                    <h5 className="font-semibold text-blue-800 mb-2">
                      What's Next?
                    </h5>
                    <p className="text-blue-700 text-sm">
                      You'll receive a confirmation email with all the details.
                      We'll send you a reminder before your appointment.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={resetBooking}
                      className="px-6 lg:px-12 py-3 lg:py-4 bg-purple-600 text-white rounded-lg lg:rounded-full font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Make Another Booking
                    </button>
                    <Link
                      to="/"
                      className="px-6 lg:px-12 py-3 lg:py-4 border border-gray-300 text-gray-700 rounded-lg lg:rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 text-center"
                    >
                      Back to Home
                    </Link>
                  </div>

                  {/* Powered by logo for Step 5 */}
                  <PoweredByLogo />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block w-96 bg-gray-50 border-l border-gray-200 p-6 lg:p-8 overflow-y-auto">
            <div className="sticky top-8">
              {/* Business Info */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {businessInfo.name.charAt(0)}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {businessInfo.name}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {businessInfo.description}
                </p>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <FaMapMarkerAlt className="text-purple-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">
                      {businessInfo.contact.address || "Not Available"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaPhone className="text-purple-500 flex-shrink-0" />
                    <span className="text-gray-600">
                      {businessInfo.contact.phone}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaEnvelope className="text-purple-500 flex-shrink-0" />
                    <span className="text-gray-600">
                      {businessInfo.contact.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Current Booking Summary */}
              {(step === 2 || step === 3 || step === 4 || step === 5) &&
                selectedService && (
                  <div className="bg-white rounded-xl p-6 border border-gray-200 mt-6">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Your Booking
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {selectedService.name}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {selectedService.shortDescription}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-lg font-bold text-purple-600">
                            {formatCurrency(selectedService.price)}
                          </span>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {selectedService.deliveryTime} mins
                          </span>
                        </div>
                      </div>

                      {(selectedDate || selectedTimeSlot) && (
                        <div className="pt-3 border-t border-gray-200">
                          <div className="space-y-2 text-sm">
                            {selectedDate && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Date:</span>
                                <span className="font-medium">
                                  {selectedDate.toLocaleDateString()}
                                </span>
                              </div>
                            )}
                            {selectedTimeSlot && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Time:</span>
                                <span className="font-medium">
                                  {selectedTimeSlot}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              {/* Powered by logo for Desktop Sidebar */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2 text-gray-400">
                  <span className="text-xs">Powered by</span>
                  <div className="flex items-center space-x-3">
                    <a href="https://dimpified.com" target="_blank">
                      <img
                        src={DimpifiedLogo}
                        alt="Dimpified"
                        className="h-5 w-auto"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .react-calendar-custom {
          width: 100%;
          border: none;
          font-family: inherit;
        }
        .react-calendar-custom .react-calendar__tile--active {
          background: #8b5cf6;
          color: white;
          border-radius: 20%;
        }
        .react-calendar-custom .react-calendar__tile:enabled:hover,
        .react-calendar-custom .react-calendar__tile:enabled:focus {
          background: #ede9fe;
          border-radius: 20%;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default FreeBookingPage;
