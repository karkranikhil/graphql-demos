const {graphql, buildSchema} = require('graphql')

const schema = buildSchema(`
    type Query{
        greeting(name:String):String
    }
`)

const resolvers=()=>{
    const greeting= args=>{
        return 'Hello '+ args.name
    }
    return { greeting };
}

const executeQuery =async()=>{
    const result = await graphql(
      schema,
      `
        {
          greeting(name: "Nik")
        }
      `,
      resolvers()
    );
    console.log(result);
}
executeQuery()