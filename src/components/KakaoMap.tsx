import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface Props {
  position: {
    lat: number;
    lng: number;
  };
  setPosition: any;
  // setPosition: (event: kakao.maps.event.MouseEvent) => void;
}

const KakaoMap: React.FC<Props> = ({ position, setPosition }) => {
  return (
    <Map
      center={{ lat: 33.5563, lng: 126.79581 }}
      style={{ width: '100%', height: '360px' }}
      // @ts-expect-error
      onClick={(_, event) => setPosition(event)}
    >
      {<MapMarker position={position} />}
    </Map>
  );
};

export default KakaoMap;
