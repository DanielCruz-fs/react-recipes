import React, { useContext, useEffect } from 'react';
import { RecipeContext } from './App';
import IngredientList from './IngredientList';

export default function Recipe(props) {
    const {
        id,
        name,
        cookTime,
        servings,
        instructions,
        ingredients
    } = props;

    const { deleteRecipeHandler, selectRecipeHandler } = useContext(RecipeContext);

    useEffect(() => {
        // console.log(`:: Recipe id: ${id} has initilized ::`);
        return () => {
            // console.log(`:: Recipe id: ${id} has been DESTROYED ::`);
        }
    }, []);

    return (
        <div className='recipe'>
            <div className='recipe__header'>
                <h3 className='recipe__title'>{name}</h3>
                <div>
                    <button
                        className='btn btn--primary mr-1'
                        onClick={() => selectRecipeHandler(id)}
                    >
                        Edit
                    </button>
                    <button
                        className='btn btn--danger'
                        onClick={() => deleteRecipeHandler(id)}
                    >
                        Delete
                    </button>
                </div>
            </div>

            <div className='recipe__row'>
                <span className='recipe__label'>Cook Time:</span>
                <span className='recipe__value'>{cookTime}</span>
            </div>
            <div className='recipe__row'>
                <span className='recipe__label'>Servings:</span>
                <span className='recipe__value'>{servings}</span>
            </div>
            <div className='recipe__row'>
                <span className='recipe__label'>Instruction:</span>
                <div className='recipe__value recipe__value--indented recipe__instructions'>
                    {instructions}
                </div>
            </div>
            <div className='recipe__row'>
                <span className='recipe__label'>Ingredients:</span>
                <div className='recipe__value recipe__value--indented'>
                    <IngredientList ingredients={ingredients} />
                </div>
            </div>
        </div>
    );
}
