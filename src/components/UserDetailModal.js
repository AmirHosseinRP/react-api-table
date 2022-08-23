import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Button, IconButton} from "@mui/material";
import {Link} from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:{xs:'70vw',sm:'auto'} ,
    height:'auto',
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
                    <Link to={`/detail-page?id=${props.id}`} style={{
                        textDecoration: 'none',
                    }}>
                        <Button sx={{padding: '5px',marginTop:'20px'}} variant={"contained"}>
                            go to user detail page
                        </Button>
                    </Link>
                </Box>
            </Modal>
        </>
    );
}
