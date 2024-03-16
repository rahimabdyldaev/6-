import React, { useState } from 'react';
import "./ModalWindow.css";

const ModalWindow = ({ onSubmit }) => {
  const [farm, setFarm] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFarm({ ...farm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!farm.email || !farm.phone || !farm.name) {
      alert('Please fill in all fields');
      return;
    }

    onSubmit(farm);
    setFarm({ name: '', email: '', phone: '' });
  };

  const isFormValid = farm.email && farm.phone && farm.name;

  return (
    <div className='ModalWindow'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Имя..."
          name="name"
          value={farm.name}
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="E-mail..."
          name="email"
          value={farm.email}
          onChange={handleChange}
        />

        <input
          type="tel"
          placeholder="Номер телефона.."
          name="phone"
          value={farm.phone}
          onChange={handleChange}
        />

        <button  className="button-85" role="button" id='buttonSave' type="submit" disabled={!isFormValid}>
        Сохранять
        </button>
      </form>
    </div>
  );
};

export default ModalWindow;