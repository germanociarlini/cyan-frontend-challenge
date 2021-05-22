import { useContext } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import { LayersContext } from "../Contexts";
import LayersController from "./LayersController";
import "./Map.css";

const mapSettings = {
  initialPosition: [-3.731862, -38.526669],
  initialZoom: 12,
  enableZoomControl: false,
};

const Map = () => {
  const { setLayers } = useContext(LayersContext);

  const onCreateLayerHandler = (newLayer) => {
    setLayers((previousLayers) => [...previousLayers, newLayer]);
  };

  const onEditLayersHandler = (editedLayers) => {
    setLayers((previousLayers) =>
      previousLayers.map((pLayer) =>
        Object.assign(
          pLayer,
          editedLayers.find((eLayer) => eLayer._leaflet_id === pLayer._leaflet_id)
        )
      )
    );
  };

  const onDeleteLayersHandler = (deletedIds) => {
    setLayers((previousLayers) =>
      previousLayers.filter((previousLayer) => !deletedIds.includes(previousLayer._leaflet_id))
    );
  };

  return (
    <MapContainer
      center={mapSettings.initialPosition}
      zoom={mapSettings.initialZoom}
      zoomControl={mapSettings.enableZoomControl}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ZoomControl position="bottomleft" />

      <LayersController
        onCreate={(newLayer) => onCreateLayerHandler(newLayer)}
        onEdit={(editedLayers) => onEditLayersHandler(editedLayers)}
        onDelete={(deletedLayers) => onDeleteLayersHandler(deletedLayers)}
      />
    </MapContainer>
  );
};

export default Map;
