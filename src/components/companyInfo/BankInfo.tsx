import Image from 'next/image'
import styles from './companyInfo.module.scss'
import PNBBank from '../../../public/images/Punjab_National_Bank_new_logo.png'

const BankInfo = () => {
    return (
        <div className={`${styles.bank__info}`}>
            <Image width={200} src={PNBBank} alt="Bank-logo" />
            <div className={`${styles.branch__container} flex gap-2`}>
                <span>Branch: </span>
                <span>Pimpri</span>
            </div>
        </div>
    )
}

export default BankInfo
