import React, { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, ArrowUpCircle } from "lucide-react";
import FreeDashboardLayout from "../../layout/Creator/FreeCreatorDashboard";
import { ButtonSmallPurple } from "../../component/Buttons";
import api from "../../api/DashboardApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const FreeAllBookings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [monthlyBooking, setMonthlyBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8;

  const userRole = useSelector((state) => state.auth.user?.role);
  const creatorId = useSelector((state) => state.auth.user?.creatorId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  // Fetch all bookings using the same endpoint as Overview
  useEffect(() => {
    const getMonthlyBooking = async () => {
      try {
        setLoading(true);
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
        console.error("Could not fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    getMonthlyBooking();
  }, [
    ecosystemDomain,
    creatorId,
    userRole,
    accessToken,
    refreshToken,
    dispatch,
    navigate,
  ]);

  // Use allBookings from the API response
  const allBookings = monthlyBooking?.allBookings || [];

  // Filter bookings based on search query
  const filteredBookings = allBookings.filter(
    (booking) =>
      booking.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.bookingId?.toLowerCase().includes(searchQuery.toLowerCase()),
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

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Format date
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
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">All Bookings</h2>
              <p className="text-gray-600 mt-1">
                View and manage all your bookings
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

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                  ) : currentBookings.length > 0 ? (
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
                          N{(booking.price || 0).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        No bookings found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {!loading && filteredBookings.length > 0 && (
              <div className="bg-white border-t border-gray-200 px-4 lg:px-6 py-4">
                {/* Results text - hidden on mobile */}
                <div className="hidden md:block text-sm text-gray-600 mb-3 lg:mb-0">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredBookings.length)} of{" "}
                  {filteredBookings.length} results
                </div>

                {/* Pagination Controls */}
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

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {/* Mobile: Current / Total */}
                    <div className="md:hidden flex items-center gap-2">
                      <span className="text-sm text-gray-700 font-medium">
                        {currentPage} / {totalPages}
                      </span>
                    </div>

                    {/* Desktop: Full page numbers */}
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
                        ),
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

export default FreeAllBookings;
