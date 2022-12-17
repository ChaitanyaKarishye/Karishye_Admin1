import list from 'reducers/puja_model_samagri_mappings/puja_model_samagri_mappingsListReducers';
import form from 'reducers/puja_model_samagri_mappings/puja_model_samagri_mappingsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
