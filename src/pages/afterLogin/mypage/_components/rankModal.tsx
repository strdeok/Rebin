import Close from "../../../../assets/icons/Close.svg?react";
import Sprout from "../../../../assets/icons/sprout.svg?react";
import Pot from "../../../../assets/icons/pot.svg?react";
import type { Dispatch, SetStateAction } from "react";

export default function RankModal({
  setRankModalopen,
}: {
  setRankModalopen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <div
        id="background"
        className="fixed top-0 bg-black/30 w-screen h-full z-40 backdrop-blur-xs"
      />
      <div className="w-84 h-70 bg-white z-50 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg flex flex-col font-medium text-xl">
        <button
          className="self-end mt-4 mr-4"
          onClick={() => setRankModalopen(false)}
        >
          <Close />
        </button>

        <div className="flex flex-row mx-5 items-center">
          <Sprout width="72" height="72" fill="#19824f" className="mr-6" />
          <div>
            <p>닉네임님의 현재 등급은</p>
            <p className="mt-4">
              <span className="text-6xl text-[#19824F]">새싹</span>입니다.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center mt-4">
          <span>다음 등급까지 2회</span>
          <div className="flex flex-row items-center mt-1 gap-4">
            <Sprout width="48" height="48" fill="#19824f" />
            <div className="flex flex-row gap-4">
              <div className="size-6 rounded-full bg-[#19824f]" />
              <div className="size-6 rounded-full bg-[#19824f]" />
              <div className="size-6 rounded-full bg-[#19824f]" />
              <div className="size-6 rounded-full bg-[#D9D9D9]" />
              <div className="size-6 rounded-full bg-[#D9D9D9]" />
            </div>
            <Pot width="48" height="48" fill="#19824f" />
          </div>
        </div>
      </div>
    </>
  );
}
