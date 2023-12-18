import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import StudentPanel from './pages/StudentPanel/StudentPanel';
import Register from './pages/Register/Register';
import HumanResourcesPanel from './pages/HumanResourcesPanel/HumanResourcesPanel'
import TeacherPanel from './pages/TeacherPanel/TeacherPanel'
import Denied from './components/Denied';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/"                    element = { <Login /> } />
        <Route path = "StudentPanel"         element = { <StudentPanel /> } />
        <Route path = "Register"             element = { <Register /> } />
        <Route path = "HumanResourcesPanel"  element = { <HumanResourcesPanel /> } />
        <Route path = "Denied"               element = { <Denied /> } />
      </Routes>       
    </div>
  );
}
