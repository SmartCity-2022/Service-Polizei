import * as React from 'react';
import Box from '@mui/material/Box';
import {
    createAccident,
    createTrafficJam,
    getAllNews,
    getFullAccidents,
    getFullTraffic_Jams,
    traffic_jam,
    news
} from "../API/Meldungen";
import {Button, Stack, Card ,TextField } from "@mui/material";
import {Modal} from "@mui/material";
import {accident} from "../API/Meldungen";
import {useEffect, useRef, useState} from "react";
import {DataGrid, GridColDef} from "@mui/x-data-grid";


export default function Meldungen() {

    const [accData,setAccVal]= useState([{
        id:0,
        UHRZEIT:" ",
        PLZ:0,
        WOHNORT:" ",
        STRASSE:" ",
        HAUSNUMMER:0,
        ZUSATZ:" "
    }]);


    const [trfJData,setTrfVal]= useState([{
        id:0,
        UHRZEIT:" ",
        PLZ:0,
        WOHNORT:" ",
        STRASSE:" ",
        HAUSNUMMER:0,
        ZUSATZ:" "
    }]);


    const[newsData,setNewsData]= useState([{
        id:0,
        UHRZEIT:" ",
        TITEL:" "
    }])

    const[fullNewsData,setFullNewsData] = useState([{
        id:0,
        UHRZEIT:" ",
        TITEL:" ",
        TEXT:" ",
        TITELBILD:" ",
        NAME:" ",
        VORNAME:" "
    }
    ])

    useEffect( ()=>{
        async function getData(){
            let accResp:accident[]|null = await getFullAccidents();
            let trfResp:traffic_jam[]|null = await getFullTraffic_Jams();
            let newsResp:news[]|null = await getAllNews();

            if (accResp) {

                let accdata = [];
                if (accResp != undefined) {
                    for (let i: number = 0; i < accResp.length; i++) {

                        let date = new Date(accResp[i].TIMESTAMP);
                        let time = date.toUTCString().slice(-12,-4);
                        accdata.push({
                            id: accResp[i].ID,
                            UHRZEIT: time,
                            PLZ: accResp[i].PLZ,
                            WOHNORT: accResp[i].ORT,
                            STRASSE: accResp[i].STRASSE,
                            HAUSNUMMER: accResp[i].HAUSNUMMER,
                            ZUSATZ: accResp[i].ZUSATZ
                        })
                    }
                }
                setAccVal(accdata);
            }
                let trfjData = []
                if(trfResp != undefined){
                    for (let i: number = 0; i < trfResp.length; i++) {
                        let date = new Date(trfResp[i].TIMESTAMP);
                        let time = date.toUTCString().slice(-12,-4);
                        trfjData.push({
                            id:trfResp[i].ID,
                            UHRZEIT: time,
                            PLZ: trfResp[i].PLZ,
                            WOHNORT: trfResp[i].ORT,
                            STRASSE: trfResp[i].STRASSE,
                            HAUSNUMMER: trfResp[i].HAUSNUMMER,
                            ZUSATZ: trfResp[i].ZUSATZ
                        })
                    }
                }
                setTrfVal(trfjData);

                let newsData = []
                let newsDataForCols = []
                if(newsResp != undefined){
                    for (let i:number = 0;i< newsResp.length;i++){
                        let date = new Date(newsResp[i].TIMESTAMP);
                        let time = date.toUTCString().slice(-12,-4);
                        newsData.push({
                            id:newsResp[i].ID,
                            UHRZEIT:time,
                            TITEL:newsResp[i].TITEL,
                            TEXT:newsResp[i].TEXT,
                            TITELBILD:newsResp[i].TITELBILD,
                            NAME:newsResp[i].NAME,
                            VORNAME:newsResp[i].VORNAME
                        })
                        newsDataForCols.push({
                            id:newsResp[i].ID,
                            UHRZEIT:time,
                            TITEL:newsResp[i].TITEL
                        })
                    }
                    setNewsData(newsDataForCols);

                    setFullNewsData(newsData);
                }
        }
        getData();
    },[]);

    const columnWidth:number = 140;

    const accColumns: GridColDef[] =[
        {
            field:"id",
            headerName:"id",
            width:0
        },
        {
            field:"UHRZEIT",
            headerName:"UHRZEIT",
            width:columnWidth
        },
        {
            field:"PLZ",
            headerName:"PLZ",
            width:columnWidth
        },
        {
            field:"WOHNORT",
            headerName:"Wohnort",
            width:columnWidth
        },
        {
            field:"STRASSE",
            headerName:"Strasse",
            width:columnWidth
        },
        {
            field:"HAUSNUMMER",
            headerName:"Hausnummer",
            width:columnWidth
        },
        {
            field:"ZUSATZ",
            headerName:"Zusatz",
            width:columnWidth
        },

    ];

    const newsColumns: GridColDef[] =[
        {
            field:"id",
            headerName:"id",
            width:120
        },
        {
            field:"UHRZEIT",
            headerName:"UHRZEIT",
            width:120
        },
        {
            field:"TITEL",
            headerName:"TITEL",
            width:400
        },
    ]

    const [accidentModalOpen,setAccOpen] = useState(false);
    const [trafficJamModalOpen,setTrfjOpen] = useState(false);
    const [newsModalOpen,setNewsOpen] = useState(false);
    const handleNewsClose = () => setNewsOpen(false);
    const handleAccClose = () =>  setAccOpen(false);
    const handleTrfJClose = () => setTrfjOpen(false);


    const [PLZinput,setPLZ] = useState(0);
    const [ORTinput,setORT] = useState(" ");
    const [STRASSEinput,setSTRASSE] = useState(" ");
    const [HAUSNUMMERinput,setHAUSNUMMER] = useState(0);
    const [ZUSATZinput,setZUSATZ] = useState(" ");

    const [currentNewsData,setCurrentNewsData] = useState({
        id:0,
        UHRZEIT:" ",
        TITEL:" ",
        TEXT:" ",
        TITELBILD:" ",
        NAME:" ",
        VORNAME:" "
    })


    return (
        <>
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={accidentModalOpen}
                    onClose={handleAccClose}
                >
                    <div style={{alignContent:"center"}}>
                        <Box alignItems = "center" justifyContent="center">
                            <Card sx={{ height: "60%", width: '50%' }}>
                                <h2>
                                    Unfall melden
                                </h2>
                                <Stack direction="row">
                                    <TextField id="PLZ" onChange={(e)=>{setPLZ(Number(e.target.value))}} label="PLZ*" variant="filled" sx={{m:2}}></TextField>
                                    <TextField id="ORT" onChange={(e)=>{setORT(e.target.value)}} label="ORT*" variant="filled" sx={{m:2}}></TextField>
                                </Stack>
                                <Stack direction="row">
                                    <TextField id="STRASSE" onChange={(e)=>{setSTRASSE(e.target.value)}} label="STRASSE*" variant="filled" sx={{m:2}}></TextField>
                                    <TextField id="HAUSNUMMER" onChange={(e)=>{setHAUSNUMMER(Number(e.target.value))}} label="HAUSNUMMER" variant="filled" sx={{m:2}}></TextField>
                                </Stack>
                                <TextField id="ZUSATZ" onChange={(e)=>{setZUSATZ(e.target.value)}} label="Zusatz" variant="filled" sx={{m:2}}></TextField>

                                <Button onClick={()=>{
                                    createAccident(PLZinput,ORTinput,STRASSEinput,HAUSNUMMERinput,ZUSATZinput);
                                    handleAccClose();
                                    window.location.reload();
                                }}>
                                    Melden
                                </Button>
                            </Card>
                        </Box>
                    </div>
                </Modal>
            </div>
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={trafficJamModalOpen}
                    onClose={handleTrfJClose}
                >
                    <div style={{alignContent:"center"}}>
                        <Box alignItems = "center" justifyContent="center">
                            <Card sx={{ height: "60%", width: '50%' }}>
                                <h2>
                                    Stau melden
                                </h2>
                                <Stack direction="row">
                                    <TextField id="PLZ" onChange={(e)=>{setPLZ(Number(e.target.value))}} label="PLZ*" variant="filled" sx={{m:2}}></TextField>
                                    <TextField id="ORT" onChange={(e)=>{setORT(e.target.value)}} label="ORT*" variant="filled" sx={{m:2}}></TextField>
                                </Stack>
                                <Stack direction="row">
                                    <TextField id="STRASSE" onChange={(e)=>{setSTRASSE(e.target.value)}} label="STRASSE*" variant="filled" sx={{m:2}}></TextField>
                                    <TextField id="HAUSNUMMER" onChange={(e)=>{setHAUSNUMMER(Number(e.target.value))}} label="HAUSNUMMER" variant="filled" sx={{m:2}}></TextField>
                                </Stack>
                                <TextField id="ZUSATZ" onChange={(e)=>{setZUSATZ(e.target.value)}} label="Zusatz" variant="filled" sx={{m:2}}></TextField>

                                <Button onClick={()=>{
                                    createTrafficJam(PLZinput,ORTinput,STRASSEinput,HAUSNUMMERinput,ZUSATZinput);
                                    handleTrfJClose();
                                    window.location.reload();
                                }}>
                                    Melden
                                </Button>
                            </Card>
                        </Box>
                    </div>
                </Modal>
            </div>
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={newsModalOpen}
                    onClose={handleNewsClose}
                >
                    <div style={{alignContent:"center"}}>
                        <Box alignItems = "center" justifyContent="center">
                            <Card sx={{ height: "60%", width: '50%' }}>
                                <h3>
                                    {currentNewsData.TITEL}
                                </h3>
                                <h4>
                                    {currentNewsData.UHRZEIT}
                                </h4>
                                    {currentNewsData.TEXT}
                                <br/>
                                <br/>
                                <a>
                                    Geschrieben von {currentNewsData.VORNAME.slice(0,1)}.{currentNewsData.NAME}
                                </a>
                            </Card>
                        </Box>
                    </div>
                </Modal>
            </div>
            <Stack direction="row">
                <Card sx={{ height: "60%", width: "45%" ,marginX:"auto"}}>
                    <h2>UNFÄLLE</h2>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={accData}
                            columns={accColumns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                    </Box>
                    <Button onClick={()=>setAccOpen(true)}>
                        UNFALL MELDEN
                    </Button>
                </Card>
                <Card sx={{ height: "60%", width: '45%' ,marginX:"auto"}}>
                    <h2>STAUSS</h2>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={trfJData}
                            columns={accColumns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                    </Box>
                    <Button onClick={()=> setTrfjOpen(true)}>
                        STAU MELDEN
                    </Button>
                </Card>
            </Stack>
            <Card sx={{ height: "60%", width: '45%' ,m:"auto",marginY:10}}>
                <h2>NEUIGKEITEN</h2>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={newsData}
                        columns={newsColumns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        onRowClick={(e)=>{

                            let currentData = fullNewsData.at(Number(e.id)-1);
                            if(currentData != undefined)
                                setCurrentNewsData(currentData);
                                console.log(currentData);
                            setNewsOpen(true);

                        }}
                    />
                </Box>
            </Card>
        </>
    );
}


