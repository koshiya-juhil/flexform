
export interface FormField {
    field: string;
    text: string;
    type: string;
    disabled?: boolean;
    defaultvisibility?: boolean;
    required: boolean;
    minvalue?: number;
    radiooptions?: { label: string, value: string }[];
    condition?: { field: string, onvalue: string };
    masterdata?: { text: string, value: string }[];
    dependentrequired?: { onvalue: string, fields: string[] };
}

class MastersJson {

    formfields: FormField[];

    constructor(pagename: string){
        this.formfields = this.getFields(pagename);
    }

    getFields(pagename: string){
        switch(pagename) {
            case 'paymentDetails':
                return [
                    {
                        'field': 'required',
                        'text': 'Payment required',
                        'type': 'switch',
                        'disabled': false,
                        'defaultvisibility': true,
                        'required': false,
                    },
                    {
                        'field': 'title',
                        'text': 'Payment title',
                        'type': 'text',
                        'disabled': false,
                        'defaultvisibility': true,
                        'required': true,
                    },
                    {
                        'field': 'stripe_publishable_key',
                        'text': 'Stripe publishable key',
                        'type': 'text',
                        'disabled': false,
                        'defaultvisibility': true,
                        'required': true,
                    },
                    {
                        'field': 'stripe_secret_key',
                        'text': 'Stripe secret key',
                        'type': 'text',
                        'disabled': false,
                        'defaultvisibility': true,
                        'required': true,
                    },
                    {
                        'field': 'payment_mode',
                        'text': 'Payment mode',
                        'type': 'dropdown',
                        'disabled': false,
                        'defaultvisibility': true,
                        'required': true,
                        'masterdata': [
                            { text: 'Fixed', value: 'payment' },
                            { text: 'Subscription', value: 'subscription' },
                        ],
                        'dependentrequired': {
                            'onvalue': 'subscription',
                            'fields': ['interval', 'interval_count']
                        }
                    },
                    {
                        'field': 'interval',
                        'text': 'Subscription Interval',
                        'type': 'dropdown',
                        'disabled': false,
                        'defaultvisibility': false,
                        'required': false,
                        'masterdata': [
                            { text: 'Day', value: 'day' },
                            { text: 'Month', value: 'month' },
                            { text: 'Week', value: 'week' },
                            { text: 'Year', value: 'year' },
                        ],
                        'condition': {
                            'field': 'payment_mode',
                            'onvalue': 'subscription'
                        }
                    },
                    {
                        'field': 'interval_count',
                        'text': 'Interval Count',
                        'type': 'number',
                        'disabled': false,
                        'defaultvisibility': false,
                        'required': false,
                        'minvalue': 1,
                        'condition': {
                            'field': 'payment_mode',
                            'onvalue': 'subscription'
                        }
                    },
                    {
                        'field': 'currency',
                        'text': 'Currency',
                        'type': 'dropdown',
                        'disabled': false,
                        'defaultvisibility': true,
                        'required': true,
                        'masterdata': [
                            { text: 'USD', value: 'usd' },
                            { text: 'INR', value: 'inr' },
                        ]
                    },
                    {
                        'field': 'price',
                        'text': 'Price',
                        'type': 'number',
                        'disabled': false,
                        'defaultvisibility': true,
                        'required': true,
                        'minvalue': 0
                    },
                ]
            
            default:
                return [];
        }
    }
}

export default MastersJson;