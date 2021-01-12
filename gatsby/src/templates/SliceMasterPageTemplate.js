import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
// import styled from 'styled-components';

export default function SliceMasterPageTemplate({ data: { sliceMaster } }) {
  return (
    <>
      <SEO title={sliceMaster.name} image={sliceMaster.image.asset.src} />
      <div className="center">
        <Img fluid={sliceMaster.image.asset.fluid} />
        <div>
          <h2 className="mark">{sliceMaster.name}</h2>
        </div>
        <p className="description">{sliceMaster.description}</p>
      </div>
    </>
  );
}

export const query = graphql`
  query SliceMasterTemplateQuery($slug: String!) {
    sliceMaster: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
