import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from "react-window";
import {getAllAccidents} from "../API/Meldungen";


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
    );
}