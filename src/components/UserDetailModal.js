import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {IconButton} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <IconButton sx={{padding: '5px'}} onClick={handleOpen}>
                {props.children}
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        User details :
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        First Name : {props.firstName}
                        <br/>
                        Last Name : {props.lastName}
                        <br/>
                        {props.firstName} was born in {2022 - Number(props.age)}.
                        <br/>
                        He/she currently is {props.age} years old.
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}
