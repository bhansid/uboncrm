import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const retailers = [
  {
    id: "R001",
    name: "ABC Stores",
    lat: -1.286389,
    lng: 36.817223,
    status: "Active",
  },
  {
    id: "R002",
    name: "Quick Mart",
    lat: -1.2635,
    lng: 36.8078,
    status: "Blocked",
  },
];

export default function RetailerMap() {
  return (
    <MapContainer
      center={[-1.286389, 36.817223]}
      zoom={12}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {retailers.map((r) => (
        <Marker key={r.id} position={[r.lat, r.lng]}>
          <Popup>
            <strong>{r.name}</strong>
            <br />
            Status: {r.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
