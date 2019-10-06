/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: sharpImageFields
// ====================================================

export interface sharpImageFields_childImageSharp_fluid {
  __typename: "ImageSharpFluid";
  tracedSVG: string | null;
  aspectRatio: number | null;
  src: string | null;
  srcSet: string | null;
  sizes: string | null;
}

export interface sharpImageFields_childImageSharp {
  __typename: "ImageSharp";
  fluid: sharpImageFields_childImageSharp_fluid | null;
}

export interface sharpImageFields {
  __typename: "File";
  childImageSharp: sharpImageFields_childImageSharp | null;
}
