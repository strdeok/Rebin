export type Poi = {
  name: string;
  location: google.maps.LatLngLiteral;
  category: "battery" | "bottle" | "pill";
};
