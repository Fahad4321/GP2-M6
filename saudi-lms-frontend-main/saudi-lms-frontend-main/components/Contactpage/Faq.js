import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { faqData } from "../constants/data";

const Faq = () => {
  const [selected, setSelected] = React.useState(null);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="py-16 font-roboto">
      <h2 className="text-2xl font-semibold sm:text-4xl text-[#140342]  text-center ">
        Frequently Asked Questions
      </h2>
      <p className="mt-4 mb-8 text-gray-400 mx-4 text-center">
        Ut enim ad minim veniam, quis nostrud exercitation ullamco
      </p>
      <div className="wrapper px-4 md:w-7/12 mx-auto">
        <div className="accordion">
          {faqData.map((item, i) => (
            <Accordion
              key={i}
              expanded={expanded === i}
              onChange={handleChange(i)}
              className="my-3 "
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                className=""
              >
                <Typography
                  sx={{ width: "100%" }}
                  fontSize="large"
                  fontWeight="medium"
                >
                  {item?.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="">
                <Typography>{item?.content}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;

const faq = [
  {
    id: 1,
    title: "Do you offer discounts for students?",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia unde doloribus, aperiam explicabo recusandae nihil! Enim, alias eius.",
  },
  {
    id: 2,
    title: "Do you offer discounts for students?",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia unde doloribus, aperiam explicabo recusandae nihil! Enim, alias eius.",
  },
  {
    id: 3,
    title: "Do you offer discounts for students?",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia unde doloribus, aperiam explicabo recusandae nihil! Enim, alias eius.",
  },
  {
    id: 4,
    title: "Do you offer discounts for students?",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia unde doloribus, aperiam explicabo recusandae nihil! Enim, alias eius.",
  },
  {
    id: 5,
    title: "Do you offer discounts for students?",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia unde doloribus, aperiam explicabo recusandae nihil! Enim, alias eius.",
  },
  {
    id: 6,
    title: "Do you offer discounts for students?",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia unde doloribus, aperiam explicabo recusandae nihil! Enim, alias eius.",
  },
  {
    id: 7,
    title: "Do you offer discounts for students?",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia unde doloribus, aperiam explicabo recusandae nihil! Enim, alias eius.",
  },
];
