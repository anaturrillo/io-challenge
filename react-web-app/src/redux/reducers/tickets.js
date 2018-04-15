const initialState = {
  all : null,
  current: {},
  showInfo: false,
  status: 'INIT',
  currentMarker: {}
}

const actionHandlers = {
  "TICKETS_LOADING": (action) => ({
    all: action.payload
  }),
  "TICKETS_LOADED": (action) => ({
    all: action.payload
  }),
  "TICKETS_LOAD_ERROR": (action) => ({
    all: action.payload
  }),
  "TICKET_SELECTED": (action) => ({
    showInfo: true,
    current: action.current,
    currentMarker: action.currentMarker
  }),
  "TICKET_UNSELECTED": (action) => ({
    showInfo: false,
    current: {}
  })
};

export default (state = initialState, action = {}) => {
  
  const handler = actionHandlers[action.type];

  const newState = handler ? Object.assign(
    {},
    state,
    handler(action),
    {
      status: action.type
    }
  )
    : state;

  console.log('================TICKET STORE====================');
  console.log(newState);
  console.log('=================REDUX===================');

  return newState;
}
  