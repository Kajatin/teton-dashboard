import Link from 'next/link'
import styles from '../styles/Device.module.css'
import IDevice from '../types/IDevice'
import { getDeviceEnvironmentVariables } from '../lib/api'

export default function Device(props: { device: IDevice }) {
    const openLiveFeedForDevice = () => {
        getDeviceEnvironmentVariables(props.device?.id).then(envVars => {
            var roomNo: number = -1
            var bedNo: number = -1
            envVars.map((envVar) => {
                const { name, value } = envVar
                if (name == 'TETON_ROOM_NO')
                    roomNo = value
                if (name == 'TETON_BED_NO')
                    bedNo = value
            })

            const url = `https://data-tinder.vercel.app/live-feed?bedName=${roomNo}.${bedNo}`
            window.open(url, "_blank")
        })
    }

    return (
        <Link href={`/device/${props.device?.id}`}>
            <div className={styles.card}>
                <h1>{props.device?.device_name}</h1>
                <p>{props.device?.is_online ? "Online" : "Offline"}</p>
                <p>{props.device?.cpu_temp}</p>
                <button className={styles.button} onClick={openLiveFeedForDevice}>Live feed</button>
            </div>
        </Link>
    )
}