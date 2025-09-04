import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import ForgotPassword from "./ForgotPassword";
import { GoogleIcon, FacebookIcon, SitemarkIcon } from "./CustomIcons";
import { useAuth } from "@/auth/AuthContext";
import { useToast } from "@/components/ToastContainer";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: { width: "450px" },
}));

export default function SignInCard() {
  const { login, loading } = useAuth();
  const { addToast, removeToast } = useToast(); // aseguramos control de toasts únicos

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [openForgot, setOpenForgot] = useState(false);

  const handleClickOpen = () => setOpenForgot(true);
  const handleClose = () => setOpenForgot(false);

  const validateInputs = () => {
    let valid = true;
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Ingrese un email válido");
      valid = false;
    } else setEmailError("");

    if (!password || password.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres");
      valid = false;
    } else setPasswordError("");

    return valid;
  };

  const showToastOnce = (message: string, severity: "success" | "error" | "info" | "warning") => {
    const toastId = btoa(message); // genera un id único basado en el mensaje
    removeToast(toastId); // eliminamos cualquier toast previo con el mismo id
    addToast({ id: toastId, message, severity });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputs()) return;

    try {
      await login(email, password); // Mensajes se muestran automáticamente
    } catch (err) {
      // Opcional: aquí podrías hacer algo extra si quieres
    }
  };

  const handleSocialClick = (provider: string) => {
    showToastOnce(`${provider} login no implementado`, "info");
  };

  return (
    <>
      <Card variant="outlined">
        <Box sx={{ display: { xs: "flex", md: "none" } }}><SitemarkIcon /></Box>
        <Typography component="h1" variant="h4" sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>Sign in</Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(emailError)}
              helperText={emailError}
              placeholder="email@ejemplo.com"
              required
              fullWidth
            />
          </FormControl>

          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Link component="button" type="button" onClick={handleClickOpen} variant="body2">Forgot your password?</Link>
            </Box>
            <TextField
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(passwordError)}
              helperText={passwordError}
              placeholder="••••••"
              required
              fullWidth
            />
          </FormControl>

          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <ForgotPassword open={openForgot} handleClose={handleClose} />
          <Button type="submit" fullWidth variant="contained" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</Button>

          <Typography sx={{ textAlign: "center" }}>Don&apos;t have an account? <Link href="/register" variant="body2">Sign up</Link></Typography>
        </Box>

        <Divider>or</Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button fullWidth variant="outlined" onClick={() => handleSocialClick("Google")} startIcon={<GoogleIcon />}>Sign in with Google</Button>
          <Button fullWidth variant="outlined" onClick={() => handleSocialClick("Facebook")} startIcon={<FacebookIcon />}>Sign in with Facebook</Button>
        </Box>
      </Card>
    </>
  );
}
