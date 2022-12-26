import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'PUJA_MODELS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'PUJA_MODELS_FORM_FIND_STARTED',
      });

      axios.get(`/puja_models/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'PUJA_MODELS_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PUJA_MODELS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/puja_models'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'PUJA_MODELS_FORM_CREATE_STARTED',
      });

      axios.post('/puja_models', { data: values }).then((res) => {
        dispatch({
          type: 'PUJA_MODELS_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Puja_models created' });
        dispatch(push('/admin/puja_models'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PUJA_MODELS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'PUJA_MODELS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/puja_models/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'PUJA_MODELS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Puja_models updated' });
        dispatch(push('/admin/puja_models'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PUJA_MODELS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
