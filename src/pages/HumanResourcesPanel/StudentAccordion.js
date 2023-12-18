import React, { useEffect } from "react";
import { Col, Button, Row, Container, Card, Form, Accordion } from 'react-bootstrap';
import styled from 'styled-components'

const TitleDiv = styled.div`
    font-weight: bold;
    font-size: 18px;
    padding: 5px;
    display: block;
    @media screen and ( max-width : 1000px ) {
        font-size: 16px;
    }
`
const ContentDiv = styled.div`
    font-weight: 100;
    font-size: 17px;
    display: block;
    line-height: 2rem;
    color: #045219;
    @media screen and ( max-width : 1000px ) {
        font-size: 15px;
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
        .accordion-button {
            font-size: 16px;
        }
    }
`

export default function StudentAccordion( {  question, answer, id } ) {
    return (
            <MainDiv>
                <Accordion.Item eventKey={ id } >
                    <Accordion.Header>
                        { question }
                    </Accordion.Header>
                    <Accordion.Body>
                        <ContentDiv>
                            { answer ? answer : "پاسخی موجود نیست"  }
                        </ContentDiv>
                    </Accordion.Body>
                </Accordion.Item>
            </MainDiv>
    )

}
