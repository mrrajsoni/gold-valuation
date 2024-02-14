const Certification = ({
    customerName,
    customerMobile,
}: {
    customerName: string
    customerMobile: string
}) => {
    return (
        <div>
            This is to certify that I <strong> {customerName}</strong> have
            verified the Gold Ornaments which are given to me by Mr/Mrs.
            <strong> {customerName}</strong>, mobile no.
            <strong> {customerMobile}</strong> for taking of Gold Loan from
            <strong> Punjab National Bank</strong> (Pimpri). I have checked the
            purity, weight, and value of these ornaments and I take the full
            responsibility of the same
        </div>
    )
}

export default Certification
