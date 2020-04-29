const express = require("express")
const db = "accounts.json"

const Account = require("./models/account")

const app = express()

app.use(express.json())

app.get("Hello World!")

app.delete("/account/:id", async (req, res) => {
    try{
        await Account.deleteOne(req.params.id)

        res.send()
    }catch(err){
        res.status(400).send(err.message)
    }
})

app.get("/account/:id", async (req, res) => {
    try{
        const account = await Account.getById(req.params.id)

        res.send(account)
    }catch(err){
        res.status(400).send(err.message)
    }
})

app.post("/account", (req, res) => {
    try{
        const account = {
            name: req.body.name,
            balance: req.body.balance
        }

        const validatedAccount = Account.validate(account)

        const savedAccount = Account.save(validatedAccount)

        res.send(savedAccount)
    }catch(err){
        res.status(400).send(err.message)
    }
})

app.post("/account/withdraw", (req, res) => {
    try{
        const withdraw = {
            id: req.body.id,
            value: req.body.value
        }

        const account = Account.withdraw(withdraw)

        res.send(account)
    }catch(err){
        res.status(400).send(err.message)
    }
})

app.post("/account/deposit", (req, res) => {
    try{
        const deposit = {
            id: req.body.id,
            value: req.body.value
        }

        const account = Account.deposit(deposit)

        res.send(account)
    }catch(err){
        res.status(400).send(err.message)
    }
})

app.listen(3000, () => console.log(" Listening..."))