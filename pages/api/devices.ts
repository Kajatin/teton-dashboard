import { getBalenaDevicesForFleet } from '../../lib/api'

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(404).end();

    const devices = await getBalenaDevicesForFleet()
    
    res.status(200).json(devices)
}