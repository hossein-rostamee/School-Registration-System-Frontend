import { Button } from "react-bootstrap";
import React, { useState, useContext } from "react";
import styled from 'styled-components';
import logo from '../../images/logo.png';

const MainDiv = styled.div`
    grid-area: dashbord;
    background-color: #1890ff;
    display: grid;
    grid-template: auto 1fr / 100%;
    direction: rtl;
    z-index: 50000;
    .app-logo {
        filter: grayscale(0.5);
        height: auto;
        width: 100%;
        padding: 30px;
        opacity: 0.6;
    }

    .button-list {
        display: flex;
        flex-direction: column;
        color: hsla(0,0%,100%,.65);
        gap: 10px;
        button {
            font-size: 18px;
            background-color: #1890ff;
        }
        button:hover {
            background-color: #0d5da7;
        }
    }
    @media screen and ( max-width : 800px ) {
        transition: all 1s;
        &.show-dashboard {
            display: block;
            position: fixed;
            right: 0;
            top: 0;
            width: 250px;
            height: 100vh;
            z-index: 50001;
            box-shadow: 0 0 10px 10px rgba( 0, 0, 0, 0.2);
        }
        &.hide-dashboard {
            display: block;
            position: fixed;
            right: -300px;
            top: 0;
            width: 250px;
            height: 100vh;
            z-index: 50001;
            box-shadow: 0 0 0 0 rgba( 0, 0, 0, 0.2);
        }
    }
`

export default function StudentPanelDashboard({ setGetClasses, setGetStudents, showDashboard }) {

    const handleClick = ( e ) => {
        const id = e.target.id
        setGetClasses   ( id == 'GetClasses'    )
        setGetStudents  ( id == 'GetStudents'   )
    }

    return <MainDiv className={`animate__animated animate__fadeInRightBig animate__delay-0.5s  ${ showDashboard ? 'show-dashboard' : 'hide-dashboard' } `}>
        <div className="logo-div">
            <img src={logo} className='app-logo' />
        </div>
        <div className="button-list">
            <Button onClick={ handleClick } className="rounded-0" variant="primary" id = { "GetStudents"   } > {"اطلاعات دانش آموز"} </Button>
            <Button onClick={ handleClick } className="rounded-0" variant="primary" id = { "GetClasses"    } > {"مشاهده اطلاعات کلاس" } </Button>
        </div>
    </MainDiv>
}
