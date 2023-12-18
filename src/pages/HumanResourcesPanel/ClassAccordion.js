import React, { useEffect } from "react";
import { Col, Button, Row, Container, Card, Form, Accordion } from 'react-bootstrap';
import styled from 'styled-components'
import ClassStudentTumbnail from "./ClassStudentTumbnail";

const TitleDiv = styled.div`
    font-size: 18px;
    display: inline-block;
    @media screen and ( max-width : 1000px ) {
        font-size: 16px;
    }
`

const MainDiv = styled.div`
    .accordion-button {
        direction: rtl;
        text-align: right;
        line-height: 1.5rem;
        padding: 14px 16px;
        font-size: 18px;
    }
    .accordion-button::after {
        margin: 0 auto 0 0 ;
        
    }
    @media screen and ( max-width : 1000px ) {
        .accordion-button{
            font-size: 16px;
        }
    }

`

export default function ClassAccordion( { student, handleGetClasses, id } ) {
    return (
            <MainDiv>
                <Accordion.Item eventKey={ id } >
                    <Accordion.Header>
                        <TitleDiv>
                            {
                                student.fullName
                            }
                        </TitleDiv>
                    </Accordion.Header>
                    <Accordion.Body>
                        <ClassStudentTumbnail 
                            student = { student }
                            handleGetClasses = { handleGetClasses }
                        />
                    </Accordion.Body>
                </Accordion.Item>
            </MainDiv>
    )

}
