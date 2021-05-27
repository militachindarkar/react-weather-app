import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
}));

export const Headline = ({ headline }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4">{headline.Text}</Typography>
    </div>
  );
};
