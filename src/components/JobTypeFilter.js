import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {useMediaQuery} from "@material-ui/core";
import jobModel from "../models/jobModel";
import {useTheme} from "@material-ui/core/styles";

const JobTypeFilter = ({ jobs, onTypeFilter, clear }) => {

  const value = jobModel.useStoreState(state => state.typeFilter);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div style={!isMobile ? { width: 200, marginRight: 10 } : { width: 200}}>
      <Autocomplete
        onChange={onTypeFilter}
        freeSolo
        name={'job'}
        onClose={clear}
        inputValue={value}
        id="free-solo-2-demo"
        disableClearable
        options={jobs.map(job => {
          return job.title;
        })}
        renderInput={(params) => (
          <TextField
            style={{ backgroundColor: "white" }}
            {...params}
            label="Search by position"
            margin="normal"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              type: "search",
              // endAdornment: (
              //   <InputAdornment position="end">
              //     <IconButton aria-label="">
              //       <SearchIcon />
              //     </IconButton>
              //   </InputAdornment>
              // ),
            }}
          />
        )}
      />
    </div>
  );
};

export default JobTypeFilter;
