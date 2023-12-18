import React, { useState, useContext } from "react";
import styled from 'styled-components';
import GetClasses from "./GetClasses";
import GetStudents from "./GetStudents";
import GetVolunteers from "./GetVolunteers";
import Spinner from 'react-bootstrap/Spinner';
import Alert from "../../components/Alert";

const MainDiv = styled.div`
    grid-area: content;
    background-color: white;
    overflow: auto;
    background-color : rgba( 0, 0, 0, 0.135 )
`

export default function HumanResourcesPanelContent( { getClasses, getStudents, getVolunteers } ) {

    return <MainDiv className='animate__animated animate__fadeInLeftBig animate__delay-0.5s'>
        { getClasses    && <GetClasses    /> }
        { getStudents   && <GetStudents   /> }
        { getVolunteers && <GetVolunteers /> }
    </MainDiv>
}