import Cookies from 'js-cookie';

async function fetchAPI(url: string, auth: string = undefined, method: string = 'GET', query: string = undefined, { variables }: any = {}) {
    const headers = {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_BALENA_API_TOKEN
        'Authorization': 'Bearer ' + auth
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

export async function getBalenaFleetByName(name: string = "Nightingale-NFS", auth: string = undefined) {
    const url = 'https://api.balena-cloud.com/v6/application?\$filter=app_name eq \'' + name + '\''

    const data = await fetchAPI(url, auth)
    return data.d[0]
}

export async function getBalenaFleetIdByName(name: string = "Nightingale-NFS", auth: string = undefined) {
    const fleet = await getBalenaFleetByName(name, auth)
    return fleet?.id
}

export async function getBalenaDevicesForFleet(fleet: number = undefined, auth: string = undefined) {
    if (!fleet) {
        fleet = await getBalenaFleetIdByName("Nightingale-NFS", auth)
    }

    const url = 'https://api.balena-cloud.com/v6/device?\$filter=belongs_to__application eq ' + fleet

    const data = await fetchAPI(url, auth)
    return data.d
}

export async function getBalenaDeviceById(id: number, auth: string = undefined) {
    const url = `https://api.balena-cloud.com/v6/device(${id})`

    const data = await fetchAPI(url, auth)
    return data.d[0]
}

export async function getDeviceEnvironmentVariables(device: number, auth: string = undefined) {
    const url = 'https://api.balena-cloud.com/v6/device_environment_variable?\$filter=device eq ' + device

    const data = await fetchAPI(url, auth)
    return data.d
}

export async function getBalenaReleaseById(id: number, auth: string = undefined) {
    const url = `https://api.balena-cloud.com/v6/release(${id})`

    const data = await fetchAPI(url, auth)
    return data.d[0]
}