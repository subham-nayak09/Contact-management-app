import React, { useEffect }from 'react'
import ContactCard from './ContactCard';
import { Link } from 'react-router-dom';
import { useContactsCrud } from '../context/ContactsCrudContext';

const ContactList = (props) => {
  const {contacts, retrieveContacts, searchTerm, searchResult, searchHandler} = useContactsCrud();


  // changed const deleteContactHandler = (id) => { props.getContactId(id);}

  useEffect(()=>{
    retrieveContacts();
  }, []);

  const renderContactList = (searchTerm.length<1?contacts:searchResult).map((contact)=>{   //add props.contacts {changed}
       return(
          <ContactCard contact={contact} key={contact.id}></ContactCard> //{changed}  add clickHander={deleteContactHandler} 
       );
  });

  const onUserSearch = (e) => {
       return searchHandler(e.target.value);
  };
  return (
    <div className='main' style={{marginTop: '50px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h2>contact list</h2>
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </div>
      <div className='ui search'>
        <div className='ui icon input' style={{display: 'flex', justifyContent: 'space-between'}}>
          <input  type='text' placeholder='Search Contacts' className='prompt' value={searchTerm} onChange={(e)=>{onUserSearch(e)}}/>
          <i className='search icon' style={{cursor: 'pointer'}}></i>
        </div>
      </div>
      <div className='ui celled list'>
        {renderContactList.length>0?renderContactList:"No such contacts available"}
      </div>
    </div>
  );
};

export default ContactList;