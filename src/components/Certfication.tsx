const Certification = ({
    customerName,
    customerMobile,
}: {
    customerName: string
    customerMobile: string
}) => {
    return (
        <div>
            This is to certify that I {customerName} have verified the Gold
            Ornaments which are given to me by Mr/Mrs. {customerName}, mobile
            no. {customerMobile} for taking of Gold Loan from (Bank
            Name)(Branch). I have checked the purity, weight, and value of these
            ornaments and I take the full responsibility of the same
        </div>
    )
}

export default Certification
