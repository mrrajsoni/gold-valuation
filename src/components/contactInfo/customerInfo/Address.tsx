import { replicacheInstance } from '@/utils/replicacheClient'
import React, { useEffect } from 'react'

const Address = ({ address }: { address: string }) => {
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newAddress = event.target.value
        replicacheInstance?.mutate.customerAddress({
            customerAddress: newAddress,
        })
    }
    useEffect(() => {}, [address])
    return (
        <textarea
            onChange={handleChange}
            value={address}
            placeholder="Address"
            rows={3}
            cols={30}
        />
    )
}

export default Address
