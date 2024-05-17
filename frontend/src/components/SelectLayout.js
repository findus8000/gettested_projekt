import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';

const SelectLayout = () => {


    return (
        <Menu pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
            <a className="menu-item" href="/">
                Home
            </a>
            <a className="menu-item" href="/statistics">
                Averages
            </a>
            <a className="menu-item" href="/basicStatistics">
                Specific
            </a>
            <a className="menu-item" href="/newStatistic">
                Compare
            </a>
        </Menu>
    );
};

export default SelectLayout;
