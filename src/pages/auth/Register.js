import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, Stack, Typography } from "@mui/material";

const Register = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Get started with Twak</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">Already has an account ?</Typography>
          <Link variant="subtitle2" component={RouterLink} to={"auth/login"}>
            Sign in
          </Link>
        </Stack>
        {/* Register form */}
        <Typography
          component={"div"}
          sx={{
            color: "text.secondary",
            mt: 3,
            typography: "caption",
            textAlign: "center",
          }}
        >
          {"By signing up, I agree to "}
          <Link underline="always" color={"text.primary"}>
            Terms of service
          </Link>
          {" and "}
          <Link underline="always" color={"text.primary"}>
            Privacy Policy
          </Link>
        </Typography>
      </Stack>
    </>
  );
};

export default Register;
