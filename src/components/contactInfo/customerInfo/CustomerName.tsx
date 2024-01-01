'use client'

import InvoiceInput from '@/components/input/InvoiceInput'
import { replicacheInstance } from '@/utils/replicacheClient'
import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'

const CustomerName = ({ name }: { name: string }) => {
    const [customerName, setCustomerName] = useState(name)

    useEffect(() => {
        setCustomerName(name)
    }, [name])
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newCustomerName = event.target.value
        replicacheInstance?.mutate.customerName({
            customerName: newCustomerName,
        })
        setCustomerName(newCustomerName)
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
