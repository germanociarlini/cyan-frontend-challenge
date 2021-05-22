import api from "../../services/api";

export const saveNewCollection = async (saveName) => {
  const newCollection = await api.put(`/collections`, { name: saveName });
  return newCollection.data;
};

export const updateCollection = async (saveName, collectionToUpdate) => {
  const endpoint = `/collections/${collectionToUpdate.id}`;
  const payload = { name: saveName };
  const updatedCollection = await api.put(endpoint, payload);
  return updatedCollection;
};

export const saveFeatures = async (collectionId, features) => {
  const endpoint = `/collections/${collectionId}/features`;
  const payload = features.map((feature) => feature.feature);
  return await api.put(endpoint, payload);
};
