import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaPageTemplate = path.resolve(
    './src/templates/PizzaPageTemplate.js'
  );

  // 2. Query all pizzas
  const { data } = await graphql(`
    query MyQuery {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  // 3. Loop over each pizza and create a page for it
  data.pizzas.nodes.forEach((pizza) => {
    console.log(
      `Creating a page for ${pizza.name} at pizza/${pizza.slug.current}`
    );

    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaPageTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const toppingPageTemplate = path.resolve('./src/pages/pizzas.js');

  // 2. Query all toppings
  const { data } = await graphql(`
    query MyQuery {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);

  // 4. Pass topping data to pizza.js
  data.toppings.nodes.forEach((topping) => {
    console.log(`Creating a page for ${topping.name}`);

    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingPageTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // 1. Fetch the beers
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();

  // 2. Loop over & create a node for each beer
  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };

    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

async function turnSliceMastersIntoPages({ graphql, actions }) {
  // 1. Query all slice masters
  const { data } = await graphql(`
    query MyQuery {
      sliceMasters: allSanityPerson {
        totalCount
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
    }
  `);

  // 2. Figure out how many pages there are based on how many sliceMasters there are & how many we want per page
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.sliceMasters.totalCount / pageSize);

  console.log(
    `Creating ${pageCount} pages for ${data.sliceMasters.totalCount} sliceMasters at ${pageSize} per page`
  );

  // 3. Loop from 1 to n & create the pages for them
  Array.from({ length: 5 }).forEach((_, i) => {
    actions.createPage({
      path: `slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        totalPages: pageCount,
        pageSize,
      },
    });
  });

  const sliceMasterTemplate = path.resolve(
    './src/templates/SliceMasterPageTemplate.js'
  );

  // 4. Also create individual sliceMaster pages
  data.sliceMasters.nodes.forEach((sliceMaster) => {
    console.log(
      `Creating an indidiual sliceMaster page for ${sliceMaster.name}`
    );

    actions.createPage({
      component: sliceMasterTemplate,
      path: `/slicemaster/${sliceMaster.slug.current}`,
      context: {
        name: sliceMaster.person,
        slug: sliceMaster.slug.current,
      },
    });
  });
}

// export async function sourceNodes(params) {
//   // fetch a list of beers & source them into the gatsby API
//   await Promise.All([fetchBeersAndTurnIntoNodes(params)]);
// }

export async function createPages(params) {
  // create pages dynamically

  // 1. Pizzas and 2. Toppings and 3. SliceMasters
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSliceMastersIntoPages(params),
  ]);
}
