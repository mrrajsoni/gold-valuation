'use client'

import Certification from '@/components/Certfication'
import CustomerDeclaration from '@/components/CustomerDeclaration'
import DateSignature from '@/components/DateSignature'
import GoldRate from '@/components/GoldRate'
import CompanyInfo from '@/components/companyInfo/CompanyInfo'
import CustomerInfo from '@/components/contactInfo/customerInfo/CustomerInfo'
import ItemRows from '@/components/itemRows/ItemRows'

import { Replicache, TEST_LICENSE_KEY, WriteTransaction } from 'replicache'
import { useSubscribe } from 'replicache-react'
import Pusher from 'pusher-js'
import { replicacheInstance } from '@/utils/replicacheClient'

export type InvoiceOrder = {
    customerName: string
    branchName: string
    goldRate: string
}

export type InvoiceOrderWithID = InvoiceOrder & { id: string }

export default function Home() {
    const messages = useSubscribe(
        replicacheInstance,
        async (tx) => {
            const list = await tx.scan<InvoiceOrder>().entries().toArray()
            return list
        },
        { default: [] },
    )

    return (
        <main className="min-h-screen">
            <CompanyInfo />
            <GoldRate rate={messages.length ? messages[0][1].goldRate : ''} />
            <CustomerInfo />
            <Certification />
            <ItemRows />
            <CustomerDeclaration />
            <DateSignature />
            <div>{messages.length ? messages[0][1].goldRate : '65'}</div>
        </main>
    )
}
