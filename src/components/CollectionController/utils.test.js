import nock from "nock";
import { saveFeatures, saveNewCollection, updateCollection } from "./utils";

const BaseUrl = "http://localhost:3001";

test("saveNewCollection", async () => {
  nock("http://localhost:3001")
    .put("/collections", { name: "my new collection" })
    .reply(200, { id: 1, name: "my new collection" });

  const saveName = "my new collection";
  const newCollection = await saveNewCollection(saveName);
  expect(newCollection.id).toBe(1);
  expect(newCollection.name).toBe(saveName);
});

test("updateCollection", async () => {
  nock(BaseUrl)
    .put(`/collections/1`, { name: "my updated collection" })
    .reply(200, { id: 1, name: "my updated collection" });

  const saveName = "my updated collection";
  const collectionToUpdate = { id: 1 };
  const updatedCollection = await updateCollection(saveName, collectionToUpdate);
  expect(updatedCollection.id).toBe(1);
  expect(updatedCollection.name).toBe(saveName);
});

test("saveFeatures", async () => {
  const geoJson = [
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [-38.597374, -3.74744],
          [-38.597374, -3.72894],
          [-38.575058, -3.72894],
          [-38.575058, -3.74744],
          [-38.597374, -3.74744],
        ],
      },
      properties: {
        color: "#ff6900",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [-38.502617, -3.746755],
          [-38.480988, -3.730653],
          [-38.491287, -3.714893],
        ],
      },
      properties: {
        color: "#00d084",
      },
    },
  ];

  nock(BaseUrl)
    .put(`/collections/1/features`, geoJson)
    .reply(200, [
      {
        id: 135,
        collection_id: 1,
        properties: { color: "#ff6900" },
        geometry: { type: "Polygon" },
      },
      {
        id: 136,
        collection_id: 1,
        properties: { color: "#00d084" },
        geometry: { type: "LineString" },
      },
    ]);

  const collectionId = 1;
  const saveFeaturesResponse = await saveFeatures(collectionId, geoJson);

  expect(saveFeaturesResponse.data).toHaveLength(2);
  expect(saveFeaturesResponse.data[0].id).toBe(135);
  expect(saveFeaturesResponse.data[0].properties.color).toBe("#ff6900");
  expect(saveFeaturesResponse.data[0].geometry.type).toBe("Polygon");
  expect(saveFeaturesResponse.data[1].id).toBe(136);
  expect(saveFeaturesResponse.data[1].properties.color).toBe("#00d084");
  expect(saveFeaturesResponse.data[1].geometry.type).toBe("LineString");
});
