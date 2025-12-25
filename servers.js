import express from 'express'
import {readFromFile} from './io/readFile.js'
import {writeToFile} from './io/writeFile.js'
import {checkExist} from './utils/check.js'


const app = express();
const port = 3000;
app.use(express.json())

const locationEvents = './data/events.json'
const locationReceipts = './data/receipts.json'
const locationUsers = './data/users.json'



app.post('/user/register', async (req,res) => {
    const user = req.body
    try {
        const data = await readFromFile(locationUsers);
        console.log(data);
        
        const check = checkExist(data,user.username);
        if(!check) {
            data.push(user)
            writeToFile(data,locationUsers)
            res.json({"message": "User registered successfully"})
        } else {
            res.json({"message" : "User already exists in the system"})
        }
    } catch (err) {
        console.error(err);
        res.json({error:"Server problem"})   
    }
})


app.














app.listen(port, ()=>{
    console.log("server run.. ; http://localhost:3000");
})