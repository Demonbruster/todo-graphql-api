const {GraphQLServer} = require("graphql-yoga");
const todos = require('./todos');


const typeDefs = `
  type Todo {
    id:ID!,
    title:String!,
    isDone:Boolean!
  }

  type Query {
    allTodos: [Todo!]!
  }

  type Mutation {
    createTodo(title: String!, done: Boolean!): Todo!
    updateTodo(id: ID!, done: Boolean!): Todo!
    deleteTodo(id: ID!): Todo!
  }
`

const resolvers = {
  Query:{
    allTodos:() => todos,
  },
  Mutation:{
    createTodo:(_,{title,isDone})=>{
      const todo = {
        id:todos.length,
        title,
        isDone
      };
      todos.push(todo);
      return todo;
    },
    updateTodo:(_,{id,isDone})=>{
      const todo = todos.find(todo=>todo.id === id);
      todo.isDone = isDone;
      return todo;
    },
    deleteTodo:(_,{id})=>{
      const todoIndex = todos.findIndex(todo=>todo.id === id);
      const todo = todos[todoIndex];
      todos.splice(todoIndex,1);
      return todo;
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(()=>console.log('Server is running on localhost:4000'))
