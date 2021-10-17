import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Device from '../components/device'
import { getBalenaDevicesForFleet } from '../lib/api'

export default function Home({ devices }) {
    return (
        <>
            <Head>
                <title>Teton Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div className={styles.grid}>
                    {
                        devices?.map(device => {
                            return <Device key={device.id} device={device} />
                        })
                    }
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    const devices = await getBalenaDevicesForFleet()
  
    return {
      props: { devices }, // will be passed to the page component as props
    }
  }
