import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { BASE_URL } from "../data/baseUrl";
import { enqueueSnackbar } from "notistack";
import { handleLogout } from "../utils/handleLogout";

export const baseQuery = async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("adminToken");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      headers.set("Accept-Language", "en");
      return headers;
    },
  });

  const result = await rawBaseQuery(args, api, extraOptions);
  if (result?.error) {
    const status = result.error?.status;
    if (result?.error?.status === "FETCH_ERROR") {
      enqueueSnackbar("Unable to connect to server. Please try again later.", {
        variant: "error",
      });
      console.error("Network error:", result.error.error);
      return result;
    }
    switch (status) {
      case 401:
        enqueueSnackbar("Session expired. Please log in again.", {
          variant: "error",
        });
        Cookies.remove("adminToken");
        Cookies.remove("adminData");
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        break;

      case 400:
        enqueueSnackbar(
          result?.error?.data?.error ||
            result?.error?.data?.message ||
            "Something went wrong.",
          {
            variant: "error",
          },
        );
        console.warn("fwefew");
        break;

      case 403:
        enqueueSnackbar(
          result?.error?.data?.message ||
            result?.error?.data?.error ||
            "You do not have permission.",
          {
            variant: "error",
          },
        );
        handleLogout();
        console.warn("Forbidden: You do not have permission.");
        break;

      case 404:
        enqueueSnackbar(
          result?.error?.message ||
            result?.error?.data?.error ||
            "Oops! Resource not found!",
          {
            variant: "error",
          },
        );
        console.warn("Resource not found.");
        break;

      case 500:
        enqueueSnackbar(
          result?.error?.message ||
            result?.error?.data?.error ||
            "Something went wrong!",
          {
            variant: "error",
          },
        );
        console.error("Server error occurred.");
        break;

      default:
        enqueueSnackbar(
          result?.error?.data?.message ||
            result?.error?.message ||
            result?.error?.data?.error ||
            "Something went wrong!",
          {
            variant: "error",
          },
        );
        console.error("Unhandled API error:", result.error);
        break;
    }
  }

  return result;
};
