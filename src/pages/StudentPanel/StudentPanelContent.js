import React, { useState, useContext } from "react";
import styled from 'styled-components';
import GetClasses from "./GetClasses";
import GetStudents from "./GetStudents";

const MainDiv = styled.div`
    grid-area: content;
    background-color: white;
    overflow: auto;
    background-color : rgba( 0, 0, 0, 0.135 )
`

export default function StudentPanelContent( { getClasses, getStudents } ) {

    return <MainDiv className='animate__animated animate__fadeInLeftBig animate__delay-0.5s'>
        { getClasses    && <GetClasses    /> }
        { getStudents   && <GetStudents   /> }
    </MainDiv>
}