import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import EventCalendar from '../components/EventCalendar';
import { fetchAll } from '../actions/EventActions';

function loadData(props) {
  props.dispatch(fetchAll());
}

@connect(state => ({
  events: state.events.items
}))
export default class EventsContainer extends Component {

  componentWillMount() {
    loadData(this.props);
  }

  render() {
    return this.props.children || <EventCalendar />;
  }
}
