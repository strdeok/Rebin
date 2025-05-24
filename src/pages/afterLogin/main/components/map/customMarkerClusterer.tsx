import type { Cluster } from "@googlemaps/markerclusterer";

export function customClusterRenderer(
  cluster: Cluster
): google.maps.marker.AdvancedMarkerElement {
  const count = cluster.count;

  // 마커 외형을 감싸는 div 생성
  const container = document.createElement("div");
  container.style.width = "60px";
  container.style.height = "60px";
  container.style.borderRadius = "50%"; // 동그랗게
  container.style.backgroundColor = "green"; // 초록색
  container.style.display = "flex";
  container.style.alignItems = "center";
  container.style.justifyContent = "center";
  container.style.color = "white";
  container.style.fontWeight = "bold";
  container.style.fontSize = "16px";
  container.style.boxShadow = "0 0 8px rgba(0,0,0,0.3)";
  container.textContent = count.toString();

  return new google.maps.marker.AdvancedMarkerElement({
    position: cluster.position,
    content: container,
  });
}
