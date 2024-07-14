import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import data from "../Accordion";

const Value = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };


  return (
    <section id="value" className="py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="underline text-center mb-5 text-2xl font-DM font-semibold">Our Values</h2>
          <p className="mt-2 text-black font-DM font-semibold">
            We are committed to providing the best services for you. A good
            place to live can make your life better.
          </p>
        </div>

        <Accordion
          allowMultipleExpanded={false}
          preExpanded={activeIndex !== null ? [activeIndex] : []}
          onChange={toggleAccordion}
          className="grid gap-6 w-full"
        >
          {data.map((item, index) => (
            <AccordionItem
              key={index}
              uuid={index}
              
              className={`border-gray-300 border-[1px] gap-4 rounded-xl shadow-md ${
                activeIndex === index ? "shadow-md" : ""
              }`}
            >
              <AccordionItemHeading>
                <AccordionItemButton className="flex justify-between items-center py-3 px-4 cursor-pointer focus:outline-none border-green-500">
                  <div className="flex  w-full justify-start ">
                    <div className="mr-2 text-white  border p-2 bg-green-400 rounded-full">{item.icon}</div>
                    <div className=" text-gray-800 font-bold text-xs sm:text-xl font-DM mx-auto">{item.heading}</div>
                  </div>
                  <MdOutlineArrowDropDown
                  
                    className={`${
                      activeIndex === index ? "transform rotate-180" : ""
                    }`}
                    size={30}
                  />
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className=" font-DM px-10 py-5 text-xs sm:text-lg text-gray-600">
                {item.detail}
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Value;
