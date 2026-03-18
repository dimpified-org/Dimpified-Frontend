import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import {
  FaCheckCircle,
  FaClock,
  FaUser,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCreditCard,
  FaUniversity,
  FaPlus,
  FaTrash,
  FaWhatsapp,
  FaTimes,
} from "react-icons/fa";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { showToast } from "../../../component/ShowToast";
import DimpifiedLogo from "../../../pages/LandingPages/images/dimp-blue.png";
import api from "../../../api/applicationFeature";
import axios from "axios";
import PaystackPop from "@paystack/inline-js";

const PaidBookingModal = ({
  isOpen = false,
  handleClose,
  subdomain,
  serviceCurrency = "NGN",
  businessInfo: propBusinessInfo,
  initialSelectedService = null,
}) => {
  // Business information - enriched from API data when available
  const [apiContactInfo, setApiContactInfo] = useState(null);
  const businessInfo = {
    name: propBusinessInfo?.name || "Business",
    description: propBusinessInfo?.description || "",
    contact: {
      phone: apiContactInfo?.phoneNumber || propBusinessInfo?.contact?.phone || "",
      email: apiContactInfo?.email || propBusinessInfo?.contact?.email || "",
      address: apiContactInfo?.localGovernment || propBusinessInfo?.contact?.address || "",
    },
  };

  const lastFetchedParams = useRef(null);
  const fetchLoadingRef = useRef(false);

  // State - API-fetched data
  const [eServices, setEServices] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [businessHours, setBusinessHours] = useState(null);
  const [creatorId, setCreatorId] = useState(null);
  const [planType, setPlanType] = useState(null);
  const [allBankDetails, setAllBankDetails] = useState(null);
  const [merchantDetails, setMerchantDetails] = useState({
    accountNumber: "N/A",
    accountName: "N/A",
    bankName: "N/A",
    whatsappNumber: "N/A",
  });
  const [paymentState, setPaymentState] = useState({
    paymentLoading: false,
    stripeModalOpen: false,
    clientSecret: "",
  });
  const [serviceCharge, setServiceCharge] = useState(0);
  const [totalAmount, setTotalAmount] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [uniqueID, setUniqueID] = useState("");
  const [timeZones, setTimeZones] = useState("");
  const [duration, setDuration] = useState(null);

  // State - UI
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentStep, setPaymentStep] = useState("selection");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    details: "",
  });

  // Initialize selected service from prop
  useEffect(() => {
    if (initialSelectedService && isOpen) {
      setSelectedServices([initialSelectedService]);
    }
  }, [initialSelectedService, isOpen]);

  // Timezone detection
  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZones(tz);
  }, []);

  // Helper Functions
  const getInitials = (text, maxLength = 2) => {
    if (!text) return "";
    return text
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, maxLength)
      .toUpperCase();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: serviceCurrency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const normalizeDate = useCallback((date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  }, []);

  const generateTxRef = () => {
    const randomString = Math.random().toString(36).substring(7);
    const timestamp = Date.now();
    return `${timestamp}-${randomString}`;
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Computed Values
  const totalPrice = useMemo(() => {
    return selectedServices.reduce(
      (total, service) => total + service.price,
      0,
    );
  }, [selectedServices]);

  const isBookingComplete = useMemo(() => {
    return (
      selectedServices.length > 0 &&
      selectedTeamMember !== null &&
      selectedDate !== null &&
      selectedTimeSlot !== null &&
      formData.fullName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== ""
    );
  }, [
    selectedServices,
    selectedTeamMember,
    selectedDate,
    selectedTimeSlot,
    formData,
  ]);

  // Time slot definitions
  const timeSlots = [
    { time: "07:30 AM", booked: false },
    { time: "08:00 AM", booked: false },
    { time: "08:30 AM", booked: false },
    { time: "09:00 AM", booked: false },
    { time: "09:30 AM", booked: false },
    { time: "10:00 AM", booked: false },
    { time: "10:30 AM", booked: false },
    { time: "11:00 AM", booked: false },
    { time: "11:30 AM", booked: false },
    { time: "12:00 PM", booked: false },
    { time: "12:30 PM", booked: false },
    { time: "01:00 PM", booked: false },
    { time: "01:30 PM", booked: false },
    { time: "02:00 PM", booked: false },
    { time: "02:30 PM", booked: false },
    { time: "03:00 PM", booked: false },
    { time: "03:30 PM", booked: false },
    { time: "04:00 PM", booked: false },
    { time: "04:30 PM", booked: false },
    { time: "05:00 PM", booked: false },
    { time: "05:30 PM", booked: false },
    { time: "06:00 PM", booked: false },
    { time: "06:30 PM", booked: false },
    { time: "07:00 PM", booked: false },
    { time: "07:30 PM", booked: false },
    { time: "08:00 PM", booked: false },
    { time: "08:30 PM", booked: false },
    { time: "09:00 PM", booked: false },
    { time: "09:30 PM", booked: false },
    { time: "10:00 PM", booked: false },
  ];

  const timeToMinutes = useCallback((timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }, []);

  // ==================== API CALLS ====================

  // Fetch services
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchServices = async () => {
      if (!subdomain) return;
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-all-services/${subdomain}`,
          { signal: controller.signal },
        );
        if (isMounted) {
          const allServices = response.data.flatMap((item) => item.services);
          setEServices(allServices);
          // Extract business hours, creatorId, and contact info from first item
          if (response.data[0]) {
            const firstItem = response.data[0];
            setBusinessHours(firstItem.businessHoursRecords || null);
            setCreatorId(firstItem.creatorId || null);
            setApiContactInfo({
              email: firstItem.email,
              phoneNumber: firstItem.phoneNumber,
              localGovernment: firstItem.localGovernment,
              state: firstItem.state,
              country: firstItem.country,
              ecosystemName: firstItem.businessHoursRecords?.[0]?.ecosystemName,
            });
          }
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching services:", error);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    if (isOpen) fetchServices();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [isOpen, subdomain]);

  // Fetch team members when services are selected
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchTeamMembers = async () => {
      const firstService = selectedServices[0];
      if (!firstService?._id || !subdomain) return;
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/team-member-by-service?ecosystemDomain=${subdomain}&serviceId=${firstService._id}`,
          { signal: controller.signal },
        );
        if (isMounted) {
          const members = response.data.teamMembers.flatMap((item) => item);
          setTeamMembers(members);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching team members:", error);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchTeamMembers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [selectedServices, subdomain]);

  // Fetch bank details
  useEffect(() => {
    const fetchBankDetails = async () => {
      if (!subdomain) return;
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/bank-details/${subdomain}`,
        );
        setAllBankDetails(response.data);
        const [firstAccount] = response.data?.accountDetails || [];
        setMerchantDetails({
          accountNumber: firstAccount?.accountNumber || "N/A",
          accountName: firstAccount?.accountName || "N/A",
          bankName: firstAccount?.bankName || "N/A",
          whatsappNumber: firstAccount?.whatsappNumber || "N/A",
        });
      } catch (error) {
        console.error("Could not get bank details:", error);
      }
    };
    if (isOpen) fetchBankDetails();
  }, [isOpen, subdomain]);

  // Helper: generate 30-min slots from business hours for a given date
  const generateSlotsFromBusinessHours = useCallback((date) => {
    const weekRecord = businessHours?.[0]?.week;
    if (!weekRecord) return timeSlots; // fallback to all slots if no business hours

    const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const dayName = dayNames[date.getDay()];
    const dayConfig = weekRecord.find((d) => d.day === dayName);

    if (!dayConfig || !dayConfig.enabled || !dayConfig.slots?.length) {
      return []; // day is closed
    }

    const allowedRanges = dayConfig.slots.map((slot) => {
      const [startH, startM] = slot.start.split(":").map(Number);
      const [endH, endM] = slot.end.split(":").map(Number);
      return { start: startH * 60 + startM, end: endH * 60 + endM };
    });

    const generatedSlots = [];
    allowedRanges.forEach(({ start, end }) => {
      for (let mins = start; mins < end; mins += 30) {
        const h24 = Math.floor(mins / 60);
        const m = mins % 60;
        const modifier = h24 >= 12 ? "PM" : "AM";
        const h12 = h24 === 0 ? 12 : h24 > 12 ? h24 - 12 : h24;
        const timeStr = `${String(h12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${modifier}`;
        generatedSlots.push({ time: timeStr, booked: false });
      }
    });

    return generatedSlots;
  }, [businessHours]);

  // Generate slots from business hours, then overlay booked times from API
  useEffect(() => {
    if (step !== 3 || !selectedDate) {
      setAvailableTimeSlots(timeSlots);
      return;
    }

    // Step 1: Generate base slots from business hours
    const baseSlots = generateSlotsFromBusinessHours(selectedDate);
    if (baseSlots.length === 0) {
      setAvailableTimeSlots([]);
      return;
    }

    // Step 2: If we have a specialist and service, fetch booked times from API
    const specialist = selectedTeamMember;
    const firstService = selectedServices[0];
    if (!specialist?.creatorId || !firstService?._id || !subdomain) {
      setAvailableTimeSlots(baseSlots);
      return;
    }

    // Dedup check
    const paramsKey = JSON.stringify({
      creatorId: specialist.creatorId,
      date: selectedDate.toISOString(),
      serviceId: firstService._id,
    });
    if (lastFetchedParams.current === paramsKey) return;
    if (fetchLoadingRef.current) return;

    fetchLoadingRef.current = true;

    const fetchBookedTimes = async () => {
      try {
        setLoading(true);
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
        const day = String(selectedDate.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-available-time/${specialist.creatorId}/${formattedDate}/${firstService._id}/${subdomain}`,
        );

        const { bookedTimes = [], duration: serviceDuration } = response.data;
        if (serviceDuration) setDuration(serviceDuration);
        if (response.data.planType) setPlanType(response.data.planType);

        const effectiveDuration = serviceDuration || duration || 30;

        // Build set of blocked minute values from booked times
        const bookedSlots = new Set();
        bookedTimes.forEach((bookedTime) => {
          const startMinutes = timeToMinutes(bookedTime);
          const slotInterval = 30;
          const slotsToBlock = Math.ceil(effectiveDuration / slotInterval);
          for (let i = 0; i < slotsToBlock; i++) {
            bookedSlots.add(startMinutes + i * slotInterval);
          }
        });

        // Mark booked slots within business-hours-generated slots
        const updatedSlots = baseSlots.map((slot) => ({
          ...slot,
          booked: bookedSlots.has(timeToMinutes(slot.time)),
        }));
        setAvailableTimeSlots(updatedSlots);
        lastFetchedParams.current = paramsKey;
      } catch (error) {
        console.error("Error fetching availability:", error);
        // On error, still show business hours slots without booked info
        setAvailableTimeSlots(baseSlots);
      } finally {
        fetchLoadingRef.current = false;
        setLoading(false);
      }
    };

    fetchBookedTimes();
  }, [selectedDate, selectedTeamMember, selectedServices, subdomain, step, generateSlotsFromBusinessHours]);

  // ==================== PAYMENT LOGIC ====================

  const calculateServiceCharge = useCallback(
    (price, planType, paymentMethod) => {
      switch (planType) {
        case "Lite":
          return paymentMethod === "Online" ? price * 0.024 + 150 : 0;
        case "Plus":
          return paymentMethod === "Online" ? price * 0.021 + 175 : 0;
        case "Pro":
          return paymentMethod === "Online" ? price * 0.018 + 200 : 0;
        case "Extra":
          return paymentMethod === "Online" ? price * 0.015 + 250 : 0;
        default:
          return 0;
      }
    },
    [],
  );

  const handlePayOnline = useCallback(async () => {
    // Validate
    if (!formData.email || !formData.fullName || !formData.phone) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    const firstService = selectedServices[0];
    if (!firstService) {
      showToast("Please select a service", "error");
      return;
    }
    if (!selectedTeamMember?.creatorId) {
      showToast("Please select a specialist", "error");
      return;
    }
    if (!selectedTimeSlot) {
      showToast("Please select a time slot", "error");
      return;
    }

    setPaymentState((prev) => ({ ...prev, paymentLoading: true }));

    const priceToSend = totalPrice;
    const charge = calculateServiceCharge(priceToSend, planType, "Online");
    const totalToPay = priceToSend + charge;
    setServiceCharge(charge);
    setTotalAmount(totalToPay.toLocaleString());

    const paystackConfig = {
      key: import.meta.env.VITE_Paystack_PUBLIC_TEST_KEY,
      email: formData.email,
      amount: Math.round(totalToPay * 100),
      currency: "NGN",
      ref: generateTxRef(),
      metadata: {
        provider: "paystack",
        ecosystemDomain: subdomain,
        email: formData.email,
        name: formData.fullName,
        phone: formData.phone,
        description: formData.details || "Nil",
        service: selectedServices.map((s) => s.name).join(", "),
        date: selectedDate?.toDateString(),
        time: selectedTimeSlot,
        servicePrice: priceToSend,
        serviceCharge: charge,
        creatorId: selectedTeamMember?.creatorId,
        serviceId: firstService._id,
      },
    };

    try {
      const paystack = new PaystackPop();
      await new Promise((resolve, reject) => {
        paystack.newTransaction({
          ...paystackConfig,
          onSuccess: (transaction) => {
            resolve(transaction);
          },
          onCancel: () => {
            showToast("Payment cancelled", "info");
            reject(new Error("Cancelled"));
          },
          onError: (error) => {
            showToast("Payment failed", "error");
            reject(error);
          },
        });
      });

      setPaymentState((prev) => ({ ...prev, paymentLoading: false }));
      setPaymentStatus("Online");
      // Verification step
      setStep(7);

      let attempts = 0;
      const maxAttempts = 6;

      while (attempts < maxAttempts) {
        attempts++;
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/verify-booking-status`,
            {
              creatorId: selectedTeamMember?.creatorId,
              ecosystemDomain: subdomain,
              time: selectedTimeSlot,
              date: selectedDate?.toDateString(),
              email: formData.email,
              serviceId: firstService._id,
            },
          );
          if (
            response.status === 201 &&
            response.data.message === "Booking verified successfully"
          ) {
            setUniqueID(
              response.data.bookingDetails?.bookingId || "N/A",
            );
            setPaymentStatus("paid");
            showToast("Payment Verified Successfully", "success");
            handleNextStep(6);
            return;
          }
        } catch (error) {
          if (
            error.response &&
            error.response.status === 404
          ) {
            if (attempts >= maxAttempts) {
              showToast("Verification timed out", "error");
              setStep(5);
              return;
            }
            await delay(15000);
          } else {
            showToast("Error verifying payment", "error");
            setStep(5);
            return;
          }
        }
      }
    } catch (error) {
      setPaymentState((prev) => ({ ...prev, paymentLoading: false }));
      if (error.message !== "Cancelled") {
        showToast("Payment failed", "error");
      }
    }
  }, [
    formData,
    selectedServices,
    selectedTeamMember,
    selectedTimeSlot,
    selectedDate,
    subdomain,
    planType,
    totalPrice,
    calculateServiceCharge,
  ]);

  const handlePayToMerchant = useCallback(async () => {
    if (!formData.email || !formData.fullName || !formData.phone) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    const firstService = selectedServices[0];
    if (!firstService) {
      showToast("Please select a service", "error");
      return;
    }
    if (!selectedTeamMember?.creatorId) {
      showToast("Please select a specialist", "error");
      return;
    }
    if (!selectedTimeSlot) {
      showToast("Please select a time slot", "error");
      return;
    }

    setPaymentState((prev) => ({ ...prev, paymentLoading: true }));

    const priceToSend = totalPrice;
    const charge = calculateServiceCharge(priceToSend, planType, "Bank Transfer");
    setServiceCharge(charge);
    setTotalAmount(priceToSend.toLocaleString());
    setPaymentStatus("Pay directly to merchant");

    try {
      const response = await api.submitBooking({
        ecosystemDomain: subdomain,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: businessInfo?.contact?.address || "N/A",
        description: formData.details || "Nil",
        location: "Shop",
        service: selectedServices.map((s) => s.name).join(", "),
        date: selectedDate ? selectedDate.toDateString() : "Not selected",
        time: selectedTimeSlot,
        bookingType: "Shop",
        servicePrice: priceToSend,
        serviceCharge: charge,
        creatorId: selectedTeamMember?.creatorId,
        serviceId: firstService._id,
        currency: "NGN",
        provider: "cash",
      });

      setPaymentState((prev) => ({ ...prev, paymentLoading: false }));
      showToast("Booking submitted successfully. Please complete payment to the merchant.", "success");
      setUniqueID(response.data.booking?.bookingId || "N/A");
      setPaymentStatus("Pay directly to merchant");
      handleNextStep(6);
    } catch (error) {
      setPaymentState((prev) => ({ ...prev, paymentLoading: false }));
      console.error("Bank transfer booking error:", error);
      showToast(
        error.response?.data?.message || "Failed to submit booking. Please try again.",
        "error",
      );
    }
  }, [
    formData,
    selectedServices,
    selectedTeamMember,
    selectedTimeSlot,
    selectedDate,
    subdomain,
    planType,
    totalPrice,
    calculateServiceCharge,
    businessInfo,
  ]);

  // ==================== HANDLERS ====================

  const resetModal = useCallback(() => {
    setStep(1);
    setSelectedServices([]);
    setSelectedTeamMember(null);
    setSelectedTimeSlot(null);
    setSelectedDate(normalizeDate(new Date()));
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      details: "",
    });
    setPaymentMethod(null);
    setPaymentStep("selection");
    setShowCancelDialog(false);
    setPaymentState({
      paymentLoading: false,
      stripeModalOpen: false,
      clientSecret: "",
    });
    setTotalAmount(null);
    setServiceCharge(0);
    setPaymentStatus("");
    setUniqueID("");
  }, [normalizeDate]);

  const onCloseModal = useCallback(async () => {
    if (paymentState.paymentLoading) {
      showToast("Payment is processing. Please wait.", "info");
      return;
    }
    resetModal();
    handleClose();
  }, [resetModal, handleClose, paymentState.paymentLoading]);

  const handleCancelClick = () => {
    setShowCancelDialog(true);
  };

  const handleConfirmCancel = () => {
    onCloseModal();
  };

  const handleCloseCancel = () => {
    setShowCancelDialog(false);
  };

  const handleServiceChange = useCallback((service) => {
    setSelectedServices((prev) => {
      const isSelected = prev.some((s) => s._id === service._id);
      if (isSelected) {
        return prev.filter((s) => s._id !== service._id);
      }
      return [...prev, service];
    });
  }, []);

  const removeService = useCallback((serviceId) => {
    setSelectedServices((prev) => prev.filter((s) => s._id !== serviceId));
  }, []);

  const handleDateChange = useCallback(
    (date) => {
      setSelectedDate(normalizeDate(date));
      setSelectedTimeSlot(null);
    },
    [normalizeDate],
  );

  const handleTimeSlotSelect = useCallback((slot) => {
    if (!slot.booked) {
      setSelectedTimeSlot(slot.time);
    }
  }, []);

  const handleNextStep = useCallback((nextStep) => {
    if (nextStep <= 7) {
      setStep(nextStep);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const handlePrevStep = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    handleNextStep(5);
  };

  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);
    if (method === "stripe") {
      // Trigger Paystack payment immediately
      setPaymentStep("processing");
    } else if (method === "bank") {
      setPaymentStep("processing");
    }
  };

  const disablePastDates = ({ date, view }) => {
    if (view !== "month") return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;

    // Disable days not enabled in business hours
    const weekRecord = businessHours?.[0]?.week;
    if (weekRecord) {
      const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
      const dayConfig = weekRecord.find((d) => d.day === dayNames[date.getDay()]);
      if (!dayConfig || !dayConfig.enabled) return true;
    }
    return false;
  };

  // Progress steps configuration
  const progressSteps = [
    { number: 1, label: "Services", icon: FaUser },
    { number: 2, label: "Team", icon: FaUser },
    { number: 3, label: "Date & Time", icon: FaCalendarAlt },
    { number: 4, label: "Details", icon: FaUser },
    { number: 5, label: "Payment", icon: FaCreditCard },
    { number: 6, label: "Confirm", icon: FaCheckCircle },
  ];

  // Sub-components
  const PoweredByLogo = () => (
    <div className="flex items-center justify-center space-x-2 text-gray-400 mt-8 pt-6 border-t border-gray-200">
      <span className="text-xs">Powered by</span>
      <Link to="/" className="flex items-center space-x-3">
        <img src={DimpifiedLogo} alt="Dimpified" className="h-5 w-auto" />
      </Link>
    </div>
  );

  const ServiceSummary = () => {
    if (selectedServices.length === 0) {
      return null;
    }

    return (
      <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
        {/* Services */}
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          Booking Summary
        </h3>
        {selectedServices.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-purple-800 flex items-center gap-2">
                <FaCheckCircle className="text-purple-600" />
                Selected Services ({selectedServices.length})
              </h3>
              <span className="text-lg font-bold text-purple-600">
                {formatCurrency(totalPrice)}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              {selectedServices.map((service) => (
                <div
                  key={service._id}
                  className="flex justify-between items-center text-sm group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">{service.name}</span>
                    <span className="text-xs text-gray-500">
                      ({service.duration})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-purple-600">
                      {formatCurrency(service.price)}
                    </span>
                    {step === 1 && (
                      <button
                        onClick={() => removeService(service._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label={`Remove ${service.name}`}
                      >
                        <FaTrash size={12} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  const TeamSummary = () => {
    if (
      selectedServices.length === 0 &&
      !selectedTeamMember &&
      !selectedDate &&
      !selectedTimeSlot
    ) {
      return null;
    }

    return (
      <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          Booking Summary
        </h3>
        {/* Services */}
        {selectedServices.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-purple-800 flex items-center gap-2">
                <FaCheckCircle className="text-purple-600" />
                Selected Services ({selectedServices.length})
              </h3>
              <span className="text-lg font-bold text-purple-600">
                {formatCurrency(totalPrice)}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              {selectedServices.map((service) => (
                <div
                  key={service._id}
                  className="flex justify-between items-center text-sm group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">{service.name}</span>
                    <span className="text-xs text-gray-500">
                      ({service.duration})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-purple-600">
                      {formatCurrency(service.price)}
                    </span>
                    {step === 1 && (
                      <button
                        onClick={() => removeService(service._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label={`Remove ${service.name}`}
                      >
                        <FaTrash size={12} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Team Member */}
        {selectedTeamMember && (
          <>
            <div className="border-t border-purple-200 my-3"></div>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-purple-800 flex items-center gap-2">
                <FaCheckCircle className="text-purple-600" />
                Selected Specialist
              </h3>
              <span className="text-gray-900 font-medium">
                {selectedTeamMember.fullName}
              </span>
            </div>
          </>
        )}
      </div>
    );
  };

  const DateTimeSummary = () => {
    if (
      selectedServices.length === 0 &&
      !selectedTeamMember &&
      !selectedDate &&
      !selectedTimeSlot
    ) {
      return null;
    }

    return (
      <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          Booking Summary
        </h3>
        {/* Services */}
        {selectedServices.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-purple-800 flex items-center gap-2">
                <FaCheckCircle className="text-purple-600" />
                Selected Services ({selectedServices.length})
              </h3>
              <span className="text-lg font-bold text-purple-600">
                {formatCurrency(totalPrice)}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              {selectedServices.map((service) => (
                <div
                  key={service._id}
                  className="flex justify-between items-center text-sm group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">{service.name}</span>
                    <span className="text-xs text-gray-500">
                      ({service.duration})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-purple-600">
                      {formatCurrency(service.price)}
                    </span>
                    {step === 1 && (
                      <button
                        onClick={() => removeService(service._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label={`Remove ${service.name}`}
                      >
                        <FaTrash size={12} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Team Member */}
        {selectedTeamMember && (
          <>
            <div className="border-t border-purple-200 my-3"></div>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-purple-800 flex items-center gap-2">
                <FaCheckCircle className="text-purple-600" />
                Selected Specialist
              </h3>
              <span className="text-gray-900 font-medium">
                {selectedTeamMember.fullName}
              </span>
            </div>
          </>
        )}

        {/* Date & Time */}
        {(selectedDate || selectedTimeSlot) && (
          <>
            <div className="border-t border-purple-200 my-3"></div>
            <h3 className="font-semibold text-purple-800 flex items-center gap-2 mb-2">
              <FaCheckCircle className="text-purple-600" />
              Selected Date & Time
            </h3>
            <div className="space-y-2 text-sm">
              {selectedDate && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Date:</span>
                  <span className="font-medium">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
              {selectedTimeSlot && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Time:</span>
                  <span className="font-medium">{selectedTimeSlot}</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  };

  const FullBookingReview = () => (
    <div className="bg-white rounded-xl border-2 border-purple-200 p-6 mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <FaCheckCircle className="text-purple-600" />
        Review Your Booking
      </h3>

      {/* Services */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">Services</h4>
        {selectedServices.map((service) => (
          <div key={service._id} className="flex justify-between text-sm py-1">
            <span>{service.name}</span>
            <span className="font-medium text-purple-600">
              {formatCurrency(service.price)}
            </span>
          </div>
        ))}
      </div>

      {/* Team Member */}
      {selectedTeamMember && (
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-2">Specialist</h4>
          <p className="text-sm">{selectedTeamMember.fullName}</p>
        </div>
      )}

      {/* Date & Time */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">Date & Time</h4>
        <p className="text-sm">
          {selectedDate?.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}{" "}
          at {selectedTimeSlot}
        </p>
      </div>

      {/* Customer Details */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">Your Details</h4>
        <p className="text-sm">{formData.fullName}</p>
        <p className="text-sm">{formData.email}</p>
        <p className="text-sm">{formData.phone}</p>
        {formData.details && (
          <>
            <p className="text-sm font-medium mt-2">Notes:</p>
            <p className="text-sm text-gray-600">{formData.details}</p>
          </>
        )}
      </div>

      {/* Total */}
      <div className="border-t-2 border-purple-200 pt-4 mt-4">
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-900">Total Amount:</span>
          <span className="text-2xl font-bold text-purple-600">
            {formatCurrency(totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={() => setShowCancelDialog(true)}
      className="relative z-50"
    >
      <DialogBackdrop
        className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      />
      <div className="fixed inset-0">
        <DialogPanel className="h-full w-full bg-white overflow-hidden">
          {/* Cancel Confirmation Dialog */}
          {showCancelDialog && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-50">
              <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Cancel Booking
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to cancel and go back home?
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={handleCloseCancel}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    No
                  </button>
                  <button
                    onClick={handleConfirmCancel}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Yes, Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Payment Loading Overlay */}
          {paymentState.paymentLoading && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-[60]">
              <div className="bg-white p-6 rounded-lg flex items-center gap-3 shadow-lg">
                <svg
                  className="animate-spin h-8 w-8 text-purple-600"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <p>Processing payment, please wait...</p>
              </div>
            </div>
          )}

          {/* Mobile Header */}
          <div className="lg:hidden border-b border-gray-200 bg-white">
            <div className="flex justify-between items-center px-4 py-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {getInitials(businessInfo.name)}
                  </span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">
                    {businessInfo.name}
                  </h1>
                </div>
              </div>
              <button
                onClick={handleCancelClick}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row h-full lg:h-[calc(100vh-80px)]">
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
                {/* X Button for Desktop */}
                <div className="hidden lg:flex justify-end mb-4">
                  <button
                    onClick={handleCancelClick}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-700 transition-colors"
                    aria-label="Close"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                {/* Progress Bar - Mobile */}
                <div className="lg:hidden mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Step {Math.min(step, progressSteps.length)} of {progressSteps.length}
                    </span>
                    <span className="text-sm text-gray-500">
                      {Math.min(step, progressSteps.length)}/{progressSteps.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${(Math.min(step, progressSteps.length) / progressSteps.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Progress Bar - Desktop */}
                <div className="hidden lg:block mb-8">
                  <div className="flex items-center justify-between relative max-w-3xl mx-auto">
                    {progressSteps.map((stepItem, index) => {
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
                              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 -z-10" />
                              <div
                                className="absolute top-1/2 left-0 h-0.5 bg-purple-600 -translate-y-1/2 -z-10 transition-all duration-500"
                                style={{ width: isActive ? "100%" : "0%" }}
                              />
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>

                {/* Step 1: Service Selection */}
                {step === 1 && (
                  <div className="animate-fade-in">
                    <div className="text-start mb-8 lg:mb-12">
                      <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
                        Select Services
                      </h2>
                      <p className="text-base lg:text-xl text-gray-600 mb-6">
                        Kindly select more services or proceed with the selected
                        one
                      </p>
                      {selectedServices.length > 0 && (
                        <div className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                          {selectedServices.length} service
                          {selectedServices.length > 1 ? "s" : ""} selected
                        </div>
                      )}
                    </div>

                    {loading ? (
                      <div className="flex justify-center items-center h-48 lg:h-64">
                        <div className="animate-spin rounded-full h-8 w-8 lg:h-12 lg:w-12 border-b-2 border-purple-600" />
                      </div>
                    ) : (
                      <>
                        <div className="grid sm:grid-cols-2 gap-6 max-w-6xl mb-6 mx-auto">
                          {eServices.map((service) => {
                            const isSelected = selectedServices.some(
                              (s) => s._id === service._id,
                            );
                            return (
                              <div
                                key={service._id}
                                className={`group cursor-pointer bg-white border rounded-xl hover:border-purple-600 p-4 flex gap-4 items-center hover:-translate-y-1 transition-all duration-300 ${
                                  isSelected
                                    ? "border-purple-600 bg-purple-50/50"
                                    : "border-gray-200"
                                }`}
                                onClick={() => handleServiceChange(service)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handleServiceChange(service);
                                  }
                                }}
                              >
                                <div className="relative overflow-hidden rounded-lg">
                                  {service.image || service.serviceImage ? (
                                    <img
                                      src={service.image || service.serviceImage}
                                      alt={service.name}
                                      className="w-20 h-20 object-cover transition group-hover:scale-110"
                                      onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.style.display = "none";
                                        const parent =
                                          e.currentTarget.parentElement;
                                        if (parent) {
                                          const fallback =
                                            document.createElement("div");
                                          fallback.className =
                                            "w-20 h-20 bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-lg";
                                          fallback.textContent = getInitials(
                                            service.name,
                                          );
                                          parent.appendChild(fallback);
                                        }
                                      }}
                                    />
                                  ) : (
                                    <div className="w-20 h-20 bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-lg">
                                      {getInitials(service.name)}
                                    </div>
                                  )}
                                </div>

                                <div className="flex-1">
                                  <div className="flex items-start justify-between">
                                    <h3 className="font-semibold text-gray-800 group-hover:text-purple-600">
                                      {service.name}
                                    </h3>
                                    {isSelected ? (
                                      <FaCheckCircle className="text-purple-500 text-sm flex-shrink-0 ml-1" />
                                    ) : (
                                      <FaPlus className="text-gray-400 group-hover:text-purple-500 text-sm flex-shrink-0 ml-1 transition-colors" />
                                    )}
                                  </div>

                                  <p className="text-sm text-gray-500 mt-0.5">
                                    {service.shortDescription}
                                  </p>

                                  <div className="flex justify-between items-center mt-2">
                                    <span className="text-purple-600 font-semibold">
                                      {formatCurrency(service.price)}
                                    </span>
                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                      {service.duration}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <ServiceSummary />
                      </>
                    )}

                    <div className="text-start mt-8 lg:mt-12">
                      <button
                        onClick={() => handleNextStep(2)}
                        disabled={selectedServices.length === 0}
                        className={`px-6 lg:px-12 py-3 lg:py-4 rounded-lg lg:rounded-full font-semibold text-base lg:text-lg transition-all duration-300 ${
                          selectedServices.length > 0
                            ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Continue to Specialist
                      </button>
                    </div>

                    <PoweredByLogo />
                  </div>
                )}

                {/* Step 2: Team Selection */}
                {step === 2 && (
                  <div className="animate-fade-in">
                    <div className="text-start mb-8 lg:mb-12">
                      <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
                        Choose Your Specialist
                      </h2>
                      <p className="text-base lg:text-xl text-gray-600">
                        Select a team member for your service
                      </p>
                    </div>

                    {loading ? (
                      <div className="flex justify-center items-center h-48 lg:h-64">
                        <div className="animate-spin rounded-full h-8 w-8 lg:h-12 lg:w-12 border-b-2 border-purple-600" />
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-6 max-w-6xl mb-6 mx-auto">
                        {teamMembers.map((member) => (
                          <div
                            key={member.creatorId}
                            className={`group cursor-pointer bg-white border rounded-xl hover:border-purple-600 p-4 flex gap-4 items-center hover:-translate-y-1 transition-all duration-300 ${
                              selectedTeamMember?.creatorId === member.creatorId
                                ? "border-purple-600 bg-purple-50/50"
                                : "border-gray-200"
                            }`}
                            onClick={() => setSelectedTeamMember(member)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setSelectedTeamMember(member);
                              }
                            }}
                          >
                            <div className="relative overflow-hidden rounded-lg">
                              {member.profilePicture ? (
                                <img
                                  src={member.profilePicture}
                                  alt={member.fullName}
                                  className="w-20 h-20 object-cover transition group-hover:scale-110"
                                  onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.style.display = "none";
                                    const parent = e.currentTarget.parentElement;
                                    if (parent) {
                                      const fallback =
                                        document.createElement("div");
                                      fallback.className =
                                        "w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-purple-700 font-semibold text-lg";
                                      fallback.textContent = getInitials(
                                        member.fullName,
                                      );
                                      parent.appendChild(fallback);
                                    }
                                  }}
                                />
                              ) : (
                                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-purple-700 font-semibold text-lg">
                                  {getInitials(member.fullName)}
                                </div>
                              )}

                              {selectedTeamMember?.creatorId === member.creatorId && (
                                <div className="absolute top-1 right-1">
                                  <FaCheckCircle className="text-purple-500 text-sm bg-white rounded-full" />
                                </div>
                              )}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <h3 className="font-semibold text-gray-800 group-hover:text-purple-600">
                                  {member.fullName}
                                </h3>
                              </div>

                              <p className="text-sm text-purple-600 mt-0.5">
                                {member.specialisation}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <TeamSummary />
                    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 lg:mt-12">
                      <button
                        onClick={handlePrevStep}
                        className="px-6 lg:px-8 py-3 border border-gray-300 text-gray-700 rounded-lg lg:rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 order-2 sm:order-1"
                      >
                        ← Back to Services
                      </button>
                      <button
                        onClick={() => handleNextStep(3)}
                        disabled={!selectedTeamMember}
                        className={`px-6 lg:px-8 py-3 rounded-lg lg:rounded-full font-semibold transition-all duration-300 order-1 sm:order-2 ${
                          selectedTeamMember
                            ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Continue to Date & Time →
                      </button>
                    </div>

                    <PoweredByLogo />
                  </div>
                )}

                {/* Step 3: Date and Time Selection */}
                {step === 3 && (
                  <div className="animate-fade-in">
                    <div className="text-start mb-8 lg:mb-12">
                      <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
                        Select Date & Time
                      </h2>
                      <p className="text-base lg:text-xl text-gray-600">
                        Choose when you'd like to visit us
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 max-w-6xl mb-6 mx-auto">
                      {/* Calendar Section */}
                      <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-200 hover:shadow-lg transition-shadow">
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

                      {/* Time Slots Section */}
                      <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <FaClock className="text-purple-500 mr-2" />
                          Available Times
                        </h3>

                        {loading ? (
                          <div className="flex justify-center items-center h-32 lg:h-48">
                            <div className="animate-spin rounded-full h-6 lg:h-8 w-6 lg:w-8 border-b-2 border-purple-600" />
                          </div>
                        ) : (
                          <>
                            <p className="text-gray-600 mb-4 text-sm lg:text-base font-medium">
                              {selectedDate?.toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 lg:gap-3">
                              {availableTimeSlots.map((slot) => (
                                <button
                                  key={slot.time}
                                  onClick={() => handleTimeSlotSelect(slot)}
                                  disabled={slot.booked}
                                  className={`p-3 lg:p-4 rounded-lg lg:rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                                    selectedTimeSlot === slot.time
                                      ? "bg-purple-600 text-white border-purple-600 shadow-lg transform scale-[1.02]"
                                      : slot.booked
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                                        : "bg-white text-gray-700 border-gray-300 hover:border-purple-400 hover:shadow-md hover:scale-[1.02]"
                                  }`}
                                >
                                  {slot.time}
                                  {slot.booked && (
                                    <div className="text-xs mt-1 opacity-75">
                                      Booked
                                    </div>
                                  )}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <DateTimeSummary />
                    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 lg:mt-12">
                      <button
                        onClick={handlePrevStep}
                        className="px-6 lg:px-8 py-3 border border-gray-300 text-gray-700 rounded-lg lg:rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 order-2 sm:order-1"
                      >
                        ← Back to Team
                      </button>
                      <button
                        onClick={() => handleNextStep(4)}
                        disabled={!selectedTimeSlot}
                        className={`px-6 lg:px-8 py-3 rounded-lg lg:rounded-full font-semibold transition-all duration-300 order-1 sm:order-2 ${
                          selectedTimeSlot
                            ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Continue to Details →
                      </button>
                    </div>

                    <PoweredByLogo />
                  </div>
                )}

                {/* Step 4: Enter Details */}
                {step === 4 && (
                  <div className="animate-fade-in max-w-2xl mx-auto">
                    <div className="text-start mb-8 lg:mb-12">
                      <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
                        Your Information
                      </h2>
                      <p className="text-base lg:text-xl text-gray-600">
                        Please provide your details to confirm your booking
                      </p>
                    </div>

                    <form onSubmit={handleSubmitBooking} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                        <div>
                          <label
                            htmlFor="fullName"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Full Name *
                          </label>
                          <input
                            id="fullName"
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
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Phone Number *
                          </label>
                          <input
                            id="phone"
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
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Email Address *
                        </label>
                        <input
                          id="email"
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
                        <label
                          htmlFor="details"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Additional Notes (Optional)
                        </label>
                        <textarea
                          id="details"
                          name="details"
                          value={formData.details}
                          onChange={handleFormChange}
                          rows={4}
                          className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                          placeholder="Any special requirements or notes for our team..."
                        />
                      </div>

                      {/* Full Review before Payment */}
                      <FullBookingReview />

                      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="px-6 lg:px-8 py-3 border border-gray-300 text-gray-700 rounded-lg lg:rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 order-2 sm:order-1"
                        >
                          ← Back to Time
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-6 lg:px-12 py-3 lg:py-4 bg-purple-600 text-white rounded-lg lg:rounded-full font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 order-1 sm:order-2 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                              Processing...
                            </>
                          ) : (
                            "Continue to Payment →"
                          )}
                        </button>
                      </div>
                    </form>

                    <PoweredByLogo />
                  </div>
                )}

                {/* Step 5: Payment Method Selection */}
                {step === 5 && (
                  <div className="animate-fade-in max-w-2xl mx-auto">
                    <div className="text-start mb-8 lg:mb-12">
                      <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
                        Choose Payment Method
                      </h2>
                      <p className="text-base lg:text-xl text-gray-600">
                        Select how you'd like to pay for your booking
                      </p>
                    </div>

                    {/* Payment options — currently only bank transfer is active */}
                    {paymentStep === "selection" && (
                      <div className="space-y-4 mb-8">
                        {/* Pay Online Option — commented out for now
                        <div
                          onClick={handlePayOnline}
                          className={`group bg-white rounded-xl lg:rounded-2xl p-6 border-2 cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
                            paymentMethod === "stripe"
                              ? "border-purple-500 shadow-lg ring-2 ring-purple-200"
                              : "border-gray-200 hover:border-purple-300"
                          }`}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handlePayOnline();
                            }
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                                <FaCreditCard className="text-white text-xl" />
                              </div>
                              <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                  Pay online
                                </h3>
                                <p className="text-gray-500 text-sm">
                                  Secure payment gateways
                                </p>
                              </div>
                            </div>
                            {paymentMethod === "stripe" && (
                              <FaCheckCircle className="text-purple-500 text-2xl" />
                            )}
                          </div>
                        </div>
                        */}

                        {/* Bank Transfer Option */}
                        <div
                          onClick={() => handlePaymentSelection("bank")}
                          className={`group bg-white rounded-xl lg:rounded-2xl p-6 border-2 cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
                            paymentMethod === "bank"
                              ? "border-purple-500 shadow-lg ring-2 ring-purple-200"
                              : "border-gray-200 hover:border-purple-300"
                          }`}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handlePaymentSelection("bank");
                            }
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                                <FaUniversity className="text-white text-xl" />
                              </div>
                              <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                  Transfer directly to merchant
                                </h3>
                                <p className="text-gray-500 text-sm">
                                  Pay directly to our bank account
                                </p>
                              </div>
                            </div>
                            {paymentMethod === "bank" && (
                              <FaCheckCircle className="text-purple-500 text-2xl" />
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentStep === "processing" &&
                      paymentMethod === "bank" && (
                        <div className="bg-white rounded-xl lg:rounded-2xl p-8 border-2 border-purple-200 mb-8 animate-fade-in">
                          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaUniversity className="text-purple-600 text-3xl" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Bank Transfer
                          </h3>

                          <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-200">
                            <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                              <FaUniversity className="text-blue-600" />
                              Bank Transfer Details
                            </h4>
                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                                <span className="text-blue-700 font-medium">
                                  Account Name:
                                </span>
                                <span className="text-blue-900 font-semibold">
                                  {merchantDetails.accountName}
                                </span>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                                <span className="text-blue-700 font-medium">
                                  Bank Name:
                                </span>
                                <span className="text-blue-900 font-semibold">
                                  {merchantDetails.bankName}
                                </span>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                                <span className="text-blue-700 font-medium">
                                  Account Number:
                                </span>
                                <span className="text-blue-900 font-semibold">
                                  {merchantDetails.accountNumber}
                                </span>
                              </div>
                            </div>

                            <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                              <p className="text-blue-700 text-sm">
                                Amount to pay:{" "}
                                <span className="font-bold text-purple-600">
                                  {formatCurrency(totalPrice)}
                                </span>
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-4">
                            <button
                              onClick={() => {
                                setPaymentStep("selection");
                                setPaymentMethod(null);
                              }}
                              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
                            >
                              Back
                            </button>
                            <button
                              onClick={handlePayToMerchant}
                              disabled={paymentState.paymentLoading}
                              className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {paymentState.paymentLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                                  Hold on...
                                </div>
                              ) : (
                                "I've Made the Transfer"
                              )}
                            </button>
                          </div>

                          <button
                            onClick={() => {
                              const servicesList = selectedServices
                                .map(
                                  (s) =>
                                    `- ${s.name} (${formatCurrency(s.price)}) - ${s.duration}`,
                                )
                                .join("\n");

                              const message = `*New Booking Alert!*
Hello *${businessInfo.name}*, I have made a bank transfer for my booking.

*Services:*
${servicesList}

*Total Amount:* ${formatCurrency(totalPrice)}

*Specialist:* ${selectedTeamMember?.fullName || "Not selected"}

*Date & Time:*
${selectedDate?.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
})}
${selectedTimeSlot || "Not selected"}

*Customer Details:*
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}

*Attached is a screenshot of my payment receipt for confirmation.*

Thank you!`;

                              const whatsappUrl = `https://wa.me/${
                                merchantDetails.whatsappNumber !== "N/A"
                                  ? merchantDetails.whatsappNumber.replace(/\D/g, "")
                                  : businessInfo.contact.phone.replace(/\D/g, "")
                              }?text=${encodeURIComponent(message)}`;
                              window.open(whatsappUrl, "_blank");
                            }}
                            className="w-full mt-4 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                          >
                            <FaWhatsapp className="text-white" />
                            Send Payment Proof via WhatsApp
                          </button>
                        </div>
                      )}

                    {paymentStep === "selection" && (
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <button
                          onClick={handlePrevStep}
                          className="px-6 lg:px-8 py-3 border border-gray-300 text-gray-700 rounded-lg lg:rounded-full font-semibold hover:bg-gray-50 transition-all duration-300"
                        >
                          ← Back to Details
                        </button>
                      </div>
                    )}

                    <PoweredByLogo />
                  </div>
                )}

                {/* Step 6: Confirmation */}
                {step === 6 && (
                  <div className="animate-fade-in text-center max-w-2xl mx-auto">
                    <div className="w-16 h-16 lg:w-24 lg:h-24 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 lg:mb-8 animate-bounce">
                      <FaCheckCircle className="text-white text-2xl lg:text-4xl" />
                    </div>

                    <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">
                      You're All Set!
                    </h2>

                    <p className="text-base lg:text-xl text-gray-600 mb-6 lg:mb-8">
                      Your booking has been submitted. We've sent an email with
                      all the details.
                    </p>

                    {/* Final Confirmation Summary */}
                    <div className="bg-white rounded-xl border-2 border-purple-200 p-6 mb-6 text-left">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Booking Summary
                      </h3>

                      {/* Booking ID */}
                      {uniqueID && (
                        <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <p className="text-xs text-purple-600 font-medium uppercase tracking-wider mb-1">
                            Booking Reference
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-mono font-bold text-purple-700 tracking-wider">
                              {uniqueID}
                            </span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(uniqueID);
                                showToast(
                                  "Booking ID copied to clipboard!",
                                  "success",
                                );
                              }}
                              className="text-xs bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 transition-colors"
                              aria-label="Copy booking ID"
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Services:</p>
                          {selectedServices.map((service) => (
                            <div
                              key={service._id}
                              className="flex justify-between text-sm"
                            >
                              <span>{service.name}</span>
                              <span className="font-medium">
                                {formatCurrency(service.price)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="border-t pt-2">
                          <p className="text-sm text-gray-500">Specialist:</p>
                          <p className="font-medium">
                            {selectedTeamMember?.fullName}
                          </p>
                        </div>

                        <div className="border-t pt-2">
                          <p className="text-sm text-gray-500">Date & Time:</p>
                          <p className="font-medium">
                            {selectedDate?.toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                            })}{" "}
                            at {selectedTimeSlot}
                          </p>
                        </div>

                        <div className="border-t pt-2">
                          <p className="text-sm text-gray-500">
                            Payment Method:
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {paymentStatus === "paid" || paymentStatus === "Online" ? (
                              <>
                                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                  <FaCreditCard className="text-white text-xs" />
                                </div>
                                <span className="font-medium text-gray-900">
                                  Online Payment {paymentStatus === "paid" ? "(Verified)" : "(Processing)"}
                                </span>
                              </>
                            ) : paymentStatus === "Pay directly to merchant" ? (
                              <>
                                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                                  <FaUniversity className="text-white text-xs" />
                                </div>
                                <span className="font-medium text-gray-900">
                                  Bank Transfer to Merchant
                                </span>
                              </>
                            ) : (
                              <span className="text-gray-400">
                                Not selected
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="border-t pt-2">
                          <p className="text-sm text-gray-500">Customer:</p>
                          <p className="font-medium">{formData.fullName}</p>
                          <p className="text-sm">{formData.email}</p>
                          <p className="text-sm">{formData.phone}</p>
                        </div>

                        {formData.details && (
                          <div className="border-t pt-2">
                            <p className="text-sm text-gray-500">
                              Additional Notes:
                            </p>
                            <p className="text-sm text-gray-700 italic">
                              "{formData.details}"
                            </p>
                          </div>
                        )}

                        <div className="border-t pt-3 mt-2">
                          <div className="flex justify-between items-center">
                            <span className="font-bold">Total:</span>
                            <span className="text-xl font-bold text-purple-600">
                              {formatCurrency(totalPrice)}
                            </span>
                          </div>
                          {serviceCharge > 0 && (
                            <div className="flex justify-between items-center text-sm text-gray-500 mt-1">
                              <span>Service charge:</span>
                              <span>{formatCurrency(serviceCharge)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-xl lg:rounded-2xl p-4 mb-6 lg:mb-8 border border-purple-200">
                      <h5 className="font-semibold text-purple-800 mb-2">
                        What's Next?
                      </h5>
                      <p className="text-purple-700 text-sm">
                        We'll send you a reminder before your appointment.
                      </p>
                    </div>

                    <button
                      onClick={onCloseModal}
                      className="px-6 lg:px-12 py-3 lg:py-4 bg-purple-600 text-white rounded-lg lg:rounded-full font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    >
                      Close
                    </button>

                    <PoweredByLogo />
                  </div>
                )}

                {/* Step 7: Payment Verification Loading */}
                {step === 7 && (
                  <div className="animate-fade-in text-center max-w-2xl mx-auto py-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-8" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Verifying Payment...
                    </h2>
                    <p className="text-gray-600">
                      Please wait while we confirm your payment
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Desktop Only */}
            <div className="hidden lg:block w-96 bg-gray-50 border-l border-gray-200 p-6 lg:p-8 overflow-y-auto">
              <div className="sticky top-8">
                {/* Business Logo and Info */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-2xl">
                      {getInitials(businessInfo.name)}
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
                <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6 hover:shadow-lg transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    Contact Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-3">
                      <FaMapMarkerAlt className="text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">
                        {businessInfo.contact.address}
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
                {(step === 3 || step === 4 || step === 5 || step === 6) &&
                  selectedServices.length > 0 && (
                    <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6 hover:shadow-lg transition-shadow">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <FaCheckCircle className="text-purple-600 text-sm" />
                        </div>
                        Your Booking
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2 text-sm">
                            Services ({selectedServices.length})
                          </h4>
                          <div className="space-y-2">
                            {selectedServices.map((service) => (
                              <div key={service._id} className="text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">
                                    {service.name}
                                  </span>
                                  <span className="font-medium text-purple-600">
                                    {formatCurrency(service.price)}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-900">
                                Total:
                              </span>
                              <span className="text-lg font-bold text-purple-600">
                                {formatCurrency(totalPrice)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {selectedTeamMember && (
                          <div className="pt-3 border-t border-gray-200">
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-xs text-gray-500">
                                  Specialist:
                                </span>
                                <span className="font-medium text-gray-900">
                                  {selectedTeamMember.fullName}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {(selectedDate || selectedTimeSlot) && (
                          <div className="pt-3 border-t border-gray-200">
                            <div className="space-y-2 text-sm">
                              {selectedDate && (
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Date:</span>
                                  <span className="font-medium">
                                    {selectedDate.toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </span>
                                </div>
                              )}
                              {selectedTimeSlot && (
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Time:</span>
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
                    <Link
                      to="/"
                      className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                    >
                      <img
                        src={DimpifiedLogo}
                        alt="Dimpified"
                        className="h-5 w-auto"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>

      <style>{`
        .react-calendar-custom {
          width: 100%;
          border: none;
          font-family: inherit;
        }
        .react-calendar-custom .react-calendar__tile--active {
          background: #8b5cf6;
          color: white;
          border-radius: 8px;
        }
        .react-calendar-custom .react-calendar__tile:enabled:hover,
        .react-calendar-custom .react-calendar__tile:enabled:focus {
          background: #f3e8ff;
          border-radius: 8px;
        }
        .react-calendar-custom .react-calendar__tile--now {
          background: #fef3c7;
          border-radius: 8px;
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
    </Dialog>
  );
};

export default PaidBookingModal;
