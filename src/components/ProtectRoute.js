import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ProtecteRoute({ url }) {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(
        () => {
            if ( location.state == null ) {
                navigate( '/Denied', { replace : true } )
                return;
            }
            const sentFormData = new FormData()
            sentFormData.append( 'username', location.state.username )
            sentFormData.append( 'password', location.state.password )
            axios.post( url, sentFormData ).then( res => {
                if ( res.data == 'denied/' ) {
                    navigate( '/Denied', { replace : true } )
                } 
            })
        }, [] )
  return <></>
}

