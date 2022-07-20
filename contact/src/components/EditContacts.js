import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContactsCrud } from '../context/ContactsCrudContext';

const EditContacts = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const {id, name, email} = location.state.contact;
   const [newName, setNewName] = useState(name);
   const [newEmail, setNewEmail] = useState(email);
   const {updateContactHandler} = useContactsCrud();

    const update = (e) => {
        e.preventDefault();
        if(newName === "" || newEmail === ""){
            alert("all the fields are mandatory!");
            return;
        }
        updateContactHandler({id, name: newName, email: newEmail});  //transfering state values to app.js
        setNewName('');
        setNewEmail(''); //to clear the fields after one contact is added
        navigate('/');
    }
    return(
           <div className='ui main' style={{marginTop: '50px'}}>
              <h2>Edit Contact</h2>
              <form className="ui form" onSubmit={update}>
                 <div className="field">
                   <label>Name</label>
                   <input 
                      type="text" 
                      name="name" 
                      placeholder="Name" 
                      value={newName}
                      onChange={(e)=>setNewName(e.target.value)}
                    />
                 </div>

                 <div className="field">
                   <label>Email</label>
                   <input 
                      type="text" 
                      name="email" 
                      placeholder="Email"
                      value={newEmail}
                      onChange={(e)=>setNewEmail(e.target.value)}
                    />
                 </div>
                 <button className='ui button blue'>update</button>
                 <Link to='/'>
                   <button className='ui button blue'>Back to Contact List</button>
                 </Link>
              </form>
           </div>
    );
    
}
export default EditContacts;