import { getBalenaDeviceById } from '../../lib/api'

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(404).end();

    const { id } = req.query
    const device = await getBalenaDeviceById(id)

    res.status(200).json(device)
}