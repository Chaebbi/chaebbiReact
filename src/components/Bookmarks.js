import styled from "styled-components";
import Grid from "../elements/Grid";
import Card from "../elements/Card";
import axios from "axios";
import { useState,useEffect } from "react";
import "../styles/ScrollBar.css";

//즐겨찾기 컴포넌트
function Bookmarks(){

    //북마크 조회(GET)=============================================================
    const [bookmarks, setBookmarks] = useState([]);
    const getBookmarkList =async()=> {
        const response = await axios.get("https://spring.chaebbiserver.shop/api/bookmarklist", 
            { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}});
        
        console.log(response.data); //.count, .data[]
        if(response.data.code == 2146){
            setBookmarks(undefined);
        }else{
            setBookmarks(response.data.result.data);
        };
    }

    //북마크 삭제(DELETE)=============================================================
    const deleteBookmark =(id)=>{
        axios.delete("https://spring.chaebbiserver.shop/api/del/bookmark", 
        {
            data:
            {
                bistroId: Number(id)
            },
            headers: 
            {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              },
        })
        .then(function(response) {
            console.log(response.data);
            window.location.reload();
        }).catch(function(error) {
            console.log(error);
        });
    };

    //useEffect==============================================================
    useEffect(()=>{
        getBookmarkList();
    },[]);

    return(
        <FavoritesContainer className="scrollbar">
            <GridContainer>
                { bookmarks == undefined ?
                    <div>북마크된 음식점이 없습니다.</div>
                :
                <>
                    {Array.from(bookmarks).map((b,index) => (
                        <Card del
                            width="100%"
                            height="220px"
                            key={index}
                            id={b.bistroId}
                            title={b.name}
                            url={b.bistroUrl}
                            category={b.category}
                            newaddress={b.roadAddr}
                            address={b.lnmAddr}
                            call={b.telNo}
                            onClick={()=>{
                                deleteBookmark(`${b.bistroId}`);
                            }}
                        />
                    ))}
                </>
                }
                
            </GridContainer>
        </FavoritesContainer>
    )
}

const FavoritesContainer = styled.div`
    min-height: 550px;
    height: 550px;
    padding: 20px;
    border: 1px solid #e6e6e6;
    border-radius: 15px;
    box-sizing: border-box;
    overflow-y: scroll;
    overflow-x: hidden;
`;

const GridContainer = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
    row-gap: 20px;

    @media (max-width: 1100px){
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        row-gap: 20px;
    }
`;

export default Bookmarks;