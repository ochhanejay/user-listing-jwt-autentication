import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteApiRequest, getApiRequest } from '../../api';
import { authContext } from '../../context/context';

const Table = () => {
    const history = useNavigate();
    const [users, setUsers] = useState();
    const { userDetails, setUserDetails } = useContext(authContext);
    const getAllUsers = async () => {
        await getApiRequest("/getAllUsers").then(resp => {
            console.log(resp.data, "5454545")
            setUsers(resp.data);
            // history("/cards");
        });
    }
    const removeUsers = async (id) => {
        alert(id);
        await deleteApiRequest(`/removeUser?id=${id}`).then(resp => {
            // history("/cards");
            getAllUsers();

        });
    }
    const editUser = async (user) => {
        setUserDetails(user);
        history("/signUp");
    }
    useEffect(() => {
        getAllUsers();
    }, [0])
    return (
        <div className='App' style={{ overflow: "hidden" }}>
            <h2 h2 className='App' > User Table</h2 >


            <div className='row'>
                <h2 className='col fs-3'>Name</h2>
                <h2 className='col fs-3'>Email</h2>
                <h2 className='col fs-3'>Edit User</h2>
                <h2 className='col fs-3'>Delete User</h2>
            </div>

            {users?.map((user) => (
                <div key={user._id} className='row my-2'>
                    <h6 className='col-3'>{user.firstName} {user.lastName}</h6>
                    <h6 className='col-3'>{user.email}</h6>
                    <h6 className='col-3'><button className='btn btn-primary' onClick={() => editUser(user)}>Edit</button></h6>
                    <h6 className='col-3'><button className='btn btn-danger' onClick={() => removeUsers(user._id)}>Delete</button></h6>
                </div>
            ))}

        </div >
    )
}

export default Table