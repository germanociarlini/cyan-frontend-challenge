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

  const onCreateFeaturesHandler = (newFeatures) => {
    setFeatures((previousFeatures) => [...previousFeatures, ...newFeatures]);
  };

  const onEditFeaturesHandler = (editedFeatures) => {
    const updatedFeatures = features.map((oldFeature) => {
      const updatedFeature = editedFeatures.find(
        (editedFeature) => editedFeature.id === oldFeature.id
      );
      return updatedFeature ? { ...updatedFeature } : { ...oldFeature };
    });
    setFeatures(updatedFeatures);
  };

  // const onChangeFeatureColorHandler = (editedFeature, color) => {
  //   const feature = features.find((feature) => feature.id === editedFeature._leaflet_id);
  //   if (feature) {
  //     feature.feature.properties["color"] = color;
  //   }
  //   onFeaturesEditedHandler([layer]);
  // };

  const onDeleteFeaturesHandler = (deletedIds) => {
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
        onCreate={(newFeatures) => onCreateFeaturesHandler(newFeatures)}
        onEdit={(editedFeatures) => onEditFeaturesHandler(editedFeatures)}
        // onColorChange={(editedFeature, color) => onChangeFeatureColorHandler(editedFeature, color)}
        onDelete={(deletedFeatures) => onDeleteFeaturesHandler(deletedFeatures)}
      />
    </MapContainer>
  );
};

export default Map;
