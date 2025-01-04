import { useFormInputModel } from "./model";
import { StyledFormInput } from "./styles";

export const FormInputView = ({
  id,
  name,
  type,
  placeholder,
  value,
  handleChange,
}: ReturnType<typeof useFormInputModel>) => {
  return (
    <StyledFormInput
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};
