import React from "react";
import { Github } from "react-bootstrap-icons";

function MyFooter() {
	return (
		<footer className="bg-light text-center text-lg-start">
			<div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
				&copy; {new Date().getFullYear()} - Il tuo Sito Web
				<div className="d-flex align-items-center justify-content-center gap-1">
					Tutti i diritti riservati. Frelser7
					<a href="https://github.com/Frelser77" target="_blanck">
						<Github className="pointer mb-1" size={20} />
					</a>
				</div>
			</div>
		</footer>
	);
}

export default MyFooter;
