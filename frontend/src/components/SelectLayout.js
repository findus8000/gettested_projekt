import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';

const SelectLayout = () => {


    return (
        <Menu pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
            <a className="menu-item" href="/">
                Home
            </a>
            <a className="menu-item" href="/average">
                Averages
            </a>
            <a className="menu-item" href="/specific">
                Specific
            </a>
            <a className="menu-item" href="/compare">
                Compare
            </a>
        </Menu>
    );
};

export default SelectLayout;
