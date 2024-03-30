import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import { RHFTextfield } from "../../components/hook-form";
import { Eye, EyeSlash } from "phosphor-react";
import { useDispatch } from "react-redux";
import { NewPassword } from "../../redux/slices/auth";

const NewPasswordForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const NewPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, "Password must contain atleast 6 letters.")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("newPassword"), null], "Password didn't matched."),
  });

  const defaultValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const methods = useForm({
    resolver: yupResolver(NewPasswordSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessfuly },
  } = methods;

  const onSubmit = async (data) => {
    try {
      // submit data to backend
      dispatch(NewPassword(data));
    } catch (error) {
      console.log(error);
      reset();
      setError("after submitting form", {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        <RHFTextfield
          name="newPassword"
          label="New Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment onClick={() => setShowPassword(!showPassword)}>
                <IconButton>{showPassword ? <Eye /> : <EyeSlash />}</IconButton>
              </InputAdornment>
            ),
          }}
        />
        <RHFTextfield
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment onClick={() => setShowPassword(!showPassword)}>
                <IconButton>{showPassword ? <Eye /> : <EyeSlash />}</IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
          }}
        >
          Submit
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default NewPasswordForm;
