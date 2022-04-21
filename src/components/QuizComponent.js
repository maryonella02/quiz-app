// import { Card, CardTitle, CardText, Button } from "reactstrap";
// import { START_QUIZ, DO_QUIZ, END_QUIZ } from '../redux/ActionTypes';

// class Quiz extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             quizStage: START_QUIZ,
//             correctAnswers: 0,
//             quiz: props.quiz,
//             numberOfQuestions: 0,
//             answer: this.props.answer,
//             selectedAns: -1,
//             ansState: ANS_IDLE,
//             rigthAnsInvoked: false,
//             resultShown: false,
//         };
//     }

//     componentDidUpdate(prevProps) {
//         let oldA = prevProps.answer.answer;
//         let newA = this.props.answer.answer;
//         if (newA !== oldA && this.state.ansState !== ANS_GOT)
//             this.setState({
//                 ansState: ANS_GOT,
//             });
//     }

//     async showResults() {
//         await sleep(4000);

//         if (!this.state.resultShown)
//             this.setState({
//                 ansState: ANS_IDLE,
//                 questionN: this.state.numberOfQuestions + 1,
//                 selectedAns: -1,
//                 rigthAnsInvoked: false,
//                 resultShown: true,
//             });
//     }

//     oneRigthAns() {
//         if (!this.state.rigthAnsInvoked)
//             this.setState({
//                 rightAns: this.state.correctAnswers + 1,
//                 rigthAnsInvoked: true,
//             });
//     }

//     render() {
//         const stage = this.state.quizStage;
//         const quiz = this.state.quiz;



//         if (stage === QUIZ_START)
//             return (
//                 <div className="quiz" style={this.props.bgStyle}>

//                     <Card>
//                         <CardContent>
//                             <CardTitle > {quiz.title}</CardTitle>
//                             <CardText > This quiz contains: {quiz.questions_count} questions.</CardText>
//                         </CardContent>
//                     </Card>

//                     <Button
//                         onClick={() => this.setState({ quizStage: DO_QUIZ })}
//                     >
//                         Start
//                     </Button>
//                 </div>
//             );

//         // if (stage === QUIZ_PROCESS) {
//         //     if (this.state.questionN === quiz.questions.length) {
//         //         this.setState({
//         //             quizStage: QUIZ_FINISH,
//         //         });
//         //         return <div className="quiz" style={this.props.bgStyle}></div>;
//         //     }

//         //     const question = this.state.quiz.questions[this.state.questionN];


//         //     const answers = question.answers.map((variant, index) => {
//         //         var btnClass = "";
//         //         var disabled = false;

//         //         if (this.props.answer.answer !== null)
//         //             if (
//         //                 this.state.ansState === ANS_GOT &&
//         //                 this.props.answer.answer.hasOwnProperty("correct")
//         //             ) {
//         //                 if (
//         //                     this.props.answer.answer.correct &&
//         //                     this.state.selectedAns === index
//         //                 ) {
//         //                     btnClass = "correct-ans";
//         //                     this.oneRigthAns();
//         //                 }

//         //                 if (!this.props.answer.answer.correct) {
//         //                     if (this.props.answer.answer.correct_answer === variant)
//         //                         btnClass = "correct-ans";
//         //                     if (this.state.selectedAns === index) btnClass = "wrong-ans";
//         //                 }
//         //                 if (index === quiz.questions.length - 1) {
//         //                     this.showResults();
//         //                 }

//         //                 disabled = true;
//         //             }

//         //         return (
//         //             <Grid key={index} item xs={12}>
//         //                 <Button
//         //                     className={btnClass}
//         //                     disabled={disabled}
//         //                     onClick={() => {
//         //                         this.setState({
//         //                             selectedAns: index,
//         //                             ansState: ANS_WAIT,
//         //                             resultShown: false,
//         //                         });
//         //                         this.props.submitAnswer(
//         //                             {
//         //                                 question_id: question.id,
//         //                                 answer: variant,
//         //                                 user_id: this.props.userId,
//         //                             },
//         //                             this.state.quiz.id
//         //                         );
//         //                     }}
//         //                     variant="contained"
//         //                     color="primary"
//         //                     sx={{
//         //                         width: { xs: "75vw", sm: "50vw", xl: "500px" },
//         //                         minHeight: { xs: "7vh", xl: "50px" },
//         //                         height: "fit-content",
//         //                     }}
//         //                 >
//         //                     {variant}
//         //                 </Button>
//         //             </Grid>
//         //         );
//         //     });

//         //     return (
//         //         <div className="quiz" style={this.props.bgStyle}>
//         //             <Card sx={{ width: { xs: "94vw", md: "70vw" }, my: 2, py: 2 }}>
//         //                 <Typography gutterBottom variant="h6" component="div">
//         //                     Question {this.state.questionN + 1}/
//         //                     {this.state.quiz.questions.length}
//         //                 </Typography>
//         //                 <CardContent
//         //                     sx={{
//         //                         display: "flex",
//         //                         flexDirection: "column",
//         //                         alignItems: "center",
//         //                         justifyContent: "center",
//         //                     }}
//         //                 >

//         //                     <Typography
//         //                         gutterBottom
//         //                         variant="h6"
//         //                         component="div"
//         //                         sx={{ mb: 3 }}
//         //                     >
//         //                         {question.question.name}
//         //                     </Typography>
//         //                     <Grid container spacing={2}>
//         //                         {answers}
//         //                     </Grid>
//         //                 </CardContent>
//         //             </Card>
//         //         </div>
//         //     );
//         // }

//         // if (stage === QUIZ_FINISH)
//         //     return (
//         //         <div className="quiz" style={this.props.bgStyle}>
//         //             <Box
//         //                 className="home-content"
//         //                 component="div"
//         //                 sx={{
//         //                     my: "auto",
//         //                     mx: {
//         //                         xs: 3,
//         //                         sm: 5,
//         //                     },
//         //                     px: {
//         //                         xs: 1,
//         //                         sm: 5,
//         //                     },
//         //                     py: {
//         //                         xs: 1,
//         //                         sm: 2,
//         //                     },
//         //                     width: {
//         //                         xs: "auto",
//         //                         md: "75vw",
//         //                         xl: "60vw",
//         //                     },
//         //                 }}
//         //             >
//         //                 <h1>Finish!</h1>
//         //                 <Typography
//         //                     sx={{
//         //                         fontSize: "150%",
//         //                     }}
//         //                 >
//         //                     Your score: {this.state.rightAns}/{quiz.questions.length}
//         //                 </Typography>
//         //                 <Button
//         //                     variant="contained"
//         //                     color="primary"
//         //                     sx={{
//         //                         my: 2,
//         //                         minWidth: {
//         //                             xs: "60vw",
//         //                             sm: "30vw",
//         //                             lg: "20vw",
//         //                             ll: "15vw",
//         //                         },
//         //                         minHeight: {
//         //                             xs: "5vh",
//         //                             ll: "3vh",
//         //                         },
//         //                         height: "fit-content",
//         //                         width: "fit-content",
//         //                     }}
//         //                     onClick={() => this.props.history.push("/quizes")}
//         //                 >
//         //                     Go to other quizes!
//         //                 </Button>
//         //             </Box>
//         //         </div>
//         //     );
//     }
// }

// const sleep = (milliseconds) => {
//     return new Promise((resolve) => setTimeout(resolve, milliseconds));
// };

// export default Quiz;