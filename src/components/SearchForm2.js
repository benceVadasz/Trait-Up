import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

const SearchForm2 = ({ jobs, onFilter }) => {
  return (
    <div style={{ width: 200 }}>
      <Autocomplete
        onChange={onFilter}
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={Object.keys(jobs).map((id) => {
          return jobs[id].location;
        })}
        renderInput={(params) => (
          <TextField
            style={{ backgroundColor: "white" }}
            {...params}
            label="Search by location"
            margin="normal"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              type: "search",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="">
                    <LocationOnIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </div>
  );
};

export default SearchForm2;
