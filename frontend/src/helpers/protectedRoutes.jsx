import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function IsUserRedirect({ children, user, loggedInPath, ...props }) {
    return (
        <Route 
            {...props}
            render={_ => {
                if (!user) {
                    return children;
                };

                if (user) {
                    return <Redirect to={{ pathname: loggedInPath }} />;
                };

                return null;
            }}
        /> 
    );
};

export function ProtectedRoute({ children, user, ...rest }) {
    return (
        <Route 
            {...rest}
            render={({ location }) => {
                if (!user)
                    return <Redirect to={{ pathname: '/signin', state: { from: location }}} />;

                if (user) 
                    return children;

                return null;
            }}
        />
    );
};