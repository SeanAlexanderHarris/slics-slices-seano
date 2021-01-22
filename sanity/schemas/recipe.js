import { MdLightbulbOutline as icon } from 'react-icons/md';

export default {
    // Computer name
    name: 'recipe',

    // Visible title
    title: 'Recipes',
    type: 'document',
    icon: icon,
    fields: [{
        name: 'name',
        title: 'Recipe Name',
        type: 'string',
        description: 'Name of the recipe'
    },
    {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
            source: 'name',
            maxLength: 100,
        }
    },
    {
        name: 'userId',
        title: 'UserId',
        type: 'string',
        description: 'id of the user who added the recipe'
    },
    {
        name: 'notes',
        title: 'Notes',
        type: 'string',
        description: 'Recipe notes'
    },
],
};