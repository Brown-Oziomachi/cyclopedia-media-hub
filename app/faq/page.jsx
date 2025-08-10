"use client";

import {Suspense } from "react";
import { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Webwiz Creation?",
    answer:
      "Webwiz Creation is a dynamic website development company that helps individuals and businesses establish and enhance their online presence efficiently.",
  },
  {
    question: "Is Webwiz Creation free to use?",
    answer:
      "Yes, Webwiz Creation is free for all users. Additional premium features may be introduced to improve your experience.",
  },
  {
    question: "Can I publish my own projects?",
    answer:
      "Definitely! Showcase your projects to the community with ease after signing up.",
  },
  {
    question: "How do I interact with other users?",
    answer:
      "Engage by commenting, following developers, and participating in community discussions in our blog.",
  },
  {
    question: "Can I edit my published projects?",
    answer:
      "Yes, your dashboard allows you to edit and update your projects anytime.",
  },
  {
    question: "What types of projects are featured on Webwiz Creation?",
    answer:
      "Webwiz Creation hosts web apps, mobile apps, open-source tools, and innovative projects across industries.",
  },
  {
    question: "Can I access projects offline?",
    answer:
      "Currently, projects are accessible online, but future updates may include offline features.",
  },
  {
    question: "How do I discover new projects?",
    answer:
      "Browse projects by category, search keywords, and explore trending or recommended projects based on your interests.",
  },
  {
    question: "Are there hackathons on Webwiz Creation?",
    answer:
      "Yes! Participate in hackathons to showcase your skills and win exciting prizes.",
  },
  {
    question: "Can I collaborate with other developers?",
    answer:
      "Absolutely! Work together on projects using Webwiz Creation’s collaboration features.",
  },
  {
    question: "Is there a rating or review system for projects?",
    answer:
      "Yes, projects can be rated and reviewed to help developers improve and guide other users effectively.",
  },
];

export default function Faqs() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 py-30 bg-gray-400/5 rounded-lg shadow-lg">

      <h1 className="text-4xl font-extrabold text-center mb-8 text-white">
        FAQs
      </h1>
      {faqs.map((faq, index) => (
        <Accordion
          key={index}
          expanded={expanded === index}
          onChange={handleChange(index)}
          className="border border-cyan-500 rounded-lg mb-4 bg-gray-700"
        >
          <AccordionSummary
            expandIcon={
              <ChevronDown
                className={`transform transition-transform ${
                  expanded === index ? "rotate-180" : "rotate-0"
                } text-gray-400/`}
              />
            }
            className="text-white px-4 py-3 hover:bg-cyan-600 rounded-lg"
          >
            <h2 className="text-lg font-semibold">
              {faq.question.replace(/Webwiz Creation/gi, "Cyclopedia")}
            </h2>
          </AccordionSummary>
          <AccordionDetails>
            <p className="text-black leading-relaxed">
              {faq.answer.replace(/Webwiz Creation/gi, "Cyclopedia")}
            </p>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}


