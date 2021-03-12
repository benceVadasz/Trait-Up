import React, { useState, useEffect } from "react";
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
import { useStoreActions } from 'easy-peasy';

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

  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const add = useStoreActions(actions => actions.addUser);  
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    setLoading(true)
    setUser({name, email, gender, password});
  };

  useEffect(() => { 
    setLoading(false);
    add(user);
  }, [add, user]);

  if (loading) 
    return (
      <div className="App">
        <div className="loading">Loading...</div>
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
            <FormControl component="fieldset" style={marginTop}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                onChange={(e) => setGender(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
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
