/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProjectsQuery
// ====================================================

export interface ProjectsQuery_allProjectsJson_edges_node {
  __typename: "ProjectsJson";
  title: string | null;
  excerpt: string | null;
}

export interface ProjectsQuery_allProjectsJson_edges {
  __typename: "ProjectsJsonEdge";
  node: ProjectsQuery_allProjectsJson_edges_node;
}

export interface ProjectsQuery_allProjectsJson {
  __typename: "ProjectsJsonConnection";
  edges: ProjectsQuery_allProjectsJson_edges[];
}

export interface ProjectsQuery_piChatImage_childImageSharp_fluid {
  __typename: "ImageSharpFluid";
  tracedSVG: string | null;
  aspectRatio: number | null;
  src: string | null;
  srcSet: string | null;
  sizes: string | null;
}

export interface ProjectsQuery_piChatImage_childImageSharp {
  __typename: "ImageSharp";
  fluid: ProjectsQuery_piChatImage_childImageSharp_fluid | null;
}

export interface ProjectsQuery_piChatImage {
  __typename: "File";
  childImageSharp: ProjectsQuery_piChatImage_childImageSharp | null;
}

export interface ProjectsQuery {
  allProjectsJson: ProjectsQuery_allProjectsJson;
  piChatImage: ProjectsQuery_piChatImage | null;
}
