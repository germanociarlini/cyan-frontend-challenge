import L from "leaflet";
import { useState } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import Toolbar from "../toolbar/Toolbar";
import DrawFeatureGroup from "./DrawFeatureGroup";
import "./Map.css";

const Map = () => {
  const initialPosition = [-3.731862, -38.526669];
  const [loadedCollection, setLoadedCollection] = useState(null);
  const [editableFeatureGroup, setEditableFeatureGroup] = useState(null);
  const [features, setFeatures] = useState([]);

  const onSaveHandler = async (collection) => {
    setLoadedCollection(collection);
  };

  const onLoadHandler = (loadedCollection, geoJson) => {
    onClearHandler();

    const leafletGeoJSON = new L.GeoJSON(geoJson);
    const leafletFG = editableFeatureGroup;

    leafletGeoJSON.eachLayer((layer) => {
      leafletFG.addLayer(layer);
      onCreateHandler({
        id: layer._leaflet_id,
        feature: layer.toGeoJSON(),
      });
    });

    setLoadedCollection(loadedCollection);
  };

  const onClearHandler = () => {
    editableFeatureGroup.clearLayers();
    setFeatures([]);
  };

  const onUpdateFeatureGroupHandler = (featureGroup) => {
    setEditableFeatureGroup(featureGroup);
  };

  const onCreateHandler = (newFeature) => {
    setFeatures((previousFeatures) => [...previousFeatures, newFeature]);
  };

  const onEditHandler = (editedFeatures) => {
    setFeatures((previousFeatures) =>
      previousFeatures.map((original) => {
        const edited = editedFeatures.find((ef) => ef.id === original.id);
        return edited ? { ...edited } : { ...original };
      })
    );
  };

  const onChangeFeatureColorHandler = (changedFeature, color) => {
    const layer = features.find((feature) => feature.id === changedFeature._leaflet_id);
    if (layer) {
      layer.feature.properties["color"] = color;
    }
  };

  const onDeleteHandler = (deletedFeaturesIds) => {
    setFeatures((previousFeatures) =>
      previousFeatures.filter((feature) => !deletedFeaturesIds.some((deletedId) => +deletedId === feature.id))
    );
  };

  return (
    <>
      <Toolbar
        loadedCollection={loadedCollection}
        features={features}
        onSave={onSaveHandler}
        onLoad={onLoadHandler}
        onClear={onClearHandler}
      />
      <MapContainer center={initialPosition} zoom={12} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomleft" />
        <DrawFeatureGroup
          onUpdateFeatureGroup={onUpdateFeatureGroupHandler}
          onCreate={onCreateHandler}
          onEdit={onEditHandler}
          onChangeFeatureColor={onChangeFeatureColorHandler}
          onDelete={onDeleteHandler}
        />
      </MapContainer>
    </>
  );
};

export default Map;
