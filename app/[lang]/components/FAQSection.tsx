'use client';

import { useState } from 'react';
import styles from '../landing.module.css';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  title: string;
  questions: FAQItem[];
}

export default function FAQSection({ title, questions }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`${styles.section} ${styles.sectionWhite}`} id="faq">
      <div className={`${styles.container} ${styles.containerNarrow}`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionHeaderLabel}>FAQ</span>
          <h2>{title}</h2>
        </div>
        <div className={styles.faqList}>
          {questions.map((item, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                aria-expanded={openIndex === index}
                onClick={() => toggleQuestion(index)}
              >
                <span>{item.q}</span>
                <span className={styles.faqIcon}>
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className={styles.faqAnswer}>
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
