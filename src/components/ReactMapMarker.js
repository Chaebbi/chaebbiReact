import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { useState } from 'react';

const ReactMapMarker =({bistroId, la, lo, name, url, telNo, roadAddr})=>{
  const position = { lat: Number(la), lng: Number(lo) };
  const markerImage = {
    src: '',
    size: { width: 35, height: 45 },
  };

  const openRecipeNewTab = (url) => {
    window.open(url, '_blank');
  };

  return(
      <CustomOverlayMap
        key={bistroId}
        position={position}>
        {/* 커스텀 오버레이 컨텐츠 */}
          <CustomOverlayContent>
            <h1 onClick={()=>openRecipeNewTab(url)}>{name}</h1>
          </CustomOverlayContent>
      </CustomOverlayMap>
  )
}

const CustomOverlayContent = styled.div`
  padding: 1rem;
  background-color: var(--color-white);
  border: 1px solid var(--color-primary);
  border-radius: 0.5rem;
  transition: all 0.2s;
  position: relative;
  bottom: 0rem;
  z-index: 1;

  h1{
    font-size: 1.7rem;
  }
  p{
    color: var(--color-sub-text);
    margin: 0.3rem 0;
  }

  &::after{
    content: "";
    border-right: 1px solid var(--color-primary);
    border-bottom: 1px solid var(--color-primary);
    background-color: var(--color-white);
    position: absolute;
    left: 44%;
    top: 3.5rem;
    width: 1rem;
    height: 1rem;
    transform: rotate(45deg);
  }

  &:hover{
    color: var(--color-primary);
  }
`;

export default ReactMapMarker;