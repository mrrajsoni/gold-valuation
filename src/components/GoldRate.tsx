'use client'
import { useEffect, useState } from 'react'
import InvoiceInput from './input/InvoiceInput'
import { replicacheInstance } from '@/utils/replicacheClient'
import { nanoid } from 'nanoid'

const GoldRate = ({ rate }: { rate: string }) => {
    const [goldRate, setGoldRate] = useState(rate)

    useEffect(() => {
        setGoldRate(rate)
    }, [rate])
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newGoldRate = event.target.value
        replicacheInstance?.mutate.goldRate({
            goldRate: newGoldRate,
        })
        setGoldRate(newGoldRate)
    }

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
