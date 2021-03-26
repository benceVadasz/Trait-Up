import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

const SearchForm2 = ({ onFilter , locations, clear  }) => {
  return (
    <div style={{ width: 200, marginLeft: 10 }}>
      <Autocomplete
        onChange={onFilter}
        onClose={clear}
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={locations.map(location => {
          return location;
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
