import React, { useEffect } from "react";
import { Col, Button, Row, Container, Card, Form, ListGroup } from 'react-bootstrap';
import styled from 'styled-components'

const TitleDiv = styled.div`
    font-weight: bold;
    font-size: 18px;
    padding: 5px;
    display: inline-block;
    margin-right: 7px;
    @media screen and ( max-width : 1000px ) {
        font-size: 16px;
    }
`
const ContentDiv = styled.div`
    font-weight: 100;
    font-size: 17px;
    display: inline-block;
    line-height: 1.5rem;
    color: #045219;
    margin: 10px;
    @media screen and ( max-width : 1000px ) {
        font-size: 15px;
    }
`

export default function VolunteerListGroup( {  question, answer } ) {

    return (
        <ListGroup.Item>
            <Row>
                <TitleDiv>{ question }</TitleDiv>
                <ContentDiv>{ answer ? answer : "پاسخی موجود نیست"  }</ContentDiv>
            </Row>
        </ListGroup.Item>
    )

}