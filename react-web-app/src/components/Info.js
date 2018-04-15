import React from 'react'
import './style.css'
import TimeAgo from 'javascript-time-ago'
import es from "javascript-time-ago/locale/es/index";

TimeAgo.locale(es);
const getTimeAgo = (date) => new TimeAgo('es-AR').format(date);
const Info = (props) => {

  return <div id='info'>
    <div className='info title' id='infoTitle'>{props.title}</div>
    <div className='info title-line'></div>
    <div id='infoDate'>{getTimeAgo(props.createdOn)}</div>
    <div className='info description' id='infoDescription'>{props.description}</div>
  </div>
}

export default Info