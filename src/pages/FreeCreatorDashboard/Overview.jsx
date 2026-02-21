import React, { useState, useEffect } from "react";
import {
  Copy,
  Share2,
  ArrowUpCircle,
  Search,
  Calendar,
  CheckCircle,
  DollarSign,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import FreeDashboardLayout from "../../layout/Creator/FreeCreatorDashboard";
import { ButtonSmallPurple } from "../../component/Buttons";
import api from "../../api/DashboardApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../component/ShowToast";

const FreeOverview = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [monthlyBooking, setMonthlyBooking] = useState(null);
  const [stats, setStats] = useState({
    totalBookings: 0,
    services: 0,
    revenue: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [creatorProfile, setCreatorProfile] = useState(null);

  const userRole = useSelector((state) => state.auth.user?.role);
  const creatorId = useSelector((state) => state.auth.user?.creatorId);
  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profileUrl = `https://dimpified.com/${ecosystemDomain}`;

  // Fetch creator profile
  const getCreatorProfile = async () => {
    try {
      const response = await api.creatorProfile({
        creatorId,
        accessToken,
        refreshToken,
        dispatch,
        navigate,
      });
      setCreatorProfile(response.data);
    } catch (error) {
      console.error("Could not get creator profile:", error);
    }
  };

  // Copy URL to clipboard
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      showToast("URL copied to clipboard!", "success");
    } catch (error) {
      console.error("Failed to copy:", error);
      showToast("Failed to copy URL", "error");
    }
  };

  // Share URL using Web Share API
  const handleShareUrl = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Dimpified Profile",
          text: "Check out my profile on Dimpified!",
          url: profileUrl,
        });
      } catch (error) {
        // User cancelled or error occurred
        if (error.name !== "AbortError") {
          console.error("Failed to share:", error);
          showToast("Failed to share URL", "error");
        }
      }
    } else {
      // Fallback to copy if Web Share API is not supported
      handleCopyUrl();
      showToast("Share not supported. URL copied instead!", "info");
    }
  };

  // Fetch bookings list
  const getMonthlyBooking = async () => {
    try {
      const response = await api.creatorBookingActivities({
        ecosystemDomain,
        creatorId,
        userType: userRole,
        accessToken,
        refreshToken,
        dispatch,
        navigate,
      });
      setMonthlyBooking(response.data);
    } catch (error) {
      console.error("Could not get bookings:", error);
    }
  };

  // Fetch stats (total bookings, services, revenue) from separate endpoint
  const getCreatorStats = async () => {
    try {
      const response = await api.creatorGetFreeOverviewMetrics({
        ecosystemDomain,
        accessToken,
        refreshToken,
        dispatch,
        navigate,
      });

      const data = response.data;
      setStats({
        totalBookings: data.bookingCount || 0,
        services: data.serviceCount || 0,
        revenue: data.totalRevenue || 0,
      });
    } catch (error) {
      console.error("Could not get creator stats:", error);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        getMonthlyBooking(), 
        getCreatorStats(),
        getCreatorProfile()
      ]);
      setLoading(false);
    };
    fetchData();
  }, [ecosystemDomain, accessToken, refreshToken, dispatch, navigate, creatorId]);

  // Use real bookings data
  const allBookings = monthlyBooking?.allBookings || [];

  // Filter bookings based on search term
  const filteredBookings = allBookings.filter(
    (booking) =>
      booking.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // Format date and time
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return timeString || "-";
  };

  return (
    <FreeDashboardLayout>
      <div className="lg:p-10 p-4">
        <div className="w-full mx-auto">
          {/* Page Title */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Overview</h2>
            <p className="text-gray-600 mt-1">
              Welcome back! Here's your booking overview
            </p>
          </div>

          {/* Welcome Card */}
          <div className="bg-gradient-to-r from-[#9F68FE] to-[#FFFFFF] rounded-2xl p-8 mb-6 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Welcome Back {creatorProfile?.profile?.fullname || ""}!
            </h3>
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-4 py-2">
                <span className="text-base whitespace-nowrap">
                  {profileUrl}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyUrl}
                  className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
                  title="Copy URL"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={handleShareUrl}
                  className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
                  title="Share URL"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
              <ButtonSmallPurple
                bg="[#9F68FE]"
                className="lg:ml-auto text-[#fff] px-6 py-1 font-semibold flex items-center gap-2 transition-all rounded-xl whitespace-nowrap"
              >
                <ArrowUpCircle className="w-5 h-5" />
                Upgrade plan
              </ButtonSmallPurple>
            </div>
            
            {/* Display Ecosystem Name */}
            {creatorProfile?.ecosystemDetails && (
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                  <span className="text-sm opacity-90">Ecosystem:</span>
                  <span className="ml-2 font-semibold">
                    {creatorProfile.ecosystemDetails.ecosystemName || ecosystemDomain}
                  </span>
                </div>
                {creatorProfile.ecosystemDetails.ecosystemIndustry && (
                  <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                    <span className="text-sm opacity-90">Industry:</span>
                    <span className="ml-2 font-semibold">
                      {creatorProfile.ecosystemDetails.ecosystemIndustry}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm">Total Bookings</span>
                <div className="w-10 h-10 bg-[#2B7FFF] rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#fff]" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {loading ? "-" : stats.totalBookings}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm">Services</span>
                <div className="w-10 h-10 bg-[#00C950] rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#fff]" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {loading ? "-" : stats.services}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm">Revenue</span>
                <div className="w-10 h-10 bg-[#2B7FFF] rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-[#fff]" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {loading ? "-" : `N${stats.revenue.toLocaleString()}`}
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full lg:w-2/5 pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Bookings Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Service
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Date & Time
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        Loading bookings...
                      </td>
                    </tr>
                  ) : currentBookings.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        No bookings found
                      </td>
                    </tr>
                  ) : (
                    currentBookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="font-medium text-gray-900">
                              {booking.name || "N/A"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.email || "N/A"}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                          {booking.service || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-gray-900">
                              {formatDate(booking.date)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatTime(booking.time)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                          N{booking.price?.toLocaleString() || 0}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination - Only show if there are bookings and not loading */}
            {!loading && filteredBookings.length > 0 && (
              <div className="bg-white border-t border-gray-200 px-4 lg:px-6 py-4">
                <div className="hidden md:block text-sm text-gray-600 mb-3 lg:mb-0">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredBookings.length)} of{" "}
                  {filteredBookings.length} results
                </div>
                <div className="flex items-center justify-between md:justify-end gap-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg transition-colors ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-1">
                    <div className="md:hidden flex items-center gap-2">
                      <span className="text-sm text-gray-700 font-medium">
                        {currentPage} / {totalPages}
                      </span>
                    </div>
                    <div className="hidden md:flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => handlePageClick(page)}
                            className={`px-3 py-1 rounded-lg transition-colors ${
                              currentPage === page
                                ? "bg-[#9F68FE] text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg transition-colors ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </FreeDashboardLayout>
  );
};

export default FreeOverview;