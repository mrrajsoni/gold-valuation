import Image from 'next/image'
import styles from './companyInfo.module.scss'
import PNBBank from '../../../public/images/Punjab_National_Bank_new_logo.png'
import LabelValue from '../labelValue/LabelValue'

const BankInfo = () => {
    return (
        <div className={`${styles.bank__info} flex gap-2 flex-col`}>
            <Image width={200} src={PNBBank} alt="Bank-logo" />
            <LabelValue showDots label="Branch" value="Pimpri" />
        </div>
    )
}

export default BankInfo
