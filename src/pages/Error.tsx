import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";

const Error = () => {
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h3" component="h2" align="center">
          404 Found
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackClick}
          style={{ marginTop: '16px' }}
        >
          Go Back
        </Button>
      </Box>
    </Container>
  );
};

export default Error;
