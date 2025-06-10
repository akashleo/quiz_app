//import { useDispatch } from "react-redux";
import { isTokenValid } from "./slices/auth/AuthSlice";

//const dispatch = useDispatch();

export const errorHandler = (error, dispatch) => {
  // Handle network errors or missing response
  if (!error.response) {
    return "Network error. Please check your connection.";
  }

  const statusCode = error.response.status;
  const errorData = error.response.data;

  // Handle authentication errors
  if (statusCode === 401) {
    dispatch(isTokenValid(false));
    return errorData.message || "Unauthorized. Please log in again.";
  }

  // Handle authorization errors
  if (statusCode === 403) {
    return errorData.message || "Access denied. You don't have permission to perform this action.";
  }

  // Handle validation errors (original logic)
  if (statusCode === 412) {
    return errorData.error?.validationErrors?.[0]?.msg || "Validation error";
  }

  // Handle other backend errors
  if (errorData.error) {
    // Legacy error format
    if (errorData.content?.is_valid_token === false) {
      dispatch(isTokenValid(false));
      return null;
    }
    return errorData.error.msg || errorData.error.message || "An error occurred";
  }

  // Handle new error format from auth middleware
  if (errorData.message) {
    return errorData.message;
  }

  // Fallback
  return "An unexpected error occurred";
};