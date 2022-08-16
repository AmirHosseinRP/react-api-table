import DetailPage from "./pages/DetailPage";
import TablePage from "./pages/TablePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const dataURL = '/data/usersData.json';
    const [users, setUsers] = useState([]);
    const getUsers = async () => {
        try {
            let response = await axios.get(dataURL);
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            getUsers().then(() => console.log('ok'));
        }, 2000);
    }, []);
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<TablePage/>}/>
                {users.map((user) => {
                    return <Route path={`detail-page/${user.id}`}
                                  element={<DetailPage firstName={user.first_name}
                                                       lastName={user.last_name}
                                                       age={user.age}/>}/>
                })}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
