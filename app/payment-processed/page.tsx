export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: number };
}) {
  return (
    <div className="max-w-6xl mx-auto p-10 text-center border m-10 rounded-md flex flex-col items-center space-y-4">
      <div className="text-4xl font-extrabold">Thank you!</div>
      <div className="text-2xl">We have recieved your payment of</div>
      <div className="bg-amigosblack text-amigoswhite w-fit py-4 px-24 rounded-xl text-4xl font-bold">
        ${amount}
      </div>
    </div>
  );
}
