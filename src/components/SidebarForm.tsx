import { replicacheInstance } from '@/utils/replicacheClient'
import InvoiceInput from './input/InvoiceInput'
import { useEffect, useState } from 'react'

export type formData = {
    goldRate: string
    branchName: string
    customerName: string
    customerMobile: string
    customAddress: string
}
const SidebarForm = ({
    formData,
    handleFormData,
}: {
    formData: formData
    handleFormData: (newFormData: formData) => void
}) => {
    const handleGoldRateChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const newGoldRate = event.target.value
        replicacheInstance?.mutate.goldRate({
            goldRate: newGoldRate,
        })
        handleFormData({
            ...formData,
            goldRate: newGoldRate,
        })
    }
    const handleBranchNameChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const newBranchName = event.target.value
        replicacheInstance?.mutate.addBranchName({
            branchName: newBranchName,
        })
        handleFormData({
            ...formData,
            branchName: newBranchName,
        })
    }

    const handleCustomerNameChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const newCustomerName = event.target.value
        replicacheInstance?.mutate.customerName({
            customerName: newCustomerName,
        })
        handleFormData({
            ...formData,
            customerName: newCustomerName,
        })
    }

    const handleCustomerMobileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const newMobile = event.target.value
        replicacheInstance?.mutate.customerMobile({
            customerMobile: newMobile,
        })
        handleFormData({
            ...formData,
            customerMobile: newMobile,
        })
    }
    return (
        <div className="sidebar__form__container">
            <div>
                <InvoiceInput
                    label="Todays gold rate"
                    onChange={handleGoldRateChange}
                    value={formData.goldRate}
                    showBorder
                />
            </div>
            <div>
                <InvoiceInput
                    label="Branch Name"
                    onChange={handleBranchNameChange}
                    value={formData.branchName}
                    showBorder
                />
            </div>
            <div>
                <InvoiceInput
                    label="Customer Name"
                    onChange={handleCustomerNameChange}
                    value={formData.customerName}
                    showBorder
                />
            </div>
            <div>
                <InvoiceInput
                    label="Customer Mobile"
                    onChange={handleCustomerMobileChange}
                    value={formData.customerMobile}
                    showBorder
                />
            </div>
        </div>
    )
}
export default SidebarForm
