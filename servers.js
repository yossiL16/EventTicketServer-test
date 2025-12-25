import express from 'express'
import {readFromFile} from './io/readFile.js'
import {writeToFile} from './io/writeFile.js'
import {checkExist} from './utils/check.js'
import {PermissionCheck} from './middleware/veryfyUsers.js'


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


app.post('/creator/events', PermissionCheck, async (req,res) => {
    const event = req.body;
    try {
        const data = await readFromFile(locationEvents);
        const newEvent = {
            eventName : event.eventName,
            ticketsForSale : event.ticketsForSale,
            username : event.username,
            password : event.password
        };
        data.push(newEvent);
        writeToFile(data, locationEvents);
        res.json({"message": "Event created successfully"});
    } catch (err) {
        console.error(err);
        res.json({err:err});
    };
});



app.post('/users/tickets/buy', PermissionCheck, async (req,res) => {
    const ticket = req.body
    try {
        const dataOfEvent = await readFromFile(locationEvents);
        const dataOfReceipts = await readFromFile(locationReceipts);

        for (const event of dataOfEvent) {
            if (event.eventName === ticket.eventName){
                if(Number(event.ticketsForSale) >= Number(ticket.quantity)){
                    event.ticketsForSale -= Number(ticket.quantity)
                    writeToFile(dataOfEvent, locationEvents)
                    const newTicket = {
                        username: ticket.username,
                        eventName : eventName,
                        ticketsBought: ticket.quantity
                    } 
                    dataOfReceipts.push(newTicket)
                    writeToFile(dataOfReceipts, locationReceipts)
                    res.json({"message": "Tickets purchased successfully"})
                }
                else {
                    res.json({"message": "There are not enough tickets to buy."})
                }
            } 
        }
        res.json({"message": "No such event exists"})

    } catch (err) {
        console.error(err);
        res.json({err:err})
    }
}) 



app.get('/users/:username/summary', async (req,res) => {

    const name = req.params.username;
    try {
        const receipts = readFromFile(locationReceipts);
        const ticketsOfUser = receipts.filter((ticket) => ticket.username === name);
        if(ticketsOfUser.length < 1) {
            res.json({
                "totalTicketsBought":0,
                "events":[],
                "averageTicketsPerEvent":0
            })
        } else {
            const total = ticketsOfUser.length
            listEvents = []
            const totalTickets = 0
            for(const event of ticketsOfUser){
                listEvents.push(event.eventName)
                listEvents += Number(ticketsBought)
            }
            const avarge = totalTickets / total

            res.json({
                "totalTicketsBought": total,
                "events" : listEvents,
                "averageTicketsPerEvent" : avarge
            }) 
        }
    } catch(err) {
        console.error(err);
        res.send(err)  
    }
})











app.listen(port, ()=>{
    console.log(`server run.. ; http://localhost:${port}`);
})

