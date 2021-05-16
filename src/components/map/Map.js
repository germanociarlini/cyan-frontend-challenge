import L from "leaflet";
import { useState } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import Toolbar from "../toolbar/Toolbar";
import DrawFeatureGroup from "./DrawFeatureGroup";
import "./Map.css";

const Map = () => {
  const initialPosition = [-3.731862, -38.526669];
  const [features, setFeatures] = useState([]);
  const [editableFeatureGroup, setEditableFeatureGroup] = useState(null);

  //#region Toolbar Handlers
  const onSaveHandler = () => {
    // Save to DB
    // Open modal?
    // const featureCollection = features.map(...)

    console.log("Saving...", features);
  };

  const onLoadHandler = (geojson) => {
    onClearHandler();

    const leafletGeoJSON = new L.GeoJSON(geojson);
    const leafletFG = editableFeatureGroup;

    leafletGeoJSON.eachLayer((layer) => {
      leafletFG.addLayer(layer);
      onCreateHandler({
        id: layer._leaflet_id,
        feature: layer.toGeoJSON(),
      });
    });
  };

  const onClearHandler = () => {
    editableFeatureGroup.clearLayers();
    setFeatures([]);
  };
  //#endregion

  //#region Draw Event Handlers
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

  const onDeleteHandler = (deletedFeaturesIds) => {
    setFeatures((previousFeatures) =>
      previousFeatures.filter(
        (feature) =>
          !deletedFeaturesIds.some((deletedId) => +deletedId === feature.id)
      )
    );
  };
  //#endregion

  return (
    <>
      <Toolbar
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
          onDelete={onDeleteHandler}
        />
      </MapContainer>
    </>
  );
};

export default Map;
