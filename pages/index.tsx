import Head from 'next/head'
import useSWR from 'swr'
import styles from '../styles/Home.module.css'
import Device from '../components/device'

export default function Home() {
    const { data, error, mutate, isValidating } = useSWR('/api/get/devices', url => fetch(url).then(r => {
        if (!r.ok) {
            const error = new Error('An error occurred while fetching the data.')
            error['status'] = r.status
            throw error
        }

        return r.json()
    }), { refreshInterval: 10000 })

    const refreshPage = () => {
        window.location.reload();
    }

    if (error) return (
        <>
            <Head>
                <title>Teton Dashboard - Error</title>
                <link rel="icon" href="/favicon.ico" />
                <link href='https://fonts.googleapis.com/css?family=Noto Sans' rel='stylesheet' />
            </Head>

            <main>
                <div className={styles.error_overlay}>
                    <div className={styles.error} style={ error.status == 401 ? {'max-width': '30em'} : {} }>
                        <div className={styles.redbar} />
                        <div className={styles.error_body}>
                            <div className={styles.oops}>
                                { error.status == 401 ? 'Unauthorized!' : 'Oops!' }
                            </div>
                            <div className={styles.wronghere}>
                                { error.status == 401 ? 'You don\'t have the authorization to access this page.' : 'Something\'s wrong here...' }
                            </div>
                            <div className={styles.explanation}>
                                { error.status == 401 ? 'Our administrators have been notified about this incident.' : 'Could not fetch information about the devices from the Balena servers.' }
                            </div>
                            <div className={styles.contact}>
                                { error.status == 401 ? 'If you believe you should have access, ' : 'Should the issue persist, ' }
                                contact us at <a href="mailto:roland@teton.ai">roland@teton.ai</a>.
                            </div>
                            <button className={styles.button} style={ error.status == 401 ? {visibility: 'hidden'} : {} } onClick={refreshPage}>
                                <b>RELOAD</b>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )

    if (!data) return (
        <>
            <Head>
                <title>Teton Dashboard - Loading</title>
                <link rel="icon" href="/favicon.ico" />
                <link href='https://fonts.googleapis.com/css?family=Noto Sans' rel='stylesheet' />
            </Head>

            <main>
                <div className={styles.lds_ellipsis}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </main>
        </>
    )

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
