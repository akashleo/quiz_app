import React, { useEffect, useState } from "react";
import { Button, Typography, Steps } from "antd";
import { LeftOutlined, RightOutlined, CheckOutlined } from "@ant-design/icons";
import "./AnsweringPanel.css";
import ConfirmModal from "../../components/ConfirmModal";
import InstructionsModal from "../../components/InstructionsModal";
import SubmissionSuccessModal from "../../components/SubmissionSuccessModal";
import {
  getAllQuestions,
  fetchQuestionById,
} from "../../store/slices/question/QuestionAction";
import { setDisplayQuestion } from "../../store/slices/question/QuestionSlice";
import { updateAnswer, submitAnswer } from "../../store/slices/answer/AnswerAction";
import { getProfileById } from "../../store/slices/profile/ProfileAction";
import { useDispatch, useSelector } from "react-redux";
import questionmark from "../../assets/questionmark.png";
import Navbar from "../../components/Navbar";
import { updateAnswerMap } from "../../store/slices/answer/AnswerSlice";
import { useNavigate } from "react-router-dom";
import QuizHeader from "./QuizHeader";
import QuizFooter from "./QuizFooter";

const { Title, Text } = Typography;

const AnsweringPanel = () => {
  const [answer, setAnswer] = useState({});
  const [current, setCurrent] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { displayQuestion } = useSelector((state) => state.question);
  const { singleTopic, topicQuestions } = useSelector((state) => state.topic);
  const { currentUserAnswer, answerMap, answerSuccess } = useSelector((state) => state.answer);
  const { currentUserId } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showSubmissionSuccess, setShowSubmissionSuccess] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    dispatch(updateAnswerMap({}));
    if (quizStarted && topicQuestions.length > 0) {
      dispatch(fetchQuestionById(topicQuestions[0]));
    }
  }, [quizStarted, topicQuestions]);

  const handleInstructionsClose = () => {
    setShowInstructions(false);
    setQuizStarted(true);
  };

  // Watch for successful answer submission
  useEffect(() => {
    if (answerSuccess && !showInstructions && quizStarted) {
      setShowSubmissionSuccess(true);
    }
  }, [answerSuccess]);

  const handleGoToDashboard = () => {
    setShowSubmissionSuccess(false);
    // Dispatch getProfileById to update dashboard data
    dispatch(getProfileById(currentUserId));
    navigate("/dashboard");
  };

  const nextQuestion = () => {
    if (current < topicQuestions.length) {
      dispatch(fetchQuestionById(topicQuestions[current]));
      setCurrent(current + 1);
      setAnswer({});
    } else showModal();
  };

  const previousQuestion = () => {
    if (current > 1) {
      dispatch(fetchQuestionById(topicQuestions[current - 2]));
      setCurrent(current - 1);
    }
  };

  const handleOptionClick = (optionId) => {
    const { _id } = currentUserAnswer;
    const currentAns = { [displayQuestion?._id]: optionId };
    const updatedAns = { ...answerMap, ...currentAns };
    setAnswer(updatedAns);
    dispatch(updateAnswerMap(updatedAns));
    dispatch(updateAnswer({ id: _id, body: { answers: updatedAns } }));
  };

  const submitQuiz = () => {
    const { _id } = currentUserAnswer;
    setAnswer({});
    dispatch(updateAnswerMap({}));
    dispatch(submitAnswer({ id: _id, body: { submitted: true } }));
    // Remove immediate navigation - let the success modal handle it
  };

  return (
    <>
      <Navbar />
      {showInstructions && (
        <InstructionsModal 
          open={showInstructions} 
          onClose={handleInstructionsClose} 
        />
      )}
      
      {quizStarted && (
        <div className="answering-panel-container-user">
          <div className="answering-panel-content-user">
            <QuizHeader 
              topicName={singleTopic?.name || "Quiz"}
              duration={20}
              submitQuiz={submitQuiz}
            />

            <div className="quiz-content-user">
              <div className="quiz-main-content-user">
                <div 
                  className="question-image-container-user"
                  style={{
                    backgroundImage: `url(${displayQuestion?.image || questionmark})`,
                  }}
                >
                  <div className="question-tag-user">
                    <span className="question-number-user">
                      {current}/{topicQuestions?.length}
                    </span>
                  </div>
                </div>
                
                <div className="question-content-user">
                  <div className="question-text-user">
                    <Text>
                      <div dangerouslySetInnerHTML={{ __html: displayQuestion?.questionText }}></div>
                    </Text>
                  </div>

                  <div className="answer-options-user">
                    {displayQuestion?.options?.map((option) => (
                      <div
                        key={option.id}
                        className={`answer-option-item-user ${
                          answer[displayQuestion?._id] === option.id ? 'selected' : ''
                        }`}
                        onClick={() => handleOptionClick(option.id)}
                      >
                        <div 
                          className="answer-option-text-user"
                          dangerouslySetInnerHTML={{ __html: option.text }}
                        />
                        {answer[displayQuestion?._id] === option.id && (
                          <div className="answer-check-icon-user">
                            <CheckOutlined />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <QuizFooter 
                current={current}
                totalQuestions={topicQuestions?.length}
                onPrevious={previousQuestion}
                onNext={nextQuestion}
                onShowModal={showModal}
              />
            </div>
          </div>
        </div>
      )}
      
      {open && <ConfirmModal open={open} setOpen={setOpen} submitQuiz={submitQuiz} />}
      {showSubmissionSuccess && (
        <SubmissionSuccessModal
          open={showSubmissionSuccess}
          onGoToDashboard={handleGoToDashboard}
        />
      )}
    </>
  );
};

export default AnsweringPanel;
