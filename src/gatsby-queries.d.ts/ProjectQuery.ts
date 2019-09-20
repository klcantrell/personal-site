/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProjectQuery
// ====================================================

export interface ProjectQuery_projectsJson {
  __typename: "ProjectsJson";
  title: string | null;
}

export interface ProjectQuery {
  projectsJson: ProjectQuery_projectsJson | null;
}

export interface ProjectQueryVariables {
  id: string;
}
