import Head from 'next/head'
import useSWR from 'swr'
import styles from '../styles/Home.module.css'
import Device from '../components/device'
import { getBalenaDevicesForFleet } from '../lib/api'

export default function Home() {
    const { data, error, mutate, isValidating } = useSWR('/api/devices', url => fetch(url).then(r => r.json()), { refreshInterval: 10000 })

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return (
        <>
            <Head>
                <title>Teton Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div className={styles.grid}>
                    {
                        data?.map(device => {
                            return <Device key={device.id} device={device} />
                        })
                    }
                </div>
            </main>
        </>
    )
}
