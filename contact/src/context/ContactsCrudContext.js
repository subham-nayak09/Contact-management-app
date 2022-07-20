import { createContext, useContext, useState } from 'react';
import api from '../api/contacts';
import { v4 as uuid } from 'uuid';
const contactsCrudContext = createContext();

export function ContactsCrudContextProvider ({ children }){
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    //retrieve contacts
    const retrieveContacts = async () => {
       const response = await api.get("/contacts");
       if(response.data) setContacts(response.data);
    };

    //delete contacts
    const removeContactHandler = async (id) => {
      await api.delete(`/contacts/${id}`);
      const newContactList = contacts.filter((contact)=>{
         return contact.id !== id;
    });
        setContacts(newContactList);
    };

   //add contact
   const AddContactHandler = async (contact) => {
       //console.log(props);
       const request = {
        id: uuid(),
        ...contact
       }
       const response = await api.post("/contacts", request);
       setContacts([...contacts, response.data]);  //...contacts (rest) is used to add new contact to previous states
  };

  //update contact
    const updateContactHandler = async (contact) => {
      const response = await api.put(`/contacts/${contact.id}`,contact);
      //console.log(response);
      const { id } = response.data;
      setContacts(
          contacts.map((contact)=>{
          return contact.id === id? {...response.data} : contact;
         })
      );
  };

  //search contact
  const searchHandler = (searchTerm) =>{
      setSearchTerm(searchTerm);
      if(searchTerm !== ''){
        const newContactList = contacts.filter((contact) => {
          return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
        });
        setSearchResult(newContactList);
      }
      else{
         setSearchResult(contacts);
      }
      
  };

    const value = {
        contacts,
        searchTerm,
        searchResult,
        searchHandler,
        retrieveContacts,
        removeContactHandler,
        AddContactHandler,
        updateContactHandler
    };
    return <contactsCrudContext.Provider value={value}>
        {children}
    </contactsCrudContext.Provider>

};

export function useContactsCrud(){
     return useContext(contactsCrudContext);
}