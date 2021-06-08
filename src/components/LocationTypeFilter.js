import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import IconButton from "@material-ui/core/IconButton";
import {useMediaQuery} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import jobModel from "../models/jobModel";
import {useTheme} from "@material-ui/core/styles";

const LocationTypeFilter = ({ onLocationFilter , locations, clear  }) => {

  const value = jobModel.useStoreState(state => state.locationFilter);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div style={ !isMobile ? { width: 200, marginLeft: 10 } : { width: 200 }}>
      <Autocomplete
        // onChange={onSelect}
        onClose={clear}
        inputValue={value}
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

export default LocationTypeFilter;
