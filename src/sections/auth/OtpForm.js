import React from "react";
import { RHFTextfield } from "../../components/hook-form";
import { Alert, Button, Stack } from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { useDispatch } from "react-redux";
import { VerifyOTP } from "../../redux/slices/auth";

const OtpForm = () => {
  const dispatch = useDispatch();

  const OtpSchema = Yup.object().shape({
    otp: Yup.string()
      .min(6, "OTP must contain atleast 6 digits.")
      .max(6, "Only 6 digits OTP allowed.")
      .required("OTP is required"),
  });

  const defaultValues = {
    otp: "",
  };

  const methods = useForm({
    resolver: yupResolver(OtpSchema),
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
      dispatch(VerifyOTP(data))
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
        <RHFTextfield name="otp" label="6-Digit OTP" type="number" />
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

export default OtpForm;
