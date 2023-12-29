import Address from '@/components/contactInfo/customerInfo/Address'
import CustomerInfo from '@/components/contactInfo/customerInfo/CustomerInfo'
import ItemRows from '@/components/itemRows/ItemRows'
import OrnamentPhoto from '@/components/ornamentPhoto/OrnamentPhoto'

export default function Home() {
    return (
        <main className="min-h-screen">
            <div className="company__logo__container"></div>
            <section className="address__ornament__container flex justify-between">
                <div className="contact__info__wrapper flex flex-col">
                    <CustomerInfo />
                </div>
                <OrnamentPhoto />
            </section>
            <ItemRows />
        </main>
    )
}
