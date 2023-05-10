import React from "react";
import { Row, Col } from "antd";
import QuestionCard from "./QuestionCard";

const QuestionBank = () => {
  const questions = [
    {
      _id: "645be814932e36825c10adab",
      questionText: "What is the only continent that is also a country?",
      options: [
        {
          id: 1,
          text: "North America",
          _id: "645be814932e36825c10adac",
        },
        {
          id: 2,
          text: "Australia",
          _id: "645be814932e36825c10adad",
        },
        {
          id: 3,
          text: "Europe",
          _id: "645be814932e36825c10adae",
        },
        {
          id: 4,
          text: "Asia",
          _id: "645be814932e36825c10adaf",
        },
      ],
      isCorrect: 2,
      available: true,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/9e/Australia-New_Guinea_%28orthographic_projection%29.svg",
      createdAt: "2023-05-10T18:53:08.447Z",
      updatedAt: "2023-05-10T18:53:08.447Z",
      __v: 0,
    },
    {
      _id: "645be864932e36825c10adb2",
      questionText:
        "What is the name of the first artificial satellite launched into space?",
      options: [
        {
          id: 1,
          text: "Sputnik 1",
          _id: "645be864932e36825c10adb3",
        },
        {
          id: 2,
          text: "Explorer 1",
          _id: "645be864932e36825c10adb4",
        },
        {
          id: 3,
          text: "Vanguard 1",
          _id: "645be864932e36825c10adb5",
        },
        {
          id: 4,
          text: "Ariel 1",
          _id: "645be864932e36825c10adb6",
        },
      ],
      isCorrect: 1,
      available: true,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Sputnik_asm.jpg/1200px-Sputnik_asm.jpg",
      createdAt: "2023-05-10T18:54:28.438Z",
      updatedAt: "2023-05-10T18:54:28.438Z",
      __v: 0,
    },
    {
      _id: "645c086ad8b9dd46347445e7",
      questionText: "Who invented the telephone?",
      options: [
        {
          id: 1,
          text: "Alexander Graham Bell",
          _id: "645c086ad8b9dd46347445e8",
        },
        {
          id: 2,
          text: "Thomas Edison",
          _id: "645c086ad8b9dd46347445e9",
        },
        {
          id: 3,
          text: "Nikola Tesla",
          _id: "645c086ad8b9dd46347445ea",
        },
        {
          id: 4,
          text: "Guglielmo Marconi",
          _id: "645c086ad8b9dd46347445eb",
        },
      ],
      isCorrect: 1,
      available: true,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Alexander_Graham_Bell_in_1914_and_his_laboratory.jpg/1920px-Alexander_Graham_Bell_in_1914_and_his_laboratory.jpg",
      createdAt: "2023-05-10T21:11:06.730Z",
      updatedAt: "2023-05-10T21:11:06.730Z",
      __v: 0,
    },
    {
      _id: "645c08edd8b9dd46347445ee",
      questionText: "What is the highest mountain in the world?",
      options: [
        {
          id: 1,
          text: "Mount Everest",
          _id: "645c08edd8b9dd46347445ef",
        },
        {
          id: 2,
          text: "K2",
          _id: "645c08edd8b9dd46347445f0",
        },
        {
          id: 3,
          text: "Makalu",
          _id: "645c08edd8b9dd46347445f1",
        },
        {
          id: 4,
          text: "Cho Oyu",
          _id: "645c08edd8b9dd46347445f2",
        },
      ],
      isCorrect: 1,
      available: true,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Everest_kalapatthar_crop.jpg/1920px-Everest_kalapatthar_crop.jpg",
      createdAt: "2023-05-10T21:13:17.602Z",
      updatedAt: "2023-05-10T21:13:17.602Z",
      __v: 0,
    },
    {
      _id: "645c093d988137331b566434",
      questionText: "What is the largest desert in the world?",
      options: [
        {
          id: 1,
          text: "Sahara",
          _id: "645c093d988137331b566435",
        },
        {
          id: 2,
          text: "Arabian",
          _id: "645c093d988137331b566436",
        },
        {
          id: 3,
          text: "Gobi",
          _id: "645c093d988137331b566437",
        },
        {
          id: 4,
          text: "Antarctica",
          _id: "645c093d988137331b566438",
        },
      ],
      isCorrect: 1,
      available: true,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Sahara_desert_in_the_northern_Hemisphere.jpg/1920px-Sahara_desert_in_the_northern_Hemi",
      createdAt: "2023-05-10T21:14:37.575Z",
      updatedAt: "2023-05-10T21:14:37.575Z",
      __v: 0,
    },
  ];
  return (
    <div>
      <h2>Question Bank</h2>
      <Row gutter={[16, 16]}>
        {questions.map((question, index) => (
          <Col span={8} key={index}>
            <QuestionCard question={question} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default QuestionBank;
