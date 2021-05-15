import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";

const Map = () => {
  const refPosition = [-3.731862, -38.526669];

  return (
    <MapContainer center={refPosition} zoom={12} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Map;
