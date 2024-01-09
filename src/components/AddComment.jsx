import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { AUTH_TOKEN, API_URL } from "./CommentArea";

function AddComment({ book, onCommentAdded }) {
	const [comment, setComment] = useState("");
	const [rate, setRate] = useState("1");

	const handleInputChange = (event) => {
		setComment(event.target.value);
	};

	const handleRateChange = (event) => {
		setRate(event.target.value);
	};

	const submitComment = async (event) => {
		event.preventDefault();
		const asin = book.asin;

		const commentData = {
			comment: comment,
			rate: rate,
			elementId: asin,
		};

		try {
			const response = await fetch(`${API_URL}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: AUTH_TOKEN,
				},
				body: JSON.stringify(commentData),
			});

			if (!response.ok) {
				const errorData = await response.text();
				throw new Error(`Failed to submit comment: ${response.status} ${errorData}`);
			}

			setComment("");
			setRate("1");
			onCommentAdded();
		} catch (error) {
			console.error("Error submitting comment:", error);
		}
	};

	return (
		<Form onSubmit={submitComment}>
			<Form.Group>
				<Form.Label htmlFor="textarea" className="fw-bold my-2">
					Comment
				</Form.Label>
				<Form.Control
					id="textarea"
					as="textarea"
					rows={3}
					value={comment}
					onChange={handleInputChange}
					required
					placeholder="Write a comment"
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label htmlFor="rateSelect" className="fw-bold my-2">
					Rate
				</Form.Label>
				<Form.Control
					id="rateSelect"
					as="select"
					style={{ color: rate > 2 ? "green" : "red" }}
					className="fw-bold"
					value={rate}
					onChange={handleRateChange}
					required
				>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</Form.Control>
			</Form.Group>
			<Button className="brown mt-3 mb-2" type="submit">
				Submit
			</Button>
		</Form>
	);
}

export default AddComment;
