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

app.post("/submit", async (req, res) => {
	const lat = req.body.latitude;
	const lon = req.body.longitude;
	const zip = req.body.zipCode;
	const units = req.body.unit;

	const API_URL = `https://api.openweathermap.org/data/2.5/weather?mode=html&lat=${lat}&lon=${lon}&units=${units}&zip=${zip}&appid=${APIKey}`;

	try {
		const response = await axios.get(API_URL);
		res.render("index.ejs", {content: response.data });
	} catch (error) {
		res.render("index.ejs", { content: JSON.stringify(error.response.data) });
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
