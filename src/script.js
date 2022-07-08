import fetch from "node-fetch";
globalThis.fetch = fetch;

const insertFakeItems = async () => {
	// check tokene
	const token =
		"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiWmhvdSIsImFnZSI6MjMsImpvYiI6ImludGVybiIsImV4cGlyZVRpbWUiOjE2NTQ4NDQ5MjExNTIsImlhdCI6MTY1NDg0MTMyMX0.vy1pnh9GqWzLX3D7Nmt7QMEU48dtfvlc8mqzN3iNAhg";
	// request delete
	const rawResponse = await fetch("http://localhost:7001/contacts", {
		headers: {
			"Content-Type": "application/json",
			authorization: token,
		},
		method: "POST",
		body: JSON.stringify({
			name: "test",
			number: "011-123321",
		}),
	});

	const response = await rawResponse.json();

	// if token expired
	if (response.code === 403) {
		console.log("Error");
		return;
	}
};

for (let i = 0; i < 1000; i++) {
	insertFakeItems().then(() => console.log(i));
}
