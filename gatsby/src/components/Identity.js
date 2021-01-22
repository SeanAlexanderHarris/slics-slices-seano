import React from 'react';
import { useNetlifyIdentity } from 'react-netlify-identity-widget';

const Identity = () => {
  const identity = useNetlifyIdentity('https://slics-slices-seano.netlify.app');

  return identity && identity.user ? (
    <>
      <p>Hello {identity.user.user_metadata.full_name}</p>
      <pre>{JSON.stringify(identity, null, 2)}</pre>
    </>
  ) : null;
};

export default Identity;
