import list from 'reducers/puja_models/puja_modelsListReducers';
import form from 'reducers/puja_models/puja_modelsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
