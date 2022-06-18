import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from "react-window";
import {getAllAccidents} from "../API/Meldungen";
import {Button, Stack, Typography, Card} from "@mui/material";


function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;
    getAllAccidents();
    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton>
                <ListItemText primary={`Item ${index + 1}`} />
            </ListItemButton>
        </ListItem>
    );
}

export default function Meldungen() {
    return (
        <div>
            <Stack direction ="row">

                <Card>
                    <Typography variant='h6' component='div' sx={{flexGrow:1}}>
                        Unfälle
                    </Typography>
                    <Box
                        sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.neutral' }}
                    >
                        <FixedSizeList
                            height={400}
                            width={360}
                            itemSize={46}
                            itemCount={200}
                            overscanCount={5}
                        >
                            {renderRow}
                        </FixedSizeList>
                    </Box>
                    <Button>
                        Unfall melden
                    </Button>
                </Card>
                <div>
                    <Typography variant='h6' component='div' sx={{flexGrow:1}}>
                        Staus
                    </Typography>
                    <Box
                        sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.neutral' }}
                    >
                        <FixedSizeList
                            height={400}
                            width={360}
                            itemSize={46}
                            itemCount={200}
                            overscanCount={5}
                        >
                            {renderRow}
                        </FixedSizeList>
                    </Box>
                    <Button>
                        Stau melden
                    </Button>
                </div>
                <div>
                    <Typography variant='h6' component='div' sx={{flexGrow:1}}>
                        Neuigkeiten
                    </Typography>
                    <Box
                        sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.neutral' }}
                    >
                        <FixedSizeList
                            height={400}
                            width={360}
                            itemSize={46}
                            itemCount={200}
                            overscanCount={5}
                        >
                            {renderRow}
                        </FixedSizeList>
                    </Box>
                </div>
            </Stack>

        </div>
    );
}