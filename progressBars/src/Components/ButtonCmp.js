import React from 'react';
import Button from 'react-bootstrap/Button';
import './ButtonCmp.scss';

export default function ButtonCmp(props){
    return(
        
<Button className={"btnComponent"} onClick={props.onClick} variant="success">{props.btnText}</Button>
       
    );
}