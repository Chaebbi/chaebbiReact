import styled from "styled-components";
import Button from "./Button";
import React from "react";

const MenuCard = ({ foodname = "", have = [], donthave = [], href = "" }) => {
  const openRecipeNewTab = () => {
    window.open(href, '_blank');
  };

  return (
    <MenuCardContainer>
      <h1>{foodname}</h1>
      <IngredientWrapper>
        <p className="label">현재 보유한 재료</p>
        <div className="ingredients-list">
          {have.length !== 0 ? have.map((el, idx) => (
            <Ingredient key={idx}>{el}</Ingredient>
          )):
            <p>없음</p>
          }
        </div>
        <p className="label">필요한 재료</p>
        <div className="ingredients-list">
          {donthave.length !== 0 ? donthave.map((el, idx) => (
            <IngredientNone key={idx}>{el}</IngredientNone>
          )):
            <p>없음</p>
          }
        </div>
      </IngredientWrapper>
      <Button onClick={openRecipeNewTab}>레시피 보기</Button>
    </MenuCardContainer>
  );
};

const MenuCardContainer = styled.div`
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 2rem;

  h1{ font-size: 2.4rem; }
`;

const IngredientWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;

  .label{ font-weight: 600; }
  .ingredients-list{
    display: flex;
    flex-wrap: wrap;
    gap: 0.2rem;
  }
`;

const Ingredient = styled.span`
  background-color: var(--color-input-focus);
  border: 1px solid var(--color-primary);
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  display: inline-block;
  color: var(--color-primary);
`;

const IngredientNone = styled(Ingredient)`
  background-color: var(--color-input-danger);
  border: 1px solid var(--color-danger);
  color: var(--color-danger);
`;

export default React.memo(MenuCard);
