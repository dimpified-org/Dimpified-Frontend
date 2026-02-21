import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/authApis";
import api2 from "../api/DashboardApi";

// Initial state for authentication
const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,
};

// creator login
export const creatorLogin = createAsyncThunk(
  "auth/creatorLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.creatorLogin({ email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

export const creatorLoginWithGoogle = createAsyncThunk(
  "auth/creatorLoginWithGoogle",
  async ({ token, refcode = null }, { rejectWithValue }) => {
    try {
      console.log("Dispatching Google auth with token:", token ? "Token present" : "No token");
      console.log("Refcode:", refcode);
      
      const response = await api.GoogleSignUp({ token, refcode });
      
      console.log("API Response data:", response.data);
      
      if (!response.data) {
        throw new Error("No data received from server");
      }
      
      // Store access token in localStorage for API calls
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        console.log("Access token stored for API calls");
      }
      
      return response.data;
    } catch (error) {
      console.error("Google auth thunk error:", error);
      return rejectWithValue(error.message || "Google authentication failed");
    }
  }
);

// edit profile auto login
export const editProfileAutoLogin = createAsyncThunk(
  "auth/editProfileAutoLogin",
  async ({ email, token }, { rejectWithValue }) => {
    try {
      const response = await api2.editProfileAutoLogin({ email, token });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// creator register
export const creatorRegister = createAsyncThunk(
  "auth/creatorRegister",
  async (
    {
      fullName,
      email,
      password,
      phoneNumber,
      gender,
      dateOfBirth,
      role,
      refCode,
      organizationName,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.creatorRegister({
        fullName,
        email,
        password,
        phoneNumber,
        gender,
        dateOfBirth,
        role,
        refCode,
        organizationName,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const newCreatorRegister = createAsyncThunk(
  "auth/newCreatorRegister",
  async (
    {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      acceptTerms,
      acceptMarketing,
      refCode
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.newCreatorRegister({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        acceptTerms,
        acceptMarketing,
        refCode
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

//affiliate login
export const affiliateLogin = createAsyncThunk(
  "afiliate/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.affiliateLogin({
        email,
        password,
      });
      if (response.status === 200) {
        const user = response.data;
        // Store access token
        if (user.accessToken) {
          localStorage.setItem('accessToken', user.accessToken);
        }
        return user;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const creatorSignupWithGoogle = createAsyncThunk(
  "auth/creatorSignupWithGoogle",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await api.GoogleSignUp({ token });
      
      // Store access token for API calls
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        console.log("Access token stored for API calls");
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const emailLogin = createAsyncThunk(
  "auth/emailLogin",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.emailLogin({
        email,
      });

      if (response.status === 200) {
        // Store access token
        if (response.data.accessToken) {
          localStorage.setItem('accessToken', response.data.accessToken);
        }
        return response.data;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      // Clear tokens from localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('jwtToken');
    },
    setAuthData: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      // Store in localStorage for API calls
      if (action.payload.accessToken) {
        localStorage.setItem('accessToken', action.payload.accessToken);
      }
      if (action.payload.refreshToken) {
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      }
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem('accessToken', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // creator auth
      .addCase(creatorLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(creatorLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
        // Store in localStorage
        if (action.payload.accessToken) {
          localStorage.setItem('accessToken', action.payload.accessToken);
        }
      })
      .addCase(creatorLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // handle email login
      .addCase(emailLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(emailLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
        // Store in localStorage
        if (action.payload.accessToken) {
          localStorage.setItem('accessToken', action.payload.accessToken);
        }
      })
      .addCase(emailLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // handle new creator register
      .addCase(newCreatorRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newCreatorRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
        // Store in localStorage
        if (action.payload.accessToken) {
          localStorage.setItem('accessToken', action.payload.accessToken);
        }
      })
      .addCase(newCreatorRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // handle creator register
      .addCase(creatorRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(creatorRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
        // Store in localStorage
        if (action.payload.accessToken) {
          localStorage.setItem('accessToken', action.payload.accessToken);
        }
      })
      .addCase(creatorRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // handle affiliate login
      .addCase(affiliateLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(affiliateLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
        // Store in localStorage
        if (action.payload.accessToken) {
          localStorage.setItem('accessToken', action.payload.accessToken);
        }
      })
      .addCase(affiliateLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.payload;
      })

      // handle edit profile auto login
      .addCase(editProfileAutoLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProfileAutoLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
        // Store in localStorage
        if (action.payload.accessToken) {
          localStorage.setItem('accessToken', action.payload.accessToken);
        }
      })
      .addCase(editProfileAutoLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //handle google Login
      .addCase(creatorLoginWithGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(creatorLoginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
        // Store in localStorage
        if (action.payload.accessToken) {
          localStorage.setItem('accessToken', action.payload.accessToken);
        }
      })
      .addCase(creatorLoginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { logout, updateAccessToken, setAuthData } = authSlice.actions;
export default authSlice.reducer;