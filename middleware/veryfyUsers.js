import {readFromFile} from '../io/readFile.js'

const location = './data/users.json' 

export async function PermissionCheck(req,res,next) {
    const User = req.headers['x-username']
    const pass = req.headers['x-password']
    console.log(User);
    console.log(pass);
    try {
        const data = await readFromFile(location)
        for(const user of data) {
            console.log(user);
            
            if (user.username === User && user.password === pass) {
                next()
                res.json({msg:"successful"})
            }
        }
        res.json({error: "No permissions"})
    } catch (err) {
        console.error(err);
        res.json({err:err})
    }
}