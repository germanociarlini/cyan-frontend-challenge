import { CircleMarker, useMapEvents } from "react-leaflet";

const FeatureLayer = (props) => {
  const { activeControl, onAddFeature } = props;

  // Point Feature
  const handlePointFeature = (e) => {
    const newPoint = (
      <CircleMarker
        key={Math.random()}
        center={e.latlng}
        pathOptions={{ color: "red" }}
        radius={5}
      />
    );
    onAddFeature(newPoint);
  };

  // LineString Feature
  const handleLineFeature = (e) => {
    // Todo
    console.log("Adding line feature!");
  };

  // Polygon Feature
  const handlePolygonFeature = (e) => {
    // Todo
    console.log("Adding polygon feature!");
  };

  useMapEvents({
    click(e) {
      switch (activeControl) {
        case "POINT":
          handlePointFeature(e);
          break;
        case "LINESTRING":
          handleLineFeature(e);
          break;
        case "POLYGON":
          handlePolygonFeature(e);
          break;
        default:
          return;
      }
    },
  });

  return <></>;
};

export default FeatureLayer;
