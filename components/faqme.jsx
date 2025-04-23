"use client"
import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Who is Brown Code?',
      answer: 'My name is Brown Code, and I specialize in crafting dynamic, user-friendly websites that bridge creativity and functionality. With a strong foundation in front-end development, I bring designs to life using modern web technologies like HTML, CSS, JavaScript, and frameworks such as React. I have a keen eye for responsive design, ensuring that the websites I build look stunning and perform seamlessly across all devices. My expertise includes optimizing web performance, implementing cross-browser compatibility, and delivering accessible, clean code that adheres to industry best practices.In addition to technical skills, I have experience collaborating closely with designers, back-end developers, and clients to translate concepts into high-quality, interactive web applications. I’m passionate about staying up-to-date with the latest trends in web development and continuously improving my craft to deliver the best possible user experience'}

  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container text-center">
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question text-2xl" onClick={() => handleToggle(index)}>
            <h3>{faq.question}</h3>
            <span>{activeIndex === index ? '-' : '+'}</span>
          </div>
          {activeIndex === index && (
            <div className="faq-answer m-2 indent-8 ">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
