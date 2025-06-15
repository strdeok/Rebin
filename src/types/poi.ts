export type Poi = {
  name: string;
  location: google.maps.LatLngLiteral;
  time: string;
  category: "battery" | "bottle" | "pill";
};
