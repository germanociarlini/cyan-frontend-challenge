import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

const DrawFeatureGroup = (props) => {
  const { onUpdateFeatureGroup, onCreate, onEdit, onDelete } = props;

  const onCreateHandler = (e) => {
    const newFeature = {
      id: e.layer._leaflet_id,
      feature: e.layer.toGeoJSON(),
    };
    onCreate(newFeature);
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
      }}
    >
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
  );
};

export default DrawFeatureGroup;
