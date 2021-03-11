import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

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
          <form style={formStyle}>
            <TextField
              fullWidth
              label="Email"
              placeholder="Enter your email"
            />
            <TextField
              fullWidth
              style={passwordStyle}
              label="Password"
              type="password"
              placeholder="Enter your password"
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
