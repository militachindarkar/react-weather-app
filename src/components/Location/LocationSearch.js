import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    [theme.breakpoints.down("sm")]: {},
    [theme.breakpoints.up("md")]: { maxWidth: 500 },
    [theme.breakpoints.up("lg")]: {
      maxWidth: 500,
    },
  },
}));

const LocationSearch = ({
  cityList,
  inputChangeHandler,
  selectChangeHandler,
}) => {
  const classes = useStyles();
  return (
    <Autocomplete
      className={classes.root}
      id="size-small-standard"
      size="small"
      options={cityList}
      getOptionLabel={(option) => option.cityName}
      onChange={selectChangeHandler}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select City"
          variant="outlined"
          onChange={inputChangeHandler}
          margin="normal"
        />
      )}
    />
  );
};

export default LocationSearch;
