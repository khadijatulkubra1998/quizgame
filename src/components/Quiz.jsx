import React, { Component } from 'react';
import { Button } from 'antd';
import { QuizData } from './QuizData'
import 'antd/dist/antd.css';
import '../App.css'
export class Quiz extends Component {
    state = {
        userAnswer: null,
        currentQuestion: 0,
        options: [],
        quizEnd: false,
        score: 1,
       
    }
    loadQuiz = () => {
        const { currentQuestion } = this.state
        this.setState(() => {
            return {
                question: QuizData[currentQuestion].question,
                options: QuizData[currentQuestion].options,
                answer: QuizData[currentQuestion].answer,
            }
        })
    }
    componentDidMount() {
        this.loadQuiz()
    }
    nextQuestion = () => {
        const {userAnswer, answer, score} = this.state;
        this.setState({
            currentQuestion: this.state.currentQuestion + 1
        })
        console.log(this.state.currentQuestion)

        if(userAnswer === answer) {
            this.setState({
                score: score + 1 
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        const { currentQuestion } = this.state;
        if (this.state.currentQuestion !== prevState.currentQuestion) {
            this.setState(() => {
                return {
                    disable: true,
                    question: QuizData[currentQuestion].question,
                    options: QuizData[currentQuestion].options,
                    answer: QuizData[currentQuestion].answer,
                }
            })
        }
    }
    checkAnswer = answer => {
        this.setState({
            userAnswer: answer,
          
        })
    }
    finish = () => {
        if (this.state.currentQuestion === QuizData.length -1) {
            this.setState({
                quizEnd: true
            })
        }
    }
    render() {
        const { question, options, currentQuestion, userAnswer, quizEnd } = this.state;
        if (quizEnd === true) {
            return (
                <div className="score">
                    <h2>Game Over</h2>
                    <h3>Final Score is "{this.state.score}"</h3>
                </div>
            )
        }
console.log(this.state.quizEnd)

        return (
            <div className="App">
                <h1>Quiz Game</h1>
                <h2> {question} </h2>
                <span>{`Question ${currentQuestion} out of ${QuizData.length}`}</span>
                {options.map((option) =>
                    <p
                        key={option.id}
                        className={`ui floating message 
                        ${userAnswer === option ? "selected" : null}
                        `}
                        onClick={() => this.checkAnswer(option)}
                    >
                        {option}
                    </p>)}
                {currentQuestion < QuizData.length - 1 &&
                    <Button
                       
                        type="primary"
                        onClick={this.nextQuestion}
                    >
                        Next
                </Button>
                }
                {currentQuestion === QuizData.length - 1 &&
                    <Button
                        type="danger"
                        onClick={this.finish}
                    >
                        Finish
                     </Button>
                }
            </div>
        );
    }
}

export default Quiz;
