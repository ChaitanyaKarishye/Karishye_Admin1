import { Formik } from 'formik';
import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Loader from 'components/Loader';
// eslint-disable-next-line no-unused-vars
import InputFormItem from 'components/FormItems/items/InputFormItem';
// eslint-disable-next-line no-unused-vars
import SwitchFormItem from 'components/FormItems/items/SwitchFormItem';
// eslint-disable-next-line no-unused-vars
import RadioFormItem from 'components/FormItems/items/RadioFormItem';
// eslint-disable-next-line no-unused-vars
import SelectFormItem from 'components/FormItems/items/SelectFormItem';
// eslint-disable-next-line no-unused-vars
import DatePickerFormItem from 'components/FormItems/items/DatePickerFormItem';
// eslint-disable-next-line no-unused-vars
import ImagesFormItem from 'components/FormItems/items/ImagesFormItem';
// eslint-disable-next-line no-unused-vars
import FilesFormItem from 'components/FormItems/items/FilesFormItem';
// eslint-disable-next-line no-unused-vars

import puja_modelsFields from 'pages/CRUD/Puja_models/helpers/puja_modelsFields';
import IniValues from 'components/FormItems/iniValues';
import PreparedValues from 'components/FormItems/preparedValues';
import FormValidations from 'components/FormItems/formValidations';
import Widget from 'components/Widget';

import PujasSelectItem from 'pages/CRUD/Pujas/helpers/PujasSelectItem';

import PujarisSelectItem from 'pages/CRUD/Pujaris/helpers/PujarisSelectItem';

const Puja_modelsForm = (props) => {

  const {
  isEditing,
  isProfile,
  findLoading,
  saveLoading,
  record,
  onSubmit,
  onCancel,
  modal
  } = props;

  const iniValues = () => {
  return IniValues(puja_modelsFields, record || {});
  }

  const formValidations = () => {
  return FormValidations(puja_modelsFields, record || {});
  }

  const handleSubmit = (values) => {
  const { id, ...data } = PreparedValues(puja_modelsFields, values || {});
  onSubmit(id, data);
  };

  const title = () => {
  if(isProfile) {
  return 'Edit My Profile';
  }

  return isEditing
  ? 'Edit Puja_models'
  : 'Add Puja_models';
  };

  const renderForm = () => (
  <Widget title={<h4>{title()}</h4>} collapse close>
  <Formik
          onSubmit={handleSubmit}
  initialValues={iniValues()}
  validationSchema={formValidations()}
  >
  {(form) => (
  <form onSubmit={form.handleSubmit}>
    <Grid container spacing={3} direction="column">

      <Grid item>
        <InputFormItem
          name={'kar_id'}
          schema={puja_modelsFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'duration'}
          schema={puja_modelsFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'pujari_cost'}
          schema={puja_modelsFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'no_of_pujaris'}
          schema={puja_modelsFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'model_selling_price'}
          schema={puja_modelsFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'advance_amount'}
          schema={puja_modelsFields}
        />
      </Grid>

      <Grid item>
        <SwitchFormItem
          name={'is_popular_model'}
          schema={puja_modelsFields}
        />
      </Grid>

      <Grid item>
        <PujasSelectItem
        name={'puja_id'}
        schema={puja_modelsFields}
        showCreate={!modal}
        form={form}
        />
      </Grid>

      <Grid item>
        <PujarisSelectItem
        name={'test'}
        schema={puja_modelsFields}
        showCreate={!modal}
        multiple
        form={form}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'name'}
          schema={puja_modelsFields}

        />
      </Grid>

  </Grid>
  <Grid container spacing={3} mt={2}>
    <Grid item>
      <Button
        color="primary"
        variant="contained"
        onClick={form.handleSubmit}
      >
        Save
      </Button>
    </Grid>
    <Grid item>
      <Button
        color="primary"
        variant="outlined"
        onClick={form.handleReset}
      >
        Reset
      </Button>
    </Grid>
    <Grid item>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => onCancel()}
      >
        Cancel
      </Button>
    </Grid>
  </Grid>
      </form>
      )
      }
    </Formik>
  </Widget>
  );
  if (findLoading) {
  return <Loader />;
  }
  if (isEditing && !record) {
  return <Loader />;
  }
  return renderForm();
  }
  export default Puja_modelsForm;
