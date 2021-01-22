import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useIdentityContext } from 'react-netlify-identity-widget';
import useLatestAuthData from '../utils/useLatestAuthData';
import Identity from '../components/Identity';

// Netlify Auth Test - Secret Recipes
// 1) A user can save recipes
// 2) A user can view their saved recipes
// 3) A user cannot view others recipes & is redirected to their secret recipes page if they try
// Nb. Recipe can just be a simple schema of userId, title, notes

// write hooks to handle new recipe name & notes state

function saveOrUpdateRecipe(
  projectId,
  datasetName,
  tokenWithWriteAccess,
  loggedInUserId
) {
  if (loggedInUserId === undefined) {
    return;
  }
  const mutations = [
    {
      create: {
        _id: `s${uuidv4()}`,
        _type: 'recipe',
        name: 'test dev recipe',
        slug: 'test-dev-recipe',
        notes: 'test dev notes',
        userId: `${loggedInUserId}`,
      },
    },
  ];

  fetch(`https://${projectId}.api.sanity.io/v1/data/mutate/${datasetName}`, {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${tokenWithWriteAccess}`,
    },
    body: JSON.stringify({ mutations }),
  })
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export default function Recipes() {
  const identity = useIdentityContext();
  const { recipes } = useLatestAuthData(identity.user.id);
  // console.log('RETRIEVED RECIPES FROM HOOK:', recipes);
  return (
    <div className="center">
      <Identity />
      <h1>Testing Some Netlify Auth... </h1>
      {recipes.map((recipe) => (
        <p key={recipe._id}>
          userId: {recipe.userId} name: {recipe.name} notes:{recipe.notes}
        </p>
      ))}
      {/* if (recipes === undefined) <p>No recipes here yet homez..</p> else{' '}
      {recipes.map((recipe) => (
        <p key={recipe._id}>
          userId: {recipe.userId} name: {recipe.name} notes:{recipe.notes}
        </p>
      ))} */}
      <button
        type="button"
        onClick={() =>
          saveOrUpdateRecipe(
            process.env.GATSBY_SANITY_PROJECT_ID,
            process.env.GATSBY_SANITY_DATASET_NAME,
            process.env.GATSBY_SANITY_RECIPE_WRITE_TOKEN,
            identity.user.id
          )
        }
      >
        Submit Recipe
      </button>
    </div>
  );
}
