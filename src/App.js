import DetailPage from "./pages/DetailPage";
import TablePage from "./pages/TablePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<TablePage/>}/>
                <Route path={'/detail-page'} element={<DetailPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
