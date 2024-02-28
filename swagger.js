const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "Recipe",
  },
  host: "cse-341project2.onrender.com",
  schemes: ["https"],
};
// cse-341project2.onrender.com
// on auth0
// https://cse-341project2.onrender.com/callback

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });

// command to run to generate swagger.json
