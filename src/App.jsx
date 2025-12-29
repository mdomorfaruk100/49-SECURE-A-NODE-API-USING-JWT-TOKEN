import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import Home from './components/Home/Home';
import Book from './components/Book/Book';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedUser] = useState({});
  console.log(loggedInUser);
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedUser]}>
    <p>Name: {loggedInUser.name}</p>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/home' Component={Home} />
          <Route path='/login' Component={Login} />
          <Route path='/book/:bedType' element={<Book />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
