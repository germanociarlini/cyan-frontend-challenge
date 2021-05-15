import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "./Map.css";

const Map = (props) => {
  const refPosition = [-3.731862, -38.526669];
  const { activeControl } = props;

  const EventLayer = () => {
    useMapEvents({
      click(e) {
        console.log(`Treating map click ${e.latlng} for control ${activeControl}`);
      },
    });

    return <div></div>;
  };

  return (
    <MapContainer center={refPosition} zoom={12} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <EventLayer />
    </MapContainer>
  );
};

export default Map;
