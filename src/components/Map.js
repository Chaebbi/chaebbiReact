/*global kakao*/
import {useRef,useEffect} from "react";

function Map({positions}){
    console.log("map-props:: ",positions);
    const positionArr = positions;
    // const laArr = positionArr.map(row=>row.la);
    // const loArr = positionArr.map(row=>row.lo);
    // const coordinate = [];
    // for(let i=0; i<positionArr.length; i++){
    //     coordinate.push(new kakao.map.LatLng(laArr[i],loArr[i]));
    // }
    
    useEffect(() => {
        var container = document.getElementById('map');
        var options = {
        center: new kakao.maps.LatLng(37.498095, 127.027610),
        level: 7
        };

        var map = new kakao.maps.Map(container, options);
        var bounds = new kakao.maps.LatLngBounds();  
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        positionArr.map((p)=>{
            var imageSize = new kakao.maps.Size(24, 35); 
            
            // 마커 이미지를 생성합니다    
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
                
            // 마커를 생성합니다
            new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: new kakao.maps.LatLng(p.la, p.lo) ,
                title : p.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image : markerImage // 마커 이미지 
            });
            bounds.extend(new window.kakao.maps.LatLng(p.la, p.lo));

            // 마커에 표시할 인포윈도우를 생성합니다 
            var infowindow = new kakao.maps.InfoWindow({
                content: p.title // 인포윈도우에 표시할 내용
    });
        });
        map.setBounds(bounds);

    },[positionArr]);

    return(
        <div id="map" style={{width:"73vw", height:"94vh",minWidth:"500px",marginLeft:"8px"}}>

        </div>
    )
}

export default Map;