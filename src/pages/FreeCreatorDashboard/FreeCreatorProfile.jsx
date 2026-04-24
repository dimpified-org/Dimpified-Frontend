import React, { useEffect, useState } from "react";
import { ArrowUpCircle, Mail, Phone, MapPin, User } from "lucide-react";
import FreeDashboardLayout from "../../layout/Creator/FreeCreatorDashboard";
import { ButtonSmallPurple } from "../../component/Buttons";
import api from "../../api/DashboardApi";
import { showToast } from "../../component/ShowToast";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required("Full Name is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  businessName: Yup.string().required("Business Name is required"),
  address: Yup.string().required("Address is required"),
  description: Yup.string().required("Description is required"),
});

const FreeCreatorProfile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const creatorId = useSelector((state) => state.auth.user?.creatorId);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Watch form values for display
  const formValues = watch();

  const fetchProfile = async () => {
    if (!accessToken || !refreshToken || !creatorId) return;

    try {
      const response = await api.creatorProfile({
        creatorId,
        accessToken,
        refreshToken,
      });

      const {
        fullname,
        address,
        email,
        phoneNumber,
        businessName,
        ecosystemDomain,
        description,
      } = response.data.profile;

      setValue("fullname", fullname || "");
      setValue("email", email || "");
      setValue("address", address || "");
      setValue("phoneNumber", phoneNumber || "");
      setValue("businessName", businessName || "");
      setValue("ecosystemDomain", ecosystemDomain || "");
      setValue("description", description || "");
    } catch (error) {
      console.error("Could not get profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [accessToken, refreshToken, creatorId]);

  const onSubmit = async (data) => {
    setLoading(true);
    const profileData = {
      accessToken,
      refreshToken,
      creatorId,
      fullname: data.fullname,
      phoneNumber: data.phoneNumber,
      businessName: data.businessName,
      address: data.address,
      description: data.description,
    };

    try {
      const response = await api.creatorUpdateProfile(profileData);
      if (response.status === 200) {
        setLoading(false);
        showToast(response.data.message, "success");
        setIsEditing(false);
        fetchProfile();
      } else {
        setLoading(false);
        showToast("Profile update failed", "error");
      }
    } catch (error) {
      setLoading(false);
      console.error("Failed to update profile:", error);
      showToast("Failed to update profile", "error");
    }
  };

  return (
    <FreeDashboardLayout>
      <div className="lg:p-10 p-4">
        <div className="w-full mx-auto">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Profile</h2>
              <p className="text-gray-600 mt-1">
                Manage your personal information
              </p>
            </div>
            {/* <ButtonSmallPurple
              bg="[#9F68FE]"
              className="text-white px-6 py-2 font-semibold flex items-center gap-2 transition-all rounded-xl whitespace-nowrap w-fit"
            >
              <ArrowUpCircle className="w-5 h-5" />
              Upgrade plan
            </ButtonSmallPurple> */}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Side - Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Avatar */}
                <div className="flex flex-col items-center mb-6">
                  <div className="w-32 h-32 bg-[#9F68FE] rounded-full flex items-center justify-center mb-4">
                    <User className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {formValues.fullname || "User"}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {formValues.businessName || "Business"}
                  </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-4 border-t pt-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-sm break-all">
                      {formValues.email || "No email"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">
                      {formValues.phoneNumber || "No phone"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">
                      {formValues.address || "No address"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form Sections */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information Section */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Personal Information
                    </h3>
                    {!isEditing ? (
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="bg-[#9F68FE] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#8854e6] transition-colors"
                      >
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            fetchProfile();
                          }}
                          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="bg-[#9F68FE] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#8854e6] transition-colors disabled:opacity-50"
                        >
                          {loading ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        {...register("fullname")}
                        disabled
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                      />
                      {errors.fullname && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.fullname.message}
                        </p>
                      )}
                    </div>

                    {/* Email Address (Read-only) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        disabled
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        {...register("phoneNumber")}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phoneNumber.message}
                        </p>
                      )}
                    </div>

                    {/* Business Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Name
                      </label>
                      <input
                        type="text"
                        {...register("businessName")}
                        disabled
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                      />
                      {errors.businessName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.businessName.message}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        {...register("address")}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.address.message}
                        </p>
                      )}
                    </div>

                    {/* Ecosystem Domain (Read-only) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website Domain
                      </label>
                      <input
                        type="text"
                        {...register("ecosystemDomain")}
                        disabled
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Description
                    </label>
                    <textarea
                      {...register("description")}
                      disabled={!isEditing}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                      placeholder="Tell us about your business..."
                    ></textarea>
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </FreeDashboardLayout>
  );
};

export default FreeCreatorProfile;
