async function fetchAPI(url: string, method: string = 'GET', query: string = null, { variables }: any = {}) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_BALENA_API_TOKEN
    }

    // Interact with the Balena API
    const res = await fetch(url, {
        method: method,
        headers,
        // body: JSON.stringify({
        //     query,
        //     variables
        // })
    })

    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }

    return json
}

export async function getBalenaFleetByName(name: string = "Nightingale-NFS") {
    const url = 'https://api.balena-cloud.com/v6/application?\$filter=app_name eq \'' + name + '\''

    const data = await fetchAPI(url)
    return data.d[0]
}

export async function getBalenaFleetIdByName(name: string = "Nightingale-NFS") {
    const fleet = await getBalenaFleetByName(name)
    return fleet.id
}

export async function getBalenaDevicesForFleet(fleet: number = null) {
    if (!fleet) {
        fleet = await getBalenaFleetIdByName()
    }

    const url = 'https://api.balena-cloud.com/v6/device?\$filter=belongs_to__application eq ' + fleet

    const data = await fetchAPI(url)
    console.log(data.d)
    return data.d
}
