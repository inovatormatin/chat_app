import React from "react";
import * as Yup from "yup";
import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { RHFTextfield, RHFAutocomplete } from "../../components/hook-form";

const MEMBERS = [
  "Name Manish 1",
  "Name 2",
  "Name 3",
  "Name 4",
  "Name 5",
  "Name 6",
  "Name 7",
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateGroupForm = ({ handleClose }) => {
  const NewGroupSchema = Yup.object().shape({
    title: Yup.string().required("Title is required."),
    members: Yup.array().min(2, "Must have at least two members."),
  });

  const defaultValues = {
    title: "",
    members: [],
  };

  const methods = useForm({
    resolver: yupResolver(NewGroupSchema),
    defaultValues,
  });

  const {
    // reset,
    // watch,
    // setError,
    handleSubmit,
    formState: {
      errors,
      // isSubmitting,
      // isSubmitSuccessfuly,
      // isValid
    },
  } = methods;

  const onSubmit = async (data) => {
    try {
      // submit data to backend
      // console.log("DATA", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        <RHFTextfield name="title" label="Group Name" />
        <RHFAutocomplete
          name="members"
          label="Members"
          multiple
          freeSolo
          options={MEMBERS.map((option) => option)}
          ChipProps={{ size: "medium" }}
        />
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="end"
        >
          <Button type="submit" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

const CreateGroup = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      keepMounted
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{ p: 4 }}
    >
      {/* Title */}
      <DialogTitle mb={2}>Create new Group.</DialogTitle>
      {/* Content */}
      <DialogContent>
        <CreateGroupForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroup;
