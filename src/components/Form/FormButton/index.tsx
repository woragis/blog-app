import { useFormButtonModel } from "./model";
import { FormButtonView } from "./view";

const FormButtom = ({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) => {
  const model = useFormButtonModel(children, onClick);

  return <FormButtonView {...model} />;
};

export default FormButtom;
