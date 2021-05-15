import {
  FeatureGroup,
  MapContainer,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "./Map.css";

const Map = (props) => {
  const refPosition = [-3.731862, -38.526669];
  const { features, onUpdateFeatures } = props;

  const onCreateHandler = (e) => {
    console.log(e);
    const { _leaflet_id, _latlngs, options } = e.layer;
    const updatedFeatures = [
      ...features,
      { id: _leaflet_id, coordinates: _latlngs[0], color: options.color },
    ];
    onUpdateFeatures(updatedFeatures);
  };

  const onEditHandler = (e) => {
    console.log(e);
  };

  const onDeleteHandler = (e) => {
    console.log(e);
  };

  return (
    <MapContainer center={refPosition} zoom={12} zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomleft" />
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={onCreateHandler}
          onEdited={onEditHandler}
          onDeleted={onDeleteHandler}
          draw={{
            circlemarker: false,
            marker: false,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};

export default Map;
