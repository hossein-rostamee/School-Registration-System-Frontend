import { Button } from "react-bootstrap";
import React, { useState, useContext } from "react";
import styled from 'styled-components';
import icon from '../../images/iconmonstr-line-three-horizontal-lined.svg'

const MainDiv = styled.div`
    grid-area: toolbar;
    background-color: #1890ff;
    height: 100%;
    width: 100%;
    img {
        height: 40px;
        padding: 0;
        margin: 0;
        margin-right: 10px;
        cursor: pointer;
    }
    @media screen and ( min-width : 800px ) {
        display: none;
    }
`

export default function StudentPanelToolbar({ setShowDashboard }) {


    return <MainDiv className='animate__animated animate__fadeInRightBig animate__delay-0.5s'>
        <img src={icon} onClick={ () => { setShowDashboard( true ) }} />
    </MainDiv>
}
