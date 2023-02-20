import React from 'react';
import Ingredient from './Ingredient';

export default function IngredientList({ ingredients }) {
    const ingredientElements = ingredients.map(i => <Ingredient key={i.id} {...i}/>);

    return <div className='ingredient-grid'>{ingredientElements}</div>;
}
