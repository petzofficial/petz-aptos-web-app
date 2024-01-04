import OneSignal from "react-onesignal";

export default async function runOneSignal() {
  try {
    OneSignal.init({
      appId: process.env.NEXT_PUBLIC_ONE_SIGNAL_APP_ID,
      autoRegister,
      autoResubscribe,
      allowLocalhostAsSecureOrigin,
    });
    OneSignal.Notifications.requestPermission();
  } catch (e) {
    console.log(e);
  }
}
