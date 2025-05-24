import dayjs from "dayjs";

export default function PaymentHistory() {
  const today = dayjs().format("YYYY-MM-DD")
  


  const Container = () => {
    return (
      <div className="flex flex-col px-4 py-4 gap-2 border-b">
        <span className="font-semibold text-xl">금액</span>
        <div
          id="bottom"
          className="flex flex-row justify-between text-gray-400"
        >
          <span>남은 포인트: 3,200pt</span>

          <span>{today}</span>
        </div>
      </div>
    );
  };
  return (
    <div className="">
      <Container />
      <Container />
      <Container />
    </div>
  );
}
