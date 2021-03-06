const { ApolloServer, gql, PubSub } = require("apollo-server");
const pubsub = new PubSub();
// create a memory db
const db = {
  cars: [
    {
      id: "a",
      brand: "Ford",
      color: "Blue",
      doors: 4,
      type: "Sedan"
    },
    {
      id: "b",
      brand: "Tesla",
      color: "Red",
      doors: 4,
      type: "SUV"
    },
    {
      id: "c",
      brand: "Toyota",
      color: "White",
      doors: 4,
      type: "Coupe"
    },
    {
      id: "d",
      brand: "Toyota",
      color: "Red",
      doors: 4,
      type: "Coupe"
    }
  ]
};

// create the schema
const schema = gql(` 
enum CarTypes {
   Sedan
   SUV
   Coupe
 }
 type Car {
     id: ID!
     brand: String!
     color: String!
     doors: Int!
     type: CarTypes!
  }
  type Query {
    carsByType(type:CarTypes!): [Car]
    carsById(id:ID!): Car
  }
  type Mutation {
    insertCar(brand: String!, color: String!, doors: Int!, type:CarTypes!): [Car]!
  }
  type Subscription {
    carInserted: Car
  }
`);

// create the resolvers

const resolvers = {
  Query: {
    carsByType: (parent, args, context, info) => {
      return db.cars.filter(car => car.type === args.type);
    },
    carsById: (parent, args, context, info) => {
      return db.cars.filter(car => car.id === args.id)[0];
    }
  },
  Car: {
    brand: (parent, args, context, info) => {
      return db.cars.filter(car => car.brand === parent.brand)[0].brand;
    }
  },
  Mutation: {
    insertCar: (_, { brand, color, doors, type }) => {
      const id = Math.random().toString();
      const car = {
        id: id,
        brand: brand,
        color: color,
        doors: doors,
        type: type
      };
      db.cars.push(car);
      pubsub.publish("CAR_INSERTED", {
        carInserted: car
      });
      return db.cars;
    }
  },
  Subscription: {
    carInserted: {
      subscribe: () => pubsub.asyncIterator(["CAR_INSERTED"])
    }
  }
};
const server = new ApolloServer({
  typeDefs: schema,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`ðŸš€  Server ready at ${url}`);
});


// subscription{
//     carInserted{
//       id
//       color
//       brand
//       doors
//     }
//   }


// mutation{
//   insertCar(brand:"Nissan", color:"black", doors:4, type:SUV){
//     brand
//     color
//     id
//   }
// }