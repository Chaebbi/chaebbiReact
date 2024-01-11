import styled from "styled-components";
import RestaurantCard from "../elements/RestaurantCard";
import axios from "axios";
import { useState,useEffect } from "react";
import { usePageChange } from "../hooks/usePageChange";
import Paginator from "./Paginator";
import "../styles/ScrollBar.css";

//즐겨찾기 컴포넌트
function Bookmarks(){
    //북마크 조회(GET)=============================================================
    const [bookmarks, setBookmarks] = useState([]);
    const getBookmarkList = async() => {
        try {
          const response = await axios
            .get(`${process.env.REACT_APP_SERVER_URL}/api/bookmarklist`,
            { headers: 
                { Authorization: `Bearer ${localStorage.getItem('token')}`}
            })

            if(response.data.code === 2146){
                setBookmarks([]);
            }else{
                setBookmarks(response.data.result.data);
            };
        } catch (error) {
            console.log(error);
            setBookmarks([]);
        }
      }
    // 페이징
    const { activePage, slicedArray, handlePageChange } = usePageChange([...bookmarks]);

    //북마크 삭제(DELETE)=============================================================
    const deleteBookmark =(id)=>{
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/del/bookmark`,
        { data: { bistroId: Number(id) }, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        .then(function(response) {
            console.log('북마크가 해제 성공');
        }).catch(function(error) {
            console.log('북마크 해제 요청 실패');
        });
    };

    //useEffect==============================================================
    useEffect(()=>{
        getBookmarkList();
    },[]);

    return(
        <BookmarksContainer>
            <GridContainer>
                { bookmarks.length === 0 ?
                    <div>북마크된 음식점이 없습니다.</div>
                :
                <>
                    {Array.from(slicedArray).map((r) => (
                        <RestaurantCard
                            key={r.bistroId}
                            id={r.bistroId}
                            name={r.name}
                            category={r.category}
                            call={r.telNo}
                            newaddress={r.roadAddr}
                            address={r.lnmAddr}
                            href={r.url}
                            isBookmark={r.isBookmark}
                            onClickBookmarkAlready={()=>deleteBookmark(r.bistroId)}
                        />
                    ))}
                </>
                }
            </GridContainer>
            <Paginator
                activePage={activePage}
                totalItemsCount={bookmarks.length}
                onChange={handlePageChange}/>
        </BookmarksContainer>
    )
}

const BookmarksContainer = styled.div`
    border-radius: 1rem;
    background-color: var(--color-light-gray);
    padding: 2rem;
    padding-bottom: 1rem;
    width: 60rem;

    @media ${({ theme }) => theme.breakpoints.tablet} {
        width: 100%;
    }  
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    min-height: 45rem;
    column-gap: 2rem;
    row-gap: 1rem;
    margin-bottom: 2rem;
`;

export default Bookmarks;