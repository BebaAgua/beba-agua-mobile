import { Control, Controller, FieldError } from "react-hook-form";

import { Input, InputProps } from "../Input";
import { Error } from "./styles";

type Props = InputProps & {
  name: string;
  control: Control<any>;
  error?: FieldError;
};

export function ControlledInput({ control, name, error, ...rest }: Props) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
      />
      {error && <Error>{error.message}</Error>}
    </>
  );
}
