'use client'

import Certification from '@/components/Certfication'
import CustomerDeclaration from '@/components/CustomerDeclaration'
import DateSignature from '@/components/DateSignature'
import GoldRate from '@/components/GoldRate'
import CompanyInfo from '@/components/companyInfo/CompanyInfo'
import CustomerInfo from '@/components/contactInfo/customerInfo/CustomerInfo'
import ItemRows, { ornamentListKeys } from '@/components/itemRows/ItemRows'

import { Replicache, TEST_LICENSE_KEY, WriteTransaction } from 'replicache'
import { useSubscribe } from 'replicache-react'
import Pusher from 'pusher-js'
import { replicacheInstance } from '@/utils/replicacheClient'

export type InvoiceOrder = {
    customerName: string
    branchName: string
    goldRate: string
    customerMobile: string
    customerAddress: string
    ornamentList: ornamentListKeys[]
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

    const replicacheValues = {
        customerName: messages.length ? messages[0][1].customerName : '',
        branchName: messages.length ? messages[0][1].customerName : '',
        goldRate: messages.length ? messages[0][1].goldRate : '',
        customerMobile: messages.length ? messages[0][1].customerMobile : '',
        customerAddress: messages.length ? messages[0][1].customerAddress : '',
    }

    return (
        <main className="min-h-screen">
            <CompanyInfo branchName={replicacheValues.branchName} />
            <GoldRate rate={replicacheValues.goldRate} />
            <CustomerInfo
                customerAddress={replicacheValues.customerAddress}
                customerMobile={replicacheValues.customerMobile}
                customerName={replicacheValues.customerName}
            />
            <Certification
                customerMobile={replicacheValues.customerMobile}
                customerName={replicacheValues.customerName}
            />
            <ItemRows goldRatePerGram={replicacheValues.goldRate} />
            <CustomerDeclaration />
            <DateSignature />
        </main>
    )
}
