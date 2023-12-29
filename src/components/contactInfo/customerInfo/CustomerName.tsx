'use client'

import InvoiceInput from '@/components/input/InvoiceInput'
import { useState } from 'react'

const CustomerName = () => {
    const [customerName, setCustomerName] = useState('')

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerName(event.target.value)
    }
    return (
        <InvoiceInput
            showBorder
            placeHolder="Customer Name"
            value={customerName}
            onChange={handleOnChange}
        />
    )
}

export default CustomerName
