import api from "../../services/api";

export const upsertCollection = async (saveName, shouldCreateNewCollection, loadedCollection) => {
  const endpoint = shouldCreateNewCollection
    ? "/collections"
    : `/collections/${loadedCollection.id}`;
  const collection = await api.put(endpoint, { name: saveName });
  return collection.data;
};

export const putFeatures = async (collectionId, features) => {
  const endpoint = `/collections/${collectionId}/features`;
  const payload = features.map((feature) => feature.feature);
  return await api.put(endpoint, payload);
};
