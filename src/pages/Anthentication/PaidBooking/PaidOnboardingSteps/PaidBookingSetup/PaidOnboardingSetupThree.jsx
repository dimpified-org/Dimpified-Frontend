// pages/auth/PaidOnboardingSetupThree.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CheckCircle2, Loader2, Plus, Trash2 } from "lucide-react";

import PaidOnboardingLayout from "../PaidOnboardingLayout";
import SubStepWrapper from "./SubStepWrapper";
import { ButtonLongPurple } from "../../../../../component/Buttons";
import dashboardApi from "../../../../../api/DashboardApi";
import serviceApi from "../../../../../api/service";
import { showToast } from "../../../../../component/ShowToast";

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

const PaidOnboardingSetupThree = () => {
  const navigate = useNavigate();
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  const [services, setServices] = useState(() => {
    const saved = sessionStorage.getItem("services");
    if (saved) return JSON.parse(saved).services;
    return [
      {
        id: Date.now(),
        name: "",
        amount: "",
        duration: 30,
        description: "",
        image: null,
      },
    ];
  });

  const [bankDetails, setBankDetails] = useState(() => {
    const saved = sessionStorage.getItem("bankDetails");
    if (saved) return JSON.parse(saved);
    return {
      bankName: "",
      bankCode: "",
      accountNumber: "",
      accountName: "",
      verified: false,
    };
  });

  const [allBanks, setAllBanks] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [uploadingImageId, setUploadingImageId] = useState(null);
  const [openDurationDropdown, setOpenDurationDropdown] = useState(null);

  useEffect(() => {
    sessionStorage.setItem("services", JSON.stringify({ services }));
  }, [services]);

  useEffect(() => {
    sessionStorage.setItem("bankDetails", JSON.stringify(bankDetails));
  }, [bankDetails]);

  /* ---------------------------------- BANKS ---------------------------------- */

  useEffect(() => {
    if (!accessToken) return;

    dashboardApi
      .creatorAllBanks({ accessToken, refreshToken })
      .then((res) => setAllBanks(res.data.allBanks.data))
      .catch(() => showToast("Failed to load banks", "error"));
  }, [accessToken, refreshToken]);

  useEffect(() => {
    if (bankDetails.accountNumber.length === 10 && bankDetails.bankCode) {
      verifyAccount();
    }
  }, [bankDetails.accountNumber, bankDetails.bankCode]);

  const verifyAccount = async () => {
    setIsVerifying(true);
    try {
      const res = await dashboardApi.creatorVerifyAccount({
        accessToken,
        refreshToken,
        account: bankDetails.accountNumber,
        bankCode: bankDetails.bankCode,
      });

      setBankDetails((prev) => ({
        ...prev,
        accountName: res.data.verifyDetails.data.account_name,
        verified: true,
      }));

      showToast("Account verified", "success");
    } catch {
      setBankDetails((prev) => ({
        ...prev,
        verified: false,
        accountName: "",
      }));
      showToast("Invalid account details", "error");
    } finally {
      setIsVerifying(false);
    }
  };

  /* ---------------------------------- SERVICES ---------------------------------- */

  const getFilteredDurationOptions = (input) => {
    if (!input) return durationOptions;
    const inputNum = parseInt(input);
    if (isNaN(inputNum)) return durationOptions;
    return durationOptions.filter((d) => d.value.toString().includes(input));
  };

  const addService = () => {
    if (services.length >= 10)
      return showToast("Maximum of 10 services allowed", "error");

    setServices([
      ...services,
      {
        id: Date.now(),
        name: "",
        amount: "",
        duration: null,
        description: "",
        image: null,
      },
    ]);
  };

  const updateService = (id, field, value) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );
  };

  const removeService = (id) => {
    if (services.length === 1) return;
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  /* -------------------------------- VALIDATION -------------------------------- */

  const isServiceValid = (service) => {
    return (
      service.name?.trim().length >= 3 &&
      Number(service.amount) > 0 &&
      service.duration !== null &&
      service.duration !== "" &&
      service.description?.trim().length >= 10
    );
  };

  const handleImageUpload = async (id, file) => {
    if (!file) return;

    setUploadingImageId(id);
    try {
      // Get the current image URL if it exists (for old image cleanup)
      const currentService = services.find((s) => s.id === id);
      const oldImageUrl = currentService?.image || null;

      const response = await serviceApi.uploadServiceImage({
        oldImageUrl,
        image: file,
        accessToken,
        refreshToken,
        navigate,
      });

      // Store the returned URL instead of base64
      if (response.data?.url) {
        updateService(id, "image", response.data.url);
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

  const isFormValid = () => {
    return (
      services.length >= 1 &&
      services.every(isServiceValid) &&
      bankDetails.verified
    );
  };

  /* ---------------------------------- NEXT ---------------------------------- */

  const handleNext = () => {
    if (!isFormValid()) {
      showToast(
        "Please complete all services correctly and verify bank account",
        "error",
      );
      return;
    }

    if (!sessionStorage.getItem("businessIdentity")) {
      navigate("/Paid/auth/business-identity");
      return;
    }

    if (!sessionStorage.getItem("availability")) {
      navigate("/Paid/auth/availability");
      return;
    }

    navigate("/Paid/auth/review");
  };

  /* ---------------------------------- UI ---------------------------------- */

  return (
    <PaidOnboardingLayout currentStep={3}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <SubStepWrapper currentSubStep={3} />

        <h1 className="text-3xl font-bold mb-2">Services & Payment</h1>
        <p className="text-gray-600 mb-8">
          Add your services and setup payouts
        </p>

        {/* SERVICES */}
        <div className="space-y-6">
          {services.map((service) => {
            const invalid = !isServiceValid(service);

            return (
              <div
                key={service.id}
                className={`p-6 rounded-xl space-y-4 ${
                  invalid ? "bg-red-50" : "bg-gray-50"
                }`}
              >
                {/* Service Name, Amount, Duration */}
                <div className="grid sm:grid-cols-12 gap-4">
                  <input
                    placeholder="Service name"
                    value={service.name}
                    onChange={(e) =>
                      updateService(service.id, "name", e.target.value)
                    }
                    className="sm:col-span-5 h-12 px-4 rounded-xl border"
                  />

                  <input
                    placeholder="Amount"
                    value={service.amount}
                    onChange={(e) =>
                      updateService(
                        service.id,
                        "amount",
                        e.target.value.replace(/\D/g, ""),
                      )
                    }
                    className="sm:col-span-3 h-12 px-4 rounded-xl border"
                  />

                  <div className="sm:col-span-3 relative">
                    <input
                      type="number"
                      placeholder="Duration (min)"
                      value={service.duration}
                      onChange={(e) =>
                        updateService(
                          service.id,
                          "duration",
                          e.target.value === "" ? "" : Number(e.target.value),
                        )
                      }
                      onFocus={() => setOpenDurationDropdown(service.id)}
                      onBlur={() =>
                        setTimeout(() => setOpenDurationDropdown(null), 200)
                      }
                      className="w-full h-12 px-4 rounded-xl border"
                    />

                    {openDurationDropdown === service.id && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                        {getFilteredDurationOptions(
                          service.duration.toString(),
                        ).map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              updateService(
                                service.id,
                                "duration",
                                option.value,
                              );
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

                  {services.length > 1 && (
                    <button
                      onClick={() => removeService(service.id)}
                      className="sm:col-span-1"
                    >
                      <Trash2 className="text-red-500" />
                    </button>
                  )}
                </div>

                {/* Description */}
                <textarea
                  placeholder="Service description (minimum 10 characters)"
                  value={service.description}
                  onChange={(e) =>
                    updateService(service.id, "description", e.target.value)
                  }
                  className="w-full h-24 p-3 rounded-xl border resize-none"
                />

                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Service Image
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload(service.id, e.target.files?.[0])
                      }
                      disabled={uploadingImageId === service.id}
                      className="flex-1 px-4 py-2 rounded-xl border disabled:opacity-50"
                    />
                    {uploadingImageId === service.id && (
                      <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                    )}
                    {service.image && uploadingImageId !== service.id && (
                      <img
                        src={service.image}
                        alt="Service preview"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                  </div>
                  {!service.image && uploadingImageId !== service.id && (
                    <p className="text-sm text-red-500">Image is optional</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={addService} className="mt-4 text-purple-600">
          <Plus className="inline w-4 h-4" /> Add Service
        </button>

        {/* BANK */}
        <div className="mt-10 space-y-4">
          <select
            value={bankDetails.bankName}
            onChange={(e) => {
              const bank = allBanks.find((b) => b.name === e.target.value);
              setBankDetails({
                bankName: bank?.name || "",
                bankCode: bank?.code || "",
                accountNumber: "",
                accountName: "",
                verified: false,
              });
            }}
            className="w-full h-12 px-4 rounded-xl border"
          >
            <option value="">Select Bank</option>
            {allBanks.map((b) => (
              <option key={b.code} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>

          <input
            maxLength={10}
            value={bankDetails.accountNumber}
            onChange={(e) =>
              setBankDetails((prev) => ({
                ...prev,
                accountNumber: e.target.value.replace(/\D/g, ""),
                verified: false,
              }))
            }
            placeholder="Account Number"
            className="w-full h-12 px-4 rounded-xl border"
          />

          {bankDetails.verified && (
            <div className="flex items-center gap-3 text-green-600">
              <CheckCircle2 /> {bankDetails.accountName}
            </div>
          )}

          {isVerifying && (
            <p className="flex items-center gap-2 text-purple-600">
              <Loader2 className="animate-spin" /> Verifying...
            </p>
          )}
        </div>

        <ButtonLongPurple
          onClick={handleNext}
          disabled={!isFormValid()}
          className="w-full mt-8 h-14"
        >
          Next: Review Details
        </ButtonLongPurple>
      </div>
    </PaidOnboardingLayout>
  );
};

export default PaidOnboardingSetupThree;
