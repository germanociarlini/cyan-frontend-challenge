import { useContext } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import { FeaturesContext } from "../Contexts";
import FeatureControls from "./FeatureController";
import "./Map.css";

const mapSettings = {
  initialPosition: [-3.731862, -38.526669],
  initialZoom: 12,
  enableZoomControl: false,
};

const Map = () => {
  const { features, setFeatures } = useContext(FeaturesContext);

  const onFeaturesCreatedHandler = (newFeatures) => {
    setFeatures(previousFeatures => [...previousFeatures, ...newFeatures]);
  };

  const onFeaturesEditedHandler = (editedFeatures) => {
    const updatedFeatures = features.map((oldFeature) => {
      const updatedFeature = editedFeatures.find(
        (editedFeature) => editedFeature.id === oldFeature.id
      );
      return updatedFeature ? { ...updatedFeature } : { ...oldFeature };
    });
    setFeatures(updatedFeatures);
  };

  const onFeatureColorChangeHandler = (editedFeature, color) => {
    const layer = features.find((feature) => feature.id === editedFeature._leaflet_id);
    if (layer) {
      layer.feature.properties["color"] = color;
    }
    onFeaturesEditedHandler([layer]);
  };

  const onFeaturesDeletedHandler = (deletedIds) => {
    const wasDeleted = (feature) => !deletedIds.some((deletedId) => deletedId === feature.id);
    setFeatures(features.filter((feature) => wasDeleted(feature)));
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

      <FeatureControls
        onCreate={(newFeatures) => onFeaturesCreatedHandler(newFeatures)}
        onEdit={(editedFeatures) => onFeaturesEditedHandler(editedFeatures)}
        onColorChange={(editedFeature, color) => onFeatureColorChangeHandler(editedFeature, color)}
        onDelete={(deletedFeatures) => onFeaturesDeletedHandler(deletedFeatures)}
      />
    </MapContainer>
  );
};

export default Map;
