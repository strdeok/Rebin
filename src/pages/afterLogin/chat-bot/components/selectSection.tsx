import { useState, type Dispatch, type SetStateAction } from "react";
import Draggable from "react-draggable";

export default function SelectSection({
  setQuestions,
}: {
  setQuestions: Dispatch<SetStateAction<string[]>>;
}) {
  // 드래그 위치 상태 (controlled)
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // 아래로 슬라이드 이동
  const slideDown = () => {
    setPosition({ x: 0, y: 160 });
  };

  const onSelectQuetion = (question: string) => {
    setQuestions((prev) => [...prev, question]);
    slideDown();
  };

  return (
    <div id="bounds" className="w-full max-w-md h-86 fixed -bottom-20">
      <Draggable
        axis="y"
        handle="#handle"
        bounds="#bounds"
        position={position}
        onDrag={(_, data) => {
          setPosition({ x: data.x, y: data.y });
        }}
      >
        <div
          id="select"
          className="relative top-0 w-full h-48 overflow-y-scroll rounded-t-xl bg-white transition-transform duration-300"
          style={{ boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.1)" }}
        >
          <div
            id="handle"
            className="sticky top-0 z-10 bg-white flex justify-center py-2 cursor-pointer"
          >
            <div className="w-28 h-1 bg-gray-300 rounded-full" />
          </div>

          <div className="flex flex-col items-end gap-2 px-6 py-4">
            {[
              { label: "공병은", value: "bottle" },
              { label: "폐의약품은", value: "pill" },
              { label: "폐건전지는", value: "battery" },
              { label: "기타 품목은", value: "rest" },
            ].map((item) => (
              <button
                key={item.value}
                className="w-fit px-4 py-2 rounded-lg border"
                onClick={() => {
                  onSelectQuetion(item.value);
                }}
              >
                {item.label} 어떻게 버려야 하나요?
              </button>
            ))}
          </div>
        </div>
      </Draggable>
    </div>
  );
}
