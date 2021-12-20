import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './ProgressBar.scss';

export default function ProgressBarCmp(props){
    const now = props.progressValue;
    return(
        <div>
            <ProgressBar className={props.limitExceed ? "redBackground ": ""} now={now} label={`${now}%`} />
        </div>
    );
}