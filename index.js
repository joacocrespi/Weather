import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
// const API_URL =
const yourAPIKey = "e4a85e00c8153d5efa391ba7672de62d";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.render("index.ejs");
});


app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
