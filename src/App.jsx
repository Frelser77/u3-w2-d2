// App.js
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState } from "react";
import NavBar from "./components/navBar";
import MyFooter from "./components/footerCom";
import Welcome from "./components/welcome";
import BookList from "./components/BookList";
import AllBooks from "./components/AllTheBook";

function App() {
	const [selectedBook, setSelectedBook] = useState(null);

	return (
		<div className="App">
			<NavBar />
			<Welcome />
			<BookList selectedBook={selectedBook} setSelectedBook={setSelectedBook} />
			<AllBooks onBookSelect={setSelectedBook} />
			<MyFooter />
		</div>
	);
}

export default App;
