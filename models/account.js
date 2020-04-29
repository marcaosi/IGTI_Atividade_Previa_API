const fs = require("fs")
const promisify = require("util").promisify
const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)
const pathDB = "./accounts.json"

const save = async (account) => {
    let db = await readFile(pathDB)
    db = JSON.parse(db)

    account.id = db.nextId++

    db.accounts.push(account)

    writeFile(pathDB, JSON.stringify(db))


    return account
}

const getById = async (id) => {
    let db = await readFile(pathDB)
    db = JSON.parse(db)

    const account = db.accounts.filter(acc => parseInt(acc.id) === parseInt(id))

    if(account.length == 0){
        throw new Error("Account not found")
    }

    return account[0]
}

const deposit = async (deposit) => {

    if(deposit.validate <= 0){
        throw new Error("Deposit value not accepted.")
    }
    let db = await readFile(pathDB)
    db = JSON.parse(db)

    let account = db.accounts.filter(acc => parseInt(acc.id) === parseInt(deposit.id))

    
    if(account.length == 0){
        throw new Error("Account not found.")
    }
    
    account = account[0]
    
    account.balance += deposit.value

    await writeFile(pathDB, JSON.stringify(db))

    return account
}

const withdraw = async (withdraw) => {

    if(withdraw.validate <= 0){
        throw new Error("withdraw value not accepted.")
    }
    let db = await readFile(pathDB)
    db = JSON.parse(db)

    let account = db.accounts.filter(acc => parseInt(acc.id) === parseInt(withdraw.id))

    
    if(account.length == 0){
        throw new Error("Account not found.")
    }
    
    account = account[0]
    
    account.balance -= withdraw.value

    await writeFile(pathDB, JSON.stringify(db))

    return account
}

const deleteOne = async (id) => {
    let db = await readFile(pathDB)
    db = JSON.parse(db)

    const newAccounts = db.accounts.filter(acc => parseInt(acc.id) !== parseInt(id))

    db.accounts = newAccounts

    await writeFile(pathDB, JSON.stringify(db))
}

const validate = (account) => {
    if(account.name == "" || !account.name){
        throw new Error("Field name is required.")
    }

    const balance = parseFloat(account.balance)

    if(!balance){
        throw new Error("Field balance is required.")
    }

    account.balance = balance

    return account
}

module.exports = {
    save, validate, deposit, withdraw, getById, deleteOne
}