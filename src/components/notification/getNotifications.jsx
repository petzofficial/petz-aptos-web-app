// In fetchNotifications.js or the relevant file
import axios from "axios";

export const FetchNotifications = async () => {
  const queryParams = {
    app_id: process.env.NEXT_PUBLIC_ONE_SIGNAL_APP_ID,
    limit: 10,
  };

  const headers = {
    Authorization: "Basic " + process.env.NEXT_PUBLIC_ONE_SIGNAL_API_KEY,
    Accept: "application/json",
  };

  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_ONE_SIGNAL_API_URL,
      {
        params: queryParams,
        headers: headers,
      }
    );

    // Return the response data
    return response.data;
  } catch (error) {
    // Throw the error to be caught by the calling function
    throw error;
  }
};

export const FetchSingleNotifications = async (notification_id) => {
  const queryParams = {
    app_id: process.env.NEXT_PUBLIC_ONE_SIGNAL_APP_ID,
    notification_id: notification_id,
  };

  const headers = {
    Authorization: "Basic " + process.env.NEXT_PUBLIC_ONE_SIGNAL_API_KEY,
    Accept: "application/json",
  };

  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_ONE_SIGNAL_API_URL + `/${notification_id}`,
      {
        params: queryParams,
        headers: headers,
      }
    );

    // Return the response data
    return response.data;
  } catch (error) {
    // Throw the error to be caught by the calling function
    throw error;
  }
};
