import React from 'react'
import FontAwesome from 'react-fontawesome'
import {} from 'font-awesome/css/font-awesome.css'
import TicketsListItem from '../containers/Ticket/TicketListItem'


const TicketsList = (props) =>{

  const display = {
    'TICKETS_LOADING': (<div style={{padding: '40px'}}>
        <FontAwesome
        name="spinner"
        size="2x"
        spin
        style={{ color: 'var(--secondary)' }}
        />
      </div>),
    'TICKETS_LOAD_ERROR': (<div style={{padding: '40px'}}>
      Error: no se pudo cargar los tickets
    </div>),
    'INIT': <div></div>
  };

  const selected = thisId => props.tickets.current && props.tickets.current._id === thisId;

  return(
    display[props.tickets.status] || <div style={{overflowY: 'scroll', height: 'calc(100vh - 126px)'}}>
      {
        props.tickets.all.tickets.map((ticket) => {
          return <TicketsListItem key={ticket._id} ticket={ticket} selected={selected(ticket._id)} />
        })
      }
    </div>
  )
};

export default TicketsList