import React, { useState } from "react";
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

function Register() {
  
  const paperStyle = {
    padding: "30px 20px",
    height: 460,
    width: 500,
    margin: "70px auto",
  };
  const formStyle = {
    height: 350,
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "space-between",
  };

  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#859DF4", marginBottom: 10 };
  const button = { backgroundColor: "#859DF4" };
  const load = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const submit = (e) => {
    if (password !== confirmPassword) alert("Passwords do not match");
    setLoading(true);
    e.preventDefault();
    axios
      .post(`${BASE_URL}/Trait-Up-Backend/public/api/registration`, {
        headers: {
          "Content-Type": "application/json",
        },
        name,
        email,
        password,
      })
      .then((response) => {
        setLoading(false);
        window.location.href = "/";
      })
      .catch(function (error) {
        alert(error);
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
            <h2 style={headerStyle}>Trait Up</h2>
            <Typography variant="caption" gutterBottom>
              Please fill this form to create an account !
            </Typography>
          </Grid>
          <form style={formStyle} onSubmit={submit}>
            <TextField
              onChange={(e) => setName(e.target.value)}
              fullWidth
              label="Name"
              placeholder="Enter your name"
            />
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              fullWidth 
              label="Email"
              placeholder="Enter your email"
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
            <TextField
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
            />
            <Button type="submit" variant="contained" style={button}>
              Sign up
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
}

export default Register;
