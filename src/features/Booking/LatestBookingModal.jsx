import React, { useState, useEffect, useCallback } from "react";
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
  FaMinus,
  FaTrash,
  FaStar,
  FaWhatsapp,
  FaTimes,
} from "react-icons/fa";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { showToast } from "../../component/ShowToast";
import DimpifiedLogo from "../../pages/LandingPages/images/dimp-blue.png";

const LatestBookingModal = ({
  isOpen = false,
  handleClose,
  information,
  subdomain,
  serviceCurrency = "USD",
  userDetails,
}) => {
  // Dummy business information
  const businessInfo = {
    name: "Elite Beauty Studio",
    description:
      "Professional beauty and wellness services delivered by certified experts. We're committed to making you look and feel your absolute best.",
    contact: {
      phone: "+1 (555) 123-4567",
      email: "hello@elitebeauty.com",
      address: "123 Beauty Street, New York, NY 10001",
    },
  };

  // Dummy services data with images
  const dummyServices = [
    {
      _id: "1",
      name: "Haircut & Styling",
      shortDescription: "Professional haircut with blow dry and styling",
      category: "Hair",
      price: 65,
      duration: "1 hour",
      image: "https://images.unsplash.com/photo-1560067174-c5a3a8f37060?w=400",
      rating: 4.8,
    },
    {
      _id: "2",
      name: "Hair Coloring",
      shortDescription: "Full hair color with conditioning treatment",
      category: "Hair",
      price: 120,
      duration: "2 hours",
      image: "https://images.unsplash.com/photo-1605493625523-0ba31a26092e?w=400",
      rating: 4.9,
    },
    {
      _id: "3",
      name: "Spa Facial",
      shortDescription: "Relaxing facial with massage and mask",
      category: "Skincare",
      price: 85,
      duration: "1.5 hours",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400",
      rating: 4.7,
    },
    {
      _id: "4",
      name: "Manicure & Pedicure",
      shortDescription: "Full hand and foot care with polish",
      category: "Nails",
      price: 55,
      duration: "1 hour",
      image: "https://images.unsplash.com/photo-1610992015732-2449b0bb0a86?w=400",
      rating: 4.6,
    },
    {
      _id: "5",
      name: "Makeup Application",
      shortDescription: "Professional makeup for special occasions",
      category: "Makeup",
      price: 75,
      duration: "1 hour",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ff9e?w=400",
      rating: 4.9,
    },
    {
      _id: "6",
      name: "Massage Therapy",
      shortDescription: "60-minute full body relaxation massage",
      category: "Wellness",
      price: 95,
      duration: "1 hour",
      image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400",
      rating: 4.8,
    },
  ];

  // Team members data
  const teamMembers = [
    {
      _id: "1",
      name: "Sarah Johnson",
      role: "Senior Stylist",
      specialty: "Hair & Makeup",
      experience: "8+ years",
      image: "https://images.unsplash.com/photo-1494790108777-466d5a9b3c4e?w=300",
      bio: "Specializes in modern haircuts and creative coloring techniques",
    },
    {
      _id: "2",
      name: "Emily Chen",
      role: "Skincare Expert",
      specialty: "Facials & Treatments",
      experience: "6+ years",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
      bio: "Certified aesthetician with expertise in advanced facial treatments",
    },
    {
      _id: "3",
      name: "Michael Rodriguez",
      role: "Nail Artist",
      specialty: "Manicure & Pedicure",
      experience: "5+ years",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
      bio: "Award-winning nail artist specializing in creative designs",
    },
    {
      _id: "4",
      name: "Jessica Williams",
      role: "Massage Therapist",
      specialty: "Therapeutic Massage",
      experience: "7+ years",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
      bio: "Licensed massage therapist with expertise in deep tissue and relaxation",
    },
  ];

  // Bank account details
  const bankDetails = {
    accountName: "Elite Beauty Studio LLC",
    bankName: "Chase Bank",
    accountNumber: "**** 4567",
    routingNumber: "021000021",
  };

  // Normalize date to ensure consistency
  const normalizeDate = useCallback((date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  }, []);

  const [step, setStep] = useState(1);
  const [eServices, setEServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(normalizeDate(new Date()));
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    details: "",
  });
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [paymentStep, setPaymentStep] = useState('selection'); // 'selection', 'processing', 'details'

  // Available time slots
  const timeSlots = [
    { time: "09:00 AM", booked: false },
    { time: "10:00 AM", booked: false },
    { time: "11:00 AM", booked: false },
    { time: "12:00 PM", booked: false },
    { time: "01:00 PM", booked: false },
    { time: "02:00 PM", booked: false },
    { time: "03:00 PM", booked: false },
    { time: "04:00 PM", booked: false },
    { time: "05:00 PM", booked: false },
  ];

  const onCloseModal = useCallback(async () => {
    setStep(1);
    setSelectedServices([]);
    setSelectedTimeSlot(null);
    setSelectedTeamMember(null);
    setSelectedDate(normalizeDate(new Date()));
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      details: "",
    });
    setPaymentMethod(null);
    setPaymentStep('selection');
    handleClose();
  }, [handleClose, normalizeDate]);

  const handleCancelClick = () => {
    setShowCancelDialog(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelDialog(false);
    onCloseModal();
  };

  const handleCloseCancel = () => {
    setShowCancelDialog(false);
  };

  // Load dummy services on mount
  useEffect(() => {
    const loadServices = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setEServices(dummyServices);
      setLoading(false);
    };

    if (isOpen) {
      loadServices();
    }
  }, [isOpen]);

  const handleServiceChange = (service) => {
    setSelectedServices((prevSelected) => {
      const isSelected = prevSelected.some((s) => s._id === service._id);
      if (isSelected) {
        return prevSelected.filter((s) => s._id !== service._id);
      } else {
        return [...prevSelected, service];
      }
    });
  };

  const removeService = (serviceId) => {
    setSelectedServices((prev) => prev.filter((s) => s._id !== serviceId));
  };

  // Calculate total price and duration
  const getTotalPrice = () => {
    return selectedServices.reduce((total, service) => total + service.price, 0);
  };

  const handleDateChange = useCallback(
    (date) => {
      const normalizedDate = normalizeDate(date);
      setSelectedDate(normalizedDate);
    },
    [normalizeDate]
  );

  const disablePastDates = ({ date, view }) => {
    return view === "month" && date < new Date().setHours(0, 0, 0, 0);
  };

  const handleTimeSlotSelect = (slot) => {
    if (!slot.booked) setSelectedTimeSlot(slot.time);
  };

  const handleNextStep = (nextStep) => {
    if (nextStep <= 6) setStep(nextStep);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      showToast("Booking submitted successfully!", "success");
      handleNextStep(5);
    } catch (error) {
      showToast("Failed to submit booking. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);
    setPaymentStep('processing');
  };

  const handleProcessPayment = async () => {
    setLoading(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setPaymentStep('details');
    setLoading(false);
  };

  const handleConfirmPayment = () => {
    handleNextStep(6); // Go to confirm step
  };

  // Generate available time slots based on selected date
  useEffect(() => {
    if (step === 3 && selectedDate) {
      setLoading(true);
      const timer = setTimeout(() => {
        const updatedSlots = timeSlots.map((slot) => ({
          ...slot,
          booked: Math.random() < 0.3,
        }));
        setAvailableTimeSlots(updatedSlots);
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [step, selectedDate]);

  // Progress steps configuration - Updated order
  const progressSteps = [
    { number: 1, label: "Services", icon: FaUser },
    { number: 2, label: "Team", icon: FaUser },
    { number: 3, label: "Date & Time", icon: FaCalendarAlt },
    { number: 4, label: "Details", icon: FaUser },
    { number: 5, label: "Payment", icon: FaCreditCard },
    { number: 6, label: "Confirm", icon: FaCheckCircle },
  ];

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: serviceCurrency || "USD",
    }).format(amount);
  };

  // Powered by logo component
  const PoweredByLogo = () => (
    <div className="flex items-center justify-center space-x-2 text-gray-400 mt-8 pt-6 border-t border-gray-200">
      <span className="text-xs">Powered by</span>
      <div className="flex items-center space-x-3">
        <Link to="/">
          <img src={DimpifiedLogo} alt="Dimpified" className="h-5 w-auto" />
        </Link>
      </div>
    </div>
  );

  // Selected Services Summary Component
  const SelectedServicesSummary = () => {
    if (selectedServices.length === 0) return null;

    return (
      <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-purple-800 flex items-center gap-2">
            <FaCheckCircle className="text-purple-600" />
            Selected Services ({selectedServices.length})
          </h3>
          <span className="text-lg font-bold text-purple-600">
            {formatCurrency(getTotalPrice())}
          </span>
        </div>
        <div className="space-y-2">
          {selectedServices.map((service) => (
            <div key={service._id} className="flex justify-between items-center text-sm group">
              <div className="flex items-center gap-2">
                <span className="text-gray-700">{service.name}</span>
                <span className="text-xs text-gray-500">({service.duration})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-purple-600">{formatCurrency(service.price)}</span>
                <button
                  onClick={() => removeService(service._id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={() => setShowCancelDialog(true)} className="relative z-50">
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cancel Booking</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to cancel and go back home?</p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={handleCloseCancel}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    No
                  </button>
                  <button
                    onClick={handleConfirmCancel}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Header */}
          <div className="lg:hidden border-b border-gray-200 bg-white">
            <div className="flex justify-between items-center px-4 py-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">EB</span>
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
              >
                <FaTimes />
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row h-full lg:h-[calc(100vh-80px)]">
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
                {/* X Button for Desktop */}
                <div className="hidden lg:flex justify-end mb-4">
                  <button
                    onClick={handleCancelClick}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                {/* Progressive Line Bar Stepper - Mobile */}
                <div className="lg:hidden mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Step {step} of {progressSteps.length}
                    </span>
                    <span className="text-sm text-gray-500">
                      {step}/{progressSteps.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${(step / progressSteps.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Enhanced Progress Bar - Desktop with Connected Lines */}
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

                {/* Step 1: Service Selection */}
                {step === 1 && (
                  <div className="animate-fade-in">
                    <div className="text-start mb-8 lg:mb-12">
                      <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
                        Select Services
                      </h2>
                      <p className="text-base lg:text-xl text-gray-600 mb-6">
                        {businessInfo.description}
                      </p>
                      {selectedServices.length > 0 && (
                        <div className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                          {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} selected
                        </div>
                      )}
                    </div>

                    {loading ? (
                      <div className="flex justify-center items-center h-48 lg:h-64">
                        <div className="animate-spin rounded-full h-8 w-8 lg:h-12 lg:w-12 border-b-2 border-purple-600"></div>
                      </div>
                    ) : (
                      <>
                        <SelectedServicesSummary />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-4xl mx-auto">
                          {eServices.map((service) => {
                            const isSelected = selectedServices.some((s) => s._id === service._id);
                            return (
                              <div
                                key={service._id}
                                className={`group relative bg-white rounded-xl lg:rounded-2xl border-2 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
                                  isSelected
                                    ? "border-purple-500 shadow-lg ring-2 ring-purple-200"
                                    : "border-gray-200 hover:border-purple-300"
                                }`}
                                onClick={() => handleServiceChange(service)}
                              >
                                <div className="relative h-32 overflow-hidden">
                                  <img
                                    src={service.image}
                                    alt={service.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                  />
                                  <div className="absolute inset-0 bg-black bg-opacity-50" />
                                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-white bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-yellow-600">
                                    <FaStar className="text-yellow-500" size={10} />
                                    {service.rating}
                                  </div>
                                  <div className="absolute bottom-2 left-2 text-white text-xs bg-black bg-opacity-50 backdrop-blur-sm px-2 py-1 rounded-full">
                                    {service.category}
                                  </div>
                                </div>
                                <div className="p-4">
                                  <div className="flex items-start justify-between mb-2">
                                    <div>
                                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                        {service.name}
                                      </h3>
                                      <p className="text-gray-600 text-xs mb-2">
                                        {service.shortDescription}
                                      </p>
                                    </div>
                                    {isSelected ? (
                                      <FaCheckCircle className="text-purple-500 text-xl flex-shrink-0" />
                                    ) : (
                                      <FaPlus className="text-gray-400 group-hover:text-purple-500 transition-colors duration-200 flex-shrink-0" />
                                    )}
                                  </div>
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="text-lg font-bold text-purple-600">
                                      {formatCurrency(service.price)}
                                    </span>
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                      {service.duration}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
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
                        Continue to Team ({selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''})
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

                    <SelectedServicesSummary />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-4xl mx-auto">
                      {teamMembers.map((member) => (
                        <div
                          key={member._id}
                          className={`group bg-white rounded-xl lg:rounded-2xl border-2 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
                            selectedTeamMember?._id === member._id
                              ? "border-purple-500 shadow-lg ring-2 ring-purple-200"
                              : "border-gray-200 hover:border-purple-300"
                          }`}
                          onClick={() => setSelectedTeamMember(member)}
                        >
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30" />
                            {selectedTeamMember?._id === member._id && (
                              <div className="absolute top-2 right-2">
                                <FaCheckCircle className="text-purple-500 text-2xl bg-white rounded-full" />
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {member.name}
                            </h3>
                            <p className="text-purple-600 text-sm mb-2">{member.role}</p>
                            <p className="text-gray-600 text-xs mb-3">{member.specialty}</p>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">{member.experience} experience</span>
                              <span className="text-purple-600 font-medium">View Bio</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 lg:mt-12">
                      <button
                        onClick={() => handlePrevStep()}
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

                    <SelectedServicesSummary />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 max-w-4xl mx-auto">
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
                            <div className="animate-spin rounded-full h-6 lg:h-8 w-6 lg:w-8 border-b-2 border-purple-600"></div>
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
                              {availableTimeSlots.map((slot, index) => (
                                <button
                                  key={index}
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

                    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 lg:mt-12">
                      <button
                        onClick={() => handlePrevStep()}
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

                    <SelectedServicesSummary />

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleNextStep(5);
                      }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleFormChange}
                              required
                              className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pl-10"
                              placeholder="Enter your full name"
                            />
                            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleFormChange}
                              required
                              className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pl-10"
                              placeholder="Your phone number"
                            />
                            <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            required
                            className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pl-10"
                            placeholder="your@email.com"
                          />
                          <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
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
                          className="px-6 lg:px-12 py-3 lg:py-4 bg-purple-600 text-white rounded-lg lg:rounded-full font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 order-1 sm:order-2 transform hover:scale-[1.02]"
                        >
                          Continue to Payment →
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

                    <SelectedServicesSummary />

                    {paymentStep === 'selection' && (
                      <div className="space-y-4 mb-8">
                        {/* Stripe Option */}
                        <div
                          onClick={() => handlePaymentSelection('stripe')}
                          className={`group bg-white rounded-xl lg:rounded-2xl p-6 border-2 cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
                            paymentMethod === 'stripe'
                              ? 'border-purple-500 shadow-lg ring-2 ring-purple-200'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                                <FaCreditCard className="text-white text-xl" />
                              </div>
                              <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                  Pay with Card
                                </h3>
                                <p className="text-gray-500 text-sm">
                                  Secure payment via Stripe • Visa, Mastercard, Amex
                                </p>
                              </div>
                            </div>
                            {paymentMethod === 'stripe' && (
                              <FaCheckCircle className="text-purple-500 text-2xl" />
                            )}
                          </div>
                        </div>

                        {/* Bank Transfer Option */}
                        <div
                          onClick={() => handlePaymentSelection('bank')}
                          className={`group bg-white rounded-xl lg:rounded-2xl p-6 border-2 cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
                            paymentMethod === 'bank'
                              ? 'border-purple-500 shadow-lg ring-2 ring-purple-200'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                                <FaUniversity className="text-white text-xl" />
                              </div>
                              <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                  Bank Transfer
                                </h3>
                                <p className="text-gray-500 text-sm">
                                  Pay directly to our bank account
                                </p>
                              </div>
                            </div>
                            {paymentMethod === 'bank' && (
                              <FaCheckCircle className="text-purple-500 text-2xl" />
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentStep === 'processing' && paymentMethod === 'stripe' && (
                      <div className="bg-white rounded-xl lg:rounded-2xl p-8 border-2 border-purple-200 mb-8 text-center animate-fade-in">
                        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <FaCreditCard className="text-purple-600 text-3xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Stripe Payment</h3>
                        <p className="text-gray-600 mb-8">Enter your card details to complete payment</p>
                        
                        <div className="space-y-4 mb-8">
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Card Number"
                              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              defaultValue="4242 4242 4242 4242"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              defaultValue="12/25"
                            />
                            <input
                              type="text"
                              placeholder="CVC"
                              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              defaultValue="123"
                            />
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <button
                            onClick={() => setPaymentStep('selection')}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
                          >
                            Back
                          </button>
                          <button
                            onClick={handleProcessPayment}
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {loading ? (
                              <div className="flex items-center justify-center gap-2">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                Processing...
                              </div>
                            ) : (
                              "Pay Now"
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {paymentStep === 'processing' && paymentMethod === 'bank' && (
                      <div className="bg-white rounded-xl lg:rounded-2xl p-8 border-2 border-purple-200 mb-8 animate-fade-in">
                        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <FaUniversity className="text-purple-600 text-3xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Bank Transfer</h3>
                        
                        <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-200">
                          <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                            <FaUniversity className="text-blue-600" />
                            Bank Transfer Details
                          </h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                              <span className="text-blue-700 font-medium">Account Name:</span>
                              <span className="text-blue-900 font-semibold">{bankDetails.accountName}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                              <span className="text-blue-700 font-medium">Bank Name:</span>
                              <span className="text-blue-900 font-semibold">{bankDetails.bankName}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                              <span className="text-blue-700 font-medium">Account Number:</span>
                              <span className="text-blue-900 font-semibold">{bankDetails.accountNumber}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                              <span className="text-blue-700 font-medium">Routing Number:</span>
                              <span className="text-blue-900 font-semibold">{bankDetails.routingNumber}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <button
                            onClick={() => setPaymentStep('selection')}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
                          >
                            Back
                          </button>
                          <button
                            onClick={handleProcessPayment}
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {loading ? (
                              <div className="flex items-center justify-center gap-2">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                Processing...
                              </div>
                            ) : (
                              "Continue"
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {paymentStep === 'details' && paymentMethod === 'stripe' && (
                      <div className="bg-white rounded-xl lg:rounded-2xl p-8 border-2 border-purple-200 mb-8 animate-fade-in">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <FaCheckCircle className="text-green-600 text-3xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h3>
                        <p className="text-gray-600 mb-6">Your payment has been processed successfully.</p>
                        
                        <div className="bg-purple-50 rounded-lg p-4 mb-6">
                          <p className="text-purple-700 text-sm">
                            Transaction ID: #TR{Math.floor(Math.random() * 1000000)}
                          </p>
                        </div>

                        <button
                          onClick={handleConfirmPayment}
                          className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg"
                        >
                          Continue to Confirmation
                        </button>
                      </div>
                    )}

                    {paymentStep === 'details' && paymentMethod === 'bank' && (
                      <div className="bg-white rounded-xl lg:rounded-2xl p-8 border-2 border-purple-200 mb-8 animate-fade-in">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <FaUniversity className="text-blue-600 text-3xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Bank Transfer Initiated</h3>
                        
                        <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-200">
                          <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                            <FaUniversity className="text-blue-600" />
                            Payment Instructions
                          </h4>
                          <div className="space-y-3 text-left mb-4">
                            <div className="flex justify-between p-3 bg-white rounded-lg">
                              <span className="text-blue-700">Amount to pay:</span>
                              <span className="font-bold text-purple-600">{formatCurrency(getTotalPrice())}</span>
                            </div>
                            <div className="flex justify-between p-3 bg-white rounded-lg">
                              <span className="text-blue-700">Account Name:</span>
                              <span className="font-semibold">{bankDetails.accountName}</span>
                            </div>
                            <div className="flex justify-between p-3 bg-white rounded-lg">
                              <span className="text-blue-700">Account Number:</span>
                              <span className="font-semibold">{bankDetails.accountNumber}</span>
                            </div>
                            <div className="flex justify-between p-3 bg-white rounded-lg">
                              <span className="text-blue-700">Bank:</span>
                              <span className="font-semibold">{bankDetails.bankName}</span>
                            </div>
                          </div>
                          <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                            <p className="text-blue-700 text-sm">
                              Please complete the transfer and click the button below to notify us.
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            const servicesList = selectedServices.map(s => `- ${s.name} (${formatCurrency(s.price)})`).join('\n');
                            const message = `Hello! I have made my payment for the booking:\n\nServices:\n${servicesList}\n\nTotal: ${formatCurrency(getTotalPrice())}\nDate: ${selectedDate?.toLocaleDateString()}\nTime: ${selectedTimeSlot}\nName: ${formData.fullName}\nPhone: ${formData.phone}`;
                            
                            const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
                            window.open(whatsappUrl, "_blank");
                          }}
                          className="w-full mb-4 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                        >
                          <FaWhatsapp className="text-white" />
                          I've Made the Payment
                        </button>

                        <button
                          onClick={handleConfirmPayment}
                          className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg"
                        >
                          Continue to Confirmation
                        </button>
                      </div>
                    )}

                    {paymentStep === 'selection' && (
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <button
                          onClick={() => handlePrevStep()}
                          className="px-6 lg:px-8 py-3 border border-gray-300 text-gray-700 rounded-lg lg:rounded-full font-semibold hover:bg-gray-50 transition-all duration-300"
                        >
                          ← Back to Details
                        </button>
                      </div>
                    )}

                    <PoweredByLogo />
                  </div>
                )}

                {/* Step 6: Confirm */}
                {step === 6 && (
                  <div className="animate-fade-in text-center max-w-2xl mx-auto">
                    <div className="w-16 h-16 lg:w-24 lg:h-24 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 lg:mb-8 animate-bounce">
                      <FaCheckCircle className="text-white text-2xl lg:text-4xl" />
                    </div>

                    <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">
                      You're All Set!
                    </h2>

                    <p className="text-base lg:text-xl text-gray-600 mb-6 lg:mb-8">
                      Your booking has been confirmed. We've sent a confirmation email with all the details.
                    </p>

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
              </div>
            </div>

            {/* Sidebar - Desktop Only */}
            <div className="hidden lg:block w-96 bg-gray-50 border-l border-gray-200 p-6 lg:p-8 overflow-y-auto">
              <div className="sticky top-8">
                {/* Business Logo and Info */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-2xl">EB</span>
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
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FaPhone className="text-purple-600 text-sm" />
                    </div>
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

                {/* Selected Team Member */}
                {selectedTeamMember && (
                  <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FaUser className="text-purple-600 text-sm" />
                      </div>
                      Your Specialist
                    </h3>
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedTeamMember.image}
                        alt={selectedTeamMember.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{selectedTeamMember.name}</p>
                        <p className="text-xs text-gray-500">{selectedTeamMember.role}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Current Booking Summary */}
                {(step === 3 || step === 4 || step === 5 || step === 6) && selectedServices.length > 0 && (
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
                                <span className="text-gray-600">{service.name}</span>
                                <span className="font-medium text-purple-600">
                                  {formatCurrency(service.price)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-900">Total:</span>
                            <span className="text-lg font-bold text-purple-600">
                              {formatCurrency(getTotalPrice())}
                            </span>
                          </div>
                        </div>
                      </div>

                      {(selectedDate || selectedTimeSlot) && (
                        <div className="pt-3 border-t border-gray-200">
                          <div className="space-y-2 text-sm">
                            {selectedDate && (
                              <div className="flex justify-between">
                                <span className="text-gray-500">Date:</span>
                                <span className="font-medium">
                                  {selectedDate.toLocaleDateString()}
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
                    <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
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

      <style jsx>{`
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

export default LatestBookingModal;