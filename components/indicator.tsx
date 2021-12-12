import styles from '../styles/Indicator.module.css'

export default function Indicator(props: { percentage: number }) {
    let color = '#6ACE8C' 
    if (50 < props.percentage && props.percentage < 70) {
        color = '#F4BB66'
    }
    else if (70 <= props.percentage) {
        color = '#F47F66'
    }

    return (
        <div className={styles.indicator}>
            <div className={styles.icon}>
            </div>
            <div className={styles.bar}>
                <div className={styles.amount} style={{
                    width: `${props.percentage}%`,
                    background: color
                }}/>
            </div>
        </div>
    )
}