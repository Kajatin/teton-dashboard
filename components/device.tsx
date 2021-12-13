import Link from 'next/link'
import Indicator from './indicator'
import styles from '../styles/Device.module.css'
import IDevice from '../types/IDevice'
import { getDeviceEnvironmentVariables } from '../lib/api'
import React, { useState } from 'react';

export default function Device(props: { device: IDevice }) {
    const [roomBed, setRoomBed] = useState("0.0");

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

        setRoomBed(`${roomNo}.${bedNo}`)
    })

    const openLiveFeedForDevice = () => {
        const url = `https://data-tinder.vercel.app/live-feed?bedName=${roomBed}`
        window.open(url, "_blank")
    }

    return (
        // <Link href={`/device/${props.device?.id}`}>
            <div className={styles.card}>
                <div className={styles.topbar}>
                    <div className={styles.connection}>
                        <div className={props.device?.is_online ? styles.dotonline : styles.dotoffline}></div>
                        <div className={styles.status}>
                            {props.device?.is_online ? "Online" : "Offline"}
                        </div>
                    </div>
                    <div className={styles.second_row}>
                        <div className={styles.name}>{props.device?.device_name}</div>
                        <div className={styles.bed}>
                            <div className={styles.pillow} />
                            <div className={styles.matress}>
                                {roomBed}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.controls}>
                        <div className={styles.release}>
                            v0.12.1+rev1
                        </div>
                        <div className={styles.buttons}>
                            <button className={styles.button} onClick={openLiveFeedForDevice}>🎥</button>
                            <Link href={`/device/${props.device?.id}`}>
                                <button className={styles.button}>⌥</button>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.indicators}>
                        <Indicator percentage={props.device?.cpu_usage}/>
                        <Indicator percentage={props.device?.memory_usage / props.device?.memory_total * 100}/>
                        <Indicator percentage={props.device?.cpu_temp}/>
                    </div>
                </div>
            </div>
        // </Link>
    )
}