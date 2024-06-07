import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if(searchTerm.trim()){
            onSearch(searchTerm);
        }
    };
  return (
    <Form className="d-flex mb-4" onSubmit={handleFormSubmit}>
      <FormControl
        type="search"
        placeholder="What's cooking, good looking?"
        className="me-2"
        aria-label="Search"
        id="search-input"
        name="search"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <Button variant="dark" type="submit">{"\u{1f50e}"}</Button>
    </Form>
  );
};

export default SearchBar;