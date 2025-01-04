import { ChangeEvent } from "react";

export const useFormInputModel = (
  id: string,
  name: string,
  type: string,
  placeholder: string,
  value: string,
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
) => {
  return { id, name, type, placeholder, value, handleChange };
};
