import React from 'react'
import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es'
import {} from 'font-awesome/css/font-awesome.css'
import {connect} from "react-redux";

TimeAgo.locale(es)

const getTimeAgo = (date) => new TimeAgo('es-AR').format(date);

const TicketsListItem = (props) => {
  const d = props.dispatch;

  const onTicketClick = props => evt => {

    if (props.selected) {
      d({
        type: 'TICKET_UNSELECTED'
      });
    } else {
      d({
        type: 'TICKET_SELECTED',
        current: props.ticket,
        currentMarker: {},
        showInfo: true
      });
    }
  };
  const backgroundColor = props.selected? '#b2ebf2':'';
  return (
    <div>
      <div onClick={onTicketClick(props)}  style={{cursor: 'pointer', borderBottom: '1px solid', borderBottomColor: 'var(--light)', backgroundColor, transition: 'background-color 300ms linear'}}>
        <div style={{paddingLeft: '40px', display: 'flex'}}>
          <div style={{flexDirection: 'row', alignItems: 'center', display: 'flex', height: '77px'}}>
            <div style={{fontFamily: 'Lato-Medium', fontSize: '14px', color: 'var(--secondary)', width: '50px'}}>
              {props.ticket.code}
            </div>
          </div>
          <div style={{flexDirection: 'column', display: 'flex', justifyContent: 'space-between', paddingLeft: '12px', paddingTop: '15px', paddingBottom:'15.5px'}}>
            <div style={{fontFamily: 'Lato-Heavy', fontSize: '15px', lineHeight: '22.5px'}}>
              {props.ticket.title}
            </div>
            <div style={{fontFamily: 'Lato-Medium', fontSize: '15px', color: 'var(--secondary)', lineHeight: '18px'}}>
              {getTimeAgo(props.ticket.createdOn)}
            </div>
          </div>
        </div>
      </div>

    </div>
  )};

const mapStateToProps = (state) => ({
  ...state,
  tickets:  state.tickets,
  current:  state.tickets.current,
  showInfo: state.tickets.showInfo,
  currentMarker:state.currentMarker
});

export default connect(mapStateToProps) (TicketsListItem);
