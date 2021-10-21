import { getBalenaFleetByName } from '../../lib/api'

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(404).end();

    const fleet = await getBalenaFleetByName()
    
    res.status(200).json(fleet)
}