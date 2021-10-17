import styles from '../styles/Device.module.css'
import IDevice from '../types/IDevice'

export default function Device(props: { device: IDevice }) {
    return (
        <div className={styles.card}>
            <h1>{props.device?.device_name}</h1>
            <p>{props.device?.is_online ? "Online" : "Offline"}</p>
        </div>
    )
}