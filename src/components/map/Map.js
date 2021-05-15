import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import FeatureLayer from "./FeatureLayer";
import "./Map.css";

const Map = (props) => {
  const refPosition = [-3.731862, -38.526669];
  const { activeControl } = props;

  const [features, setFeatures] = useState([]);

  const addFeatureHandler = (feature) => {
    setFeatures([...features, feature]);
  };

  return (
    <MapContainer center={refPosition} zoom={12} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeatureLayer
        onAddFeature={addFeatureHandler}
        activeControl={activeControl}
      />
      {features}
    </MapContainer>
  );
};

export default Map;
