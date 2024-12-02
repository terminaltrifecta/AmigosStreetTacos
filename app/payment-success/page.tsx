export default function PaymentSuccess({
    searchParams: {amount},
} : {
    searchParams: {amount:number}
}) {
    return (
        <main className="max-w-6xl mx-auto p-10 text-center border m-10 rounded-md">
            <div className="mb-10 space-y-4">
                <div className="text-4xl font-extrabold">Thank you!</div>
                <div className="text-2xl">We have recieved your payment of</div>
                <div className="bg-amigosblack text-amigoswhite p-4 rounded-xl text-4xl font-bold">
                    ${amount}
                </div>
            </div>
        </main>
    )
}