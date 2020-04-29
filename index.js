const express = require("express")

const app = express()

app.get("Hello World!")

app.listen(3000, () => console.log(" Listening..."))