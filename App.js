const express = require("express");
const mongoose = require("mongoose");
const Routes = require("./API/routes/routes");


const app = express();
app.use(express.json());
// app.use(cors());
// app.use('/' , Routes)

const mongooseURL = "mongodb+srv://Moamen_server:falafel123321@cluster0.3pxcj.mongodb.net/"


mongoose.connect(mongooseURL);

mongoose.connection.on("connected", () => {
  console.log("mongo connected");
});



app.get("/", (req, res) => {
  res.status(200).json({
    message: "server live" 
  });
})

app.get("/getBtata", (req, res) => {
  res.status(200).json({
    name: "btata",
    age: 15,

  });
})

app.post("/whatsMyName", (req, res) => {
  const { name, LastName } = req.body

  if (!name && !LastName) {
    res.status(400).json({
      message: "please Enter ypur name and LastName"

    })
  }
  res.status(200).json({ message: "Hello " + name + " " + LastName })
})

app.post("/EnterAgeName", (req, res) => {
  const { age, name } = req.body

  if (age < 18) {
    res.status(400).json({
      message: "You are too young"

    })
  } else {
    res.status(200).json({
      message: "Welcome " + name
    })
  }

})

app.post("/NameandPassword", (req, res) => {
  const { name, password } = req.body

  if (name === "moamen" && password === "123") {
    res.status(200).json({
      message: "Welcome " + name
    })
  }
  else {
    res.status(400).json({
      message: "Name or password is incorrect"
    })
  }


})


app.post("/sum", (req, res) => {
  const { number1, number2 } = req.body

  if (number1 === undefined || number2 === undefined) {
    res.status(400).json({
      message: "fill numbers to sum"
    })
    return
  }

  res.status(200).json({
    message: number1 + number2
  })

})

app.post("/getAvg", (req, res) => {
  const { number1, number2, number3, number4, number5 } = req.body



  res.status(200).json({
    message: number1 + number2 + number3 + number4 + number5 / 5

  })


})

app.post("/getAvg2", (req, res) => {
  const { array } = req.body
  var sum = 0
  array.forEach(element => {
    sum += element
  });


  res.status(200).json({
    message: sum / array.length

  })


})

app.use("/", Routes);

module.exports = app;