import { Map } from 'react-kakao-maps-sdk';
import ReactMapMarker from './ReactMapMarker';

const ReactMap = ({positions}) => {
  const mapStyle = { width: "80rem", height: "80rem", borderRadius: "1rem", padding: "2rem" };

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
                telNo={p.telNo}
                url={p.url}
                roadAddr={p.roadAddr}
              />
        )})}
      </Map>);
};

export default ReactMap;