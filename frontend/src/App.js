import React, { useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { Signin, Signup, Chat } from './pages';
import { IsUserRedirect, ProtectedRoute } from './helpers/routes';
import * as ROUTES from './constants/routes';
import UserProvider from './context/userContext'

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));

  return (
    <UserProvider data={{ user, setUser }}>
      <div className="app">
        <Router>
          <Switch>

            <IsUserRedirect user={user} loggedInPath={ROUTES.CHAT} path={ROUTES.SIGN_UP}>
              <Signup />
            </IsUserRedirect>

            <ProtectedRoute user={user} path={ROUTES.CHAT}>
              <Chat />
            </ProtectedRoute>

            <IsUserRedirect user={user} loggedInPath={ROUTES.CHAT} path={ROUTES.SIGN_IN}>
              <Signin />
            </IsUserRedirect>

          </Switch>
        </Router>
      </div>
    </UserProvider>
  );
};

export default App;
