import { getBalenaDevicesForFleet } from '../../../lib/api'

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(404).end();

    // console.log(req);

    // if (!cookies['authorization']) return res.status(401).end();

    // const devices = await getBalenaDevicesForFleet(undefined, cookies['authorization'])

    const headers = {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_BALENA_API_TOKEN
        // 'Authorization': 'Bearer ' + auth
    }

    const url = process.env.NEXT_PUBLIC_SLACK_URL

    // Interact with the Balena API
    const res2 = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            "blocks": [{ "type": "section", "text": { "type": "mrkdwn", "text": "*KMC Devices*" } }, { "type": "section", "text": { "type": "mrkdwn", "text": ":large_green_circle: <https://google.com|1423721037950> CPU@32% RAM@64% T@65C\n:red_circle: <https://google.com|1420122041572> CPU@36% RAM@62% T@63C" } }, { "type": "divider" }, { "type": "section", "text": { "type": "mrkdwn", "text": "*NFS Devices*" } }, { "type": "section", "text": { "type": "mrkdwn", "text": ":large_green_circle: <https://google.com|10.1> CPU@32% RAM@64% T@65C\n:large_green_circle: <https://google.com|10.2> CPU@36% RAM@62% T@63C" } }]
        })
    })

    // const json = await res2.json()
    // if (json.errors) {
    //     console.error(json.errors)
    //     throw new Error('Failed to fetch API')
    // }
    // console.log(json);

    res.status(200).json({})
}
