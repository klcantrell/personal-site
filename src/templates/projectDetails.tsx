import React from 'react';
import { graphql } from 'gatsby';

interface Props {
  data: { projectsJson: { title: string } };
}

const ProjectDetails = ({ data }: Props) => (
  <div>
    <p>{data.projectsJson.title}</p>
  </div>
);

export default ProjectDetails;

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    projectsJson(slug: { eq: $slug }) {
      title
    }
  }
`;
