import { AdvancedMarker } from "@vis.gl/react-google-maps";
import Walking from "../../../../../assets/icons/Walking.svg?react";
import { useMapStore } from "../../../../../store/store";
import { useShallow } from "zustand/shallow";
import { useEffect } from "react";

export default function UserMarker() {
  const { userLocation } = useMapStore(
    useShallow((state) => ({
      userLocation: state.userLocation,
    }))
  );
  useEffect(()=>{
    console.log(userLocation)
  }, [userLocation])
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
