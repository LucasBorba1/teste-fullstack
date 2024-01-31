import React from "react";
import { FunctionComponent } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Modal from "./Modal";

interface UserCardProps {
    name: string,
    email: string,
    number: string,
    id: number
}

const UserCard: FunctionComponent<UserCardProps> = ({name, email, number, id}) => {

    const [openEditModal, setOpenEditModal] = React.useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);

    const [editName, setEditName] = React.useState<string>('');
    const [editPhone, setEditPhone] = React.useState<string>('');

    const [error, setError] = React.useState<string | null>(null);

    const onSaveEdit = async () => {

        if(!editName){
            alert('Campo de nome não preenchido')
            return
          } 
      
          if (!editPhone){
            alert('Campo de telefone não preenchido')
            return
          }
          
        const newUser = {
            id: id,
          name: editName,
          phone: editPhone
        }
    
        try{
    
          const response = await fetch("http://localhost:8000/updateUser/", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          });
    
          const result = await response.json();
          console.log("Success:", result);
          setOpenEditModal(false)
          window.location.reload();
    
        } catch (error) {
          console.log(error.message);
        }
      }

      const onSaveDelete = async () => {
    
        try{
    
          const response = await fetch(`http://localhost:8000/deleteUser/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          const result = await response.json();
          console.log("Success:", result);
          setOpenEditModal(false)
          window.location.reload();
    
        } catch (error) {
          console.log(error.message);
        }
      }


    return (
        <div style={{display: "flex", height: '80px', backgroundColor: "#a6c1ff", padding: '15px', borderRadius: '15px', justifyContent: 'space-between', marginBottom: '10px'}}>
            <div>
                <img style={{maxHeight:"100%"}} src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" alt="" />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', maxHeight:'100%', paddingLeft: '15px', justifyContent: 'center ', alignItems: 'start', width: '80%'}}>
                <p style={{fontWeight: 'bold', fontSize: '20px', color: '#444444'}}>{name}</p>
                <p>{email}</p>
                <p>{number}</p>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '155px'}}>
                <button style={{height: '80%', backgroundColor: '#274bdb', border: 'none', borderRadius: '15px', width: '70px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={() => setOpenEditModal(true)}>
                    <MdEdit color="white" size={28}/>
                </button>
                <button style={{height: '80%', backgroundColor: '#bb2124', border: 'none', borderRadius: '15px', width: '70px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={() => setOpenDeleteModal(true)}>
                    <MdDelete color="white" size={28}/>
                </button>
            </div>
            <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
              <div className='flex flex-col gap-4'></div>
              <h1 className='text-2xl'>Editar usuário</h1>
              <div className='flex flex-col py-4 px-10'>

                <label htmlFor="">Nome</label>
                <input className='border rounded-lg mb-5 h-10 w-80 p-3' type="text" 
                  required
                  value={editName} 
                  placeholder='Nome do usuário' 
                  onChange={(value) => setEditName(value.target.value)} />

                <label htmlFor="">Telefone</label>
                <input className='border rounded-lg mb-5 h-10 w-80 p-3' type="text"
                  required
                  value={editPhone} 
                  placeholder='Telefone' 
                  onChange={(value) => setEditPhone(value.target.value)}  />

              </div>
              <hr className='border-t-solid border-1 border-grey'/>
              <div className='flex flex-row justify-center'>
                  <button className='rounded-lg mt-5 py-1.5 px-20 bg-blue-500 hover:bg-blue-600 text-white'
                   onClick={onSaveEdit}>
                    <b>
                      Editar
                    </b>
                  </button>
              </div>
        </Modal>
        <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
              <div className='flex flex-col gap-4'></div>
              <h1 className='text-2xl'>Deletar usuário</h1>
              <div className='flex flex-col py-4 px-10'>

                <p>Tem certeza que deseja deletar este usuário?</p>

              </div>
              <hr className='border-t-solid border-1 border-grey'/>
              <div className='flex flex-row justify-center'>
                  <button className='rounded-lg mt-5 py-1.5 px-20 bg-red-600 hover:bg-red-700 text-white'
                   onClick={onSaveDelete}>
                    <b>
                      Deletar
                    </b>
                  </button>
              </div>
        </Modal>
        </div>
    )
}

export default UserCard;