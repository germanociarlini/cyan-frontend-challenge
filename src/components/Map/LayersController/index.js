import L from "leaflet";
import { useContext, useEffect, useState } from "react";
import { TwitterPicker } from "react-color";
import { FeatureGroup, Popup, useMapEvents } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { CollectionContext, LayersContext } from "../../Contexts";
import { buildCollectionGeoJson } from "./utils";

const styles = {
  default: {
    color: "#000",
    opacity: 0.9,
    fillOpacity: 0.5,
    weight: 1,
  },
  polyline: {
    color: "#000",
    opacity: 0.7,
    weight: 4,
  },
};

const LayersController = ({ onCreate, onEdit, onDelete }) => {
  const [editableFeatureGroup, setEditableFeatureGroup] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [selectedColor, setSelectedColor] = useState(styles.default.color);

  const { collection } = useContext(CollectionContext);
  const { setLayers } = useContext(LayersContext);

  useMapEvents({
    click() {
      setSelectedLayer(null); // reset the selected layer when clicking elsewhere
    },
  });

  useEffect(() => {
    editableFeatureGroup?.clearLayers();

    const loadCollection = async (collection) => {
      const collectionLayers = [];
      const collectionGeoJson = await buildCollectionGeoJson(collection);

      const leafletGeoJson = new L.GeoJSON(collectionGeoJson, {
        style: (feature) => {
          return { ...feature.properties };
        },
      });

      leafletGeoJson.eachLayer((layer) => {
        editableFeatureGroup.addLayer(layer);
        layer.on({
          click(clickEvent) {
            setSelectedLayer(clickEvent.target);
            setSelectedColor(clickEvent.target.options.color);
          },
        });
        collectionLayers.push(layer);
      });

      setLayers(collectionLayers);
    };
    if (collection) {
      loadCollection(collection);
    } else {
      setLayers([]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection]);

  const onFeatureGroupReady = (featureGroup) => {
    if (featureGroup === null) {
      return; // recommended by react-leaflet-draw docs
    }
    setEditableFeatureGroup(featureGroup);
  };

  const onCreateLayerHandler = (createEvent) => {
    const { layer, layerType } = createEvent;
    const style = layerType === "polyline" ? styles.polyline : styles.default;
    layer.setStyle(style);
    layer.on({
      click(clickEvent) {
        setSelectedLayer(clickEvent.target);
        setSelectedColor(clickEvent.target.options.color);
      },
    });
    onCreate(layer);
  };

  const onEditLayersHandler = (editEvent) => {
    const editedLayers = Object.values(editEvent.layers._layers);
    onEdit(editedLayers);
  };

  const onColorChangeHandler = (colorEvent) => {
    const { hex } = colorEvent;
    selectedLayer.setStyle({ ...selectedLayer.options, color: hex });
    setSelectedColor(hex);
    onEdit([selectedLayer]);
  };

  const onDeleteLayersHandler = (deleteEvent) => {
    const deletedLayersIds = Object.keys(deleteEvent.layers._layers).map((id) => +id);
    onDelete(deletedLayersIds);
  };

  return (
    <FeatureGroup
      ref={(featureGroupRef) => {
        onFeatureGroupReady(featureGroupRef);
      }}>
      <EditControl
        position="topright"
        onCreated={onCreateLayerHandler}
        onEdited={onEditLayersHandler}
        onDeleted={onDeleteLayersHandler}
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

export default LayersController;
