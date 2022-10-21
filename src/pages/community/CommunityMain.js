import styled from "styled-components";

function CommunityMain(){
    return(
        <>
            <MainContainer>
                {/* 좋아요 가장 많이 받은 3개의 게시물을 담는 컨테이너*/}
                <h4>실시간 인기 게시물</h4>
                <PopularContainer>
                    <div>
                        <div>이미지</div>
                        <h3>제목</h3>
                        <span>작성자</span>
                        {/* <p>내용 .... </p> */}
                        <span>좋아요 200</span><span>댓글 50</span>
                    </div>
                    <div>
                        <div>이미지</div>
                        <h3>제목</h3>
                        <span>작성자</span>
                        {/* <p>내용 .... </p> */}
                        <span>좋아요 150</span><span>댓글 14</span>
                    </div>
                    <div>
                        <div>이미지</div>
                        <h3>제목</h3>
                        <span>작성자</span>
                        {/* <p>내용 .... </p> */}
                        <span>좋아요 100</span><span>댓글 10</span>
                    </div>
                </PopularContainer>
                {/* 3가지 게시판을 담고 있는 컨테이너 */}
                <BoardContainer>
                    <div>
                        <h4>게시판1</h4>
                        <ContentContainer style={{border:"0"}}>
                            <div>
                                이미지(생략가능) 게시판명 <br/>
                                <h4>게시글명</h4> <br/>
                                내용 미리보기....(중략)<br/>
                                작성자 작성일 <br/>
                                좋아요 10 댓글 15
                            </div>
                        </ContentContainer>
                    </div>
                    <div>
                        <h4>게시판2</h4>
                        <ContentContainer style={{border:"0"}}>

                        </ContentContainer>
                    </div>
                    <div>
                        <h4>게시판3</h4>
                        <ContentContainer style={{border:"0"}}>

                        </ContentContainer>
                    </div>
                </BoardContainer>
            </MainContainer>
        </>
    )
}

const MainContainer = styled.div`
    height: 900px;
`;

const PopularContainer = styled.div`
    width: 50vw;
    height: 250px;
    display: flex;
    gap: 0 10px;
    box-sizing: border-box;
    padding: 10px;
    margin: 0 auto;

    div {
        border: 1px solid #777;
        width: 30%;
    }

    div div {
        width: 100%;
        height: 150px;
        background-color: #e6e6e6;
        border: 0;
        border-bottom: 1px solid #777;
    }

    div h3{
        margin: 0;
    }
`;

const BoardContainer = styled.div`
    display: grid;
    width : -webkit-calc(60% + 10px); /* for Chrome, Safari */
    /* width : -moz-calc(60% + 10px); /* for Firefox */
    /* width : calc(60% + 10px); */
    grid-template-columns: repeat(2, 50%);
	grid-template-rows: repeat(2, 250px);
    column-gap: 10px;
    row-gap: 10px;
    margin: 0 auto;

    div { border: 1px solid #777; }
    div h4 { margin:0 }
    div:first-child {
        grid-row: 1 / 3;
    }
`;

const ContentContainer = styled.div`
    box-sizing: border-box;
    padding: 5px;
`;

export default CommunityMain; 