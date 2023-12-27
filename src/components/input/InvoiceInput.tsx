import styles from './input.module.scss'

interface InvoiceInputProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    value: string | number
    label?: string
    extraClass?: string[]
    type?: string
}
const InvoiceInput = ({
    extraClass,
    value,
    label,
    type = 'text',
    onChange,
}: InvoiceInputProps) => {
    const showLabel = Boolean(label)
    return (
        <>
            {showLabel && <span className="input__label">{label}</span>}
            <input
                value={value}
                onChange={onChange}
                className={`${styles.invoice__input} ${
                    extraClass?.length && styles[extraClass[1]]
                }`}
                type={type}
            ></input>
        </>
    )
}

export default InvoiceInput
