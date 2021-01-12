import React from 'react';
import useLatestData from '../utils/useLatestData';
import { HomePageGrid } from '../styles/Grids';
import LoadingGrid from '../components/LoadingGrid';
import ItemGrid from '../components/ItemGrid';

function CurrentlySlicing({ sliceMasters }) {
  return (
    <>
      <h2 className="center">
        <span className="mark tilt">Slicemasters On</span>
      </h2>
      <p>Standing by, ready to slice you up!</p>
      {!sliceMasters && <LoadingGrid count={4} />}
      {sliceMasters && !sliceMasters?.length && (
        <p>No one is working right now!</p>
      )}
      {sliceMasters?.length && <ItemGrid items={sliceMasters} />}
    </>
  );
}

function HotSlices({ hotslices }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Hot Slices!</span>
      </h2>
      <p>Come on by, buy the slice!</p>
      {!hotslices && <LoadingGrid count={4} />}{' '}
      {hotslices && !hotslices?.length && <p>Nothin' in the Case</p>}
      {hotslices?.length && <ItemGrid items={hotslices} />}
    </div>
  );
}

export default function HomePage() {
  const { sliceMasters, hotslices } = useLatestData();

  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm Every Single Day</p>
      <HomePageGrid>
        <CurrentlySlicing sliceMasters={sliceMasters} />
        <HotSlices hotslices={hotslices} />
      </HomePageGrid>
    </div>
  );
}
