import api from "../../../services/api";

export const initializeFeature = (layer, style, onSelected) => {
  layer.setStyle(style);
  layer.on({
    click(e) {
      onSelected(e.target);
    },
  });

  return extractFeatureDataFromLayer(layer);
};

export const extractFeatureDataFromLayer = (layer) => {
  const newFeature = {
    id: layer._leaflet_id,
    feature: layer.toGeoJSON(),
  };

  return newFeature;
};

export const buildCollectionGeoJson = async (collection) => {
  const features = await api.get(`/collections/${collection.id}/features`);
  const geoJson = {
    type: "FeatureCollection",
    features: features.data.map((feature) => {
      return {
        type: "Feature",
        properties: {
          color: feature.properties.color,
        },
        geometry: feature.geometry,
      };
    }),
  };
  return geoJson;
};
