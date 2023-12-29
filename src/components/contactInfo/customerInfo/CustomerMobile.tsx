'use client'

import InvoiceInput from '@/components/input/InvoiceInput'
import { useState } from 'react'

const CustomerMobile = () => {
    const [customerMobile, setCustomerMobile] = useState('')

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerMobile(event.target.value)
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
