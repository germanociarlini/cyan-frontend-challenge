import {
  FeatureGroup,
  MapContainer,
  TileLayer,
  ZoomControl
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "./Map.css";

const Map = (props) => {
  const refPosition = [-3.731862, -38.526669];
  const { createFeature, editFeature, deleteFeature } = props;

  const onCreateHandler = (e) => {
    const newFeature = {
      id: e.layer._leaflet_id,
      feature: e.layer.toGeoJSON()
    };
    createFeature(newFeature);
  };

  const onEditHandler = (e) => {
    const editedFeatures = Object.values(e.layers._layers).map((layer) => {
      return {
        id: layer._leaflet_id,
        feature: layer.toGeoJSON()
      };
    });
    editFeature(editedFeatures);
  };

  const onDeleteHandler = (e) => {
    const deletedFeaturesIds = Object.keys(e.layers._layers);
    deleteFeature(deletedFeaturesIds);
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
            circle: false,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};

export default Map;
