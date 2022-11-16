import { getOne } from "../model/db.js";

async function getOneUser() {
    const result = await getOne('17f336b6-e274-477a-bab6-7b9ca7a113c2')
    console.log(result)
}

getOneUser()