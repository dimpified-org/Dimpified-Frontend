import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { SiX } from "react-icons/si";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaShareAlt,
  FaCopy,
  FaTimes,
  FaWhatsapp,
} from "react-icons/fa";

// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://dimpified-bckend-development.azurewebsites.net/api/v1";
const POPULAR_API_URL = `${API_BASE_URL}/popular-blogs`;
const SINGLE_BLOG_API = `${API_BASE_URL}/view-blog`;
const ADD_COMMENT_API = `${API_BASE_URL}/add-comment`;
const GET_COMMENTS_API = `${API_BASE_URL}/comments`;

// CommentsSection Component with API Integration
function CommentsSection() {
  const { id } = useParams(); // Get blog ID from URL params
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch comments for this blog post
  useEffect(() => {
    if (id) {
      fetchComments();
    }
  }, [id]);

  const fetchComments = async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      // GET all comments per post: api/v1/comments/:blogId
      const response = await axios.get(`${GET_COMMENTS_API}/${id}`);
      console.log("Comments API Response:", response.data); // For debugging

      // Handle the response structure: { success, count, data }
      if (response.data.success && response.data.data) {
        setComments(response.data.data);
      } else {
        setComments([]);
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError(err.response?.data?.message || "Failed to load comments");
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!username || !message) {
      setError("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // POST comment: /api/v1/add-comment
      const response = await axios.post(
        ADD_COMMENT_API,
        {
          username,
          blogId: id,
          message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Add Comment Response:", response.data); // For debugging

      // Add the new comment to the list
      // Check if response has data property or is directly the comment
      const newComment = response.data.data || response.data;

      setComments([newComment, ...comments]);
      setSuccess(true);

      // Clear form
      setUsername("");
      setMessage("");

      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error submitting comment:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to submit comment. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Format date and time for comments
  const formatCommentDateTime = (dateString) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);

      // Format: "March 4, 2026 at 10:15 AM"
      return (
        date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }) +
        " at " +
        date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    } catch (error) {
      return "Unknown date";
    }
  };

  // Format relative time (e.g., "2 hours ago")
  const formatRelativeTime = (dateString) => {
    if (!dateString) return "";

    const createdTime = new Date(dateString).getTime();
    const now = new Date().getTime();
    const diffInSeconds = Math.floor((now - createdTime) / 1000);

    if (diffInSeconds < 60) return "Just now";

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
    }

    return "Just now";
  };

  return (
    <section className="w-full max-w-3xl px-4 mx-auto py-10">
      {/* Comment Form */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Leave a comment</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-md text-sm">
            Comment submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name *"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={submitting}
            className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            required
          />

          <textarea
            placeholder="Type your message *"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            disabled={submitting}
            className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            required
          />

          <button
            type="submit"
            disabled={submitting}
            className="bg-purple-500 text-white px-6 py-2 rounded-md text-sm hover:bg-purple-600 transition disabled:bg-purple-300 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
          >
            {submitting ? (
              <>
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>

      {/* Comments */}
      <div>
        <h3 className="text-sm font-semibold mb-6">
          {loading
            ? "Loading comments..."
            : comments.length === 1
              ? "1 comment"
              : `${comments.length} comments`}
        </h3>

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="flex items-start gap-4 border-b pb-6 animate-pulse"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4 mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="flex items-start gap-4 border-b pb-6"
              >
                {/* Avatar with better styling */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 text-white flex items-center justify-center font-semibold text-sm shadow-sm">
                    {comment.username?.charAt(0).toUpperCase() || "?"}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <p className="font-semibold text-sm text-gray-900">
                      {comment.username}
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      {/* Relative time (e.g., "2 hours ago") */}
                      <span className="text-purple-600 font-medium">
                        {formatRelativeTime(comment.createdAt)}
                      </span>
                      {/* Full date and time */}
                      {/* <span
                        className="text-gray-400"
                        title={formatCommentDateTime(comment.createdAt)}
                      >
                        {formatCommentDateTime(comment.createdAt)}
                      </span> */}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    {comment.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-2">No comments yet.</p>
            <p className="text-sm text-gray-400">
              Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
// Async thunk for fetching popular blogs
export const fetchPopularBlogs = createAsyncThunk(
  "blog/fetchPopularBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(POPULAR_API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch blogs",
      );
    }
  },
);

// Async thunk for fetching single blog by ID
export const fetchBlogById = createAsyncThunk(
  "blog/fetchBlogById",
  async (blogId, { rejectWithValue }) => {
    try {
      console.log("Fetching single blog from:", `${SINGLE_BLOG_API}/${blogId}`);
      const response = await axios.get(`${SINGLE_BLOG_API}/${blogId}`);
      console.log("Single blog response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching single blog:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch blog",
      );
    }
  },
);

// Async thunk for fetching blog comments
export const fetchBlogComments = createAsyncThunk(
  "blog/fetchBlogComments",
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${GET_COMMENTS_API}/${blogId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch comments",
      );
    }
  },
);

// Async thunk for adding a comment
export const addComment = createAsyncThunk(
  "blog/addComment",
  async ({ blogId, username, message }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        ADD_COMMENT_API,
        {
          username,
          blogId,
          message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add comment",
      );
    }
  },
);

// Initial state
const initialState = {
  popularBlogs: [],
  currentBlog: null,
  comments: [],
  loadingPopular: false,
  loadingSingle: false,
  loadingComments: false,
  addingComment: false,
  error: null,
  success: false,
  count: 0,
};

// Blog slice
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
    },
    clearComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch popular blogs
      .addCase(fetchPopularBlogs.pending, (state) => {
        state.loadingPopular = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchPopularBlogs.fulfilled, (state, action) => {
        state.loadingPopular = false;
        state.success = true;
        state.popularBlogs = action.payload.data || [];
        state.count = action.payload.count || 0;
      })
      .addCase(fetchPopularBlogs.rejected, (state, action) => {
        state.loadingPopular = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      })
      // Fetch single blog by ID
      .addCase(fetchBlogById.pending, (state) => {
        state.loadingSingle = true;
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loadingSingle = false;
        state.currentBlog = action.payload.blog;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loadingSingle = false;
        state.error = action.payload || "Failed to load blog";
      })
      // Fetch comments
      .addCase(fetchBlogComments.pending, (state) => {
        state.loadingComments = true;
        state.error = null;
      })
      .addCase(fetchBlogComments.fulfilled, (state, action) => {
        state.loadingComments = false;
        state.comments = action.payload.comments || [];
      })
      .addCase(fetchBlogComments.rejected, (state, action) => {
        state.loadingComments = false;
        state.error = action.payload || "Failed to load comments";
      })
      // Add comment
      .addCase(addComment.pending, (state) => {
        state.addingComment = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.addingComment = false;
        state.success = true;
        // Add the new comment to the beginning of the comments array
        if (action.payload.comment) {
          state.comments = [action.payload.comment, ...state.comments];
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.addingComment = false;
        state.error = action.payload || "Failed to add comment";
      });
  },
});

// Store configuration
const store = configureStore({
  reducer: {
    blog: blogSlice.reducer,
  },
});

// Export actions
export const { clearError, clearCurrentBlog, clearComments } =
  blogSlice.actions;

// Format time ago function
const formatTimeAgo = (dateString) => {
  if (!dateString) return "";

  const createdTime = new Date(dateString).getTime();
  const now = new Date().getTime();
  const diffInSeconds = Math.floor((now - createdTime) / 1000);

  if (diffInSeconds < 60) return "Just now";

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
};

// Format date function
const formatDate = (dateString) => {
  if (!dateString) return "No date";
  try {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  } catch (error) {
    return "Invalid date";
  }
};

// Section Header Component
const SectionHeader = ({ title }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
    <button className="px-4 py-2 text-sm bg-violet-600 font-semibold rounded-lg text-white transition duration-200 shadow-md hover:shadow-lg focus:outline-none hover:bg-violet-800">
      View All
    </button>
  </div>
);

// Post Card Component for Popular Posts
const PostCard = ({ post, onNavigateToBlog }) => {
  const handleCardClick = () => {
    if (post?._id) {
      onNavigateToBlog(post._id);
    }
  };

  return (
    <div className="cursor-pointer group" onClick={handleCardClick}>
      {/* IMAGE */}
      <div className="w-full h-52 rounded-2xl overflow-hidden mb-4">
        <img
          src={post.coverPicture || "https://picsum.photos/500/400"}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* NAME AND TIME CREATED */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Link
            to={`/author/${post.author?._id}`}
            onClick={(e) => e.stopPropagation()}
            className="font-medium text-gray-900 hover:underline text-sm"
          >
            {post.author?.fullName || "Unknown Author"}
          </Link>
        </div>
        <span className="text-gray-400 text-sm">
          {formatTimeAgo(post.createdAt || post.dateTime)}
        </span>
      </div>

      {/* TITLE */}
      <h3 className="text-lg font-bold text-gray-900 leading-snug mb-4 group-hover:text-purple-600 transition-colors">
        {post.title || "Untitled"}
      </h3>

      {/* CATEGORY AND DATE CREATED */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <span className="px-2 py-0.5 text-black font-medium">
          {(post.category || "uncategorized").charAt(0).toUpperCase() +
            (post.category || "uncategorized").slice(1)}
        </span>
        <span className="ml-auto">
          {post.createdAt
            ? new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "Unknown date"}
        </span>
      </div>
    </div>
  );
};

// Loading Skeleton for Popular Posts
const LoadingSkeleton = () => (
  <Swiper
    modules={[Autoplay]}
    spaceBetween={30}
    slidesPerView={3}
    autoplay={{
      delay: 4000,
      disableOnInteraction: false,
    }}
    className="mySwiper"
  >
    {[1, 2, 3, 4, 5, 6, 7].map((n) => (
      <SwiperSlide key={n}>
        <div className="h-full">
          {/* Image skeleton */}
          <div className="w-full h-52 bg-gray-200 animate-pulse rounded-2xl mb-4"></div>

          {/* Name and time skeleton */}
          <div className="flex items-center justify-between mb-3">
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4"></div>
          </div>

          {/* Title skeleton */}
          <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4 mb-4"></div>

          {/* Category and date skeleton */}
          <div className="flex items-center justify-between mb-3">
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3"></div>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
);

// ShareSection Component
const ShareSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentUrl = window.location.href;
  const pageTitle = document.title || "Check out this blog post!";

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl,
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      currentUrl,
    )}&text=${encodeURIComponent(pageTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentUrl,
    )}`,
    email: `mailto:?subject=${encodeURIComponent(
      pageTitle,
    )}&body=${encodeURIComponent(`Check out this article: ${currentUrl}`)}`,
  };

  const handleInlineShare = (platform) => {
    const shareUrl = shareLinks[platform];

    if (platform === "email") {
      window.location.href = shareUrl;
    } else {
      window.open(
        shareUrl,
        "_blank",
        "noopener,noreferrer,width=600,height=400",
      );
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setShowModal(false);
    } catch (err) {
      console.error("Failed to copy:", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setShowModal(false);
    }
  };

  const handleShareClick = () => {
    setShowModal(true);
  };

  return (
    <>
      {/* All elements on one line with HR lines */}
      <div className="w-full py-8">
        <div className="flex items-center justify-center gap-4 text-gray-500 text-sm">
          {/* Left HR line */}
          <div className="flex-1 h-px bg-gray-300" />

          {/* Share Button */}
          <button
            onClick={handleShareClick}
            className="flex items-center gap-2 hover:text-violet-600 transition-colors group"
            aria-label="Share this post"
            title="Share this post"
          >
            <FaShareAlt className="text-lg group-hover:scale-110 transition-transform" />
            <span className="uppercase tracking-wide">Share</span>
          </button>

          {/* Vertical separator */}
          <div className="h-4 w-px bg-gray-300" />

          {/* Social Media Icons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleInlineShare("facebook")}
              className="hover:text-blue-600 transition p-1"
              aria-label="Share on Facebook"
              title="Share on Facebook"
            >
              <FaFacebookF className="text-base" />
            </button>

            <button
              onClick={() => handleInlineShare("twitter")}
              className="hover:text-black transition p-1"
              aria-label="Share on Twitter/X"
              title="Share on Twitter/X"
            >
              <SiX className="text-base" />
            </button>

            <button
              onClick={() => handleInlineShare("linkedin")}
              className="hover:text-blue-700 transition p-1"
              aria-label="Share on LinkedIn"
              title="Share on LinkedIn"
            >
              <FaLinkedinIn className="text-base" />
            </button>

            <button
              onClick={() => handleInlineShare("email")}
              className="hover:text-green-500 transition p-1"
              aria-label="Share via Email"
              title="Share via Email"
            >
              <FaWhatsapp className="text-base" />
            </button>
          </div>

          {/* Right HR line */}
          <div className="flex-1 h-px bg-gray-300" />
        </div>
      </div>

      {/* Share Modal/Popup for additional options */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeIn">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                Share this post
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                aria-label="Close modal"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Copy Link Section */}
              <div className="mb-8">
                <p className="text-sm text-gray-600 mb-3">Copy link</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={currentUrl}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent truncate"
                  />
                  <button
                    onClick={handleCopyLink}
                    className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                      copied
                        ? "bg-green-100 text-green-700 border border-green-300"
                        : "bg-violet-600 text-white hover:bg-violet-700 border border-violet-600"
                    }`}
                  >
                    <FaCopy />
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
              </div>

              {/* Social Media Buttons */}
              <div>
                <p className="text-sm text-gray-600 mb-4">Share via</p>
                <div className="grid grid-cols-4 gap-4">
                  {/* Facebook */}
                  <button
                    onClick={() => {
                      handleInlineShare("facebook");
                      setShowModal(false);
                    }}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-all duration-300 group"
                    aria-label="Share on Facebook"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center mb-2 transition-colors">
                      <FaFacebookF className="text-2xl" />
                    </div>
                    <span className="text-xs font-medium">Facebook</span>
                  </button>

                  {/* Twitter/X */}
                  <button
                    onClick={() => {
                      handleInlineShare("twitter");
                      setShowModal(false);
                    }}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-black bg-opacity-5 hover:bg-opacity-10 text-gray-900 transition-all duration-300 group"
                    aria-label="Share on Twitter/X"
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-200 group-hover:bg-gray-300 flex items-center justify-center mb-2 transition-colors">
                      <SiX className="text-2xl" />
                    </div>
                    <span className="text-xs font-medium">Twitter</span>
                  </button>

                  {/* LinkedIn */}
                  <button
                    onClick={() => {
                      handleInlineShare("linkedin");
                      setShowModal(false);
                    }}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 transition-all duration-300 group"
                    aria-label="Share on LinkedIn"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center mb-2 transition-colors">
                      <FaLinkedinIn className="text-2xl" />
                    </div>
                    <span className="text-xs font-medium">LinkedIn</span>
                  </button>

                  <button
                    onClick={() => {
                      handleInlineShare("email");
                      setShowModal(false);
                    }}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-700 transition-all duration-300 group"
                    aria-label="Share via Email"
                  >
                    <div className="w-12 h-12 rounded-full bg-green-100 group-hover:bg-green-200 flex items-center justify-center mb-2 transition-colors">
                      <FaWhatsapp className="text-2xl" />
                    </div>
                    <span className="text-xs font-medium">Whatsapp</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add CSS animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

// Loading Spinner for Single Blog
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[60vh]">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      <p className="mt-4 text-gray-600">Loading blog post...</p>
    </div>
  </div>
);

// Error Display Component
const ErrorDisplay = ({ error, onRetry }) => (
  <div className="flex flex-col justify-center items-center min-h-[60vh] px-4">
    <p className="text-red-500 text-lg mb-4">{error}</p>
    <button
      onClick={onRetry}
      className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
    >
      Try Again
    </button>
  </div>
);

// Main SingleBlogPage Component
const SingleBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { popularBlogs, currentBlog, loadingPopular, loadingSingle, error } =
    useSelector((state) => state.blog);

  // Fetch popular blogs on component mount
  useEffect(() => {
    dispatch(fetchPopularBlogs());
  }, [dispatch]);

  // Fetch single blog if ID exists in URL
  useEffect(() => {
    if (id) {
      console.log("Fetching blog with ID:", id);
      dispatch(fetchBlogById(id));
    }

    // Cleanup on unmount
    return () => {
      dispatch(clearCurrentBlog());
    };
  }, [id, dispatch]);

  const handleNavigateToBlog = (blogId) => {
    // Navigate to the same page but with the blog ID
    navigate(`/blog/${blogId}`);
  };

  const handleRetryPopular = () => {
    dispatch(fetchPopularBlogs());
  };

  const handleRetrySingle = () => {
    if (id) {
      dispatch(fetchBlogById(id));
    }
  };

  // CSS styles for blog content links
  const blogContentStyles = `
    .blog-content a {
      color: #9333ea !important;
      text-decoration: underline !important;
      transition: all 0.2s ease-in-out !important;
    }
    
    .blog-content a:hover {
      color: #7c3aed !important;
      text-decoration-thickness: 2px !important;
      text-underline-offset: 2px !important;
    }
    
    .blog-content a:visited {
      color: #7e22ce !important;
    }
    
    .blog-content a:focus {
      outline: 2px solid #8b5cf6 !important;
      outline-offset: 2px !important;
    }
  `;

  // Function to process blog content HTML and ensure links have proper styling
  const processBlogContent = (htmlContent) => {
    if (!htmlContent) return htmlContent;
    return `<div class="blog-content">${htmlContent}</div>`;
  };

  // MAIN PAGE LAYOUT
  return (
    <div className="w-full bg-white text-gray-800">
      <style>{blogContentStyles}</style>
      {/* Navbar */}
      <Navbar />

      {/* ARTICLE SECTION */}
      <section className="py-16 px-6 md:px-32 lg:px-60 mx-auto">
        {id && currentBlog ? (
          <article>
            <div className="mb-6 ">
              <div className="flex flex-wrap items-center gap-7 mb-2 mt-10">
                <span className="px-4 py-1.5 text-sm font-semibold bg-purple-100 text-purple-600 uppercase rounded-full">
                  {currentBlog.category || "Uncategorized"}
                </span>
                <span className="text-sm text-gray-500">
                  {formatDate(currentBlog.dateTime || currentBlog.createdAt)}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 mt-8 md:mb-16">
                {currentBlog.title}
              </h1>
            </div>

            {/* Featured Image */}
            {currentBlog.coverPicture && (
              <div className="w-full h-96 rounded-2xl overflow-hidden mb-8">
                <img
                  src={
                    currentBlog.coverPicture || "https://picsum.photos/1200/600"
                  }
                  alt={currentBlog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Author */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Link
                  to={`/author/${currentBlog.author?._id}`}
                  className="font-medium text-gray-900 hover:underline text-sm"
                >
                  By {currentBlog.author?.fullName || "Unknown Author"}
                </Link>
              </div>
              <span className="text-gray-400 text-sm">
                {formatTimeAgo(currentBlog.createdAt || currentBlog.dateTime)}
              </span>
            </div>

            {/* Blog Content */}
            <div className="text-gray-700 leading-relaxed blog-content">
              {currentBlog.content ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: processBlogContent(currentBlog.content),
                  }}
                />
              ) : (
                <p>No content available for this blog post.</p>
              )}
            </div>
          </article>
        ) : (
          // ORIGINAL UI CONTENT (when no ID or home view)
          <div>
            <div className="mb-6">
              <p className="text-sm text-black uppercase font-medium mb-2 mt-10">
                Development
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 mt-8">
                How to make a Game look more attractive <br />
                with New VR & AI Technology
              </h1>
            </div>

            <img
              src="https://i.imghippo.com/files/pehl4341DnM.jpg"
              alt="VR Technology"
              className="w-full h-[400px] rounded-lg shadow-md mb-10 object-cover"
            />

            <p className="text-gray-600 mb-6 leading-relaxed">
              Google has been investing in AI for many years and bringing its
              benefits to individuals, businesses and communities. Whether it's
              publishing state-of-the-art research, building helpful products or
              developing tools and resources that enable others, we're committed
              to making AI accessible to everyone.{" "}
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We're now at a pivotal moment in our AI journey. Breakthroughs in
              generative AI are fundamentally changing how people interact with
              technology — and at Google, we've been responsibly developing
              large language models so we can safely bring them to our products.
              Today, we're excited to share our early progress. Developers and
              businesses can now try new APIs and products that make it easy,
              safe and scalable to start building with Google's best AI models
              through Google Cloud and a new prototyping environment called
              MakerSuite. And in Google Workspace, we're introducing new
              features that help people harness the power of generative AI to
              create, connect and collaborate.
            </p>

            <blockquote className="border-l-4 border-purple-700 pl-4 italic text-gray-700 mb-6">
              "People worry that computers will get too smart and take over the
              world, but the real problem is that they're too stupid and they've
              already taken over the world."
              <p className="mt-3 font-bold">– Pedro Domingos</p>
            </blockquote>

            <p className="text-gray-600 mb-8 leading-relaxed">
              When you combine VR with AI, players can dive into personalized
              immersive experiences. Games now adapt dynamically to the player's
              behavior, increasing engagement. Developers are constantly finding
              innovative ways to bring realism and interactivity to virtual
              worlds.
            </p>

            <div className="flex justify-center mb-10">
              <img
                src="https://i.imghippo.com/files/mWK7369I.jpg"
                alt="VR Example"
                className="w-full h-[350px] md:w-3/4 rounded-lg shadow-md object-cover"
              />
            </div>

            <p className="text-gray-600 leading-relaxed">
              We're so excited by the potential of generative AI, and the
              opportunities it will unlock — from helping people express
              themselves creatively, to helping developers build brand new types
              of applications, to transforming how businesses and governments
              engage their customers and constituents. Stay tuned for more to
              come in the weeks and months ahead.
            </p>
          </div>
        )}
      </section>

      {/* Share Section - All elements on one line */}
      <div className="max-w-5xl mx-auto px-4 md:px-16">
        <ShareSection />
      </div>

       {/* Comments Section - Now Integrated with Updated API */}
      <CommentsSection />

      {/* Popular Post Section with Swiper */}
      <section className="py-16 px-6 md:px-64 bg-white">
        <SectionHeader title="Popular Post" />

        {loadingPopular ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">Error: {error}</p>
            <button
              onClick={handleRetryPopular}
              className="mt-4 px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
            >
              Retry
            </button>
          </div>
        ) : popularBlogs.length > 0 ? (
          <>
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              speed={800}
              className="mySwiper"
            >
              {popularBlogs.map((post) => (
                <SwiperSlide key={post._id}>
                  <PostCard
                    post={post}
                    onNavigateToBlog={handleNavigateToBlog}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No popular posts available</p>
          </div>
        )}
      </section>

     

      {/* Newsletter Section */}
      <section className="bg-purple-700 text-white py-16 text-center">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4">
          Get our stories delivered from <br />
          us to your inbox weekly.
        </h3>
        <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto px-4">
          <input
            type="email"
            placeholder="Your Email"
            className="w-full sm:w-2/3 px-4 py-3 rounded-md text-gray-800 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-purple-700 text-white px-6 py-3 rounded-md hover:text-purple-700 hover:bg-white border border-white"
          >
            Get started
          </button>
        </form>
        <p className="mt-6">
          Get a response tomorrow if you submit by 9pm today. If we received
          after 9pm will get a reponse the <br />
          following day.
        </p>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Wrapper Component with Redux Provider
const SingleBlogPageWithRedux = () => {
  return (
    <Provider store={store}>
      <SingleBlogPage />
    </Provider>
  );
};

// Export BOTH components - this is important!
export { SingleBlogPageWithRedux as default, SingleBlogPage };
