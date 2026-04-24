import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpCircle, Clock, Edit2, Plus, X, Loader2 } from "lucide-react";
import FreeDashboardLayout from "../../layout/Creator/FreeCreatorDashboard";
import { ButtonSmallPurple } from "../../component/Buttons";
import api from "../../api/DashboardApi";
import { useSelector } from "react-redux";
import { FaNairaSign } from "react-icons/fa6";
import axios from "axios";
import serviceApi from "../../api/service";
import { showToast } from "../../component/ShowToast";

const FreeManageServices = () => {
  const navigate = useNavigate();
  const [serviceGroups, setServiceGroups] = useState([]);
  const [businessHour, setBusinessHour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadingImageId, setUploadingImageId] = useState(null);

  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [editingSubService, setEditingSubService] = useState(null);
  const [isAddingGroup, setIsAddingGroup] = useState(false);

  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const creatorId = useSelector((state) => state.auth.user?.creatorId);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  // Dynamically get subCategory
  const currentSubCategory =
    serviceGroups.length > 0 ? serviceGroups[0].subCategory : "Baby Salon";

  // Form states
  const [serviceForm, setServiceForm] = useState({
    name: "",
    price: "",
    duration: "",
    description: "",
    imageFile: null,
    imagePreview: null,
  });

  const [newGroupServices, setNewGroupServices] = useState([
    {
      name: "",
      price: "",
      duration: "",
      description: "",
      imageFile: null,
      imagePreview: null,
    },
  ]);

  const [openDurationDropdown, setOpenDurationDropdown] = useState(null);
  const [editingDurationDropdown, setEditingDurationDropdown] = useState(false);

  // Fetch services
  useEffect(() => {
    if (ecosystemDomain && accessToken) {
      fetchServices();
    }
  }, [ecosystemDomain, accessToken]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await api.creatorEcosystemServices({
        ecosystemDomain,
        accessToken,
        refreshToken,
      });
      const groups = response.data || [];
      setServiceGroups(groups);

      if (groups.length > 0 && groups[0].businessHoursRecords?.length > 0) {
        setBusinessHour(groups[0].businessHoursRecords[0]);
      } else {
        setBusinessHour(null);
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  // Time slots generation
  const generateTimeSlots = () => {
    const slots = [];
    for (let h = 6; h <= 22; h++) {
      for (let m = 0; m < 60; m += 30) {
        if (h === 22 && m > 0) break;
        const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
        const minute = m.toString().padStart(2, "0");
        const period = h >= 12 ? "pm" : "am";
        slots.push(`${hour}:${minute} ${period}`);
      }
    }
    return slots;
  };

  const durationOptions = [
    { value: 15, label: "15 Min" },
    { value: 30, label: "30 Min" },
    { value: 45, label: "45 Min" },
    { value: 60, label: "1 hour" },
    { value: 75, label: "1 hour 15 Min" },
    { value: 90, label: "1 hour 30 Min" },
    { value: 105, label: "1 hour 45 Min" },
    { value: 120, label: "2 hours" },
    { value: 150, label: "2 hours 30 Min" },
    { value: 165, label: "2 hours 45 Min" },
    { value: 180, label: "3 hours" },
    { value: 210, label: "3 hours 30 Min" },
    { value: 240, label: "4 hours" },
    { value: 255, label: "4 hours 15 Min" },
    { value: 270, label: "4 hours 30 Min" },
    { value: 285, label: "4 hours 45 Min" },
    { value: 300, label: "5 hours" },
    { value: 315, label: "5 hours 15 Min" },
    { value: 330, label: "5 hours 30 Min" },
    { value: 345, label: "5 hours 45 Min" },
    { value: 360, label: "6 hours" },
    { value: 375, label: "6 hours 15 Min" },
    { value: 390, label: "6 hours 30 Min" },
    { value: 405, label: "6 hours 45 Min" },
    { value: 420, label: "7 hours" },
    { value: 435, label: "7 hours 15 Min" },
    { value: 450, label: "7 hours 30 Min" },
    { value: 465, label: "7 hours 45 Min" },
    { value: 480, label: "8 hours" },
  ];

  // Filter duration options based on input
  const getFilteredDurationOptions = (input) => {
    if (!input) return durationOptions;
    const inputNum = parseInt(input);
    if (isNaN(inputNum)) return durationOptions;
    return durationOptions.filter(
      (d) =>
        d.value.toString().includes(input) ||
        d.label.toLowerCase().includes(input.toLowerCase()),
    );
  };

  const timeSlots = generateTimeSlots();

  // Availability conversion
  const getAvailabilityFromHours = () => {
    if (!businessHour?.week) {
      return {
        Monday: { selected: true, start: "09:00 am", end: "10:00 pm" },
        Tuesday: { selected: true, start: "09:00 am", end: "10:00 pm" },
        Wednesday: { selected: true, start: "09:00 am", end: "10:00 pm" },
        Thursday: { selected: true, start: "09:00 am", end: "10:00 pm" },
        Friday: { selected: true, start: "09:00 am", end: "10:00 pm" },
        Saturday: { selected: false, start: "09:00 am", end: "10:00 pm" },
        Sunday: { selected: false, start: "09:00 am", end: "10:00 pm" },
      };
    }

    const avail = {};
    const dayMap = {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
    };

    Object.keys(dayMap).forEach((dayKey) => {
      const dayObj = businessHour.week.find((d) => d.day === dayKey);
      const enabled = dayObj?.enabled && dayObj.slots.length > 0;
      const start = enabled
        ? formatTime12(dayObj.slots[0]?.start || "09:00")
        : "09:00 am";
      const end = enabled
        ? formatTime12(dayObj.slots[0]?.end || "22:00")
        : "10:00 pm";
      avail[dayMap[dayKey]] = { selected: enabled, start, end };
    });

    return avail;
  };

  const formatTime12 = (time24) => {
    if (!time24) return "09:00 am";
    const [h, m] = time24.split(":").map(Number);
    const period = h >= 12 ? "pm" : "am";
    const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${displayHour}:${m.toString().padStart(2, "0")} ${period}`;
  };

  const [availability, setAvailability] = useState(getAvailabilityFromHours());

  useEffect(() => {
    setAvailability(getAvailabilityFromHours());
  }, [businessHour]);

  const convertTo24 = (time12) => {
    const [time, period] = time12.split(" ");
    let [h, m] = time.split(":").map(Number);
    if (period === "pm" && h !== 12) h += 12;
    if (period === "am" && h === 12) h = 0;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };

  const toggleDay = (day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], selected: !prev[day].selected },
    }));
  };

  const saveBusinessHours = async () => {
    const dayMapReverse = {
      Monday: "monday",
      Tuesday: "tuesday",
      Wednesday: "wednesday",
      Thursday: "thursday",
      Friday: "friday",
      Saturday: "saturday",
      Sunday: "sunday",
    };

    const week = Object.entries(availability).map(([dayName, data]) => ({
      day: dayMapReverse[dayName],
      enabled: data.selected,
      slots: data.selected
        ? [{ start: convertTo24(data.start), end: convertTo24(data.end) }]
        : [],
    }));

    try {
      setLoading(true);
      await api.creatorEditBusinessHours({
        creatorId,
        ecosystemDomain,
        week,
        accessToken,
        refreshToken,
      });
      await fetchServices();
      setShowAvailabilityModal(false);
    } catch (error) {
      console.error("Failed to update business hours:", error);
      alert("Failed to save availability");
    } finally {
      setLoading(false);
    }
  };

  // Service helpers
  const addServiceField = () => {
    setNewGroupServices([
      ...newGroupServices,
      {
        name: "",
        price: "",
        duration: "",
        description: "",
        imageFile: null,
        imagePreview: null,
      },
    ]);
  };

  const removeServiceField = (index) => {
    setNewGroupServices(newGroupServices.filter((_, i) => i !== index));
  };

  const createServiceGroup = async () => {
    if (newGroupServices.some((s) => !s.name || !s.price || !s.duration)) {
      alert("Please fill all fields for every service");
      return;
    }

    const servicesPayload = newGroupServices.map((s) => ({
      name: s.name.trim(),
      shortDescription:
        s.description?.trim() || `Professional ${s.name.toLowerCase()} service`,
      price: parseFloat(s.price),
      deliveryTime: parseInt(s.duration),
      priceFormat: "Fixed",
      serviceImage: s.imageFile ? s.imageFile : "null",
    }));

    const header = servicesPayload[0].name;
    const description = `Professional services including ${servicesPayload
      .map((s) => s.name)
      .join(", ")}`;

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/create-service`,
        {
          accessToken,
          refreshToken,
          creatorId: creatorId.toString(),
          ecosystemDomain,
          category: "Personal Care Service",
          subCategory: currentSubCategory,
          prefix: "I will",
          header,
          description,
          format: "Onsite",
          currency: "NGN",
          services: servicesPayload,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      await fetchServices();
      setShowServiceModal(false);
      setNewGroupServices([
        {
          name: "",
          price: "",
          duration: "",
          description: "",
          imageFile: null,
          imagePreview: null,
        },
      ]);
      setIsAddingGroup(false);
    } catch (error) {
      console.error("Failed to create service group:", error);
      alert("Failed to create services");
    } finally {
      setLoading(false);
    }
  };

  const editSubService = async () => {
    if (!serviceForm.name || !serviceForm.price || !serviceForm.duration) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await api.creatorEditService({
        accessToken,
        refreshToken,
        serviceId: editingSubService.serviceGroupId,
        subServiceId: editingSubService._id,
        name: serviceForm.name.trim(),
        shortDescription:
          serviceForm.description?.trim() ||
          `Professional ${serviceForm.name.toLowerCase()} service`,
        price: parseFloat(serviceForm.price),
        deliveryTime: parseInt(serviceForm.duration),
        priceFormat: "Fixed",
        serviceImage: serviceForm.imageFile
          ? serviceForm.imageFile
          : editingSubService.serviceImage || "null",
      });

      await fetchServices();
      setShowServiceModal(false);
      setEditingSubService(null);
    } catch (error) {
      console.error("Failed to edit service:", error);
      alert("Failed to update service");
    } finally {
      setLoading(false);
    }
  };

  const handleEditService = (groupId, subService) => {
    setEditingSubService({ ...subService, serviceGroupId: groupId });
    setServiceForm({
      name: subService.name,
      price: subService.price,
      duration: subService.deliveryTime,
      description: subService.shortDescription || "",
      imageFile: null,
      imagePreview:
        subService.serviceImage && subService.serviceImage !== "null"
          ? subService.serviceImage
          : null,
    });
    setIsAddingGroup(false);
    setShowServiceModal(true);
  };

  const handleAddServiceGroup = () => {
    setIsAddingGroup(true);
    setNewGroupServices([
      {
        name: "",
        price: "",
        duration: "",
        description: "",
        imageFile: null,
        imagePreview: null,
      },
    ]);
    setShowServiceModal(true);
  };

  const allSubServices = serviceGroups.flatMap((group) =>
    group.services.map((s) => ({ ...s, groupId: group._id })),
  );

  const handleImageUpload = async (
    file,
    updateCallback,
    type = "create",
    id = null,
    oldImageUrl = null,
  ) => {
    if (!file) return;

    setUploadingImageId(id || "editing");
    try {
      const response = await serviceApi.uploadServiceImage({
        oldImageUrl: oldImageUrl || null,
        image: file,
        accessToken,
        refreshToken,
        navigate,
      });

      // Store the returned URL
      if (response.data?.url) {
        updateCallback(response.data.url);
        showToast("Image uploaded successfully", "success");
      } else {
        showToast("Image uploaded but no URL returned", "error");
      }
    } catch (error) {
      showToast(error.message || "Failed to upload image", "error");
    } finally {
      setUploadingImageId(null);
    }
  };

  return (
    <FreeDashboardLayout>
      <div className="lg:p-10 p-4">
        <div className="w-full mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Manage Services
              </h2>
              <p className="text-gray-600 mt-1">
                Create and manage your service offerings
              </p>
            </div>
            {/* <ButtonSmallPurple className="bg-[#9F68FE] text-white px-6 py-2 font-semibold flex items-center gap-2 rounded-xl">
              <ArrowUpCircle className="w-5 h-5" />
              Upgrade plan
            </ButtonSmallPurple> */}
          </div>

          {/* Availability Section - Exactly like the screenshot */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Your Availability
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Select the days you will be available and set time for each
                  day
                </p>
              </div>
              <button
                onClick={() => setShowAvailabilityModal(true)}
                className="border border-[#9F68FE] text-[#9F68FE] px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors flex items-center gap-2 w-fit"
              >
                <Edit2 className="w-4 h-4" />
                Edit availability
              </button>
            </div>

            {/* Flex layout to match screenshot exactly */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Available Days */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Available Days <span className="text-red-500">*</span>
                </label>
                <div className="space-y-4">
                  {Object.entries(availability)
                    .filter(([_, d]) => d.selected)
                    .map(([day]) => (
                      <div
                        key={day}
                        className="bg-gradient-to-r from-[#9F68FE] to-[#D8B4FE] text-white px-6 py-3 rounded-full text-center font-medium"
                      >
                        {day}
                      </div>
                    ))}
                  {Object.values(availability).filter((d) => d.selected)
                    .length === 0 && (
                    <p className="text-gray-500 text-sm text-center">
                      No days selected
                    </p>
                  )}
                </div>
              </div>

              {/* Time Slots */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Time Slots <span className="text-red-500">*</span>
                </label>
                <div className="space-y-4">
                  {Object.entries(availability)
                    .filter(([_, d]) => d.selected)
                    .map(([day, d]) => (
                      <div key={day} className="flex items-center gap-4">
                        <div className="bg-gray-100 px-6 py-3 rounded-full text-gray-700 flex-1 text-center font-medium">
                          {d.start}
                        </div>
                        <span className="text-gray-500">to</span>
                        <div className="bg-gray-100 px-6 py-3 rounded-full text-gray-700 flex-1 text-center font-medium">
                          {d.end}
                        </div>
                      </div>
                    ))}
                  {Object.values(availability).filter((d) => d.selected)
                    .length === 0 && (
                    <p className="text-gray-500 text-sm text-center">
                      No time slots available
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Your Services
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  What services do you offer?
                </p>
              </div>
              <button
                onClick={handleAddServiceGroup}
                className="border border-[#9F68FE] text-[#9F68FE] px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors flex items-center gap-2 w-fit"
              >
                <Plus className="w-4 h-4" />
                Add Service
              </button>
            </div>

            {loading ? (
              <p className="text-center text-gray-500 py-12">
                Loading services...
              </p>
            ) : allSubServices.length === 0 ? (
              <p className="text-center text-gray-500 py-12">
                No services added yet. Click "Add Service" to get started.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allSubServices.map((service) => (
                  <div
                    key={service._id}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Service Image */}
                    {service.serviceImage && service.serviceImage !== "null" ? (
                      <img
                        src={service.serviceImage}
                        alt={service.name}
                        className="w-full h-40 object-cover"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gradient-to-r from-[#9F68FE] to-[#D8B4FE] flex items-center justify-center">
                        <span className="text-white text-sm">No image</span>
                      </div>
                    )}

                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900 text-lg">
                          {service.name}
                        </h4>
                        <button
                          onClick={() =>
                            handleEditService(service.groupId, service)
                          }
                          className="text-gray-600 hover:text-[#9F68FE] transition-colors"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Description */}
                      {service.shortDescription &&
                        service.shortDescription !== "null" && (
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {service.shortDescription}
                          </p>
                        )}

                      <div className="flex items-center justify-between text-sm mb-5">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-5 h-5" />
                          <span>{service.deliveryTime} min</span>
                        </div>
                        <div className="flex items-center gap-2 font-bold text-gray-900">
                          <FaNairaSign className="w-5 h-5" />
                          <span>{service.price.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="bg-purple-100 text-[#9F68FE] py-2.5 rounded-lg text-center text-sm font-semibold">
                        Active
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Service Modal - unchanged */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">
                  {isAddingGroup ? "Add New Service Group" : "Edit Service"}
                </h3>
                <button onClick={() => setShowServiceModal(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              {isAddingGroup ? (
                <div className="space-y-5">
                  {newGroupServices.map((svc, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-lg p-4 space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          placeholder="Service Name"
                          value={svc.name}
                          onChange={(e) => {
                            const updated = [...newGroupServices];
                            updated[idx].name = e.target.value;
                            setNewGroupServices(updated);
                          }}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <input
                          type="number"
                          placeholder="Price (NGN)"
                          value={svc.price}
                          onChange={(e) => {
                            const updated = [...newGroupServices];
                            updated[idx].price = e.target.value;
                            setNewGroupServices(updated);
                          }}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      <textarea
                        placeholder="Service Description (optional)"
                        value={svc.description}
                        onChange={(e) => {
                          const updated = [...newGroupServices];
                          updated[idx].description = e.target.value;
                          setNewGroupServices(updated);
                        }}
                        rows={3}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Service Image (optional)
                        </label>
                        <div className="flex items-center gap-3">
                          {svc.imagePreview && (
                            <div className="relative">
                              <img
                                src={svc.imagePreview}
                                alt="preview"
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              {uploadingImageId !== `new-${idx}` && (
                                <button
                                  onClick={() => {
                                    const updated = [...newGroupServices];
                                    updated[idx].imageFile = null;
                                    updated[idx].imagePreview = null;
                                    setNewGroupServices(updated);
                                  }}
                                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          )}
                          <div className="flex-1">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                handleImageUpload(
                                  file,
                                  (url) => {
                                    const updated = [...newGroupServices];
                                    updated[idx].imageFile = url;
                                    updated[idx].imagePreview = url;
                                    setNewGroupServices(updated);
                                  },
                                  "create",
                                  `new-${idx}`,
                                );
                              }}
                              disabled={uploadingImageId === `new-${idx}`}
                              className="w-full px-4 py-2 border rounded-lg disabled:opacity-50"
                            />
                            {uploadingImageId === `new-${idx}` && (
                              <div className="flex items-center gap-2 text-purple-600 text-sm mt-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Uploading...
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <input
                          type="number"
                          placeholder="Duration (min)"
                          value={svc.duration}
                          onChange={(e) => {
                            const updated = [...newGroupServices];
                            updated[idx].duration =
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value);
                            setNewGroupServices(updated);
                          }}
                          onFocus={() => setOpenDurationDropdown(`new-${idx}`)}
                          onBlur={() =>
                            setTimeout(() => setOpenDurationDropdown(null), 200)
                          }
                          className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-purple-500 outline-none"
                        />

                        {openDurationDropdown === `new-${idx}` && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                            {getFilteredDurationOptions(
                              svc.duration.toString(),
                            ).map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                  const updated = [...newGroupServices];
                                  updated[idx].duration = option.value;
                                  setNewGroupServices(updated);
                                  setOpenDurationDropdown(null);
                                }}
                                className="w-full text-left px-4 py-3 hover:bg-purple-50 border-b last:border-b-0 transition"
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      {newGroupServices.length > 1 && (
                        <button
                          onClick={() => removeServiceField(idx)}
                          className="text-red-600 text-sm font-medium"
                        >
                          Remove this service
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addServiceField}
                    className="text-[#9F68FE] text-sm font-medium flex items-center gap-1 hover:underline"
                  >
                    <Plus className="w-4 h-4" /> Add another service
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <input
                    placeholder="Service Name"
                    value={serviceForm.name}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <textarea
                    placeholder="Service Description (optional)"
                    value={serviceForm.description}
                    onChange={(e) =>
                      setServiceForm({
                        ...serviceForm,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Image (optional)
                    </label>
                    <div className="flex items-center gap-3">
                      {serviceForm.imagePreview && (
                        <div className="relative">
                          <img
                            src={serviceForm.imagePreview}
                            alt="preview"
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          {uploadingImageId !== "editing" && (
                            <button
                              onClick={() =>
                                setServiceForm({
                                  ...serviceForm,
                                  imageFile: null,
                                  imagePreview: null,
                                })
                              }
                              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      )}
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            handleImageUpload(
                              file,
                              (url) => {
                                setServiceForm({
                                  ...serviceForm,
                                  imageFile: url,
                                  imagePreview: url,
                                });
                              },
                              "edit",
                              null,
                              editingSubService?.serviceImage,
                            );
                          }}
                          disabled={uploadingImageId === "editing"}
                          className="w-full px-4 py-2 border rounded-lg disabled:opacity-50"
                        />
                        {uploadingImageId === "editing" && (
                          <div className="flex items-center gap-2 text-purple-600 text-sm mt-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Uploading...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <input
                    type="number"
                    placeholder="Price (NGN)"
                    value={serviceForm.price}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, price: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />

                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Duration (min)"
                      value={serviceForm.duration}
                      onChange={(e) =>
                        setServiceForm({
                          ...serviceForm,
                          duration:
                            e.target.value === "" ? "" : Number(e.target.value),
                        })
                      }
                      onFocus={() => setEditingDurationDropdown(true)}
                      onBlur={() =>
                        setTimeout(() => setEditingDurationDropdown(false), 200)
                      }
                      className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-purple-500 outline-none"
                    />

                    {editingDurationDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                        {getFilteredDurationOptions(
                          serviceForm.duration.toString(),
                        ).map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setServiceForm({
                                ...serviceForm,
                                duration: option.value,
                              });
                              setEditingDurationDropdown(false);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-purple-50 border-b last:border-b-0 transition"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={isAddingGroup ? createServiceGroup : editSubService}
                  disabled={loading}
                  className="flex-1 bg-[#9F68FE] text-white py-3 rounded-lg font-semibold hover:bg-[#8854e6] disabled:opacity-70"
                >
                  {loading
                    ? "Saving..."
                    : isAddingGroup
                      ? "Create Services"
                      : "Save Changes"}
                </button>
                <button
                  onClick={() => setShowServiceModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Availability Modal - unchanged */}
      {showAvailabilityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Edit Availability</h3>
              <p className="text-sm text-gray-600 mb-6">
                Select the days and times you are available
              </p>

              <div className="space-y-5">
                {Object.entries(availability).map(([day, data]) => (
                  <div
                    key={day}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                  >
                    <button
                      onClick={() => toggleDay(day)}
                      className={`w-full sm:w-32 py-3 rounded-lg font-medium text-center transition-all ${
                        data.selected
                          ? "border-2 border-[#9F68FE] text-[#9F68FE] bg-purple-50"
                          : "border border-gray-300 text-gray-500 bg-gray-50"
                      }`}
                    >
                      {day}
                    </button>
                    <div className="flex-1 w-full flex items-center gap-3">
                      <select
                        value={data.start}
                        onChange={(e) =>
                          setAvailability({
                            ...availability,
                            [day]: { ...data, start: e.target.value },
                          })
                        }
                        disabled={!data.selected}
                        className="flex-1 px-4 py-3 border rounded-lg bg-white disabled:bg-gray-100 text-sm"
                      >
                        {timeSlots.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <span className="text-gray-500 px-2">to</span>
                      <select
                        value={data.end}
                        onChange={(e) =>
                          setAvailability({
                            ...availability,
                            [day]: { ...data, end: e.target.value },
                          })
                        }
                        disabled={!data.selected}
                        className="flex-1 px-4 py-3 border rounded-lg bg-white disabled:bg-gray-100 text-sm"
                      >
                        {timeSlots.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={saveBusinessHours}
                  disabled={loading}
                  className="flex-1 bg-[#9F68FE] text-white py-3 rounded-lg font-semibold hover:bg-[#8854e6] disabled:opacity-70"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => setShowAvailabilityModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </FreeDashboardLayout>
  );
};

export default FreeManageServices;
