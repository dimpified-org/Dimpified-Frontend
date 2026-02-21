// pages/auth/FreeOnboardingSetupThree.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CheckCircle2, Loader2, Plus, Trash2 } from "lucide-react";

import FreeOnboardingLayout from "../FreeOnboardingLayout";
import SubStepWrapper from "./SubStepWrapper";
import { ButtonLongPurple } from "../../../../../component/Buttons";
import dashboardApi from "../../../../../api/DashboardApi";
import { showToast } from "../../../../../component/ShowToast";

const durationOptions = [
  { value: 30, label: "30 Min" },
  { value: 60, label: "60 Min" },
  { value: 90, label: "90 Min" },
  { value: 120, label: "120 Min" },
  { value: 150, label: "150 Min" },
  { value: 180, label: "180 Min" },
];

const FreeOnboardingSetupThree = () => {
  const navigate = useNavigate();
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  const [services, setServices] = useState([
    { id: Date.now(), name: "", amount: "", duration: 30 },
  ]);

  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    bankCode: "",
    accountNumber: "",
    accountName: "",
    verified: false,
  });

  const [allBanks, setAllBanks] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);

  /* ---------------------------------- STORAGE ---------------------------------- */

  useEffect(() => {
    const saved = sessionStorage.getItem("services");
    const bank = sessionStorage.getItem("bankDetails");

    if (saved) setServices(JSON.parse(saved).services);
    if (bank) setBankDetails(JSON.parse(bank));
  }, []);

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

  const addService = () => {
    if (services.length >= 10)
      return showToast("Maximum of 10 services allowed", "error");

    setServices([
      ...services,
      { id: Date.now(), name: "", amount: "", duration: 30 },
    ]);
  };

  const updateService = (id, field, value) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const removeService = (id) => {
    if (services.length === 1) return;
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  /* -------------------------------- VALIDATION -------------------------------- */

  const isServiceValid = (service) => {
    return (
      service.name.trim().length >= 3 &&
      Number(service.amount) > 0 &&
      service.duration >= 30
    );
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
        "error"
      );
      return;
    }

    if (!sessionStorage.getItem("businessIdentity")) {
      navigate("/free/auth/business-identity");
      return;
    }

    if (!sessionStorage.getItem("availability")) {
      navigate("/free/auth/availability");
      return;
    }

    navigate("/free/auth/review");
  };

  /* ---------------------------------- UI ---------------------------------- */

  return (
    <FreeOnboardingLayout currentStep={3}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <SubStepWrapper currentSubStep={3} />

        <h1 className="text-3xl font-bold mb-2">Services & Payment</h1>
        <p className="text-gray-600 mb-8">
          Add your services and setup payouts
        </p>

        {/* SERVICES */}
        <div className="space-y-4">
          {services.map((service) => {
            const invalid = !isServiceValid(service);

            return (
              <div
                key={service.id}
                className={`grid sm:grid-cols-12 gap-4 p-4 rounded-xl ${
                  invalid ? "bg-red-50" : "bg-gray-50"
                }`}
              >
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
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  className="sm:col-span-3 h-12 px-4 rounded-xl border"
                />

                <select
                  value={service.duration}
                  onChange={(e) =>
                    updateService(
                      service.id,
                      "duration",
                      Number(e.target.value)
                    )
                  }
                  className="sm:col-span-3 h-12 px-4 rounded-xl border"
                >
                  {durationOptions.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>

                {services.length > 1 && (
                  <button onClick={() => removeService(service.id)}>
                    <Trash2 className="text-red-500" />
                  </button>
                )}
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
          width="w-full"
          disabled={!isFormValid()}
          className="bg-purple-600 mt-10 h-14 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
         
        >
          Next: Review Details
        </ButtonLongPurple>
      </div>
    </FreeOnboardingLayout>
  );
};

export default FreeOnboardingSetupThree;
