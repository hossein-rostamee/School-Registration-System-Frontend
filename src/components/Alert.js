import React from 'react';
import styled from 'styled-components'

const AlertDiv = styled.div`

 
.alert {
    padding: 15px;
    border: 1px solid transparent;
    border-radius: 4px;
    font-size: 20px;
    line-height: 2rem;
    overflow: hidden;
    z-index: 8000000;
    text-align: center;
  }

  &.for-panel {
    grid-area: content;
    position: static;
    .alert {
      position: static;
      margin: 15px;
    }
  }

  .fade-in {
    opacity: 1;
    transition: opacity 1s ease;
  }
    
  .fade-out {
    opacity: 0;
    transition: opacity 1s ease;
  }
  
  .center {
    position: fixed; 
    top: 12px; 
    left: 12px;
    right: 12px;
    width: auto;
  }

  .success {
    background-color: #83db60;
    border-color: #bcea96;
    color: #0b0b0b;
  }
  
  .error {
    background-color: #ee5d5d;
    border-color: #c15668;
    color: #ffffff;
  }

  .message {
    margin: 0;
  }

`


const Alert = ({ type, visible, message, forPanel }) => {
  return (
    <AlertDiv className={`${ forPanel ? 'for-panel' : "" }`}>
      <div className={`alert ${type} center ${ visible ? 'fade-in' : 'fade-out' } `}  >
        <p className='message'>{message}</p>
      </div>
    </AlertDiv>
  );
};

export default Alert;
