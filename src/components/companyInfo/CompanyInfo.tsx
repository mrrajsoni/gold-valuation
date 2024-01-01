import Image from 'next/image'
import BankInfo from './BankInfo'
import KalyanJewel from '../../../public/images/Kalyan_Jewellers_logo.png'
import styles from './companyInfo.module.scss'

interface CompanyInfoProps {
    branchName: string
}
const CompanyInfo = ({ branchName }: CompanyInfoProps) => {
    return (
        <section
            className={`${styles.company__info__wrapper} flex justify-between gap-4`}
        >
            <BankInfo branch={branchName} />
            <CompanyLogo />
            <CompanyDetails />
        </section>
    )
}

const CompanyLogo = () => {
    return (
        <Image
            className={styles.company__logo}
            width={200}
            src={KalyanJewel}
            alt="Company-logo"
        />
    )
}

const CompanyDetails = () => {
    return (
        <div className="text-end">
            <div className="flex flex-col mb-2">
                <h3>Kalyan Jewellers</h3>
                <span>Goldsmith and Valuers</span>
            </div>
            <div className="flex flex-col gap-2">
                <span>Shop no.4, Manpada Road, Dombivali(E), Mumbai</span>
                <span>Mobile - 8097753677</span>
                <span>Email - goldvaluation@gmail.com</span>
            </div>
        </div>
    )
}

export default CompanyInfo
