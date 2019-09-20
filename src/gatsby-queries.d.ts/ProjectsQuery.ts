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
  image: string | null;
}

export interface ProjectsQuery_allProjectsJson_edges {
  __typename: "ProjectsJsonEdge";
  node: ProjectsQuery_allProjectsJson_edges_node;
}

export interface ProjectsQuery_allProjectsJson {
  __typename: "ProjectsJsonConnection";
  edges: ProjectsQuery_allProjectsJson_edges[];
}

export interface ProjectsQuery {
  allProjectsJson: ProjectsQuery_allProjectsJson;
}
