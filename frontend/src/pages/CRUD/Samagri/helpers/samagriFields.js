
const samagriFields = {
	id: { type: 'id', label: 'ID' },

    name: { type: 'string', label: 'Name',

    options: [

    { value: 'value', label: 'value' },

]

    },

    description: { type: 'string', label: 'Description',

    options: [

    { value: 'value', label: 'value' },

]

    },

    standard_qty: { type: 'int', label: 'Standard Qty',

    options: [

    { value: 'value', label: 'value' },

]

    },

    qty_units: { type: 'enum', label: 'Qty Units',

    options: [

    { value: 'kg', label: 'kg' },

    { value: 'no(s)', label: 'no(s)' },

    { value: 'ml', label: 'ml' },

    { value: 'gms', label: 'gms' },

    { value: 'dozens', label: 'dozens' },

    { value: 'other', label: 'other' },

]

    },

    cost_price: { type: 'int', label: 'Cost Price',

    options: [

    { value: 'value', label: 'value' },

]

    },

    pujari_selling_price: { type: 'int', label: 'Pujari Selling Price',

    options: [

    { value: 'value', label: 'value' },

]

    },

    customer_mrp: { type: 'int', label: 'Customer Mrp',

    options: [

    { value: 'value', label: 'value' },

]

    },

    karishye_provided: { type: 'enum', label: 'Karishye Provided',

    options: [

    { value: 'stocks', label: 'stocks' },

    { value: 'does_not_stock', label: 'does_not_stock' },

    { value: 'does_not_stock_but_can_supply', label: 'does_not_stock_but_can_supply' },

]

    },

}

export default samagriFields;
