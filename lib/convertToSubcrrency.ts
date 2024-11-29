export default function convertToSubcurrency(amount: number, factor = 100) {
    console.log("Amount: " + Math.round(amount*factor))
    return Math.round(amount*factor);
}