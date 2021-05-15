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
  const { createFeature, editFeature, deleteFeature } = props;

  const onCreateHandler = (e) => {
    const { _leaflet_id, options } = e.layer;
    const newFeature = {
      id: _leaflet_id,
      coordinates: e.layer.getLatLngs()[0],
      color: options.color,
    };
    createFeature(newFeature);
  };

  const onEditHandler = (e) => {
    const editedFeatures = Object.values(e.layers._layers);
    editFeature(editedFeatures);
  };

  const onDeleteHandler = (e) => {
    const deletedFeatures = Object.values(e.layers._layers);
    deleteFeature(deletedFeatures);
    // console.log(e);
    // const { layers: { _layers } } = e;
    // const updatedFeatures = [...features];
    // Object.values(_layers).map(({_leaflet_id}) => {
    //   updatedFeatures.filter((feature) => feature.id !== _leaflet_id);
    // });
    // onUpdateFeatures(updatedFeatures);
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
