import React, { useContext } from 'react'
import { RecipeContext } from './App';
import RecipeIngredientEdit from './RecipeIngredientEdit';

export default function RecipeEdit({recipe}) {
    const { recipeChangeHandler, selectRecipeHandler } = useContext(RecipeContext);

    function handleChange(changes) {
        recipeChangeHandler(recipe.id, { ...recipe, ...changes });
    }

    function ingredientChangeHandler(id, ingredient) {
        const newIngredients = [...recipe.ingredients];
        const index = newIngredients.findIndex(i => i.id === id);
        newIngredients[index] = ingredient;
        handleChange({ ingredients: newIngredients });
    }

    function addIngredientHandler() {
        const newIngredient = {
            id: Math.random().toString(16).slice(2),
            name: '',
            amount: ''
        };
        handleChange({ ingredients: [...recipe.ingredients, newIngredient]});
    }

    function deleteIngredientHandler(id) {
        /**
         * EVERYTHING IS IMMUTABLE IN REACT
         * IT IS BEST NOT TO MUTATE THE STATE JUST LET THE HOOKS DO THE UPDATES AND MODIFICATIONS
         * REMEMBER REACT DOES THE RENDER FOR YOU
         */
        // const index = recipe.ingredients.findIndex(i => i.id === id);
        // recipe.ingredients.splice(index, 1);
        // recipeChangeHandler(recipe.id, recipe);

        handleChange({ ingredients: recipe.ingredients.filter(i => i.id !== id)});
    }

    return (
        <div className='recipe-edit'>
            <div className='recipe-edit__remove-button-container'>
                <button
                    className='btn recipe-edit__remove-button'
                    onClick={() => selectRecipeHandler(undefined)}
                >
                    &times;
                </button>
            </div>
            <div className='recipe-edit__details-grid'>
                <label htmlFor='name' className='recipe-edit__label'>
                    Name
                </label>
                <input
                    type='text'
                    name='name'
                    id='name'
                    className='recipe-edit__input'
                    value={recipe.name}
                    onChange={(e) => handleChange({ name: e.target.value })}
                />

                <label htmlFor='cookTime' className='recipe-edit__label'>
                    Cook Time
                </label>
                <input
                    type='text'
                    name='cookTime'
                    id='cookTime'
                    className='recipe-edit__input'
                    value={recipe.cookTime}
                    onChange={(e) => handleChange({ cookTime: e.target.value })}
                />

                <label htmlFor='servings' className='recipe-edit__label'>
                    Servings
                </label>
                <input
                    type='number'
                    name='servings'
                    id='servings'
                    className='recipe-edit__input'
                    value={recipe.servings}
                    onChange={(e) =>
                        handleChange({
                            servings: parseInt(e.target.value) || '',
                        })
                    }
                />

                <label htmlFor='instructions' className='recipe-edit__label'>
                    Instructions
                </label>
                <textarea
                    name='instructions'
                    id='instructions'
                    className='recipe-edit__input'
                    value={recipe.instructions}
                    onChange={(e) =>
                        handleChange({ instructions: e.target.value })
                    }
                ></textarea>
            </div>
            <br />
            <label className='recipe-edit__label'>Ingredients</label>
            <div className='recipe-edit__ingredient-grid'>
                <div>Name</div>
                <div>Amount</div>
                <div></div>
                {recipe.ingredients.map((ingredient) => (
                    <RecipeIngredientEdit
                        key={ingredient.id}
                        ingredient={ingredient}
                        ingredientChangeHandler={ingredientChangeHandler}
                        onDeleteIngredient={deleteIngredientHandler}
                    />
                ))}
            </div>
            <div className='recipe-edit__add-ingredient-btn-container'>
                <button className='btn btn--primary' onClick={addIngredientHandler}>Add Ingredient</button>
            </div>
        </div>
    );
}
