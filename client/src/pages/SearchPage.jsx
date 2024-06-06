import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import AppNavbar from '../components/Navbar';
import './HomePage.css';

const SearchPage = () => {
    const handleSearch = (query) => {
        console.log(query);
        //query is the search string to send to backend
    };
    return(
        <div className="d-flex flex-wrap">
            <AppNavbar />
            <Container fluid className="home-page-container mt-4">
                <SearchBar onSearch={handleSearch}/>
            </Container>
        </div>
    );
};

export default SearchPage;