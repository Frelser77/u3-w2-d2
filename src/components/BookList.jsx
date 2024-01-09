import React, { useState } from "react";
import { Container, Row, Form, FormControl, Col } from "react-bootstrap";
import SingleBook from "./SingleBook";
import booksFantasyData from "../data/fantasy.json";
import booksHistoryData from "../data/history.json";
import booksHorrorData from "../data/horror.json";
import booksRomanceData from "../data/romance.json";
import booksScifiData from "../data/scifi.json";
import CommentArea from "./CommentArea";

function BookList({ selectedBook, setSelectedBook }) {
	const allBooks = [
		...booksFantasyData,
		...booksHistoryData,
		...booksHorrorData,
		...booksRomanceData,
		...booksScifiData,
	];

	const [searchTerm, setSearchTerm] = useState("");
	const [displayedBooks, setDisplayedBooks] = useState([
		booksFantasyData[0],
		booksHistoryData[0],
		booksHorrorData[0],
		booksRomanceData[0],
		booksScifiData[0],
	]);

	const handleChange = (event) => {
		const newSearchTerm = event.target.value.toLowerCase();
		setSearchTerm(newSearchTerm);

		if (newSearchTerm) {
			const filteredBooks = allBooks.filter((book) => book.title.toLowerCase().includes(newSearchTerm));
			setDisplayedBooks(filteredBooks);
		} else {
			setDisplayedBooks([
				booksFantasyData[0],
				booksHistoryData[0],
				booksHorrorData[0],
				booksRomanceData[0],
				booksScifiData[0],
			]);
		}
	};

	const selectBook = (book) => {
		setSelectedBook(book);
	};

	return (
		<Container>
			<Row>
				<Col md={8}>
					<h2 className="fs-1">Best Seller</h2>
					<Form className="my-4" onSubmit={(event) => event.preventDefault()}>
						<FormControl
							id="searchBook"
							name="searchTerm"
							type="text"
							placeholder="Enter book title"
							value={searchTerm}
							onChange={handleChange}
							className="py-3"
						/>
					</Form>
					<Row xs={1} md={2} lg={3} className="gap-4 ms-2">
						{displayedBooks.map((book) => (
							<SingleBook
								key={book.asin + book.category}
								book={book}
								onSelect={selectBook}
								selected={selectedBook && book.asin === selectedBook.asin}
							/>
						))}
					</Row>
				</Col>
				<Col md={4} className="my-auto p-2">
					{selectedBook ? (
						<CommentArea id="comment-area" book={selectedBook} />
					) : (
						<div className="text-danger">
							<strong>Select a book to show comments.</strong>
						</div>
					)}
				</Col>
			</Row>
		</Container>
	);
}

export default BookList;
