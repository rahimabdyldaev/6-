import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchAllUsers, deleteUsers, createUsers } from '../../store/reducers/UserReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faTrashCan, faPen, faSort } from '@fortawesome/free-solid-svg-icons'; 
import ModalWindow from '../ModalWindow/ModalWindow';
import "./UserList.css" 

const UserList = () => { 
  const dispatch = useDispatch(); 
  const { users, loading } = useSelector((state) => state.users); 
  const [isModalOpen, setModalOpen] = useState(false); 
 
  const createUser = (user) => { 
    dispatch(createUsers(user)); 
    setModalOpen(false); 
  }; 
 
  const onDelete = (id) => { 
    dispatch(deleteUsers(id)); 
  }; 
 
  const fetchData = async () => { 
    try { 
      await dispatch(fetchAllUsers()); 
    } catch (error) { 
      console.error('Error fetching users:', error); 
    } 
  }; 
 
  useEffect(() => { 
    fetchData(); 
  }, []); 
 
  return ( 
    <div className='container'> 
      <div className='userlist'> 
        <h1>Список студентов</h1> 
        <div className='btn'> 
        </div> 
      </div> 
 
      {!isModalOpen && ( 
        <button className='button' onClick={() => setModalOpen(true)}> 
          <FontAwesomeIcon className='faSort' icon={faSort} style={{ color: "#FFD43B" }} /> 
          ДОБАВИТЬ НОВОГО СТУДЕНТА 
        </button> 
      )} 
 
      {isModalOpen && <ModalWindow onSubmit={createUser} />} 
 
      <hr /> 
 
      {users && users.length > 0 && ( 
        <table className='container'> 
          <thead className='use_container'> 
            <tr className='use_nav'> 
              <th className='use_names'>Фото</th> 
              <th className='use_names'>Имя</th> 
              <th className='use_names'>Email</th> 
              <th className='use_names'>Телефон</th> 
              <th className='use_names'>Actions</th> 
            </tr> 
          </thead> 
          <tbody> 
            {users.map((user) => ( 
              <tr key={user.id} className='users'> 
                <td><img src="/img/01.jpg" alt="" /></td>
                <td key={user.id} className='user_name'>{user.name}</td> 
                <td key={user.id} className='user_name'>{user.email}</td> 
                <td key={user.id} className='user_name'>{user.phone}</td> 
                <td> 
                  <FontAwesomeIcon className='faPen' icon={faPen} style={{ color: 'yellow' }} /> 
                </td> 
                <td> 
                  <button className='delete_btn' style={{ cursor: 'pointer' }} onClick={() => onDelete(user.id)}> 
                    <FontAwesomeIcon 
                      icon={faTrashCan} 
                      className='delete'
                      style={{ color: 'yellow' }} 
                    /> 
                  </button> 
                </td> 
              </tr> 
            ))} 
          </tbody> 
        </table> 
      )} 
 
      {!loading && users.length === 0 && <p>Людей еще нет</p>} 
    </div> 
  ); 
}; 
 
export default UserList;