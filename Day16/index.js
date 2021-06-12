const express = require("express");                            // import express
const app = express();                                        // put the express function in a variable
const bodyparser = require("body-parser");                   // import bodyparser
//Body-Parse => it is use to convert datatype.

const userRoutes = require('./routes/user-routes');                             // importing Your own modulues which we make
const adminRoutes = require('./routes/admin-routes');                           // importing Your own modulues which we make
const HttpError = require('./utils/http-error');

// configuration statements
const port = 3000;
app.use(bodyparser.json());

// Routing => the way in which the client requests are handled by the application endpoints

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', adminRoutes);

// Error handaling
 app.use((error, req, res, next) => {
     res.status(error.code);
     res.json({message: error.message || 'umknow error occured' , code: error.code});
 });

// Methods
// GET => GET is used to request data from a specified resource.
// POST => POST is used to send data to a server to create/update a resource.
// PUT =>  PUT is used to send data to a server to create/update a resource.
// HEAD => HEAD is almost identical to GET, but without the response body.
// DELETE => The DELETE method deletes the specified resource.



//Method
// app.get("/about", (req, res) => {
//   res.send(JSON.stringify({ page: "About", meassage: "This is a about page" }));
// });

// app.post("/Login", (req, res) => {
//     res.send(JSON.stringify({ page: "Login", meassage: "Please submit your credentials!!" }));
// });

app.listen(port, () =>
     console.log(`App running on http://localhost:${port}`)
);
