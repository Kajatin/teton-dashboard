import { getDeviceEnvironmentVariables } from '../../../lib/api'

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(404).end();

    const { id } = req.query
    const { cookies } = req;

    if (!cookies['authorization']) return res.status(401).end();
    
    const envVars = await getDeviceEnvironmentVariables(id, cookies['authorization'])

    res.status(200).json(envVars)
}