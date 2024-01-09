import { React } from "react";
import { Card, Col, Row } from "react-bootstrap";

function SingleBook({ book, onSelect, selected }) {
	const handleClick = () => {
		onSelect(book);
	};

	return (
		<Row className="text-align-start">
			<Col xs="auto">
				<Card
					className="pointer"
					onClick={handleClick}
					style={{
						borderColor: selected ? "green" : "transparent",
						borderWidth: selected ? "1px" : "0px",
					}}
				>
					<Card.Img
						className="img-fluid"
						variant="top"
						src={book.img}
						alt={`Copertina di ${book.title}`}
						style={{ height: "200px", objectFit: "cover" }}
					/>
					<Card.Body className="brownCard rounded-bottom border-top border-black ">
						<Card.Title className="card-title">{book.title}</Card.Title>
						<Card.Text className="card-price">
							Prezzo: <span className="badge bg-success">€{book.price}</span>
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
}

export default SingleBook;
