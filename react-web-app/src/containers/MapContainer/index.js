import React, { Component } from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import markerLogo from '../../assets/marker.png';
import {connect} from 'react-redux'
import Info from '../../components/Info'

export class MapContainer extends Component {

  state = {
    showInfo: false,
    currentMarker: {},
    current: {},
  };

  onMarkerClick = (props, marker, e) =>{
    this.props.dispatch({
      type: 'TICKET_SELECTED',
      current: props,
      showInfo: true
    });
  };

  onMapClicked = () => {
    this.props.dispatch({
      type: 'TICKET_UNSELECTED'
    });
  };

  onInfoClose = () => {
    this.props.dispatch({
      type: 'TICKET_UNSELECTED'
    });
  };

  render() {
    const current = this.props.current || {};

    const infoWindowPosition = current.coords ? {
        lat: current.coords[0] + 0.001,
        lng: current.coords[1]
      } : {lat: 0, lng: 0};

    return (
    <Map
      google={this.props.google}
      style={{width: '100vw', height: '100vh'}}
      initialCenter={{
        lat: -34.604382,
        lng: -58.371704
      }}
      zoom={15}
      onClick={this.onMapClicked}>

      {this.props.tickets.all.tickets
        .map(ticket =>
          <Marker
            key={ticket._id}
            onClick={this.onMarkerClick}
            position={{
              lat: ticket.coords[0],
              lng: ticket.coords[1]
            }}
            icon={{
              url: markerLogo
            }}
            {...ticket} />
      )}

      <InfoWindow
        position={infoWindowPosition}
        visible={this.props.showInfo}
        onClose={this.onInfoClose}>

        <Info {...current} />

      </InfoWindow>
    </Map>
    );
  }
}

const wrappedMap = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GMAPS_API_KEY
})(MapContainer);

const mapStateToProps = (state) => ({
  ...state,
  tickets:  state.tickets,
  current:  state.tickets.current,
  showInfo: state.tickets.showInfo,
  currentMarker:state.currentMarker
});

export default connect(mapStateToProps) (wrappedMap);
