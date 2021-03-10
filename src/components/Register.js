import React, {useState, useRef} from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";

function Register() {
  const paperStyle = {
    padding: "30px 20px",
    height: 660,
    width: 500,
    margin: "70px auto",
  };
  const formStyle = {
    height: 520,
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "space-between",
  };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#859DF4", marginBottom: 10 };
  const marginTop = { marginTop: 5 };
  const button = { backgroundColor: "#859DF4" };

  const [user, setUser] = useState([]);
  const form = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    const data = new FormData(form.current);
    fetch("/api", { method: "POST", body: data })
      .then((res) => res.json())
      .then((json) => setUser(json.user));
  };
  console.log(user);

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
            <TextField fullWidth label="Name" placeholder="Enter your name" />
            <TextField fullWidth label="Email" placeholder="Enter your email" />
            <FormControl component="fieldset" style={marginTop}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                style={{ display: "initial" }}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio color="primary" />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              fullWidth
              label="Password"
              placeholder="Enter your password"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              placeholder="Confirm your password"
            />
            <FormControlLabel
              control={<Checkbox color="primary" name="checkedA" />}
              label="I accept the terms and conditions."
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
