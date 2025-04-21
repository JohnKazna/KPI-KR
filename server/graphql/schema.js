import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Post {
    id: ID!
    teacher_id: ID!
    title: String!
    subtitle: String
    content: String!
    group: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    posts: [Post]
    post(id: ID!): Post
  }

  input PostInput {
    teacher_id: ID!
    title: String!
    subtitle: String
    content: String!
    group: String!
  }

  type Mutation {
    createPost(input: PostInput!): Post
    updatePost(id: ID!, input: PostInput!): Post
    deletePost(id: ID!): Post
  }
`;

export default typeDefs;
