import React from "react";
import styled from "styled-components";
import img from '../../images/dragon-scales.svg'

const config = {
    'border-radius' : '20px',
}

const LoginDiv = styled.div`

    .login-page {
        box-sizing: border-box;
        font-family: 'iran-sans';
        letter-spacing: 0.05ch;
        margin: 0;
        height: 100vh;
        width: 100vw;
        background-color: #330055;
        background-image: url( ${ img } );
        background-attachment: fixed;
        background-size: contain;
        overflow: hidden;
        
    }
    
    /* Header */
    
    .App {
        text-align: center;
    }

    .header {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 40px 20px 20px 20px ;
    }
    
    .app-logo {
        height: 30vh;
        z-index: 1000;

    }
    
    .app-logo:hover .login {
        background: green;
    }
    
    .app-logo:hover {
        filter: drop-shadow(0 0 20px rgb(12, 218, 36));
    }
    
    /* Main */
    
    .login-header {
        font-size: 30px;
        font-weight: bold;
        margin: 0;
        text-align: center;
        color: #221F1F;
    }
    
    .login-header:hover {
        text-shadow: 0 0 10px black;
    }
    
    
    .login {
        background: rgb(53,168,47);
        background: linear-gradient(180deg, rgba(255,192,15,255) 20%, rgba(254,199,60,255) 53%, rgba(255,233,172,255) 81%);
        width: 38vw;
        margin: auto;
        border: 3px solid rgba(139,94,59,255);
        border-radius: ${ config['border-radius'] };
        padding: 20px;
        margin-top: 25px;
        z-index: 1000;
        position: relative;
    }
    
    label {
        display: block;
        margin: 3px 0;
    }
    
    .login-form-group {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 10px;
        font-size: 20px;
    }
    
    input[type="text"],
    input[type="password"] {
        border: 2px solid rgb(37, 88, 198);
        border-radius: 10px;
        padding: 0.5rem 0.5rem;
        width: 100%;
    }
    
    input[type="text"]:hover,
    input[type="password"]:hover
    {
        box-shadow: 0 0 20px 1px rgb(80, 61, 4);
        outline: 0;
    }
    
    input[type="text"]:focus,
    input[type="password"]:focus 
    {
        outline: 0;
    }
    
    
    .login-footer {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-area: "sign-up login-btn forgot-pass";
        align-items: center;
        margin-top: 30px;
    }
    
    .sign-up {
        justify-self: start;
        color: black;
        text-decoration: none;
    }
    
    .sign-up:hover {
        animation: dangling 1s linear 0.25s;
        text-shadow: 0 0 10px black;
    }
    
    
    .forgot-pass {
        justify-self: end;
        color: black;
        text-decoration: none;
        
    }
    
    .forgot-pass:hover {
        animation: dangling 1s linear 0.25s;
        text-shadow: 0 0 10px black;
    }
    
    .login-btn {
        justify-self: center;
        font-family: 'iran-sans';
        font-size: 20px;
        padding: 0.3rem 2rem;
        text-align: center;
        border: 2px solid #7a9710;
        border-radius: 1.2rem;
        background: #b2dc1a;
        box-shadow: 0px 5px 0px 0px rgb(84, 67, 67);
        letter-spacing: 1px;
    }
    
    
    .login-btn:hover {
        background-color: #6a840e;
        box-shadow: 0 1px 0 0;
        
    }
    
    @keyframes dangling {
        0% {
        transform: translateX(0);
        }
        25% {
        transform: translateX(50px);
        }
        75% {
        transform: translateX(-50px);
        }
        100% {
        transform: translateX(0);
        }
    }
    
    
    .username-label {
        align-self: flex-end;
        position: relative;
        bottom: 5px;
        right: 5px;
    }
    
    .pass-label {
        align-self: flex-end;
        position: relative;
        bottom: 5px;
        right: 5px;
    }
    
    @media screen and ( max-width :  700px ) {
        .login {
            width: 80vw;
        }
        .app-logo {
            height: 28vh;
        }
        .login-form-group {
            font-size: 18px;
            margin: 0;
            margin-top: 20px;
        }
        .login-header {
            font-size: 26px;
        }
        .login-btn {
        padding: 0.3rem 1.1rem;
        font-size: 20px;
        }
        .forgot-pass {
            font-size: 12px;
            text-align: center;
            padding-left: 8px;
        }
        .sign-up {
            font-size: 12px;
            text-align: center;
            padding-right: 8px;
        }
        .login-footer {
            margin-top: 30px;
        }
    }
    
    @media screen and ( max-width : 1100px ) and ( min-width: 701px ) {
        .login {
        width: 60vw;
        }
    }
    
    /* Footer */
    
    .footer {
        height: 20%;
    }
    
    .subtitle {
        width: 100vw;
        height: 60px;
        background: rgba(0,183,196,255);
        position: fixed;
        bottom: 30px;
        display: flex;
        align-items: center;
        /* transition: visibility 1s linear; */
    }
    
    .subtitle-text {
        font-size: 18px;
        margin: 0;
        display: inline;
        width: auto;
        white-space: nowrap;
        animation: subtitling-desktop 8s linear 0s infinite;
    }

    @media screen and ( max-width: 700px ) {
        .subtitle-text {
            animation: subtitling 8s linear 0s infinite;
        }
    }
    
    @keyframes subtitling {
        from {
        transform: translateX(-200vw);
        }
        to {
        transform: translateX(100vw)
        }
    }

    @keyframes subtitling-desktop {
        from {
        transform: translateX(-100vw);
        }
        to {
        transform: translateX(100vw)
        }
    }
`

export default LoginDiv;