import React, { useState, useEffect } from "react";
import CreatorDashboardLayout from "../../layout/Creator/CreatorDashboardLayout";
import EditTemplateImage from "../../assets/EditTemplate.svg";
import { Heading } from "../../component/Text";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Country } from "country-state-city";
import { statesAndLGAs } from "../../data/StateAndLGA";
import { LabelImportant } from "../../component/Label";
import { LongInputWithPlaceholder } from "../../component/Inputs";
import { ButtonSmallPurple } from "../../component/Buttons";
import api from "../../api/DashboardApi";
import { useSelector } from "react-redux";
import { showToast } from "../../component/ShowToast";
import { Text } from "../../component/Text";
import { FaCamera, FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required("Full Name is required"),
  dateOfBirth: Yup.date().required("Date of Birth is required"),
  gender: Yup.string().required("Gender is required"),
  email: Yup.string().required("Email is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  businessName: Yup.string().required("Business Name is required"),
  websiteName: Yup.string().required("Website Address is required"),
  localGovernment: Yup.string().required(
    "Local Government Address is required",
  ),
  category: Yup.string().required("Business Category is required"),
  subcategory: Yup.string().required("Business Subcategory is required"),
  description: Yup.string().required("Business Description is required"),
});

const CreatorProfile = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/100",
  );
  const [profileImageFile, setProfileImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    getValues, // Add this line
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const creatorId = useSelector((state) => state.auth.user?.creatorId);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState(Object.keys(statesAndLGAs));
  const [localGovernments, setLocalGovernments] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [loading, setLoading] = useState(false);
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setProfileImageFile(file);
      await handleProfileImageUpdate(file);
    }
  };

  const handleProfileImageUpdate = async (file) => {
    if (!file || !creatorId) return;

    try {
      const response = await api.creatorUpdateProfileImage({
        accessToken,
        refreshToken,
        creatorId: parseFloat(creatorId),
        image: file,
      });
      if (response.status === 200) {
        showToast(response.data.message, "success");
        fetchProfile();
      } else {
        showToast("Profile image update failed", "error");
      }
    } catch (error) {
      console.error("Failed to update profile image:", error);
      showToast("Failed to update profile image: " + error.message, "error");
    }
  };

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
        email,
        dateOfBirth,
        gender,
        phoneNumber,
        state,
        localGovernment,
        country,
        profileImage,
        businessName,
        ecosystemDomain,
        category,
        subCategory,
        description,
      } = response.data.profile;

      setValue("fullname", fullname || "");
      setValue(
        "dateOfBirth",
        dateOfBirth ? new Date(dateOfBirth).toISOString().split("T")[0] : "",
      );
      setValue("gender", gender || "");
      setValue("email", email || "");
      setValue("phoneNumber", phoneNumber || "");
      setValue("country", country || "");
      setValue("businessName", businessName || "");
      setValue("websiteName", ecosystemDomain || "");
      setValue("category", category || "");
      setValue("subcategory", subCategory || "");
      setValue("description", description || "");

      if (profileImage) {
        setProfileImage(profileImage); // Update profile image state
      }

      if (state) {
        setValue("state", state);
        const lgas = statesAndLGAs[state] || [];
        setLocalGovernments(lgas);
        if (localGovernment && lgas.includes(localGovernment)) {
          setValue("localGovernment", localGovernment);
        } else {
          setValue("localGovernment", "");
        }
      }
    } catch (error) {
      console.error("Could not get profile data:", error);
    }
  };

  const handleWebsiteNameChange = (e) => {
    const domainValue = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "");
    // setValue("websiteName", domainValue);
  };

  useEffect(() => {
    fetchProfile();
    setCountries(Country.getAllCountries());
  }, [setValue, accessToken, refreshToken, creatorId]);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setValue("state", selectedState);
    setLocalGovernments(statesAndLGAs[selectedState] || []);
  };

  const handleCountryChange = (e) => {
    setValue("country", e.target.value);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const profileData = {
      accessToken,
      refreshToken,
      creatorId,
      fullname: data.fullname,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      phoneNumber: data.phoneNumber,
      state: data.state,
      localGovernment: data.localGovernment || "",
      country: data.country,
      businessName: data.businessName,
      websiteName: data.websiteName,
      category: data.category,
      subcategory: data.subcategory,
      description: data.description,
    };

    try {
      const response = await api.creatorUpdateProfile(profileData);
      if (response.status === 200) {
        setLoading(false);
        showToast(response.data.message, "success");
        fetchProfile();
      } else {
        setLoading(false);
        showToast("Profile update failed", "error");
      }
    } catch (error) {
      setLoading(false);
      console.error("Failed to update profile:", error);
    }
  };

  const handlePlanUpdate = () => {
    navigate("/creator/dashboard/Subscription");
  };

  return (
    <CreatorDashboardLayout>
      <div className="mt-5 relative bg-ter1 lg:w-full p-6 lg:p-10 mx-3 lg:mx-0 rounded-[8px] font-body">
        <Heading className="font-semibold text-[26px] text-primary4">
          Profile
        </Heading>
        <img
          src={EditTemplateImage}
          alt=""
          className="w-32 pr-6 right-0 bottom-0 absolute"
        />
      </div>
      <div className="mt-16 w-full max-w-3xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full">
          {/* Left Section: Profile Image Upload */}
          <div className="flex items-center gap-x-4">
            <div className="relative group w-24 h-24">
              <label htmlFor="profileImageUpload" className="cursor-pointer">
                {/* Profile Image */}
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-24 h-24 bg-slate-400 rounded-full object-cover border border-gray-300"
                />
                {/* Edit Icon */}
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 rounded-full transition-opacity duration-300">
                  <FaCamera className="text-white text-lg" />
                </span>
              </label>
              {/* Hidden File Input */}
              <input
                type="file"
                id="profileImageUpload"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Right Section: Upgrade Plan Button */}
          {/* <ButtonSmallPurple
            onClick={handlePlanUpdate}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 mt-4 lg:mt-0"
          >
            Upgrade Plan
          </ButtonSmallPurple> */}
        </div>

        <div className="flex items-center justify-between pb-2 my-10 mx-5 lg:mx-0">
          <h2 className="text-lg font-semibold text-purple-600">
            Personal Information
          </h2>
          <span className="flex-1 ml-4 border-b-4 border-purple-400"></span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-5  lg:mx-0 space-y-10 items-center gap-8 mt-8 ">
            {/* Form Section */}
            <div className="grid grid-cols-1  gap-6 w-full max-w-4xl">
              <div>
                <LabelImportant className="text-ter13">
                  Full Name
                </LabelImportant>
                <LongInputWithPlaceholder
                  {...register("fullname")}
                  placeholder="Your Full Name"
                  className="mt-1 w-full border border-sec2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary3"
                />
                {errors.fullname && (
                  <p className="text-ter7">{errors.fullname.message}</p>
                )}
              </div>
              <div className=" grid grid-cols-1 gap-7  md:grid-cols-2">
                <div>
                  <LabelImportant className="text-ter12">Email</LabelImportant>
                  <LongInputWithPlaceholder
                    {...register("email")}
                    placeholder="Your Phone Number"
                    className="mt-1 w-full border border-sec2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary3"
                  />
                  {errors.email && (
                    <p className="text-ter7">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <LabelImportant className="text-ter12">
                    Phone Number
                  </LabelImportant>
                  <LongInputWithPlaceholder
                    {...register("phoneNumber")}
                    placeholder="Your Phone Number"
                    className="mt-1 w-full border border-sec2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary3"
                  />
                  {errors.phoneNumber && (
                    <p className="text-ter7">{errors.phoneNumber.message}</p>
                  )}
                </div>
              </div>
              <div className=" grid grid-cols-1 gap-7  md:grid-cols-2">
                <div>
                  <LabelImportant className="text-ter12">Gender</LabelImportant>
                  <select
                    {...register("gender")}
                    className="mt-1 w-full border border-sec2 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary3"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-ter7">{errors.gender.message}</p>
                  )}
                </div>

                <div>
                  <LabelImportant className="text-ter12">
                    Date of Birth
                  </LabelImportant>
                  <LongInputWithPlaceholder
                    type="date"
                    {...register("dateOfBirth")}
                    className="mt-1 w-full border border-sec2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary3"
                  />
                  {errors.dateOfBirth && (
                    <p className="text-ter7">{errors.dateOfBirth.message}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pb-2 my-10">
                <h2 className="text-lg font-semibold text-purple-600">
                  Business and Website Details
                </h2>
                <span className="flex-1 ml-4 border-b-4 border-purple-400"></span>
              </div>

              <div className="mb-6">
                <label htmlFor="businessName" className=" flex mb-1">
                  Business Name<span className="text-red-500">*</span>
                  <FaPencilAlt className="ml-2 text-gray-500 text-sm" />
                </label>
                <LongInputWithPlaceholder
                  id="businessName"
                  placeholder="What is the name of your Business?"
                  className="border-sec4 bg-primary9 rounded p-2"
                  {...register("businessName", {
                    required: "Business Name is required",

                    onChange: handleWebsiteNameChange,
                  })}
                />
                {errors.businessName && (
                  <span className="text-red-500">
                    {errors.businessName.message}
                  </span>
                )}
              </div>

              {/* Website Name Field */}
              <div className="mb-6">
                <label htmlFor="websiteName" className="block mb-1">
                  Preferred Website Address
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <LongInputWithPlaceholder
                    id="websiteName"
                    readOnly
                    placeholder="Website address name"
                    className="border-sec4 bg-primary9/85 rounded p-2 w-full border-r-0 flex-grow"
                    {...register("websiteName", {
                      required: "Website Address is required",
                      onChange: handleWebsiteNameChange,
                    })}
                  />
                  <span className="border border-sec4 bg-primary9/85 rounded p-[10px] border-l-0">
                    .dimplified.com
                  </span>
                </div>
              </div>
              <div className=" grid grid-cols-1 gap-7  md:grid-cols-2">
                <div>
                  <div className="flex items-center">
                    <LabelImportant className="text-ter12 ">
                      Country
                    </LabelImportant>
                    <FaPencilAlt className="ml-2 text-gray-500 text-sm" />
                  </div>
                  <select
                    {...register("country")}
                    onChange={handleCountryChange}
                    className="mt-1 w-full border border-sec2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary3"
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  {errors.country && (
                    <p className="text-ter7">{errors.country.message}</p>
                  )}
                </div>
                <div>
                  <div className="flex items-center">
                    <LabelImportant className="text-ter12">
                      State
                    </LabelImportant>
                    <FaPencilAlt className="ml-2 text-gray-500 text-sm" />
                  </div>
                  <select
                    {...register("state")}
                    onChange={handleStateChange}
                    className="mt-1 w-full border border-sec2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary3"
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-ter7">{errors.state.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="max-w-4xl">
              <div>
                <div className="flex items-center">
                  <LabelImportant className="text-ter12">
                    Local Government
                  </LabelImportant>
                  <FaPencilAlt className="ml-2 text-gray-500 text-sm" />
                </div>
                <select
                  {...register("localGovernment")}
                  className="mt-1 w-full border border-sec2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary3"
                >
                  <option value="">Select Local Government</option>
                  {localGovernments.map((lga) => (
                    <option key={lga} value={lga}>
                      {lga}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="lg:flex gap-9 mb-6">
              <div className="w-full">
                <label htmlFor="businessCategory" className="block mb-1">
                  Business Category<span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  disabled
                  className="border border-sec4 bg-primary9/85 rounded p-2 w-full"
                  {...register("category", {
                    required: "Business Category is required",
                  })}
                >
                  <option value="Personal Care Services">
                    Personal Care Services
                  </option>
                </select>
                {errors.businessCategory && (
                  <span className="text-red-500">
                    {errors.businessCategory.message}
                  </span>
                )}
              </div>

              <div className="w-full">
                <label htmlFor="businessSubcategory" className="block mb-1">
                  Business Subcategory<span className="text-red-500">*</span>
                </label>
                <select
                  id="subcategory"
                  disabled
                  className="border border-sec4 bg-primary9/85 rounded p-2 w-full"
                  {...register("subcategory", {
                    required: "Business Subcategory is required",
                  })}
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)} // Update the selected value
                >
                  <option value="">-- Select SubCategory --</option>
                  <option value="Hair Salon">Hair Salon</option>
                  <option value="Barber Shop">Barber Shop</option>
                  <option value="Nail Salon">Nail Salon</option>
                  <option value="Spa and Wellness Center">
                    Spa and Wellness Center
                  </option>
                  <option value="Massage Therapy">Massage Therapy</option>
                  <option value="Skincare Clinic">Skincare Clinic</option>
                  <option value="Makeup Artist Services">
                    Makeup Artist Services
                  </option>
                  <option value="Personal Training and Fitness Coaching">
                    Personal Training and Fitness Coaching
                  </option>
                  <option value="Yoga and Pilates Studio">
                    Yoga and Pilates Studio
                  </option>
                  <option value="Weight Loss and Nutrition Counseling">
                    Weight Loss and Nutrition Counseling
                  </option>
                  <option value="Chiropractic Services">
                    Chiropractic Services
                  </option>
                  <option value="Mental Health Counseling">
                    Mental Health Counseling
                  </option>
                  <option value="Tattoo and Piercing Studio">
                    Tattoo and Piercing Studio
                  </option>
                  <option value="Aromatherapy Services">
                    Aromatherapy Services
                  </option>
                  <option value="Dental Hygiene Services">
                    Dental Hygiene Services
                  </option>
                  <option value="Reflexology Services">
                    Reflexology Services
                  </option>
                  <option value="Life Coaching">Life Coaching</option>
                  <option value="Eyelash Extension Services">
                    Eyelash Extension Services
                  </option>
                  <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                  <option value="Personal Stylist and Image Consulting">
                    Personal Stylist and Image Consulting
                  </option>
                </select>
                {errors.businessSubcategory && (
                  <span className="text-red-500">
                    {errors.businessSubcategory.message}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="businessDescription" className="flex mb-1">
                Please describe your Business
                <span className="text-red-500">*</span>
                <FaPencilAlt className="ml-2 text-gray-500 text-sm" />
              </label>
              <textarea
                id="description"
                className="w-full border border-sec4 bg-primary9 rounded p-2"
                placeholder="Describe what your Business does"
                rows={4}
                {...register("description", {
                  required: "Business Description is required",
                })}
              ></textarea>
              {errors.description && (
                <span className="text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>

            <ButtonSmallPurple
              type="submit"
              className="mt-8"
              disabled={loading}
            >
              {loading ? "Saving Profile" : "Save Profile"}
            </ButtonSmallPurple>
          </div>
        </form>
      </div>
    </CreatorDashboardLayout>
  );
};

export default CreatorProfile;
