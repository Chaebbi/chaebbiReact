import React from 'react';
import styled, {keyframes} from "styled-components";

function Modal(props){
    const { open, submit, close, header, is_detail, height, margin } = props;
    const openModal = {
      display: "flex",
      aligItems: "center"
    };

    const generalmodal = {
      display: "none",
      position: "fixed",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      zIndex: "99",
      backgroundColor: "rgba(0, 0, 0, 0.6)"
    }
  
    return (
        <ModalContainer style={open ? openModal : generalmodal }>
      {open ? (
        <ModalSection height={height} margin={margin}>

          {/* 모달 헤더 */}
          <ModalHeader>
            {header} &nbsp;
            <CloseButton className="close" onClick={close}>
              <span>x</span>
            </CloseButton>
          </ModalHeader>

          {/* 모달 컨텐츠 */}
          <ModalMain>
            {props.children}
          </ModalMain>

          {/* 모달 푸터 */}
          <ModalFooter>
            <ModalButton className="close" onClick={submit}>
                등록
            </ModalButton>
          </ModalFooter>

        </ModalSection>
      ) : null}
    </ModalContainer>
    )
}

const ModalContainer = styled.div`
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);
`;

const ModalSection = styled.div`
    width: 40%;
    min-width: 400px;
    max-width: 770px;
    height: ${(props)=>props.height};
    margin: ${(props)=>props.margin};
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;
`;

const ModalHeader = styled.div`
    position: relative;
    padding: 16px;
    color: #343a40;
    margin-left: 10px;
    font-weight: 800;
    font-size: 18px;
    text-align: left;
`;

const CloseButton = styled.button`
    outline: 0;
    border: 0;
    background-color: transparent;
    font-size: 20px;
    float: right;
    margin-right: 10px;
    color: #398234;
    cursor: pointer;
`;

const ModalButton = styled.button`
    outline: 0;
    border: 0;
    border-radius: 15px;
    padding: 5px 10px;
    margin-top: 0px;
    margin-right: 10px;
    width: 200px;
    height: 40px;
    background: #398234;
    color: #fff;
    transition: all 0.2s;
    cursor: pointer;

    &:hover{
      background-color: #0d5f07;
    }
`;

const ModalMain = styled.main`
  padding: 16px;
  margin-bottom: 15px;
  /* border-bottom: 1px solid #dee2e6; */
  /* border-top: 1px solid #dee2e6;  */
`;

const ModalFooter = styled.div`
  position: relative;
  padding-bottom: 10px;
  text-align: center;
`;


export default Modal;