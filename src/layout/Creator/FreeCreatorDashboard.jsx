import React, { useState, useRef, useEffect, useMemo } from "react";
import { Menu, X, Calendar, Briefcase, User, LogOut } from "lucide-react";
import Logo from "../../assets/NewAuthImage/NewLogo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authentication";
import api from "../../api/DashboardApi";

// Helper function to get cached profile
const getCachedProfile = () => {
  try {
    const cached = localStorage.getItem('creatorProfile');
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      // Cache for 5 minutes (300000 ms)
      if (Date.now() - timestamp < 5 * 60 * 1000) {
        return data;
      }
    }
  } catch (error) {
    console.error('Error reading cache:', error);
  }
  return null;
};

// Helper function to set cached profile
const setCachedProfile = (data) => {
  try {
    localStorage.setItem('creatorProfile', JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch (error) {
    console.error('Error setting cache:', error);
  }
};

const FreeDashboardLayout = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get auth data from Redux
  const user = useSelector((state) => state.auth.user);
  const creatorId = user?.creatorId;
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  
  // Try to get name from multiple sources for faster display
  const [displayName, setDisplayName] = useState(() => {
    // Check cache first
    const cached = getCachedProfile();
    if (cached?.profile?.fullname) {
      return cached.profile.fullname;
    }
    // Fallback to user object from Redux
    return user?.fullname || user?.name || "Creator";
  });

  // Fetch creator profile in background and update cache
  useEffect(() => {
    const fetchProfile = async () => {
      if (!creatorId) return;
      
      try {
        const response = await api.creatorProfile({
          creatorId,
          accessToken,
          refreshToken,
          dispatch,
          navigate,
        });
        
        const profileName = response.data?.profile?.fullname;
        if (profileName && profileName !== displayName) {
          setDisplayName(profileName);
          // Cache the profile data
          setCachedProfile(response.data);
        }
      } catch (error) {
        console.error("Could not get creator profile:", error);
      }
    };

    fetchProfile();
  }, [creatorId, accessToken, refreshToken, dispatch, navigate, displayName]);

  // Get initials from display name - memoized for performance
  const initials = useMemo(() => {
    if (!displayName || displayName === "Creator") return "CU";
    const nameParts = displayName.trim().split(" ");
    if (nameParts.length === 1) {
      return nameParts[0].substring(0, 2).toUpperCase();
    }
    return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
  }, [displayName]);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    { label: "Overview", icon: Menu, path: "/free/creator/dashboard/overview" },
    {
      label: "Bookings",
      icon: Calendar,
      path: "/free/creator/dashboard/bookings",
    },
    {
      label: "Manage Service",
      icon: Briefcase,
      path: "/free/creator/dashboard/manage-service",
    },
    { label: "Profile", icon: User, path: "/free/creator/dashboard/profile" },
  ];

  const handleLogout = () => {
    // Clear cached profile on logout
    localStorage.removeItem('creatorProfile');
    dispatch(logout());
    navigate("/auth/login");
  };

  const handleProfileClick = () => {
    setIsProfileMenuOpen(false);
    navigate("/free/creator/dashboard/profile");
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:flex flex-col bg-[#F4F1FF] border-r border-[#BBB2B2] transition-all duration-300 p-2 w-64">
        {/* Logo */}
        <div className="py-6 px-4 flex justify-start">
          <div className="p-2">
            <Link to="/">
              <img
                src={Logo}
                alt="Logo"
                className="transition-all duration-300 w-40"
              />
            </Link>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 space-y-5">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? "bg-[#9F68FE] text-[#fff]"
                  : "text-[#364153] hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div
            className="w-64 h-full bg-[#F4F1FF]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 flex items-center justify-between">
              <div className="bg-[#fff] p-2">
                <Link to="/">
                  <img src={Logo} alt="Logo" className="w-20" />
                </Link>
              </div>
              <button onClick={() => setIsMobileSidebarOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="px-4 space-y-2">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? "bg-[#9F68FE] text-[#fff]"
                      : "text-[#364153] hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              <button
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-8"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 px-6 py-6 flex items-center justify-between">
          <button
            className="lg:hidden"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden lg:block">
            {/* Empty div for spacing on desktop */}
          </div>

          <div className="flex items-center gap-4 ml-auto relative" ref={profileMenuRef}>
            {/* Show immediately without waiting for API */}
            <span className="hidden sm:block font-medium text-gray-700">
              {displayName}
            </span>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              aria-label="Profile menu"
              aria-expanded={isProfileMenuOpen}
              aria-haspopup="true"
            >
              {initials}
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileMenuOpen && (
              <div 
                className="absolute right-0 top-14 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200 z-50"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="profile-menu"
              >
                <button
                  onClick={handleProfileClick}
                  className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                  role="menuitem"
                >
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 font-medium">Profile</span>
                </button>
                <div className="border-t border-gray-200 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                  role="menuitem"
                >
                  <LogOut className="w-5 h-5 text-red-600" />
                  <span className="text-red-600 font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content - Children */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default FreeDashboardLayout;