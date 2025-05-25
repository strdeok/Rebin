import { useState } from "react";
import AdminChat from "./components/adminChat";
import SelectSection from "./components/selectSection";
import UserChat from "./components/userChat";
import { useEffect, useRef } from "react";

export default function ChatPage() {
  const [questions, setQuestions] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [questions]);

  return (
    <div className="h-auto flex flex-col relative pb-20">
      <div className="flex flex-col flex-1 overflow-y-auto px-4 pt-2 pb-12 gap-2">
        <div className="self-start">
          <AdminChat question={null} />
        </div>
        {questions.map((question, index) => (
          <>
            <div key={index} className="self-end">
              <UserChat question={question} />
            </div>
            <div key={index} className="self-start">
              <AdminChat question={question} />
            </div>
          </>
        ))}
        <div ref={bottomRef} />
      </div>

      <SelectSection setQuestions={setQuestions} />
    </div>
  );
}
