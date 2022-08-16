import React from 'react';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";

function DetailPage(props) {
    return (
        <>
            <Typography sx={{m: 2}} variant={"h3"}>Detail Page :</Typography>
            <Typography id="modal-modal-description" sx={{m: 3}}>
                First Name : {props.firstName}
                <br/>
                Last Name : {props.lastName}
                <br/>
                {props.firstName} was born in {2022 - Number(props.age)}.
                <br/>
                He/she currently is {props.age} years old.
            </Typography>
            <Link
                to={'/'}
                style={{
                    textDecoration: 'none'
                }}>
                <Button variant={'contained'} sx={{ml: 3}}>
                    Go back to Table
                </Button>
            </Link>
        </>
    );
}

export default DetailPage;