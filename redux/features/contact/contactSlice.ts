// redux/features/contact/contactSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";
import type { ContactInfo, ContactState } from "@/types/contact";

const initialState: ContactState = {
  contactInfo: null,
  isLoading: false,
  error: null,
};

// Get contact information
export const fetchContactInfo = createAsyncThunk(
  "contact/fetchContactInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/contact");
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch contact information"
      );
    }
  }
);

// Update contact information
export const updateContactInfo = createAsyncThunk(
  "contact/updateContactInfo",
  async (data: ContactInfo, { rejectWithValue }) => {
    try {
      const response = await api.patch("/contact", data);
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.errorSources[0]?.message ||
          "Failed to update contact information"
      );
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch contact info
    builder
      .addCase(fetchContactInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContactInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contactInfo = action.payload;
      })
      .addCase(fetchContactInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update contact info
    builder
      .addCase(updateContactInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateContactInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contactInfo = action.payload;
      })
      .addCase(updateContactInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = contactSlice.actions;
export default contactSlice.reducer;
