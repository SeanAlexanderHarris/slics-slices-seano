import { useState, useEffect } from 'react';

const deets = `
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
`;

export default function useLatestData() {
  // hot slices
  const [hotslices, setHotSlices] = useState();

  // slicemasters
  const [sliceMasters, setSliceMasters] = useState();

  // use side effect to fetch data from graphql endpoint
  useEffect(function () {
    // when the component mounts, will run - fetching the data & will run if any data changes
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        query {
                StoreSettings(id: "downtown") {
                    name
                    slicemaster {
                        ${deets}
                    }
                    hotSlices {
                        ${deets}
                    }
                }
            }`,
      }),
    }).then((res) =>
      res.json().then((resp) => {
        console.log(resp.data);
        setHotSlices(resp.data.StoreSettings.hotSlices);
        setSliceMasters(resp.data.StoreSettings.slicemaster);
      })
    );
  }, []);

  return {
    hotslices,
    sliceMasters,
  };
}
