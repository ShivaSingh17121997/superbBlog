const express = require("express")
const bcrypt = require("bcrypt")
const { UserModel } = require("../backend/models/user.model")
const { connection } = require("./db")
const jwt = require("jsonwebtoken")
const { MyRouter } = require("./routes/post.route")
const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.json())
app.use("/blogs", MyRouter)



// register
app.post("/register"), async (req, res) => {

    const { Username, Avatar, Email, Password } = req.body;
    try {
        const user = await UserModel.findOne({ Email });
        if (user) {
            res.status(200).json({ msg: "User Already Existed,Please login in" })
        } else {
            bcrypt.hash(Password, 5, async (err, hash) => {
                if (err) {
                    res.status(400).json({ msg: err.message })
                } else {
                    let newUser = new UserModel({ Username, Avatar, Email, Password: hash })
                    await newUser.save();
                    res.status(200).json({ msg: "New User added ", newUser })
                }
            })
        }
    } catch (error) {
        res.status(200).json({ msg: error.message })
    }
}

// Login 

app.post("/login", async (req, res) => {


    const { Email, Password } = req.body;
    try {
        const user = await UserModel.findOne({ Email });
        if (user) {
            bcrypt.compare(Password, user.Password, async (err, result) => {
                if (result) {
                    let token = jwt.sign({ username: user.Username, userID: user._id }, "", {
                        expiresIn: "7d"
                    });
                    res.status(200).json({ msg: "Login Successful", token })
                } else if (err) {
                    res.status(400).json({ msg: err.message })
                }
            })
        } else {
            res.status(200).json({ msg: "User does not exist" })
        }
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})



app.listen(8080, async (req, res) => {
    console.log("RAm")
    try {
        await connection
        console.log(`db is connected now`)
    } catch (err) {
        console.log(err)
    }
    console.log(("Running at port 8080"))
})
