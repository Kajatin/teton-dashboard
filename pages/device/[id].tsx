import { useRouter } from 'next/router'
import useSWR from 'swr'

export default function Detail() {
    const router = useRouter()
    const { id } = router.query

    const { data, error, mutate, isValidating } = useSWR(`/api/get/device?id=${id}`, url => fetch(url).then(r => r.json()), { refreshInterval: 10000 })

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return (
        <>
            <p>id: {data.id}</p>
            <p>device_name: {data.device_name}</p>
            <p>cpu_temp: {data.cpu_temp}</p>
            <p>cpu_usage: {data.cpu_usage}</p>
            <p>download_progress: {data.download_progress || "complete"}</p>
            <p>is_active: {data.is_active ? "active" : "inactive"}</p>
            <p>is_online: {data.is_online ? "online" : "offline"}</p>
            <p>is_connected_to_vpn: {data.is_connected_to_vpn ? "yes" : "no"}</p>
            <p>api_heartbeat_state: {data.api_heartbeat_state}</p>
            <p>is_running__release: {data.is_running__release.__id}</p>
            <p>last_connectivity_event: {data.last_connectivity_event}</p>
            <p>last_vpn_event: {data.last_vpn_event}</p>
            <p>memory_total: {data.memory_total}</p>
            <p>memory_usage: {data.memory_usage}</p>
            <p>modified_at: {data.modified_at}</p>
            <p>note: {data.note || "empty"}</p>
            <p>os_variant: {data.os_variant}</p>
            <p>os_version: {data.os_version}</p>
            <p>should_be_operated_by__release: {data.should_be_operated_by__release.__id}</p>
            <p>should_be_running__release: {data.should_be_running__release || "unset"}</p>
            <p>status: {data.status}</p>
            <p>storage_total: {data.storage_total}</p>
            <p>storage_usage: {data.storage_usage}</p>
            <p>supervisor_version: {data.supervisor_version}</p>
            <p>uuid: {data.uuid}</p>
        </>
    )
}