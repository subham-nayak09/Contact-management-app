import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
import EditContacts from './EditContacts';
import api from '../api/contacts';
import { ContactsCrudContextProvider } from "../context/ContactsCrudContext";

function App() {
 
  return (
    <div className='ui container'>
    <BrowserRouter>
      <Header />
      <ContactsCrudContextProvider>
      <Routes>
        <Route path="/"  exact element={<ContactList/>}/>
        <Route path="/add"  exact element={<AddContact/>}/>
        <Route path="/edit"  element={<EditContacts />}/>
        <Route path="/contacts/:id" element={<ContactDetail/>}/>
      </Routes>
      </ContactsCrudContextProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
