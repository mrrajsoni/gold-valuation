import Certification from '@/components/Certfication'
import CustomerDeclaration from '@/components/CustomerDeclaration'
import GoldRate from '@/components/GoldRate'
import CompanyInfo from '@/components/companyInfo/CompanyInfo'
import CustomerInfo from '@/components/contactInfo/customerInfo/CustomerInfo'
import ItemRows from '@/components/itemRows/ItemRows'
import OrnamentPhoto from '@/components/ornamentPhoto/OrnamentPhoto'

export default function Home() {
    return (
        <main className="min-h-screen">
            <CompanyInfo />
            <GoldRate />
            <CustomerInfo />
            <Certification />
            <ItemRows />
            <CustomerDeclaration />
        </main>
    )
}
