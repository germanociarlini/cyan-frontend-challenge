import L from "leaflet";
import { useContext, useEffect, useState } from "react";
import { TwitterPicker } from "react-color";
import { FeatureGroup, Popup, useMapEvents } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { CollectionContext } from "../../Contexts";
import { buildCollectionGeoJson, extractFeatureDataFromLayer, initializeFeature } from "./utils";

const featureStyles = {
  defaultStyle: {
    color: "#000",
    opacity: 0.9,
    fillOpacity: 0.5,
    weight: 1,
  },
  polylineStyle: {
    color: "#000",
    opacity: 0.7,
    weight: 4,
  },
};

const FeatureController = ({ onCreate, onEdit, onColorChange, onDelete }) => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [editableFeatureGroup, setEditableFeatureGroup] = useState(null);
  const [selectedColor, setSelectedColor] = useState(featureStyles.defaultStyle.color);

  const { collection } = useContext(CollectionContext);

  useMapEvents({
    click() {
      setSelectedFeature(null);
    },
  });

  useEffect(() => {
    editableFeatureGroup?.clearLayers();
    const collectionFeatures = [];

    const loadCollection = async (collection) => {
      const collectionGeoJson = await buildCollectionGeoJson(collection);
      const leafletGeoJson = new L.GeoJSON(collectionGeoJson, {
        style: (feature) => {
          const color = feature.properties.color ? feature.properties.color : featureStyles.defaultStyle.color
          return { color };
        },
      });
      leafletGeoJson.eachLayer((layer) => {
        editableFeatureGroup.addLayer(layer);
        collectionFeatures.push(extractFeatureDataFromLayer(layer));
      });
    };
    if (collection) {
      loadCollection(collection);
    }
    onCreate(collectionFeatures);
  }, [collection]);

  const onFeatureGroupReady = (featureGroup) => {
    if (featureGroup === null) {
      return;
    }
    setEditableFeatureGroup(featureGroup);
  };

  const onCreateFeatureHandler = (e) => {
    const { defaultStyle, polylineStyle } = featureStyles;
    const style = e.layerType === "polyline" ? polylineStyle : defaultStyle;
    const newFeature = initializeFeature(e.layer, style, setSelectedFeature);
    onCreate([newFeature]);
  };

  const onColorChangeHandler = (event) => {
    selectedFeature.setStyle({
      color: event.hex,
    });
    setSelectedColor(event.hex);
    onColorChange(selectedFeature, event.hex);
  };

  const onEditFeaturesHandler = (e) => {
    const editedFeatures = Object.values(e.layers._layers).map((layer) =>
      extractFeatureDataFromLayer(layer)
    );
    onEdit(editedFeatures);
  };

  const onDeleteFeaturesHandler = (e) => {
    const deletedFeaturesIds = Object.keys(e.layers._layers);
    onDelete(deletedFeaturesIds);
  };

  return (
    <FeatureGroup
      ref={(featureGroupRef) => {
        onFeatureGroupReady(featureGroupRef);
      }}>
      <EditControl
        position="topright"
        onCreated={onCreateFeatureHandler}
        onEdited={onEditFeaturesHandler}
        onDeleted={onDeleteFeaturesHandler}
        draw={{
          circlemarker: false,
          marker: false,
          circle: false,
        }}
      />
      <Popup>
        <TwitterPicker
          triangle="hide"
          color={selectedColor}
          onChangeComplete={onColorChangeHandler}
        />
      </Popup>
    </FeatureGroup>
  );
};

export default FeatureController;
