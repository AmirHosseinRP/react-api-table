import React, {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import {
    Link,
    // useLocation,
    useParams
} from "react-router-dom";
import Typography from "@mui/material/Typography";
import axios from "axios";

function DetailPage() {
    const dataURL = '/data/usersData.json';
    const [user, setUser] = useState('');
    // const location = useLocation();
    // const id = Number(location.pathname.split('/')[location.pathname.split('/').length - 1]);
    const params = useParams()
    // debugger;
    const id = Number(params.id);
    useEffect(() => {
        getUser().then();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getUser = async () => {
        try {
            let response = await axios.get(dataURL);
            setUser(response.data.find(item => id === item.id));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Typography sx={{m: 2}} variant={"h3"}>Detail Page :</Typography>
            <Typography id="modal-modal-description" sx={{m: 3}}>
                First Name : {user.first_name}
                <br/>
                Last Name : {user.last_name}
                <br/>
                {user.first_name} was born in {2022 - Number(user.age)}.
                <br/>
                He/she currently is {user.age} years old.
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