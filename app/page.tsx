"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

const TYPING_TEXTS = [
  "안녕하세요, zeroth입니다 👋",
  "안전한 배포플로우 구성 완료!",
];

export default function Home() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentText = TYPING_TEXTS[currentTextIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // 타이핑 중
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.substring(0, displayText.length + 1));
          setTypingSpeed(100);
        } else {
          // 타이핑 완료, 잠시 대기 후 삭제 시작
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // 삭제 중
        if (displayText.length > 0) {
          setDisplayText(currentText.substring(0, displayText.length - 1));
          setTypingSpeed(50);
        } else {
          // 삭제 완료, 다음 텍스트로
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % TYPING_TEXTS.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTextIndex, typingSpeed]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.terminal}>
          <div className={styles.terminalHeader}>
            <div className={styles.terminalButtons}>
              <span className={styles.button}></span>
              <span className={styles.button}></span>
              <span className={styles.button}></span>
            </div>
            <span className={styles.terminalTitle}>playground</span>
          </div>
          <div className={styles.terminalBody}>
            <div className={styles.prompt}>
              <span className={styles.promptUser}>zeroth@playground</span>
              <span className={styles.promptSymbol}>:</span>
              <span className={styles.promptPath}>~</span>
              <span className={styles.promptSymbol}>$</span>
            </div>
            <div className={styles.typingText}>
              {displayText}
              <span className={styles.cursor}>▋</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
