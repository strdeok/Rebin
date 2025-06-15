export default function UserChat({ question }: { question: string }) {
  const getQuestion = () => {
    switch (question) {
      case "pill":
        return "폐의약품은 어떻게 버려야 하나요?";
      case "bottle":
        return " 공병은 어떻게 버려야 하나요?";
      case "battery":
        return "폐건전지는 어떻게 버려야 하나요?";
      case "rest":
        return "기타품목은 어떻게 버려야 하나요?";
    }
  };

  return (
    <div className="w-fit h-auto px-4 py-3 bg-[#19824F] text-white rounded-lg mt-4 text-xl">
      {getQuestion()}
    </div>
  );
}
