import { Controller } from "react-hook-form";
import { InputTextProps } from "../../types/FormProps";
import { FC, memo } from "react";
import { TextField } from "@mui/material";

export const InputText: FC<InputTextProps> = memo((props) => {
  const {
    name,
    id,
    label,
    control,
    rules,
    required,
    type,
    autoComplete,
    autoFocus,
  } = props;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={""}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          margin="normal"
          fullWidth
          variant="outlined"
          required={required}
          type={type}
          id={id}
          label={label}
          name={name}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          error={!!error}
          onChange={onChange}
          value={value}
          helperText={error ? error.message : null}
        />
      )}
    ></Controller>
  );
});
