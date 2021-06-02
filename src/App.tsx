import React from 'react';
import './App.css';
// import {ProjectListScreen} from 'screens/project-list';
import { useAuth } from 'context/auth-context';
import { AnthenticatedApp } from 'authenticated-app';
import { UnauthenticatedApp } from 'unauthenticated-app';
function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      {user?<AnthenticatedApp/>:<UnauthenticatedApp/>}
    </div>
  );
}

export default App;