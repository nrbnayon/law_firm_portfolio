// redux/features/attorneys/attorneysSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";
import type {
  AttorneyFormData,
  AttorneyState,
} from "@/types/attorney";

const initialState: AttorneyState = {
  attorneys: [],
  selectedAttorney: null,
  isLoading: false,
  error: null,
  meta: undefined,
};

// Get all attorneys
export const fetchAttorneys = createAsyncThunk(
  "attorneys/fetchAttorneys",
  async (
    params: {
      page?: number;
      limit?: number;
      searchTerm?: string;
      status?: string;
      role?: string;
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get("/attorneys", { params });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch attorneys"
      );
    }
  }
);

// Get attorney by ID
export const fetchAttorneyById = createAsyncThunk(
  "attorneys/fetchAttorneyById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/attorneys/${id}`);
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch attorney"
      );
    }
  }
);

// Create attorney
export const createAttorney = createAsyncThunk(
  "attorneys/createAttorney",
  async (data: AttorneyFormData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      if (data.designation) {
        formData.append("designation", data.designation);
      }
      formData.append("location[line1]", data.location.line1);
      if (data.location.line2) {
        formData.append("location[line2]", data.location.line2);
      }
      if (data.location.line3) {
        formData.append("location[line3]", data.location.line3);
      }
      formData.append("biography", data.biography);

      if (data.profileImage && data.profileImage instanceof File) {
        formData.append("profileImage", data.profileImage);
      }
      if (data.bannerImage && data.bannerImage instanceof File) {
        formData.append("bannerImage", data.bannerImage);
      }

      data.education.forEach((edu, index) => {
        formData.append(`education[${index}]`, edu);
      });
      data.barAdmission.forEach((bar, index) => {
        formData.append(`barAdmission[${index}]`, bar);
      });
      data.professionalMemberships.forEach((member, index) => {
        formData.append(`professionalMemberships[${index}]`, member);
      });

      if (data.socialLinks) {
        if (data.socialLinks.facebook) {
          formData.append("socialLinks[facebook]", data.socialLinks.facebook);
        }
        if (data.socialLinks.twitter) {
          formData.append("socialLinks[twitter]", data.socialLinks.twitter);
        }
        if (data.socialLinks.linkedin) {
          formData.append("socialLinks[linkedin]", data.socialLinks.linkedin);
        }
      }

      if (data.status) {
        formData.append("status", data.status);
      }

      const response = await api.post("/attorneys", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.errorSources[0]?.message ||
          "Failed to create attorney"
      );
    }
  }
);

// Update attorney
export const updateAttorney = createAsyncThunk(
  "attorneys/updateAttorney",
  async (
    { id, data }: { id: string; data: AttorneyFormData },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      if (data.designation) {
        formData.append("designation", data.designation);
      }
      formData.append("location[line1]", data.location.line1);
      if (data.location.line2) {
        formData.append("location[line2]", data.location.line2);
      }
      if (data.location.line3) {
        formData.append("location[line3]", data.location.line3);
      }
      formData.append("biography", data.biography);

      if (data.profileImage) {
        if (data.profileImage instanceof File) {
          formData.append("profileImage", data.profileImage);
        }
      }
      if (data.bannerImage) {
        if (data.bannerImage instanceof File) {
          formData.append("bannerImage", data.bannerImage);
        }
      }

      data.education.forEach((edu, index) => {
        formData.append(`education[${index}]`, edu);
      });
      data.barAdmission.forEach((bar, index) => {
        formData.append(`barAdmission[${index}]`, bar);
      });
      data.professionalMemberships.forEach((member, index) => {
        formData.append(`professionalMemberships[${index}]`, member);
      });

      if (data.socialLinks) {
        if (data.socialLinks.facebook) {
          formData.append("socialLinks[facebook]", data.socialLinks.facebook);
        }
        if (data.socialLinks.twitter) {
          formData.append("socialLinks[twitter]", data.socialLinks.twitter);
        }
        if (data.socialLinks.linkedin) {
          formData.append("socialLinks[linkedin]", data.socialLinks.linkedin);
        }
      }

      if (data.status) {
        formData.append("status", data.status);
      }

      const response = await api.patch(`/attorneys/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.errorSources[0]?.message ||
          "Failed to update attorney"
      );
    }
  }
);

// Delete attorney
export const deleteAttorney = createAsyncThunk(
  "attorneys/deleteAttorney",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/attorneys/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete attorney"
      );
    }
  }
);

// Update attorney status
export const updateAttorneyStatus = createAsyncThunk(
  "attorneys/updateAttorneyStatus",
  async (
    { id, status }: { id: string; status: "active" | "inactive" },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(`/attorneys/${id}`, { status });
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.errorSources[0]?.message ||
          "Failed to update attorney status"
      );
    }
  }
);

const attorneysSlice = createSlice({
  name: "attorneys",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedAttorney: (state) => {
      state.selectedAttorney = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all attorneys
    builder
      .addCase(fetchAttorneys.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAttorneys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.attorneys = action.payload.data || [];
        state.meta = action.payload.meta;
      })
      .addCase(fetchAttorneys.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch attorney by ID
    builder
      .addCase(fetchAttorneyById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAttorneyById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedAttorney = action.payload;
      })
      .addCase(fetchAttorneyById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create attorney
    builder
      .addCase(createAttorney.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAttorney.fulfilled, (state, action) => {
        state.isLoading = false;
        state.attorneys.unshift(action.payload);
      })
      .addCase(createAttorney.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update attorney
    builder
      .addCase(updateAttorney.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAttorney.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.attorneys.findIndex(
          (attorney) => attorney._id === action.payload._id
        );
        if (index !== -1) {
          state.attorneys[index] = action.payload;
        }
        if (state.selectedAttorney?._id === action.payload._id) {
          state.selectedAttorney = action.payload;
        }
      })
      .addCase(updateAttorney.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Delete attorney
    builder
      .addCase(deleteAttorney.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteAttorney.fulfilled, (state, action) => {
        state.isLoading = false;
        state.attorneys = state.attorneys.filter(
          (attorney) => attorney._id !== action.payload
        );
        if (state.selectedAttorney?._id === action.payload) {
          state.selectedAttorney = null;
        }
      })
      .addCase(deleteAttorney.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update attorney status
    builder
      .addCase(updateAttorneyStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAttorneyStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.attorneys.findIndex(
          (attorney) => attorney._id === action.payload._id
        );
        if (index !== -1) {
          state.attorneys[index] = action.payload;
        }
        if (state.selectedAttorney?._id === action.payload._id) {
          state.selectedAttorney = action.payload;
        }
      })
      .addCase(updateAttorneyStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSelectedAttorney } = attorneysSlice.actions;
export default attorneysSlice.reducer;
