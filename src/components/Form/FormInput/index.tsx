import { ChangeEvent } from "react";
import { useFormInputModel } from "./model";
import { FormInputView } from "./view";

const FormInput = ({
  id,
  name,
  type,
  placeholder,
  value,
  handleChange,
}: {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const model = useFormInputModel(
    id,
    name,
    type,
    placeholder,
    value,
    handleChange
  );

  return <FormInputView {...model} />;
};

export default FormInput;
