import styled from "styled-components";
import Grid from "../elements/Grid";
import Card from "../elements/Card";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

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
        <FavoritesContainer>
            <Grid col="3" row="2" colgap="20px" rowgap="20px">
                { bookmarks == undefined ?
                    <div>북마크된 음식점이 없습니다.</div>
                :
                <>
                    {Array.from(bookmarks).map((b,index) => (
                        <Card del
                            width="320px"
                            height="220px"
                            key={index}
                            id={b.bistroId}
                            title={b.name}
                            // category={b.category}
                            category="response에 카테고리가 없음"
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
                
            </Grid>
        </FavoritesContainer>
    )
}

const FavoritesContainer = styled.div`
    width : 1050px;
    min-height: 500px;
    padding: 20px;
    border: 1px solid #e6e6e6;
    border-radius: 15px;
    box-sizing: border-box;
    background-color: #fff;
`;

export default Bookmarks;