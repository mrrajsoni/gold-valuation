import styles from './labelvalue.module.scss'

interface LabelValueProps {
    label: string
    value: string
    showDots?: boolean
}
const LabelValue = ({ label, value, showDots = false }: LabelValueProps) => {
    return (
        <div className={styles.label__value__container}>
            <span>{label}</span>
            {showDots && ':'}
            <span style={{ marginInlineStart: showDots ? 4 : 0 }}>{value}</span>
        </div>
    )
}

export default LabelValue
