import { Box, TextField, Button, Typography } from "@mui/material";
import { SyntheticEvent } from "react";

export default function ContactForm() {
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    // Gérer les données du formulaire
    console.log("Formulaire soumis !");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        padding: 4,
        maxWidth: 600,
        margin: "auto",
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Contactez-nous
      </Typography>
      <TextField
        fullWidth
        label="Votre nom"
        margin="normal"
        required
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Votre email"
        type="email"
        margin="normal"
        required
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Votre message"
        margin="normal"
        required
        multiline
        rows={4}
        variant="outlined"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 2 }}
      >
        Envoyer
      </Button>
    </Box>
  );
}
