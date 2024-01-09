import React, { useState, useEffect } from "react";
import { Button, Col, ListGroup } from "react-bootstrap";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
export const API_URL = "https://striveschool-api.herokuapp.com/api/comments/";
export const AUTH_TOKEN =
	"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxYzJjMjBkOGEyMDAwMThhNDhhMmQiLCJpYXQiOjE3MDQ3MjA0ODQsImV4cCI6MTcwNTkzMDA4NH0.Vvao4K4ecGDgp8dk7wmXHHxGN9tXVrYOBz6hJqopsfc";

function CommentArea({ book }) {
	const [comments, setComments] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchComments = async () => {
		if (!book) {
			return;
		}
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(`${API_URL}${book.asin}`, {
				headers: {
					Authorization: AUTH_TOKEN,
				},
			});
			if (!response.ok) {
				throw new Error("Failed to fetch comments");
			}
			const data = await response.json();
			setComments(data);
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchComments();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [book]);

	const handleCommentAdded = () => {
		fetchComments();
	};

	const deleteComment = async (commentId) => {
		try {
			const response = await fetch(`${API_URL}/${commentId}`, {
				method: "DELETE",
				headers: {
					Authorization: AUTH_TOKEN,
				},
			});

			if (!response.ok) {
				throw new Error("Failed to delete comment");
			}

			fetchComments();
		} catch (error) {
			console.error("Error deleting comment:", error);
		}
	};

	if (isLoading) return <Loading />;
	if (error) return <Error message={error} />;

	return (
		<Col className="commentArea">
			<h5 className="fw-bold text-center my-2">Comments: {book ? book.title : "Select a book"}</h5>
			<CommentsList comments={comments} onDelete={deleteComment} className="comment-section" />
			{book && <AddComment book={book} onCommentAdded={handleCommentAdded} />}
		</Col>
	);
}

const CommentsList = ({ comments, onDelete }) => (
	<ListGroup className="gap-1">
		{comments.map((comment) => (
			<ListGroup.Item
				className="d-flex flex-column align-items-center justify-content-center rounded gap-2"
				key={comment._id}
			>
				<div className="fw-bold text-center">{comment.comment}</div>
				<div className="fw-bold text-center">
					{comment.rate >= 3 ? "⭐" : "✰"}
					{comment.rate}
				</div>
				<Button variant="outline-danger" size="sm" onClick={() => onDelete(comment._id)}>
					Delete
				</Button>
			</ListGroup.Item>
		))}
	</ListGroup>
);

export default CommentArea;
