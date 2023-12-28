import { LegacyRef, forwardRef } from 'react'
import styles from './uploader.module.scss'

const Uploader = forwardRef(function Uploader(
    props: {
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    },
    ref: LegacyRef<HTMLInputElement>,
) {
    return (
        <input
            onChange={props.onChange}
            className={styles.uploader__input}
            ref={ref}
            type="file"
            accept="jgp|png|pdf"
        />
    )
})

export default Uploader
