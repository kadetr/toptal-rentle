import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ApartmentCreateScreen from "./screens/ApartmentCreateScreen";
import ApartmentListScreen from "./screens/ApartmentListScreen";
import ApartmentEditScreen from "./screens/ApartmentEditScreen";

const App = () => {
   const [isOpen, setIsOpen] = useState(false);


   const toggle = () => {
      setIsOpen(!isOpen);
   };
   // useEffect(() => {});

   return (
      <Router>
         {/* <Sidebar isOpen={isOpen} toggle={toggle} /> */}
         <Header toggle={toggle} />
         <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/realtor/new-apartment' component={ApartmentCreateScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path="/admin/users/:id/edit" component={UserEditScreen} />
          <Route
            path='/realtor/apartmentlist'
            component={ApartmentListScreen}
            exact
          />
          <Route
            path='/realtor/apartmentlist/:flag'
            component={ApartmentListScreen}
            exact
          />
          <Route path='/realtor/apartments/:id/edit' component={ApartmentEditScreen} />
          
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
      </Router>
   );
};

export default App;
