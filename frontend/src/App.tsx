import React, { useState } from 'react';
import './App.css';
import UserCard from './components/UserCard';
import SearchBar from './components/SearchBar';
import Modal from './components/Modal';
import Pagination from './components/Pagination';
import { useSearchParams } from 'react-router-dom';
import { MdFilterAlt } from "react-icons/md";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

function App() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [usersPerPage, setUsersPerPage] = React.useState<number>(6);

    const [addName, setAddName] = React.useState<string>('');
    const [addEmail, setAddEmail] = React.useState<string>('');
    const [addPhone, setAddPhone] = React.useState<string>('');

    const [sortValue, setSortValue] = React.useState<string>('createdDes');

    const [openAddModal, setOpenAddModal] = React.useState<boolean>(false);
    
    const [users, setUsers] = React.useState<User[]>([]);
    const [error, setError] = React.useState<string | null>(null);


    React.useEffect(() => {
      if (searchParams.size===0) {
        fetchData();
      } else if (searchParams.get('search')) {
        searchData(searchParams.get('search') || '{}');
      } else if (searchParams.get('sortBy')) {
        //console.log(searchParams.toString())
        filterData(searchParams.toString())
      }

    }, []);

    if (error) {
      return <div>Error: {error}</div>;
    }
  
    async function fetchData() {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      }
    }

  async function fetchUsers(): Promise<User[]> {
    const response = await fetch('http://localhost:8000/listUsers');
    const data = await response.json();
    return data;
  }

  async function searchData(query: String ) {
    try {
      const data = await searchUsers(query);
      setUsers(data);
    } catch (error) {
      setError(error.message);
    }
  }

  async function searchUsers(query: String): Promise<User[]> {
    console.log(query)
    const response = await fetch(`http://localhost:8000/searchUsers/${query}`);
    const data = await response.json();
    return data;
  }

  async function filterData(query: String ) {
    try {
      const data = await filterUsers(query);
      setUsers(data);
    } catch (error) {
      setError(error.message);
    }
  }

  async function filterUsers(query: String): Promise<User[]> {
    const response = await fetch(`http://localhost:8000/filterUsers/?${query}`);
    const data = await response.json();
    return data;
  }

  const onSaveAdd = async () => {

    if(!addName){
      alert('Campo de nome não preenchido')
      return
    } 

    if(!addEmail){
      alert('Campo de email não preenchido')
      return
    }

    if (!addPhone){
      alert('Campo de telefone não preenchido')
      return
    }

    const newUser = {
      name: addName,
      email: addEmail,
      phone: addPhone
    }

    try{

      const response = await fetch("http://localhost:8000/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const result = await response.json();
      console.log("Success:", result);
      setOpenAddModal(false)
      window.location.reload();

    } catch (error) {
      console.log(error.message);
    }
  }

  const lastUserIndex = currentPage * usersPerPage;
  const firstUserIndex = lastUserIndex - usersPerPage;
  const currentUsers = users.slice(firstUserIndex, lastUserIndex);

  return (
    <div className="App">
      <div className='UserContainer'>
            <SearchBar/>
            <div className='Users flex flex-col justify-between'>
              <div>
                <div className='h-14 flex justify-between items-center mb-3'>
                  <form className='w-full h-full flex justify-between items-center' id='filter' action="">
                    <div className='ms-3 h-4/5'>
                      <label className='' htmlFor="">Filtrar por</label>
                      <select className='h-full ms-3 px-2' name='sortBy' value={sortValue} onChange={(event) => setSortValue(event.target.value)}>
                        <option value="createdDes">Data de criação descendente</option>
                        <option value="createdAsc">Data de criação crescente</option>
                        <option value="updatedDes">Data de atualização descendente</option>
                        <option value="updatedAsc">Data de atualização crescente</option>
                      </select>
                    </div>
                    <div className='flex justify-center items-center'>
                      <div className='me-2'>
                        <label className='me-2' htmlFor="">De:</label>
                        <input className='me-2' type="date" id="start" name="filterStart"  />
                        <label className='me-2' htmlFor="">Até:</label>
                        <input className='me-2' type="date" id="end" name="filterEnd" />
                      </div>
                      <button className='rounded-lg flex items-center py-1.5 px-5 bg-blue-500 hover:bg-blue-600 text-white' type='submit' form='filter'><MdFilterAlt /><b>Filtrar</b></button>
                    </div>
                  </form>
                </div>
                {currentUsers.map((user, i) => {
                  return <UserCard key={i} name={user.name} email={user.email} number={user.phone} id={user.id}/>
                })}
              </div>
              <Pagination totalUsers={users.length} usersPerPage={usersPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
            </div>
            <button className='AddUserButton' onClick={() => setOpenAddModal(true)}>
              +
            </button>
      </div>
      <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
              <div className='flex flex-col gap-4'></div>
              <h1 className='text-2xl'>Criar novo usuário</h1>
              <div className='flex flex-col py-4 px-10'>

                <label htmlFor="">Nome</label>
                <input className='border rounded-lg mb-5 h-10 w-80 p-3' type="text" 
                  required
                  value={addName} 
                  placeholder='Nome do usuário' 
                  onChange={(value) => setAddName(value.target.value)} />

                <label htmlFor="">Email</label>
                <input className='border rounded-lg mb-5 h-10 w-80 p-3' type="text" 
                  required
                  value={addEmail} 
                  placeholder='Email' 
                  onChange={(value) => setAddEmail(value.target.value)}  />

                <label htmlFor="">Telefone</label>
                <input className='border rounded-lg mb-5 h-10 w-80 p-3' type="text"
                  required
                  value={addPhone} 
                  placeholder='Telefone' 
                  onChange={(value) => setAddPhone(value.target.value)}  />

              </div>
              <hr className='border-t-solid border-1 border-grey'/>
              <div className='flex flex-row justify-center'>
                  <button className='rounded-lg mt-5 py-1.5 px-20 bg-blue-500 hover:bg-blue-600 text-white'
                   onClick={onSaveAdd}>
                    <b>
                      Enviar
                    </b>
                  </button>
              </div>
      </Modal>
    </div>
  );
}

export default App;
