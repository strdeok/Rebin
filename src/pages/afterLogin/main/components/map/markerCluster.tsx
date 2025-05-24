import { useEffect, type JSX } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { customClusterRenderer } from "./customMarkerClusterer";
import type { Poi } from "../../../../../type/poi";

import Bottle from "../../../../../assets/icons/Bottle.svg?react";
import Battery from "../../../../../assets/icons/Battery.svg?react";
import Pill from "../../../../../assets/icons/Pill.svg?react";
import ReactDOMServer from "react-dom/server";

const categoryIcons: Record<string, JSX.Element> = {
  battery: <Battery fill="white" />,
  bottle: <Bottle fill="white" />,
  pill: <Pill fill="white" />,
};

function MarkerContent({ poi }: { poi: Poi }) {
  const icon = categoryIcons[poi.category];
  return (
    <div className="relative size-16">
      <img src="/images/Marker.png" className="w-full" alt="marker" />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {icon}
      </span>
    </div>
  );
}

function createCustomMarkerContent(poi: Poi): HTMLElement {
  const div = document.createElement("div");
  const htmlString = ReactDOMServer.renderToString(<MarkerContent poi={poi} />);
  div.innerHTML = htmlString;
  return div;
}

export default function ClusteredMarkers({ pois }: { pois: Poi[] }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const markers = pois.map(
      (poi) =>
        new google.maps.marker.AdvancedMarkerElement({
          position: poi.location,
          content: createCustomMarkerContent(poi),
        })
    );

    const clusterer = new MarkerClusterer({
      markers,
      map: null,
      renderer: { render: customClusterRenderer },
    });

    const updateClustering = () => {
      const zoom = map.getZoom();

      if (zoom !== undefined) {
        if (zoom <= 15) {
          clusterer.setMap(map);
        } else {
          clusterer.setMap(null);
        }
      }
    };

    updateClustering();
    const zoomListener = map.addListener("zoom_changed", updateClustering);

    return () => {
      google.maps.event.removeListener(zoomListener);
      clusterer.clearMarkers();
    };
  }, [map, pois]);

  return null;
}
