'use client'

import Certification from '@/components/Certfication'
import CustomerDeclaration from '@/components/CustomerDeclaration'
import DateSignature from '@/components/DateSignature'
import GoldRate from '@/components/GoldRate'
import CompanyInfo from '@/components/companyInfo/CompanyInfo'
import CustomerInfo from '@/components/contactInfo/customerInfo/CustomerInfo'
import ItemRows, { ornamentListKeys } from '@/components/itemRows/ItemRows'
import { Document, Page } from '@react-pdf/renderer'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'

import { useSubscribe } from 'replicache-react'
import { replicacheInstance } from '@/utils/replicacheClient'
import { useState } from 'react'
import SidebarForm, { formData } from '@/components/SidebarForm'

export type InvoiceOrder = {
    customerName: string
    branchName: string
    goldRate: string
    customerMobile: string
    customerAddress: string
    ornamentList: ornamentListKeys[]
}

export type InvoiceOrderWithID = InvoiceOrder & { id: string }
const MainDocument = () => {
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
        branchName: messages.length ? messages[0][1].branchName : '',
        goldRate: messages.length ? messages[0][1].goldRate : '',
        customerMobile: messages.length ? messages[0][1].customerMobile : '',
        customerAddress: messages.length ? messages[0][1].customerAddress : '',
        ornaments:
            messages.length && messages[0][1]?.ornamentList?.length
                ? messages[0][1].ornamentList
                : [
                      {
                          id: '1',
                          listOfItems: {
                              label: '',
                              value: '',
                          },
                          quantity: '',
                          weight: '',
                          averageValue: '',
                          purityInCarat: '',
                          purityInPercentage: '',
                      },
                  ],
    }
    const [toggled, setToggled] = useState(false)
    const [formData, setFormData] = useState<formData>({
        branchName: replicacheValues.branchName,
        customAddress: replicacheValues.customerAddress,
        customerMobile: replicacheValues.customerMobile,
        customerName: replicacheValues.customerName,
        goldRate: replicacheValues.goldRate,
    })

    return (
        <main className="min-h-screen">
            <Sidebar
                className="sidebar__container"
                onBackdropClick={() => setToggled(false)}
                toggled={toggled}
                breakPoint="all"
            >
                <SidebarForm formData={formData} handleFormData={setFormData} />
            </Sidebar>
            <button
                className="sidebar__toggle__button"
                onClick={() => setToggled(!toggled)}
            >
                Toggle
            </button>
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
            <ItemRows
                ornamentsData={[...replicacheValues.ornaments]}
                goldRatePerGram={replicacheValues.goldRate}
            />
            <CustomerDeclaration />
            <DateSignature />
        </main>
    )
}

export default MainDocument
