import OneSignal from "react-onesignal";

export default async function runOneSignal() {
  try {
    OneSignal.init({
      appId: process.env.NEXT_PUBLIC_ONE_SIGNAL_APP_ID,
    });
  } catch (e) {
    console.log(e);
  }
}
