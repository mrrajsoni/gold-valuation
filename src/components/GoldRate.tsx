'use client'
import { useState } from 'react'
import InvoiceInput from './input/InvoiceInput'

const GoldRate = () => {
    const [goldRate, setGoldRate] = useState('')

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setGoldRate(event.target.value)
    return (
        <section className="gold__rate__container text-center">
            <div className="flex gap-2 justify-center items-end">
                Today&apos;s rate of 22 carat gold is -
                <InvoiceInput
                    onChange={handleOnChange}
                    value={goldRate}
                    showBorder
                />
            </div>
        </section>
    )
}

export default GoldRate
