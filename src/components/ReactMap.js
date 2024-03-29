import { Map } from 'react-kakao-maps-sdk';
import ReactMapMarker from './ReactMapMarker';

const ReactMap = ({positions}) => {
  const mapStyle = { width: "100%", height: "100%", borderRadius: "1rem", padding: "2rem" };

  const calculateCenter = () => {
    const totalLat = positions.reduce((sum, p) => sum + parseFloat(p.la), 0);
    const totalLng = positions.reduce((sum, p) => sum + parseFloat(p.lo), 0);
    const averageLat = totalLat / positions.length;
    const averageLng = totalLng / positions.length;
    return { lat: averageLat, lng: averageLng };
  };

  const center = calculateCenter();


	return (
      <Map
        center={center}
        style={mapStyle}
        level={6}
      >
        {positions.map((p) => {
          return (
              <ReactMapMarker 
                bistroId={p.bistroId}
                la={p.la}
                lo={p.lo}
                name={p.name}
                url={p.url}
              />
        )})}
      </Map>);
};

export default ReactMap;