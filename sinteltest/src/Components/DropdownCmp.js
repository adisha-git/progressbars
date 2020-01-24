import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function DropdownCmp(props){
    const options = props.dropdownOptions
    return(
        <div>
            <Dropdown options={options} onChange={props.onChange} placeholder="Select" />
        </div>
    );
}