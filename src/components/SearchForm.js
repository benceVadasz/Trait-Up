import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment'



const SearchForm = ({jobs}) => {


    return (

      <div style={{ width: 200}} >
      <Autocomplete 
        id="free-solo-demo"
        freeSolo
        options={Object.keys(jobs).map((id) => {
          return jobs[id].title
        })}
        renderInput={(params) => (
          <TextField style={{backgroundColor: "white"}}{...params}
           label="Search by position"
            margin="normal"
             variant="outlined"
             InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label=""
    
                  >
                    <SearchIcon/>
                  </IconButton>
                </InputAdornment>
              ),
            }} />

        )}
      />

    </div>
  );
}



export default SearchForm;
