import React, { useEffect, useState } from 'react';
import RecipeList from './RecipeList';
import '../css/App.css';
import RecipeEdit from './RecipeEdit';

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes';

function App() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState();
    const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId);
    console.log(':: SELECTE RECIPE ::', selectedRecipe);

    useEffect(() => {
        // console.log(':: THIS EFFECT IT IS LIKE ONINIT ::')
        const recipesFromStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (recipesFromStorage && recipesFromStorage.length > 0) setRecipes(recipesFromStorage);
        else setRecipes(sampleRecipes);
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
        //* This is a clean up function it also can be used as a onDestroy with [] as a dependency
        //* It gets executed everytime before the current useEffect body function
        return () => {
            // console.log(':: CLEAN UP EFFECT ::')
        };
    }, [recipes]);

    const recipeContextValue = {
        addRecipeHandler,
        deleteRecipeHandler,
        selectRecipeHandler,
        recipeChangeHandler
    };

    function generateUId()  {
        return Math.random().toString(16).slice(2);
    };

    function selectRecipeHandler(id) {
        setSelectedRecipeId(id);
    }

    function addRecipeHandler() {
        const newRecipe = {
            id: generateUId(),
            name: '',
            servings: 0,
            cookTime: '',
            instructions: '',
            ingredients: [
                { id: generateUId(), name: '', amount: '' }
            ]
        }

        setRecipes([...recipes, newRecipe]);
        setSelectedRecipeId(newRecipe.id);
    };

    function deleteRecipeHandler(id) {
        if (!selectedRecipeId && selectedRecipeId === id) {
            setSelectedRecipeId(undefined);
        }

        setRecipes(recipes.filter(r => r.id !== id));
    };

    function recipeChangeHandler(id, recipe) {
        const newRecipes = [...recipes];
        const index = newRecipes.findIndex(r => r.id === id);
        newRecipes[index] = recipe;
        setRecipes(newRecipes);
    }

    return (
        <RecipeContext.Provider value={recipeContextValue}>
            <RecipeList recipes={recipes} />
            {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
        </RecipeContext.Provider>
    );
}

export default App;

const sampleRecipes = [
    {
        id: 1,
        name: 'Plain Chicken',
        servings: 3,
        cookTime: '1:45',
        instructions:
            '1. Put salt on chichken \n2. Put chicken in oven \n3. Eat chicken',
        ingredients: [
            {
                id: 1,
                name: 'Chicken',
                amount: '2 Pounds',
            },
            {
                id: 2,
                name: 'Salt',
                amount: '1 Tbs',
            },
        ],
    },

    {
        id: 2,
        name: 'Plain Pork',
        servings: 2,
        cookTime: '0:45',
        instructions:
            '1. Put paprika on pork \n2. Put pork in oven \n3. Eat pork',
        ingredients: [
            {
                id: 1,
                name: 'Pork',
                amount: '3 Pounds',
            },
            {
                id: 2,
                name: 'Paprika',
                amount: '4 Tbs',
            },
        ],
    },
];
