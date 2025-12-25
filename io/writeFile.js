import {promises as fs} from 'fs'


export async function writeToFile(data, location){
    try {

    await fs.writeFile(location,JSON.stringify(data,null, 2))
    console.log("The save was successful.");
    
    } catch (err) {
        console.error("ERROR", err);
    }
}