import { useState } from 'react';
import './FAQItem.css';

interface Props {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: Props) {
  const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="faq-item">
            <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
                <span className='arrow'>{isOpen ? '▲' : '▼'}</span>
                <span>{question}</span>
            </div>
            {isOpen && <div className="faq-answer">{answer}</div>}
        </div>
    );
};
