// RHFTextfield stands for React hook form with customized textfield.
import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// mui
import { TextField } from "@mui/material";

RHFTextfield.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFTextfield({ name, helperText, label, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          label={label}
          {...field}
          fullWidth
          error={!!error}
          helperText={error ? error.message : helperText}
          {...other}
        />
      )}
    />
  );
}
