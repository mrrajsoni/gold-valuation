import Image from 'next/image'
import styles from './companyInfo.module.scss'
import PNBBank from '../../../public/images/Punjab_National_Bank_new_logo.png'
import LabelValue from '../labelValue/LabelValue'
import { useEffect, useState } from 'react'

const BankInfo = ({ branch }: { branch: string }) => {
    const [branchName, setBranchName] = useState(branch ?? 'Pimpri')
    useEffect(() => {
        setBranchName(branch)
    }, [branch])
    return (
        <div className={`${styles.bank__info} flex gap-2 flex-col`}>
            <Image width={200} src={PNBBank} alt="Bank-logo" />
            <LabelValue showDots label="Branch" value={branchName} />
        </div>
    )
}

export default BankInfo
