const { graphql, buildSchema } = require("graphql");

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
const schema = buildSchema(` 
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
`);


// create the resolvers
const resolvers = () => {
  const carsByType = args => {
    return db.cars.filter(car => car.type === args.type);
  };
  const carsById = args => {
    return db.cars.filter(car => car.id === args.id)[0];
  };
  const insertCar = ({ brand, color, doors, type }) => {
    db.cars.push({
      id: Math.random().toString(),
      brand: brand,
      color: color,
      doors: doors,
      type: type
    })
    return db.cars
  }
  return { carsByType, carsById, insertCar };
};
// execute the queries
const executeQuery = async () => {
  const queryByType = `
     {
      carsByType(type:Sedan){
            brand
            color
            type
            id
         }
     }
    `;
  const queryByID = `
    {
       carsById(id:"a"){
           brand
           type
           color
           id
        }
    }
   `;
    const mutationQuery = `
       mutation{
           insertCar(brand:"Nissan", color:"Black", doors:4, type:SUV){
              brand
              color
              id
              type
           }
        }
   `;
 
 const mutationWithVariables = `
  mutation insertCar($brand: String!, $color: String!, $doors:Int!, $type: CarTypes!){
    insertCar(brand: $brand, color: $color, doors: $doors, type: $type){
        brand
        color
        id
     }
   }
   
  `;
  // const responseOne = await graphql(schema, queryByType, resolvers());
  // console.log(responseOne);
  // const responseTwo = await graphql(schema, queryByID, resolvers());
  // console.log(responseTwo);
//   const responseThree = await graphql(schema, mutationQuery, resolvers());
//   console.log(responseThree.data.insertCar);
//  // console.log(db.cars);



 const responseFour= await graphql(
   schema,
   mutationWithVariables,
   resolvers(),
   null,
   {
     brand: "Nissan",
     color: "Black",
     doors: 4,
     type: "SUV"
   }
 );
 console.log(responseFour.data);
};
executeQuery();
