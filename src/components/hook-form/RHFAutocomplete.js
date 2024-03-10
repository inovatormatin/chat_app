// RHFTextfield stands for React hook form with customized textfield.
import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// mui
import { Autocomplete, TextField } from "@mui/material";

RHFAutocomplete.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFAutocomplete({ name, helperText, label, ...other }) {
  const { control, setValue } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          fullWidth
          onChange={(event, newValue) =>
            setValue(name, newValue, { shouldValidate: true })
          }
          {...other}
          renderInput={(params) => (
            <TextField
              label={label}
              error={!!error}
              helperText={error ? error.message : helperText}
              {...params}
            />
          )}
        />
      )}
    />
  );
}
