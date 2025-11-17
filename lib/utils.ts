import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get today's date in YYYY-MM-DD format for min attribute
export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Convert date from display format to input format (YYYY-MM-DD)
export const convertToInputDate = (dateStr: string) => {
  if (!dateStr) return "";

  // If already in YYYY-MM-DD format
  if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return dateStr;
  }

  // Try to parse common formats like "10 Sept, 2025"
  try {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  } catch (e) {
    return "";
  }
  return "";
};

// Convert date from input format to display format
export const convertToDisplayDate = (dateStr: string) => {
  if (!dateStr) return "";

  try {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month}, ${year}`;
    }
  } catch (e) {
    return dateStr;
  }
  return dateStr;
};

export const getFullImageUrl = (imagePath: string) => {
  if (!imagePath) return null;

  // Already a full URL
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // Starts with /uploads (your backend serves from /uploads)
  if (imagePath.startsWith("/uploads")) {
    const assetsUrl =
      process.env.NEXT_PUBLIC_ASSETS_API_URL || "http://localhost:5000";
    return `${assetsUrl.replace(/\/$/, "")}${imagePath}`;
  }

  // Legacy support for /media paths
  if (imagePath.startsWith("/media")) {
    const assetsUrl =
      process.env.NEXT_PUBLIC_ASSETS_API_URL || "http://localhost:5000";
    return `${assetsUrl.replace(/\/$/, "")}${imagePath}`;
  }

  // For other paths, ensure they start with /
  return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
};

export const getFullImageFullUrl = (
  imagePath: string | null | undefined
): string => {
  if (!imagePath) return "";

  // If it's already a full URL, return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // If it starts with /uploads, prepend the backend URL
  if (imagePath.startsWith("/uploads")) {
    return `${
      process.env.NEXT_PUBLIC_ASSETS_API_URL || "http://localhost:5000"
    }${imagePath}`;
  }

  // Otherwise return as is (for paths like /hero.jpg)
  return imagePath;
};
