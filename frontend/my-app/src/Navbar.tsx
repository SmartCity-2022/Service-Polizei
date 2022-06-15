import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
    AppBar,
    Toolbar,
    Typography,
    Stack,
} from "@mui/material";
import {Link} from "react-router-dom";

export const Navbar = () => {
    return (
            <AppBar position='static'>
                <Toolbar>
                   <Typography variant='h6' component='div' sx={{flexGrow:1}}>
                       POLIZEI
                   </Typography>
                    <Stack direction='row'>
                        <Link to="/Notruf">Notruf</Link>
                        <Link to="/">Aktuelle Meldungen</Link>
                        <Link to="/Anzeigen">Anzeigen</Link>
                    </Stack>
                </Toolbar>
            </AppBar>
    );
}