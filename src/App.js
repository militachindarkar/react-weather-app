import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Weather from "./components/Weather/Weather";
import LocationSearch from "./components/Location/LocationSearch";
import { NavigationBar } from "./components/NavigationBar";
import { Grid, Box, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  weatherContainer: { height: "100vh" },
  classDay: { backgroundColor: "#fffde7" },
  classNight: { backgroundColor: "#bdbdbd" },
}));

const App = () => {
  const classes = useStyles();
  const defaultCity = "mumbai";
  const defaultCityCode = "204842";
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState(defaultCityCode);
  const [inputText, setInputText] = useState(defaultCity);
  const [weatherData, setWeatherData] = useState([]);
  const [isDay, setIsDay] = useState(true);
  useEffect(() => {
    console.log("run", inputText);
    axios
      .get(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_WEATHER_API_KEY}&q=${inputText}`
      )
      .then((res) => {
        const _cityList = res.data.map((data) => {
          return { cityName: data.LocalizedName, cityCode: data.Key };
        });
        setCityList(_cityList);
      })
      .catch((error) => console.log(error));
  }, [inputText]);

  useEffect(() => {
    axios
      .get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city}?apikey=${process.env.REACT_APP_WEATHER_API_KEY}&language=en-us`
      )
      .then((res) => {
        console.log(res.data);
        setWeatherData(res.data.DailyForecasts);
      })
      .catch((error) => console.log(error));
  }, [city]);

  const onInputTextChange = (e) => {
    setInputText(e.target.value ? e.target.value : defaultCity);
  };

  const onCityChange = (e, value) => {
    setCity(value ? value.cityCode : defaultCityCode);
  };

  const handleToggleChange = (e) => {
    console.log(e.target.checked);
    setIsDay(e.target.checked);
  };
  return (
    <div className={classes.weatherContainer}>
      <NavigationBar isDay={isDay} handleToggleChange={handleToggleChange} />
      <Container className={isDay ? classes.classDay : classes.classNight}>
        <Box
          className={classes.marginAutoBox}
          xs={12}
          sm={10}
          md={8}
          lg={8}
          py={5}
        >
          <LocationSearch
            cityList={cityList}
            selectChangeHandler={onCityChange}
            inputChangeHandler={onInputTextChange}
          />
        </Box>
        <Box className={classes.weatherContainer} my={8}>
          <Grid container spacing={1}>
            <Grid item xs={1} sm={1}></Grid>
            {weatherData.map((item, index) => {
              return (
                <Grid key={index} item xs={12} sm={2}>
                  <Weather weatherData={item} isDay={isDay} />
                </Grid>
              );
            })}
            <Grid item xs={1} sm={1}></Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default App;
