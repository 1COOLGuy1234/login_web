// const express = require("express");
// const jwt = require("express-jwt");
// const jsonwebtoken = require("jsonwebtoken");
// const cors = require("cors");
// const app = express();
// app.use(cors());
// const jwtSecret = "secret123";
// app.get("/jwt", (req, res) => {
// 	res.json({ token: jsonwebtoken.sign({ user: "johndoe" }, jwtSecret) });
// });
// app.use(jwt({ secret: jwtSecret, algorithms: ["HS256"] }));
// const foods = [
// 	{ id: 1, description: "burritos" },
// 	{ id: 2, description: "quesadillas" },
// 	{ id: 3, description: "churos" },
// ];
// app.get("/foods", (req, res) => {
// 	res.json(foods);
// });
// app.listen(3001);
// console.log("App running on localhost:3001");

// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";
// const apiUrl = "http://localhost:3001";
// axios.interceptors.request.use(
// 	(config) => {
// 		const { origin } = new URL(config.url);
// 		const allowedOrigins = [apiUrl];
// 		const token = localStorage.getItem("token");
// 		if (allowedOrigins.includes(origin)) {
// 			config.headers.authorization = `Bearer ${token}`;
// 		}
// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	}
// );
// function App() {
// 	const storedJwt = localStorage.getItem("token");
// 	const [jwt, setJwt] = useState(storedJwt || null);
// 	const [foods, setFoods] = useState([]);
// 	const [fetchError, setFetchError] = useState(null);
// 	const getJwt = async () => {
// 		const { data } = await axios.get(`${apiUrl}/jwt`);
// 		localStorage.setItem("token", data.token);
// 		setJwt(data.token);
// 	};
// 	const getFoods = async () => {
// 		try {
// 			const { data } = await axios.get(`${apiUrl}/foods`);
// 			setFoods(data);
// 			setFetchError(null);
// 		} catch (err) {
// 			setFetchError(err.message);
// 		}
// 	};
// 	return (
// 		<>
// 			{" "}
// 			<section style={{ marginBottom: "10px" }}>
// 				{" "}
// 				<button onClick={() => getJwt()}>Get JWT</button>{" "}
// 				{jwt && (
// 					<pre>
// 						{" "}
// 						<code>{jwt}</code>{" "}
// 					</pre>
// 				)}{" "}
// 			</section>{" "}
// 			<section>
// 				{" "}
// 				<button onClick={() => getFoods()}> Get Foods </button>{" "}
// 				<ul>
// 					{" "}
// 					{foods.map((food, i) => (
// 						<li>{food.description}</li>
// 					))}{" "}
// 				</ul>{" "}
// 				{fetchError && <p style={{ color: "red" }}>{fetchError}</p>}{" "}
// 			</section>{" "}
// 		</>
// 	);
// }
// export default App;

enum me {
	one,
	two,
	three,
	four,
}
console.log("one");
