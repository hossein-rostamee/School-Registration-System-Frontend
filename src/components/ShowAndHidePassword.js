import { useState } from "react";
import styled from 'styled-components'

const PasswordInput = styled.div`

    position: relative;
    .toggle-btn {
        background-color: white;
        position: absolute;
        right: ${ props => props.right };
        left: ${ props => props.left };
        top: 5px;
        background-color: transparent;

    }
`

const Eye = ({ width, height, viewBox }) => <svg width={width} height={height} viewBox={viewBox} 
                       xmlns="http://www.w3.org/2000/svg" 
                       fill="currentColor" class="bi bi-eye-fill" >
    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
</svg>

const EyeSlash = ({ width, height, viewBox }) => <svg width={width} height={height} viewBox={viewBox}  
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor" class="bi bi-eye-slash-fill" >
    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
</svg>

function ShowAndHidePassword( props ){

    const [passwordType, setPasswordType] = useState("password");

    const togglePassword =()=>{
      if(passwordType==="password")
      {
       setPasswordType("text")
       return;
      }
      setPasswordType("password")
    }

    return(
        <PasswordInput right={props.rightPos} left={props.leftPos}>
            <input type={passwordType} 
                   className={ props.className } 
                   onChange={ props.handleChange } 
                   name={ props.name } 
                   id={ props.id } 
                   placeholder={ props.placeholder }
                   ref = { props.refValue }
            />
            { 
              passwordType!=="password"? 
              <span onClick={togglePassword} className="toggle-btn">
                <Eye width={props.width} height={props.height} viewBox={props.viewBox}/>
              </span> :
              <span onClick={togglePassword} className="toggle-btn">
                <EyeSlash width={props.width} height={props.height} viewBox={props.viewBox}/>
              </span>   
            }
        </PasswordInput>
    );

}
export default ShowAndHidePassword;