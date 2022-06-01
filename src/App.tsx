import React from 'react';
import { Store } from 'redux';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Unauthorized from './app/areas/unauthorized/unauthorized';
import Login from './app/areas/login/login';
import Profile from './app/areas/profile/profile';
import Header from './app/areas/header/header';
import Optimizer from './app/areas/optimizer/optimizer';
import Appraisal from './app/areas/appraisal/appraisal';
import Locations from './app/areas/locations/locations';
import Mapping from './app/areas/mapping/mapping';
import Statistics from './app/areas/statistics/statistics';

interface AppProps {
  store: Store
}

export default ({ store }: AppProps) =>  {
  return (
      <Router>
        <Provider store={store}>
          <Header />
          <Container className="top-level-container">
            <Routes>
              <Route
                path="/"
                element={<Login authTokenSet={false}/>}
              />
              <Route
                path="/Manage"
                element={<Profile />}
              />
              <Route 
                path="/Unauthorized"
                element={<Unauthorized />}
              />
              <Route 
                path="/Battle"
                element={<Locations />}
              />
            </Routes>
          </Container>
        </Provider> 
      </Router>
  );
};