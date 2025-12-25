import {promises as fs} from 'fs'


export async function readFromFile(location) {
    try {
         const data = await fs.readFile(location);
         const jsonData = JSON.parse(data)
         return jsonData
    } catch (err) {
        console.error('ERROR', err);  
    }
}