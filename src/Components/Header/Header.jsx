import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/search?q=${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <header className='header'>
      <nav className='nav'>
        <div className='back'>
          <FontAwesomeIcon className='onback' icon={faCircleLeft} style={{ color: '#a3abb8' }} />
        </div>
        <div className='input'>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder='Search'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FontAwesomeIcon className='search' icon={faSearch} style={{ color: '#a3abb8' }} />
          </form>
        </div>
        <FontAwesomeIcon icon={faBell} className='faBell' style={{ color: '#a3abb8' }} />
      </nav>
      <Outlet />
    </header>
  )
}

export default Header;