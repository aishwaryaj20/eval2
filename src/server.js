const app = require("./index")

const connect =require("./configs/db")

app.listen(1212, async function () {
   await connect() 
    console.log("listening port 1212")
    });
    