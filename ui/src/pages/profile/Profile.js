import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  FormControlLabel,
  Switch,
  makeStyles
} from "@material-ui/core";
import { toast } from "react-toastify";
import api from "../../services/api";
import handleReqError from "../../utils/handleReqError";
import logout from "../../utils/logout";

const Profile = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recordId, setRecordId] = useState("");
  const [oldRecordId, setOldRecordId] = useState("");
  const [updatePassword, setUpdatePassword] = useState(false);

  useEffect(() => {
    api
      .get("/getUser")
      .then(response => {
        setName(response.data.name);
        setEmail(response.data.email);
        setRecordId(response.data.recordId);
        setOldRecordId(response.data.recordId);
      })
      .catch(error => handleReqError(error));
  }, []);

  const classes = useStyles();

  function handleSubmit(e) {
    e.preventDefault();

    api
      .put(`/updateUser/${oldRecordId}`, {
        name,
        recordId,
        email,
        password
      })
      .then(response => {
        toast.success(response.data.messageUi_PtBr);
        if (recordId === oldRecordId) {
          history.push("/dashboard");
        } else {
          logout();
        }
      })
      .catch(error => handleReqError(error));
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextField
            name="name"
            variant="outlined"
            required
            fullWidth
            label="Nome"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
          />
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
        <Grid item xs={12}>
          <TextField
            name="recordId"
            variant="outlined"
            required
            fullWidth
            label="Prontuário"
            value={recordId}
            onChange={e => setRecordId(e.target.value)}
          />
        </Grid>
        <FormControlLabel
          control={
            <Switch
              checked={updatePassword}
              onChange={() => setUpdatePassword(!updatePassword)}
              color="primary"
            />
          }
          label="Alterar senha"
        />
        {updatePassword && (
          <Grid item xs={12}>
            <TextField
              name="password"
              variant="outlined"
              required={updatePassword}
              fullWidth
              label="Senha"
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
          </Grid>
        )}
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Atualizar perfil
      </Button>
    </form>
  );
};

export default Profile;

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
