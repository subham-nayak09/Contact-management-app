import React from 'react'
import user from '../images/user.png';
import { Link } from 'react-router-dom';
import { useContactsCrud } from '../context/ContactsCrudContext';

function ContactCard(props) {
    const {id, name, email} = props.contact;
    const { removeContactHandler } = useContactsCrud();
    const deleteContact = (id) =>{
      removeContactHandler(id);
    }
  return (
       <>
       <div className='item' style={{display: 'flex', justifyContent: 'space-between', maxWidth:'auto'}}>
           <div className='content' style={{display: 'flex',  marginTop: '5px', marginBottom: '5px'}}>
              <img className='ui avatar image' src={user} alt='user' />
              <div>
                <Link to={`/contacts/${id}`} state={{contact: props.contact}}>
                  <div className='header'>{name}</div>
                  <div>{email}</div>
                </Link>
              </div>
           </div>
           <div style={{marginLeft:'auto'}}>
           <i className='trash alternate outline icon'
             style={{color: 'red', marginTop: '7px',cursor: 'pointer', padding: '7px'}}
             onClick={()=>deleteContact(id)}>  {/* changed props.clickHander(id)*/}
           </i>
           <Link to={'/edit'} state={ {contact: props.contact} }>
             <i className='edit alternate outline icon'
               style={{color: 'blue', marginTop: '7px', cursor: 'pointer', padding: '6px'}}>
             </i>
           </Link>
           </div>
        </div>
        </>
  );
};

export default ContactCard;