import { type Doc, type APISpaceXResponse } from "./../types/api"

export const getLaunchBy = async ( {id}: {id: string} ) => {
    try {
        const res = await fetch (`https://api.spacexdata.com/v5/launches/${id}`)
        
        console.log(id)
        
        if (!res.ok) {
            throw new Error(`Error al obtener el lanzamiento. Estado HTTP: ${res.status}`);
        }
        
        const launch = (await res.json()) as Doc
        
        console.log(launch)
        
        return launch
        
    } catch (error) {
        console.error('Error al obtener lanzamiento:', error);
        
        throw error;
    }
}
export const getLatestLaunches = async () => {

    const res = await fetch("https://api.spacexdata.com/v5/launches/query", {
        
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        query: {},
        options: {
        sort: {
            date_unix: "asc",
        },
        limit: 30,
        },
    }),
    });
    
    //const data = JSON.stringify(await res.json())
        
    //console.log(data)
    
    console.log("latest launch")
    
    const { docs: launches } = await res.json() as APISpaceXResponse

    return launches
}

