import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useContactsCrud } from '../context/ContactsCrudContext';

//class component
const AddContact = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const { AddContactHandler } = useContactsCrud();
    const navigate = useNavigate();

    const add = (e) => {
        e.preventDefault();
        if(name === "" || email === ""){
            alert("all the fields are mandatory!");
            return;
        };
        AddContactHandler({name, email});  //transfering state values to app.js
        setName('');
        setEmail(''); //to clear the fields after one contact is added
        navigate("/");
    };
  
        return(
           <div className='ui main' style={{marginTop: '50px'}}>
              <h2> Add Contact</h2>
              <form className="ui form" onSubmit={add}>
                 <div className="field">
                   <label>Name</label>
                   <input 
                      type="text" 
                      name="name" 
                      placeholder="Name" 
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                    />
                 </div>

                 <div className="field">
                   <label>Email</label>
                   <input 
                      type="text" 
                      name="email" 
                      placeholder="Email"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                    />
                 </div>
                 <button className='ui button blue'>Add</button>
                 <Link to='/'>
                   <button className='ui button blue'>Back to Contact List</button>
                 </Link>
              </form>
           </div>
        );
    
};
export default AddContact;