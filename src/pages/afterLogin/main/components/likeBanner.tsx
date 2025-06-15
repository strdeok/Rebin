import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LikeBanner({ like }: { like: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (like) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 1500); // 1.5초 뒤 사라지기
      return () => clearTimeout(timer);
    }
  }, [like]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
          className="fixed z-50 w-80 h-10 left-1/2 -translate-x-1/2 bg-black rounded-lg text-white text-center py-2"
        >
          내가 찜한 가게에 추가되었습니다.
        </motion.div>
      )}
    </AnimatePresence>
  );
}
