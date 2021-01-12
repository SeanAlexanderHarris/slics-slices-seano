import { rules } from 'eslint-config-prettier';
import { FaPepperHot as icon } from 'react-icons/fa';

export default {
    // Computer name
    name: 'topping',

    // Visible title
    title: 'Topping',
    type: 'document',
    icon: icon,
    fields: [{
        name: 'name',
        title: 'Topping Name',
        type: 'string',
        description: 'Name of the topping'
    },
    {
        name: 'vegetarian',
        title: 'Vegetarin',
        type: 'boolean',
        description: 'Vegetarian?',
        options: {
            layout: 'checkbox'
        }
    },],
    preview: {
        select: {
            name: 'name',
            vegetarian: 'vegetarian'
        },
        prepare: (fields) => ({
            title: `${fields.name} ${fields.vegetarian ? `🌱` : ``}`,

        })
    }
};