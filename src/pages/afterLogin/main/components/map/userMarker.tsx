import { AdvancedMarker } from "@vis.gl/react-google-maps";
import Walking from "../../../../../assets/icons/Walking.svg?react";

export default function UserMarker({
  userLocation,
}: {
  userLocation: google.maps.LatLngLiteral;
}) {
  return (
    <AdvancedMarker position={userLocation}>
      <div className="relative bg-[#19824F] size-20 rounded-full">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Walking fill="white" />
        </span>
      </div>
    </AdvancedMarker>
  );
}
