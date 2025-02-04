const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const Employee = require("./models/Employee.js");

mongoose
  .connect("mongodb://127.0.0.1:27017/company")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.static("views"));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  res.render("index", { foo: "FOO" });
});


const getrandom=(arr)=>{
let rno=Math.floor(Math.random()*(arr.length-1))
return arr[rno]

}
app.get("/generate", async (req, res) => {
    let randomnames=["Mrunal","Rohan","Aayush","Sheyash"]
    let randomLang=["Java","Python","C/C++"]
    let randomcity=["Mumbai","Pune","Hydrabada"]
  try {
    for (let index = 0; index < 10; index++) {
      await Employee.create({
        name: getrandom(randomnames),
        salary: Math.floor(Math.random()*10000),
        language: getrandom(randomLang),
        city: getrandom(randomcity),
        isManager: (Math.random()>0.5?true:false)
      });
    }
    console.log("✅ 10 employees added successfully!");
    res.json({ success: true, message: "Data inserted successfully!" }); 
  } catch (error) {
    console.error("❌ Error inserting data:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error inserting data",
        error: error.message,
      });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
