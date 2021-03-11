import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';



const SearchForm = ({jobs}) => {


    return (

      <div style={{ width: 250 }}>
      <Autocomplete 
        id="free-solo-demo"
        freeSolo
        options={Object.keys(jobs).map((id) => {
          return jobs[id].title
        })}
        renderInput={(params) => (
          <TextField style={{backgroundColor: "white"}}{...params} label="Search by position..." margin="normal" variant="outlined" />
        )}
      />

    </div>
  );
}



export default SearchForm;
