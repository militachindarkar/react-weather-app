import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { imgData } from "../../imgData";
import { Card, CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignContent: "center",
    flexDirection: "column",
    textAlign: "center",
    [theme.breakpoints.up("xs")]: { maxWidth: 600 },
    [theme.breakpoints.up("sm")]: {
      maxWidth: 250,
      maxHeight: 300,
    },
    [theme.breakpoints.up("md")]: { maxWidth: 250, height: 250 },
    [theme.breakpoints.up("lg")]: {
      maxWidth: 300,
      height: 230,
    },
  },
}));
const daysList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const Weather = ({ weatherData, isDay }) => {
  const classes = useStyles();
  const iconNum = isDay ? weatherData.Day.Icon : weatherData.Night.Icon;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography color="textSecondary" variant="button" gutterBottom>
          {`${daysList[new Date(weatherData.Date).getDay()]}`}
        </Typography>
        <Typography color="textPrimary" variant="h5" gutterBottom>
          {`${new Date(weatherData.Date).getUTCDate()}/${new Date(
            weatherData.Date
          ).getMonth()}`}
        </Typography>
        <img src={imgData[iconNum - 1].img} alt={imgData[iconNum - 1].alt} />
        <Typography color="textSecondary" variant="subtitle1" gutterBottom>
          {`Min: ${weatherData.Temperature.Minimum.Value}`}&#176;
          {`${weatherData.Temperature.Minimum.Unit}`}
          <br />
          {`Max: ${weatherData.Temperature.Maximum.Value}`}&#176;
          {`${weatherData.Temperature.Maximum.Unit}`}
        </Typography>
        <Typography color="textSecondary" variant="subtitle2" gutterBottom>
          {`${
            isDay ? weatherData.Day.IconPhrase : weatherData.Night.IconPhrase
          }`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Weather;
