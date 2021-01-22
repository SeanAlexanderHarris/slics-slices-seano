import { useState, useEffect } from 'react';
import { useIdentityContext } from 'react-netlify-identity-widget';

export default function useLatestAuthData() {
  const [recipes, setRecipes] = useState();
  const identity = useIdentityContext();

  useEffect(
    function () {
      // when the component mounts, will run - fetching the data & will run if any data changes
      const mutation = `
        query {
                allRecipe(where: {userId: {eq: "${identity.user.id}"}}) {
                    name
                    notes
                    userId
                }
            }`;

      fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: mutation,
        }),
      }).then((res) =>
        res
          .json()
          .then((resp) => {
            console.log('RESPONSE FROM SANITY MUTATION CALL', resp.data);
            setRecipes(resp.data.allRecipe);
          })
          .catch((error) => {
            console.error('ERROR', error);
            return {
              data: [
                {
                  _id: 'dud id',
                  name: 'dud recipe',
                  notes: 'dud notes',
                  userId: 'dud userId',
                },
              ],
            };
          })
      );
    },
    // passing the userId as a second argument should mean that it only runs when that id updates..
    [identity.user.id]
  );

  return {
    recipes,
  };
}
