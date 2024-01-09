import React from "react";
import Button from "react-bootstrap/Button";

function ButtonCard({ onAddToCart, onShowInfo }) {
	return (
		<>
			<div className="d-flex flex-row align-items-start gap-5">
				<Button size="sm" variant="secondary">
					Add Cart
				</Button>
				<Button size="sm" variant="success">
					Show info
				</Button>
			</div>
		</>
	);
}

export default ButtonCard;
