import React, {useState} from "react";
import axios from 'axios';
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { BASE_URL } from "../constants";
import Spinner from "react-spinner-material";

function Login() {
  const paperStyle = {
    padding: "30px 20px",
    height: 340,
    width: 500,
    margin: "70px auto",
  };
  const formStyle = {
    height: 220,
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "space-between",
  };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#859DF4",  };
  const button = { backgroundColor: "#859DF4" };
  const passwordStyle = { marginBottom: 30 };
  const load = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  
  const submit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post(`${BASE_URL}/Trait-Up-Backend/public/api/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        email,
        password,
      })  
      .then((response) => {
        
        setLoading(false);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        sessionStorage.setItem("token", response.data.token);
        window.location.href = '/';
      })
      .catch(function (error) {
        alert("Invalid credentials");
      });
  };

  if (loading) 
    return (
      <div style={load}>
        <Spinner
          size={120}
          spinnerColor={"#333"}
          spinnerWidth={2}
          visible={true}
          color={'black'}/>
      </div>
    );

  return (
    <div>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
            <h2 style={headerStyle}>Log in</h2>
            <Typography variant="caption" gutterBottom>
              Please fill this form to log in!
            </Typography>
          </Grid>
          <form onSubmit={submit} style={formStyle}>
            <TextField
              fullWidth
              label="Email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              style={passwordStyle}
              label="Password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" style={button}>
              Log in
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
}

export default Login;
