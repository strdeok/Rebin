import { Html5Qrcode } from "html5-qrcode";
import type { NavigateFunction } from "react-router-dom";

export const scanQRCode = (navigate: NavigateFunction): Promise<string> => {
  return new Promise((resolve, reject) => {
    const html5QrCode = new Html5Qrcode("reader");

    html5QrCode
      .start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: 250,
        },
        (decodedText) => {
          html5QrCode.stop().then(() => {
            html5QrCode.clear();
            resolve(decodedText);
            navigate("/auth-completed");
          });
        },
        (errorMessage) => {}
      )
      .catch((err) => {
        reject(err);
      });
  });
};
