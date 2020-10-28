import React, { useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { Signin, Signup, Chat } from './pages';
import { IsUserRedirect, ProtectedRoute } from './helpers/routes';

import UserProvider from './context/userContext'

function Routes() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));

    return (
        <UserProvider data={{ user, setUser }}>
            <Router>
                <Switch>

                    <IsUserRedirect exact user={user} loggedInPath={'/chat'} path={'/'}>
                        <Signin />
                    </IsUserRedirect>

                    <IsUserRedirect user={user} loggedInPath={'/chat'} path={'/signup'}>
                        <Signup />
                    </IsUserRedirect>

                    <ProtectedRoute user={user} path={'/chat'}>
                        <Chat />
                    </ProtectedRoute>


                </Switch>
            </Router>
        </UserProvider>
    );
};

export default Routes;