import { getBalenaDevicesForFleet } from '../../../lib/api'

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(404).end();

    const { cookies } = req;
    
    if (!cookies['authorization']) return res.status(401).end();

    const devices = await getBalenaDevicesForFleet(undefined, cookies['authorization'])
    
    res.status(200).json(devices)
}