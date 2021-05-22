import api from "../../services/api";

export const saveNewCollection = async (saveName) => {
  const newCollection = await api.put(`/collections`, { name: saveName });
  return newCollection.data;
};

export const updateCollection = async (saveName, collectionToUpdate) => {
  const endpoint = `/collections/${collectionToUpdate.id}`;
  const payload = { name: saveName };
  const updatedCollection = await api.put(endpoint, payload);
  return updatedCollection.data;
};

export const saveFeatures = async (collectionId, collectionGeoJson) => {
  const endpoint = `/collections/${collectionId}/features`;
  return await api.put(endpoint, collectionGeoJson);
};
