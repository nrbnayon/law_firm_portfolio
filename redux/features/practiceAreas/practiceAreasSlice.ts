// redux/features/practiceAreas/practiceAreasSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";
import type {
  PracticeAreaFormData,
  PracticeAreaState,
} from "@/types/practiceArea";

const initialState: PracticeAreaState = {
  practiceAreas: [],
  selectedPracticeArea: null,
  isLoading: false,
  error: null,
  meta: undefined,
};

// Get all practice areas
export const fetchPracticeAreas = createAsyncThunk(
  "practiceAreas/fetchPracticeAreas",
  async (
    params: {
      page?: number;
      limit?: number;
      searchTerm?: string;
      status?: string;
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get("/practice-areas", { params });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch practice areas"
      );
    }
  }
);

// Get practice area by ID
export const fetchPracticeAreaById = createAsyncThunk(
  "practiceAreas/fetchPracticeAreaById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/practice-areas/${id}`);
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch practice area"
      );
    }
  }
);

// Create practice area
export const createPracticeArea = createAsyncThunk(
  "practiceAreas/createPracticeArea",
  async (data: PracticeAreaFormData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.image && data.image instanceof File) {
        formData.append("image", data.image);
      }
      if (data.status) {
        formData.append("status", data.status);
      }

      const response = await api.post("/practice-areas", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.errorSources[0]?.message ||
          "Failed to create practice area"
      );
    }
  }
);

// Update practice area
export const updatePracticeArea = createAsyncThunk(
  "practiceAreas/updatePracticeArea",
  async (
    { id, data }: { id: string; data: PracticeAreaFormData },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.image) {
        if (data.image instanceof File) {
          formData.append("image", data.image);
        } else if (typeof data.image === "string") {
          // If it's a string (existing image URL), we might not need to send it
          // But if backend expects it, we can append it
        }
      }
      if (data.status) {
        formData.append("status", data.status);
      }

      const response = await api.patch(`/practice-areas/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.errorSources[0]?.message ||
          "Failed to update practice area"
      );
    }
  }
);

// Delete practice area
export const deletePracticeArea = createAsyncThunk(
  "practiceAreas/deletePracticeArea",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/practice-areas/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete practice area"
      );
    }
  }
);

// Update practice area status
export const updatePracticeAreaStatus = createAsyncThunk(
  "practiceAreas/updatePracticeAreaStatus",
  async (
    { id, status }: { id: string; status: "active" | "inactive" },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(`/practice-areas/${id}`, { status });
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update practice area status"
      );
    }
  }
);

const practiceAreasSlice = createSlice({
  name: "practiceAreas",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedPracticeArea: (state) => {
      state.selectedPracticeArea = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all practice areas
    builder
      .addCase(fetchPracticeAreas.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPracticeAreas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.practiceAreas = action.payload.data || [];
        state.meta = action.payload.meta;
      })
      .addCase(fetchPracticeAreas.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch practice area by ID
    builder
      .addCase(fetchPracticeAreaById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPracticeAreaById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedPracticeArea = action.payload;
      })
      .addCase(fetchPracticeAreaById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create practice area
    builder
      .addCase(createPracticeArea.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPracticeArea.fulfilled, (state, action) => {
        state.isLoading = false;
        state.practiceAreas.unshift(action.payload);
      })
      .addCase(createPracticeArea.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update practice area
    builder
      .addCase(updatePracticeArea.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePracticeArea.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.practiceAreas.findIndex(
          (pa) => pa._id === action.payload._id
        );
        if (index !== -1) {
          state.practiceAreas[index] = action.payload;
        }
        if (state.selectedPracticeArea?._id === action.payload._id) {
          state.selectedPracticeArea = action.payload;
        }
      })
      .addCase(updatePracticeArea.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Delete practice area
    builder
      .addCase(deletePracticeArea.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePracticeArea.fulfilled, (state, action) => {
        state.isLoading = false;
        state.practiceAreas = state.practiceAreas.filter(
          (pa) => pa._id !== action.payload
        );
        if (state.selectedPracticeArea?._id === action.payload) {
          state.selectedPracticeArea = null;
        }
      })
      .addCase(deletePracticeArea.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update practice area status
    builder
      .addCase(updatePracticeAreaStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePracticeAreaStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.practiceAreas.findIndex(
          (pa) => pa._id === action.payload._id
        );
        if (index !== -1) {
          state.practiceAreas[index] = action.payload;
        }
        if (state.selectedPracticeArea?._id === action.payload._id) {
          state.selectedPracticeArea = action.payload;
        }
      })
      .addCase(updatePracticeAreaStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSelectedPracticeArea } =
  practiceAreasSlice.actions;
export default practiceAreasSlice.reducer;
