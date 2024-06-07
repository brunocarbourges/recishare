import React from 'react';
import logo from "../assets/recishare.png";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./NotFoundPage.css";

const NotFoundPage = () => {
	return (
		<div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
			<h2 className="not-found-h2">404 Not Found</h2>
			<img src={logo} alt="ReciShare logo" className="img-fluid logo mb-4" href="/home"/>
			<p className="not-found-p">Sorry, the page you are looking for does not exist.</p>
		</div>
	);
};

export default NotFoundPage;