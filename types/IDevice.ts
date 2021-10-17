export default interface IDevice {
    id: number,
    cpu_temp?: number
    cpu_usage?: number
    download_progress?: number
    memory_total?: number
    memory_usage?: number
    storage_total?: number
    storage_usage?: number
    created_at?: string
    device_name?: string
    api_heartbeat_state?: string
    note?: string
    status?: string
    uuid?: string
    is_online?: boolean
    is_active?: boolean
    is_connected_to_vpn?: boolean

    // is_running__release
    // should_be_running__release
}