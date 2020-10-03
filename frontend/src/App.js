import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Chat from './pages/Chat';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="app">
      <Router>
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
      </Router>
    </div>
  );
};

export default App;
