'use client'

import InvoiceInput from '@/components/input/InvoiceInput'
import { replicacheInstance } from '@/utils/replicacheClient'
import { useEffect, useState } from 'react'

const CustomerMobile = ({ mobile }: { mobile: string }) => {
    const [customerMobile, setCustomerMobile] = useState(mobile)

    useEffect(() => {
        setCustomerMobile(mobile)
    }, [mobile])
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newNumber = event.target.value
        replicacheInstance?.mutate.customerMobile({
            customerMobile: newNumber,
        })
        setCustomerMobile(newNumber)
    }
    return (
        <InvoiceInput
            showBorder
            placeHolder="Customer Mobile"
            value={customerMobile}
            onChange={handleOnChange}
        />
    )
}

export default CustomerMobile
