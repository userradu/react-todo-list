import React from 'react';
import './StatusFilter.css';

function StatusFilter(props) {
  return (
    <span className={props.className}>
      <button
        className={"filter-option" + (props.currentStatus === props.status ? ' selected' : '')}
        onClick={() => props.onStatusFilterChanged(props.status)}>
        {props.status}
      </button>
    </span>
  );
}

export default StatusFilter;
