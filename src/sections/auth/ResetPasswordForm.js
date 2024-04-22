import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { Alert, Button, Stack } from "@mui/material";
import { RHFTextfield } from "../../components/hook-form";
import { ForgotPassword } from "../../redux/slices/auth";
import { useDispatch } from "react-redux";

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be valid email address"),
  });

  const defaultValues = {
    email: "demo@twak.com",
  };

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: {
      errors,
      // isSubmitting,
      // isSubmitSuccessfuly
    },
  } = methods;

  const onSubmit = async (data) => {
    try {
      // submit data to backend
      dispatch(ForgotPassword(data));
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
        <RHFTextfield name="email" label="Email Address" />
      </Stack>
      <Button
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        sx={{
          bgcolor: "text.primary",
          mt: 2,
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
          "&:hover": {
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
          },
        }}
      >
        Send Request
      </Button>
    </FormProvider>
  );
};

export default ResetPasswordForm;
