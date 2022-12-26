const puja_model_samagri_mappingsFields = {
  id: { type: 'id', label: 'ID' },

  no_of_standard_qty: {
    type: 'int',
    label: 'No Of Standard Qty',

    options: [{ value: 'value', label: 'value' }],
  },

  model_id: {
    type: 'relation_one',
    label: 'Model Id',

    options: [{ value: 'value', label: 'value' }],
  },

  samagri_id: {
    type: 'relation_one',
    label: 'Samagri Id',

    options: [{ value: 'value', label: 'value' }],
  },
};

export default puja_model_samagri_mappingsFields;
