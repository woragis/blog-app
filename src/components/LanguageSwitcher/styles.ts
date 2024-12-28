import styled from "@emotion/styled";
import { LanguageOptionsContainerProps } from "../../types/languageSwitcher.types";

export const LanguageOptionsContainer = styled.div<LanguageOptionsContainerProps>`
  --color: ${(_) => _.color};
  color: var(--color);
  background-color: ${(_) => _.backgroundColor};
  overflow: hidden;
  height: fit-content;
  width: 200px;
  box-shadow: inset 0 0px 12px var(--color);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  & > p {
    font-size: 20px;
    padding: 10px 15px;
  }
`;

export const StyledLanguageOption = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 15px;
  font-size: 15px;
  width: 100%;
  border-radius: 10px;
  position: relative;

  &:hover {
    cursor: pointer;
  }

  &::before {
    content: "";
    position: absolute;
    top: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--color);
  }
`;
