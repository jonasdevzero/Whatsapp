import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { Signin, Signup, Chat } from './pages';
import { IsUserRedirect, ProtectedRoute } from './helpers/routes'
import * as ROUTES from './contants/routes';

function App() {
  const user = undefined;

  return (
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
  );
};

export default App;
