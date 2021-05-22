import api from "../../../services/api";

export const extractLayerGeoJson = (layer) => {
  const geoJson = layer.toGeoJSON();
  geoJson.properties = { ...layer.options };
  return geoJson;
};

export const buildCollectionGeoJson = async (collection) => {
  const features = await api.get(`/collections/${collection.id}/features`);
  const geoJson = {
    type: "FeatureCollection",
    features: features.data.map((feature) => {
      return {
        type: "Feature",
        properties: { ...feature.properties },
        geometry: feature.geometry,
      };
    }),
  };
  return geoJson;
};
