import { useEffect } from "react";
import { scanQRCode } from "../../../util/scanQR";
import { useNavigate } from "react-router-dom";

export default function ScanningQR() {
  const navigate = useNavigate();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      scanQRCode(navigate);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black">
      <div id="reader" className="w-full"></div>
    </div>
  );
}
