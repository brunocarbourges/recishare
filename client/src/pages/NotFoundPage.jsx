import logo from "../assets/recishare.png";

const NotFoundPage = () => {
	return (
		<div className="not-found-container">
      <h2>404 Not Found</h2>
      <img src={logo} alt="ReciShare logo" width={250} height={250} />
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
	);
};

export default NotFoundPage;