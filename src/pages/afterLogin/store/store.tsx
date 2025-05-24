import Next from "../../../assets/icons/Next.svg?react";

export default function Store() {
  const Container = ({ price }: { price: string }) => {
    return (
      <div className="flex flex-row items-center py-5 pl-4 pr-2 justify-between border-y">
        <img alt="인천e음" src="/images/IncheonElogo.png" className="w-20" />
        <span>인천 e음 상품권 {price}원</span>
        <button>
          <Next />
        </button>
      </div>
    );
  };
  return (
    <div className="text-xl font-medium ">
      <div className="py-8 pl-4 pr-8 flex justify-between border-b-2">
        닉네임님의 현재 포인트{" "}
        <span className="font-semibold text-[#19824F]">5,000pt</span>
      </div>
      <Container price={"1,000"} />
      <Container price={"2,000"} />
      <Container price={"3,000"} />
      <Container price={"4,000"} />
      <Container price={"5,000"} />
      <Container price={"6,000"} />
    </div>
  );
}
