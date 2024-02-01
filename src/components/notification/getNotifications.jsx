import { useQuery } from "react-query";
import axios from "axios";

const fetchNotifications = async () => {
  const queryParams = {
    app_id: process.env.NEXT_PUBLIC_ONE_SIGNAL_APP_ID,
    limit: 10,
  };

  const headers = {
    Authorization: "Basic " + process.env.NEXT_PUBLIC_ONE_SIGNAL_API_KEY,
    Accept: "application/json",
  };

  const response = await axios.get(process.env.NEXT_PUBLIC_ONE_SIGNAL_API_URL, {
    params: queryParams,
    headers: headers,
  });

  return response.data;
};

const fetchSingleNotification = async (notification_id) => {
  const queryParams = {
    app_id: process.env.NEXT_PUBLIC_ONE_SIGNAL_APP_ID,
    notification_id: notification_id,
  };

  const headers = {
    Authorization: "Basic " + process.env.NEXT_PUBLIC_ONE_SIGNAL_API_KEY,
    Accept: "application/json",
  };

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ONE_SIGNAL_API_URL}/${notification_id}`,
    {
      params: queryParams,
      headers: headers,
    }
  );

  return response.data;
};

export const useNotifications = () => {
  return useQuery("notifications", fetchNotifications);
};

export const useSingleNotification = (notification_id) => {
  return useQuery(["notification", notification_id], () =>
    fetchSingleNotification(notification_id)
  );
};
