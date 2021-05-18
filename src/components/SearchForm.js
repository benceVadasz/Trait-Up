import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

const SearchForm = ({ jobs, onTypeFilter, clear }) => {
  return (
    <div style={{ width: 200, marginRight: 10 }}>
      <Autocomplete
        onChange={onTypeFilter}
        freeSolo
        name={'job'}
        onClose={clear}
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
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="">
                    <SearchIcon />
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

export default SearchForm;
