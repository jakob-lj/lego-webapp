import { reducer as formReducer } from 'redux-form';
import { Event } from '../actions/ActionTypes';

export default formReducer.plugin({
  joinEvent: (state, action) => {
    switch (action.type) {
      case Event.REGISTER.SUCCESS:
        return undefined;
      default:
        return state;
    }
  }
});
