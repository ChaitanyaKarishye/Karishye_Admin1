
const puja_modelsFields = {
	id: { type: 'id', label: 'ID' },

    kar_id: { type: 'int', label: 'Kar Id',

    options: [

    { value: 'value', label: 'value' },

]

    },

    duration: { type: 'int', label: 'Duration',

    options: [

    { value: 'value', label: 'value' },

]

    },

    pujari_cost: { type: 'int', label: 'Pujari Cost',

    options: [

    { value: 'value', label: 'value' },

]

    },

    no_of_pujaris: { type: 'int', label: 'No Of Pujaris',

    options: [

    { value: 'value', label: 'value' },

]

    },

    model_selling_price: { type: 'int', label: 'Model Selling Price',

    options: [

    { value: 'value', label: 'value' },

]

    },

    advance_amount: { type: 'int', label: 'Advance Amount',

    options: [

    { value: 'value', label: 'value' },

]

    },

    is_popular_model: { type: 'boolean', label: 'Is Popular Model',

    options: [

    { value: 'value', label: 'value' },

]

    },

    puja_id: { type: 'relation_one', label: 'Puja Id',

    options: [

    { value: 'value', label: 'value' },

]

    },

    test: { type: 'relation_many', label: 'Test',

    options: [

    { value: 'value', label: 'value' },

]

    },

}

export default puja_modelsFields;
