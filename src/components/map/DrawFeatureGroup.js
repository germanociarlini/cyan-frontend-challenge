import { useState } from "react";
import { TwitterPicker } from "react-color";
import { FeatureGroup, Popup, useMapEvents } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

const DrawFeatureGroup = (props) => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#000");

  const { onUpdateFeatureGroup, onCreate, onEdit, onChangeFeatureColor, onDelete } = props;

  useMapEvents({
    click() {
      setSelectedFeature(null);
    },
  });

  const onCreateHandler = (e) => {
    e.layer.on({
      click(e) {
        setSelectedFeature(e.target);
      },
    });
    e.layer.setStyle({
      color: selectedColor,
      opacity: 0.9,
      weight: e.layerType === "polyline" ? 4 : 1,
    });
    const newFeature = {
      id: e.layer._leaflet_id,
      feature: e.layer.toGeoJSON(),
    };
    onCreate(newFeature);
  };

  const onDrawStartHandler = () => {
    setSelectedColor("#000");
  };

  const onColorChangeCompleteHandler = (event) => {
    setSelectedColor(event.hex);
    selectedFeature.setStyle({
      color: event.hex,
    });
    onChangeFeatureColor(selectedFeature, event.hex);
  };

  const onEditHandler = (e) => {
    const editedFeatures = Object.values(e.layers._layers).map((layer) => {
      return {
        id: layer._leaflet_id,
        feature: layer.toGeoJSON(),
      };
    });
    onEdit(editedFeatures);
  };

  const onDeleteHandler = (e) => {
    const deletedFeaturesIds = Object.keys(e.layers._layers);
    onDelete(deletedFeaturesIds);
  };

  const _onFeatureGroupReady = (featureGroup) => {
    if (featureGroup === null) {
      return;
    }
    onUpdateFeatureGroup(featureGroup);
  };

  return (
    <FeatureGroup
      ref={(featureGroupRef) => {
        _onFeatureGroupReady(featureGroupRef);
      }}>
      <EditControl
        position="topright"
        onDrawStart={onDrawStartHandler}
        onCreated={onCreateHandler}
        onEdited={onEditHandler}
        onDeleted={onDeleteHandler}
        draw={{
          circlemarker: false,
          marker: false,
          circle: false,
        }}
      />
      <Popup>
        <TwitterPicker triangle="hide" color={selectedColor} onChangeComplete={onColorChangeCompleteHandler} />
      </Popup>
    </FeatureGroup>
  );
};

export default DrawFeatureGroup;
