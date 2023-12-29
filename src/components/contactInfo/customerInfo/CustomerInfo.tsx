import OrnamentPhoto from '@/components/ornamentPhoto/OrnamentPhoto'
import Address from './Address'
import CustomerName from './CustomerName'

const CustomerInfo = () => {
    return (
        <section className="address__ornament__container flex justify-between items-center">
            <div className="contact__info__wrapper flex flex-col justify-center gap-4">
                <CustomerName />
                <Address />
            </div>
            <OrnamentPhoto />
        </section>
    )
}

export default CustomerInfo
