import React from 'react';
import logo from './logo.svg';
import './App.css';
import {AppBar, Toolbar, CssBaseline, Typography, makeStyles} from "@mui/material";
import {Navbar} from "./Navbar";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Meldungen from "./pages/Meldungen";

function App() {
  return (
      <Router>
        <Navbar/>
        <Routes>
          <Route path ="/" element={<Meldungen/>}/>
        </Routes>
      </Router>
  );
}

export default App;
