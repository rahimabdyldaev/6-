import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./SearchResults.css";

const SearchResults = () => {
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get('q');

  const { users } = useSelector((state) => state.users);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='result-box'>
      <h2 className='result'>Search Results for: {searchTerm}</h2>
      {filteredUsers.map((user) => (
        <div key={user.id}>
          <img className='result-img' src="../../img/01.jpg" alt="" />
          <p id='results' className='result-name'>Name: {user.name}</p>
          <p id='results' className='result-email'>Email: {user.email}</p>
          <p id='results' className='result-phone'>Phone: {user.phone}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;