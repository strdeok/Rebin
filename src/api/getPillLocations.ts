import locationData from "../data/data.json";

export default function GetPillLocation() {
  const locations = locationData.map((location) => ({
    name: location.name,
    location: {
      lat: location.lat,
      lng: location.lng,
    },
    time: location.time,
    category: location.category,
  }));

  return locations;
}
