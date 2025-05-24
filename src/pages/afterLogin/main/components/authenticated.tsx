import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Authenticated() {
  const [showAuthMessage, setShowAuthMessage] = useState(true);
  const [showReward, setShowReward] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAuthMessage(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-full font-semibold px-6">
      <AnimatePresence mode="wait">
        {showAuthMessage && (
          <motion.div
            key="authMessage"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
            onAnimationComplete={(definition: {
              opacity: number;
              y: number;
            }) => {
              if (definition.opacity === 0 && definition.y === -50) {
                setShowReward(true);
              }
            }}
            className="text-2xl"
          >
            인증이 완료되었습니다!
          </motion.div>
        )}

        {showReward && (
          <motion.div
            key="rewardContent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center w-full"
          >
            <img
              alt="Recycle mark"
              src="images/RecycleMark.png"
              className="mt-10 w-24"
            />

            <div className="mt-10 text-xl">
              오늘도 환경을 지켜주셔서 감사합니다!
            </div>

            <p className="mt-11 text-2xl">
              <span className="text-black">현재 포인트: </span>
              <span className="text-[#19824f]">803pt (+3pt)</span>
            </p>

            <button className="mt-40 w-full h-14 text-white rounded-lg bg-[#19824f]" onClick={()=>{
                navigate("/main");
            }}>
              다음
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
