import React from 'react';
import AppNav from "../components/AppNav.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Map from "../components/Map.jsx";

const AppLayout = () => {
    return (
        <div>
            <Sidebar/>
            <Map/>
        </div>
    );
};

export default AppLayout;