import React from 'react';
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
                        <Link to="/Notruf" style={{margin:4}}>Notruf</Link>
                        <Link to="/" style={{margin:4}}>Aktuelle Meldungen</Link>
                        <Link to="/Anzeigen" style={{margin:4}}>Anzeigen</Link>
                    </Stack>
                </Toolbar>
            </AppBar>
    );
}