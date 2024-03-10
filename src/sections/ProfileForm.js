import React, { useCallback } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../components/hook-form/FormProvider";
import { Alert, Button, Stack } from "@mui/material";
import { RHFTextfield } from "../components/hook-form";

const ProfileForm = () => {
  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required("Name can't be empty."),
    about: Yup.string().required("About is required."),
    avatarUrl: Yup.string()
      .required("Profile image is required")
      .nullable(true),
  });

  const defaultValues = {
    name: "",
    about: "Hey there I am using this app.",
  };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessfuly },
  } = methods;

  //  here watch function is used to get the all values from form
  const values = watch();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      if (file) {
        setValue("avatarUrl", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const onSubmit = async (data) => {
    try {
      // submit data to backend
      console.log("DATA", data);
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
        <Stack spacing={3}>
          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}</Alert>
          )}
          <RHFTextfield
            name="name"
            label="Name"
            helperText="This name is visible to your contacts."
          />
          <RHFTextfield
            name="about"
            label="About"
            multiline
            rows={3}
            maxRows={5}
          />
        </Stack>
        <Stack direction="row" justifyContent="end" alignItems="center">
          <Button
            color="primary"
            variant="outlined"
            type="submit"
            size="medium"
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
