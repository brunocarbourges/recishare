import { useState } from 'react';
import { Container } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import SearchFeed from '../components/SearchFeed';
import AppNavbar from '../components/Navbar';
import './HomePage.css';

const SearchPage = () => {
    const [query, setQuery] = useState('');

    const handleSearch = (newQuery) => {
        setQuery(newQuery);
    };

    return(
        <div className="d-flex flex-wrap">
            <AppNavbar />
            <Container fluid className="home-page-container mt-4">
                <SearchBar onSearch={handleSearch}/>
                <SearchFeed query={query}/>
            </Container>
        </div>
    );
};

export default SearchPage;