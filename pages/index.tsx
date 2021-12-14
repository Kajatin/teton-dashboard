import Head from 'next/head'
import useSWR from 'swr'
import styles from '../styles/Home.module.css'
import Device from '../components/device'

export default function Home() {
    const { data, error, mutate, isValidating } = useSWR('/api/devices', url => fetch(url).then(r => r.json()), { refreshInterval: 10000 })

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return (
        <>
            <Head>
                <title>Teton Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
                <link href='https://fonts.googleapis.com/css?family=Noto Sans' rel='stylesheet' />
            </Head>

            <main>
                <div className={styles.grid}>
                    {
                        data?.sort((lhs, rhs) => {
                            if (lhs.device_name.toLowerCase() < rhs.device_name.toLowerCase()) return -1
                            if (lhs.device_name.toLowerCase() > rhs.device_name.toLowerCase()) return 1
                            return 0
                        }).map(device => {
                            return <Device key={device.id} device={device} />
                        })
                    }
                </div>
            </main>
        </>
    )
}
