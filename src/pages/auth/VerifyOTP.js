import React from "react";
import { Stack, Typography } from "@mui/material";
import OtpForm from "../../sections/auth/OtpForm";
import { useSelector } from "react-redux";

const VerifyOTP = () => {
  const { email } = useSelector((state) => state.auth);
  return (
    <>
      <Stack spacing={2} sx={{ position: "relative" }}>
        <Stack>
          <Typography variant="h3" paragraph>
            Verify your email.
          </Typography>
          <Typography variant="body1" paragraph>
            We sent a 6 Digit OTP to : {email}. Please check your inbox.
          </Typography>
        </Stack>
        <OtpForm />
      </Stack>
    </>
  );
};

export default VerifyOTP;
