import { useMap } from "@vis.gl/react-google-maps";
import { useEffect, useRef } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { BoundType } from "../types/boundType";

export default function GetMapBoundary({
  setBounds,
}: {
  setBounds: Dispatch<SetStateAction<BoundType>>;
}) {
  const map = useMap();
  const lastBoundsRef = useRef<BoundType>({
    east: 0,
    north: 0,
    south: 0,
    west: 0,
  });

  useEffect(() => {
    if (!map) return;

    const handleBoundsChanged = () => {
      const boundary = map.getBounds()?.toJSON();
      if (!boundary) return;

      if (boundary === lastBoundsRef.current) return;

      lastBoundsRef.current = boundary;
      setBounds(boundary as BoundType);
    };

    const listener = map.addListener("idle", handleBoundsChanged);

    return () => {
      listener.remove();
    };
  }, [map, setBounds]);

  return null;
}
