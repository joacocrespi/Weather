import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const APIKey = "e4a85e00c8153d5efa391ba7672de62d";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.render("index.ejs");
});

app.post("/submit-coord", async (req, res) => {
	const lat = req.body.latitude;
	const lon = req.body.longitude;
	const units = "metric";

	try {
		const response = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${APIKey}`
		);
		const result = response.data;
		console.log(result);
		res.render("pages/weather.ejs", { weather: result });
	} catch (error) {
		const errorContent = error.response
			? error.response.data
			: "An error occurred";
		res.render("pages/weather.ejs", { weather: errorContent });
	}
});

app.post("/submit-city", async (req, res) => {
	const city = req.body.cityName;
	const units = "metric";
	const API_URL_city = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`;

	try {
		// Fetch geographic coordinates
		const response = await axios.get(API_URL_city);
		if (response.data.length === 0) {
			throw new Error("City not found");
		}
		const { lat, lon } = response.data[0];

		// Fetch weather data using coordinates
		const API_URL_weather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${APIKey}`;
		const weatherResponse = await axios.get(API_URL_weather);
		const result = weatherResponse.data;

		console.log(result);

		res.render("pages/weather.ejs", { weather: result });
	} catch (error) {
		const errorContent = error.message || "An error occurred";
		res.render("pages/weather.ejs", { error: errorContent });
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
