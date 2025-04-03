const http = require("http");
const app = require("./app");
const {initializeSocket} = require("./socket")
const server = http.createServer(app);
const port = process.env.PORT||3000;
initializeSocket(server);
server.listen(3000,()=>{
    console.log("Server Started")
})