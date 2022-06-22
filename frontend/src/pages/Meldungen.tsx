import * as React from 'react';
import Box from '@mui/material/Box';
import {getAllAccidents} from "../API/Meldungen";
import {Button, Stack, Typography, Card, accordionActionsClasses} from "@mui/material";
import {accident} from "../API/Meldungen";
import {useEffect, useState} from "react";
import {DataGrid, GridColDef} from "@mui/x-data-grid";

export default function Meldungen() {
    const [data,setVal]= useState([{
        id:0,
        DATUM: 0,
        Adressen_ID: 0
    }]);

    useEffect( ()=>{
        async function getData(){
            let resp:accident[]|null = await getAllAccidents();
            if (resp) {

                let accdata  = [];
                if(resp != undefined) {
                    for (let i: number = 0; i < resp.length; i++) {
                        accdata.push({
                            id:resp[i].ID,
                            DATUM: resp[i].DATE,
                            Adressen_ID: resp[i].ADRESSEN_ID
                        })
                    }
                }
                setVal(accdata);
            }
        }
        getData();
    },[]);
    const columns: GridColDef[] =[
        {
            field:"id",
            headerName:"ID",
            width:150
        },
        {
            field:"DATUM",
            headerName:"DATUM",
            width:150
        },
        {
            field:"Adressen_ID",
            headerName:"Adressen ID",
            width:150
        }

    ]

    return (
        <>
            <Card sx={{ height: 450, width: '33%' }}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </Box>
                <Button>
                    UNFALL MELDEN
                </Button>
            </Card>
        </>
    );
}