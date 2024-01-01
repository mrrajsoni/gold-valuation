import OrnamentPhoto from '@/components/ornamentPhoto/OrnamentPhoto'
import Address from './Address'
import CustomerName from './CustomerName'
import CustomerMobile from './CustomerMobile'

interface CustomerInfoProps {
    customerName: string
    customerMobile: string
    customerAddress: string
}
const CustomerInfo = ({
    customerName,
    customerMobile,
    customerAddress,
}: CustomerInfoProps) => {
    return (
        <section className="address__ornament__container flex justify-between items-center">
            <div className="contact__info__wrapper flex flex-col justify-center gap-4">
                <CustomerName name={customerName} />
                <CustomerMobile mobile={customerMobile} />
                <Address address={customerAddress} />
            </div>
            <OrnamentPhoto />
        </section>
    )
}

export default CustomerInfo
