import dayjs from "dayjs";

export default function TrashHistory() {
  const today = dayjs().format("YYYY-MM-DD");

  const Container = () => {
    return (
      <div className="flex flex-col px-4 py-4 gap-2 border-b">
        <span className="font-semibold text-xl">가게이름</span>
        <div
          id="bottom"
          className="flex flex-row justify-between text-gray-400"
        >
          <div>
            <span>품목</span>
            <span className="ml-3">+30pt</span>
          </div>
          <span>{today}</span>
        </div>
      </div>
    );
  };
  return (
    <div className="pb-20">
      <Container />
      <Container />
      <Container /><Container /><Container /><Container /><Container />
    </div>
  );
}
