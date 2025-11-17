// redux/features/insights/insightsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";
import type { InsightFormData, InsightState } from "@/types/insights";

const initialState: InsightState = {
  insights: [],
  selectedInsight: null,
  isLoading: false,
  error: null,
  meta: undefined,
};

// Get all insights
export const fetchInsights = createAsyncThunk(
  "insights/fetchInsights",
  async (
    params: {
      page?: number;
      limit?: number;
      searchTerm?: string;
      type?: string;
      status?: string;
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get("/insights", { params });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch insights"
      );
    }
  }
);

// Get insight by ID
export const fetchInsightById = createAsyncThunk(
  "insights/fetchInsightById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/insights/${id}`);
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch insight"
      );
    }
  }
);

// Create insight
export const createInsight = createAsyncThunk(
  "insights/createInsight",
  async (data: InsightFormData, { rejectWithValue }) => {
    try {
      const response = await api.post("/insights", data);
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.errorSources[0]?.message ||
          "Failed to create insight"
      );
    }
  }
);

// Update insight
export const updateInsight = createAsyncThunk(
  "insights/updateInsight",
  async (
    { id, data }: { id: string; data: InsightFormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(`/insights/${id}`, data);
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update insight"
      );
    }
  }
);

// Delete insight
export const deleteInsight = createAsyncThunk(
  "insights/deleteInsight",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/insights/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete insight"
      );
    }
  }
);

// Update insight status
export const updateInsightStatus = createAsyncThunk(
  "insights/updateInsightStatus",
  async (
    { id, status }: { id: string; status: "active" | "inactive" },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(`/insights/${id}`, { status });
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update insight status"
      );
    }
  }
);

const insightsSlice = createSlice({
  name: "insights",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedInsight: (state) => {
      state.selectedInsight = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all insights
    builder
      .addCase(fetchInsights.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInsights.fulfilled, (state, action) => {
        state.isLoading = false;
        state.insights = action.payload.data || [];
        state.meta = action.payload.meta;
      })
      .addCase(fetchInsights.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch insight by ID
    builder
      .addCase(fetchInsightById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInsightById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedInsight = action.payload;
      })
      .addCase(fetchInsightById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create insight
    builder
      .addCase(createInsight.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createInsight.fulfilled, (state, action) => {
        state.isLoading = false;
        state.insights.unshift(action.payload);
      })
      .addCase(createInsight.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update insight
    builder
      .addCase(updateInsight.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateInsight.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.insights.findIndex(
          (insight) => insight._id === action.payload._id
        );
        if (index !== -1) {
          state.insights[index] = action.payload;
        }
        if (state.selectedInsight?._id === action.payload._id) {
          state.selectedInsight = action.payload;
        }
      })
      .addCase(updateInsight.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Delete insight
    builder
      .addCase(deleteInsight.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteInsight.fulfilled, (state, action) => {
        state.isLoading = false;
        state.insights = state.insights.filter(
          (insight) => insight._id !== action.payload
        );
        if (state.selectedInsight?._id === action.payload) {
          state.selectedInsight = null;
        }
      })
      .addCase(deleteInsight.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update insight status
    builder
      .addCase(updateInsightStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateInsightStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.insights.findIndex(
          (insight) => insight._id === action.payload._id
        );
        if (index !== -1) {
          state.insights[index] = action.payload;
        }
        if (state.selectedInsight?._id === action.payload._id) {
          state.selectedInsight = action.payload;
        }
      })
      .addCase(updateInsightStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSelectedInsight } = insightsSlice.actions;
export default insightsSlice.reducer;
