import styles from "./labelvalue.module.scss"

interface LabelValueProps {
    label: string
    value: string
}
const LabelValue = ({ label, value }: LabelValueProps) => {
    return (
        <div className={styles.label__value__container}>
            <span>{label}</span>
            <span>{value}</span>
        </div>
    )
}

export default LabelValue
