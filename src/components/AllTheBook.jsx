import React, { useState } from "react";
import BooksFantasy from "./FantasyBooks";
import BooksHistory from "./HistoyBooks";
import BooksHorror from "./HorrorBooks";
import BooksRomance from "./RomanceBooks";
import BooksScifi from "./ScifiBooks";
import { Container } from "react-bootstrap";

function AllBooks({ onBookSelect }) {
	const [showSections, setShowSections] = useState({
		fantasy: false,
		history: false,
		horror: false,
		romance: false,
		scifi: false,
	});

	const handleShowInfo = (book) => {
		onBookSelect(book);
		window.location.hash = "#comment-area";
	};

	const toggleSection = (section) => {
		setShowSections({
			fantasy: false,
			history: false,
			horror: false,
			romance: false,
			scifi: false,
			[section]: true,
		});
	};

	return (
		<Container className="my-scroll-zone my-2 rounded">
			<div className="section-toggles">
				<button className="btn my-btn mx-3 mt-4 mb-2" onClick={() => toggleSection("fantasy")}>
					Fantasy
				</button>
				<button className="btn my-btn mx-3 mt-4 mb-2" onClick={() => toggleSection("history")}>
					History
				</button>
				<button className="btn my-btn mx-3 mt-4 mb-2" onClick={() => toggleSection("horror")}>
					Horror
				</button>
				<button className="btn my-btn mx-3 mt-4 mb-2" onClick={() => toggleSection("romance")}>
					Romance
				</button>
				<button className="btn my-btn mx-3 mt-4 mb-2" onClick={() => toggleSection("scifi")}>
					Sci-Fi
				</button>{" "}
			</div>

			{showSections.fantasy && <BooksFantasy onShowInfo={handleShowInfo} />}
			{showSections.history && <BooksHistory onShowInfo={handleShowInfo} />}
			{showSections.horror && <BooksHorror onShowInfo={handleShowInfo} />}
			{showSections.romance && <BooksRomance onShowInfo={handleShowInfo} />}
			{showSections.scifi && <BooksScifi onShowInfo={handleShowInfo} />}
		</Container>
	);
}

export default AllBooks;
