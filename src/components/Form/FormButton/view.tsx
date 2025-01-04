import { useFormButtonModel } from "./model";
import { StyledFormButton } from "./styles";

export const FormButtonView = ({
  children,
  onClick,
}: ReturnType<typeof useFormButtonModel>) => {
  return <StyledFormButton onClick={onClick}>{children}</StyledFormButton>;
};
