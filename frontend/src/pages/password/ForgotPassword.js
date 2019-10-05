import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  makeStyles,
  Container
} from "@material-ui/core";
import { toast } from "react-toastify";

import Logo from "../../assets/logo.png";
import Api from "../../services/Api";
import Copyright from "../../components/Copyright";

import cookies from "../../utils/cookies";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");

  const classes = useStyles();

  useEffect(() => {
    Api.get("isFirstAcess").then(response => {
      if (response.data.isFirstAcess) history.push("/firstAccess");
    });

    if (cookies.get("authCookie")) history.push("/dashboard");
  }, [history]);

  async function handleSubmit(e) {
    e.preventDefault();

    Api.post("/forgotPassword", {
      email
    })
      .then(response => {
        toast.success(response.data.messageUi_PtBr);
      })
      .catch(error => {
        if (error.response) {
          toast.error(error.response.data.messageUi_PtBr);
        } else if (error.request) {
          toast.error("O servidor não está respondendo.");
        } else {
          toast.error(error.message);
        }
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <img src={Logo} alt="logo" />
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography align="center">
                Informe seu e-mail para redefinir a senha.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                variant="outlined"
                required
                fullWidth
                label="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Enviar e-mail
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default ForgotPassword;

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
    background: "#ffa949",
    "&:hover": {
      background: "#ff9949"
    }
  }
}));