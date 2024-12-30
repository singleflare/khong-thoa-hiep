import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore, getDoc, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAhru6UvNbpEYC3Sq_S8QSBaPyIGJwYMzg",
  authDomain: "cnkd-off.firebaseapp.com",
  projectId: "cnkd-off",
  storageBucket: "cnkd-off.appspot.com",
  messagingSenderId: "667962004228",
  appId: "1:667962004228:web:d6826dd754b49c08f4b651"
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
async function getDocEntry(col, docId) {
  const docRef = doc(db, col, docId)
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return docSnap.data();
}
async function updateDocEntry(col, docId, data) {
  const docRef = doc(db, col, docId)
  await updateDoc(docRef, data)
}

let currentTotal;
$(async function () {
  const res = await getDocEntry('kth', 'states');
  cSock.emit('updateCurrentTotal', res.currentTotalVar);
  currentTotalDiv.text(res.currentTotalVar);
  currentTotal = res.currentTotalVar;
  console.log(currentTotal)
})
console.log(currentTotal)

const cSock = io('/control')

const countdown100Btn = $('#cd100')
const countdown15Btn = $('#cd15')
const countdown15DividedBtn = $('#15sThoughts')
const prevQBtn = $('#prevQ')
const nextQBtn = $('#nextQ')
const divideMoneyRoundBtn = $('#divideMoneyRound')
const showQBtn = $('#showQBtn')
const showABtn = $('#showABtn')
const showBBtn = $('#showBBtn')
const showCBtn = $('#showCBtn')
const correctAnsBtn = $('#correctAns')
const wrongAnsBtn = $('#wrongAns')
const showMoneyIfCorrectBtn = $('#showMoneyIfCorrect')
const showMoneyIfWrong25Btn = $('#showMoneyIfWrong25')
const showMoneyIfWrong50Btn = $('#showMoneyIfWrong50')
const showMoneyIfWrong100Btn = $('#showMoneyIfWrong100')
const updateMoneyCorrectBtn = $('#updateMoneyCorrect')
const updateMoneyWrong25Btn = $('#updateMoneyWrong25')
const updateMoneyWrong50Btn = $('#updateMoneyWrong50')
const updateMoneyWrong100Btn = $('#updateMoneyWrong100')
const resetPlayerAnswersBtn = $('#resetPlayerAnswers')
const resetTimeAndMoneyCountdownBtn = $('#resetTimeAndMoneyCountdown')
const showMoney50Btn = $('#showMoney50')
const showMoney30Btn = $('#showMoney30')
const showMoney20Btn = $('#showMoney20')
const countdown100DivideMoneyBtn = $('#countdown100DivideMoney')
const countdown50DivideMoneyBtn = $('#countdown50DivideMoney')
const show3HeartsBtn = $('#show3Hearts')
const show2HeartsBtn = $('#show2Hearts')
const show1HeartBtn = $('#show1Heart')
const show0HeartsBtn = $('#show0Hearts')
const show2TakeoversBtn = $('#show2Takeovers')
const show1TakeoverBtn = $('#show1Takeover')
const show0TakeoversBtn = $('#show0Takeover')
const correctAnsIsABtn = $('#correctAnsA')
const correctAnsIsBBtn = $('#correctAnsB')
const correctAnsIsCBtn = $('#correctAnsC')
const correctAnsIsABBtn = $('#correctAnsAB')
const correctAnsIsACBtn = $('#correctAnsAC')
const correctAnsIsBCBtn = $('#correctAnsBC')
const correctAnsIsABCBtn = $('#correctAnsABC')
const correctAnsIsACBBtn = $('#correctAnsACB')
const correctAnsIsBACBtn = $('#correctAnsBAC')
const correctAnsIsBCABtn = $('#correctAnsBCA')
const correctAnsIsCABBtn = $('#correctAnsCAB')
const correctAnsIsCBABtn = $('#correctAnsCBA')
const fadeoutQnAGpxBtn = $('#fadeoutQnAGpx')
const fadeinQnAGpxBtn = $('#fadeinQnAGpx')
const fadeoutMoneyGpxBtn = $('#fadeoutMoneyGpx')
const fadeinMoneyGpxBtn = $('#fadeinMoneyGpx')
const updatePlayerNamesBtn = $('#updatePlayerNames')
const resetDataBtn = $('#resetData')

const playIntroSoundBtn = $('#playIntro')
const playContestantsEntranceSoundBtn = $('#playContestantsEntrance')
const playWaitCorrectAnswerSoundBtn = $('#playWaitCorrectAns')
const playBedAfterAnswerBtn = $('#playBedAfterAnswer')
const playShareBedBtn = $('#playShareBed')
const playWinLoseBedBtn = $('#playWinLoseBed')
const playOutroBtn = $('#playOutro')
const stopAllSoundsBtn = $('#stopAllSounds')
const playBedAfterAnswerUKBtn = $('#playBedAfterAnswerUK')
const playContestantsEntranceSoundBedBtn = $('#playContestantsEntranceWithBed')
const playWaitCorrectAnswerSoundVioBtn = $('#playWaitCorrectAnsVio')

let testShow =
{
  r1q1: {
    q: 'R1Q1',
    a: 'R1Q1A',
    b: 'R1Q1B',
    c: 'R1Q1C',
  },
  r1q2: {
    q: 'R1Q2',
    a: 'R1Q2A',
    b: 'R1Q2B',
    c: 'R1Q2C',
  },
  r1q3: {
    q: 'R1Q3',
    a: 'R1Q3A',
    b: 'R1Q3B',
    c: 'R1Q3C',
  },
  r1q4: {
    q: 'R1Q4',
    a: 'R1Q4A',
    b: 'R1Q4B',
    c: 'R1Q4C',
  },
  r1q5: {
    q: 'R1Q5',
    a: 'R1Q5A',
    b: 'R1Q5B',
    c: 'R1Q5C',
  },
  r2q1: {
    q: 'R2Q1',
    a: 'R2Q1A',
    b: 'R2Q1B',
    c: 'R2Q1C',
  },
  r2q2: {
    q: 'R2Q2',
    a: 'R2Q2A',
    b: 'R2Q2B',
    c: 'R2Q2C',
  },
  r2q3: {
    q: 'R2Q3',
    a: 'R2Q3A',
    b: 'R2Q3B',
    c: 'R2Q3C',
  },
  r2q4: {
    q: 'R2Q4',
    a: 'R2Q4A',
    b: 'R2Q4B',
    c: 'R2Q4C',
  },
  r3q1: {
    q: 'R3Q1',
    a: 'R3Q1A',
    b: 'R3Q1B',
    c: 'R3Q1C',
  },
  r3q2: {
    q: 'R3Q2',
    a: 'R3Q2A',
    b: 'R3Q2B',
    c: 'R3Q2C',
  },
  r3q3: {
    q: 'R3Q3',
    a: 'R3Q3A',
    b: 'R3Q3B',
    c: 'R3Q3C',
  },
  r4q1: {
    q: 'R4Q1',
    a: 'R4Q1A',
    b: 'R4Q1B',
    c: 'R4Q1C',
  },
  r4q2: {
    q: 'R4Q2',
    a: 'R4Q2A',
    b: 'R4Q2B',
    c: 'R4Q2C',
  },
  r5q1: {
    q: 'R5Q1',
    a: 'R5Q1A',
    b: 'R5Q1B',
    c: 'R5Q1C',
  },
}

let questions =
{
  r1q1: {
    i: 'Vòng 1 Câu 1',
    q: '',
    a: '',
    b: '',
    c: '',
  },
  r1q2: {
    i: 'Vòng 1 Câu 2',
    q: '',
    a: '',
    b: '',
    c: '',
  },
  r1q3: {
    i: 'Vòng 1 Câu 3',
    q: '',
    a: '',
    b: '',
    c: '',
  },
  r1q4: {
    i: 'Vòng 1 Câu 4',
    q: '',
    a: '',
    b: '',
    c: '',
  },
  r1q5: {
    i: 'Vòng 1 Câu 5',
    q: '',
    a: '',
    b: '',
    c: '',
  },
  r2q1: {
    i: 'Vòng 2 Câu 1',
    q: '',
    a: '',
    b: '',
    c: '',
  },
  r2q2: {
    i: 'Vòng 2 Câu 2',
    q: '',
    a: '',
    b: '',
    c: '',
  },
  r2q3: {
    i: 'Vòng 2 Câu 3',
    q: '',
    a: '',
    b: '',
    c: '',
  },
  r2q4: {
    i: 'Vòng 2 Câu 4',
    q: '',
    a: '',
    b: '',
    c: '',
  },
  r3q1: {
    i: 'Vòng 3 Câu 1',
    q: '',
    a: '',
    b: '',
    c: '',
  },
  r3q2: {
    i: 'Vòng 3 Câu 2',
    q: '',
    a: '',
    b: '',
    c: '',
  },
  r3q3: {
    i: 'Vòng 3 Câu 3',
    q: '',
    a: '',
    b: '',
    c: '',
  },
  r4q1: {
    i: 'Vòng 4 Câu 1',
    q: '',
    a: '',
    b: '',
    c: '',
  },
  r4q2: {
    i: 'Vòng 4 Câu 2',
    q: '',
    a: '',
    b: '',
    c: '',
  },
  r5q1: {
    i: 'Vòng 5 Câu 1',
    q: '',
    a: '',
    b: '',
    c: '',
  },
}

$('#fileInput').on('change', async function (e) {
  const file = e.target.files[0]
  const data = await file.arrayBuffer()
  const workbook = XLSX.read(data)
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  questions.r1q1.q = sheet.B3.v
  questions.r1q1.a = sheet.C3.v
  questions.r1q1.b = sheet.D3.v
  questions.r1q1.c = sheet.E3.v
  questions.r1q2.q = sheet.B4.v
  questions.r1q2.a = sheet.C4.v
  questions.r1q2.b = sheet.D4.v
  questions.r1q2.c = sheet.E4.v
  questions.r1q3.q = sheet.B5.v
  questions.r1q3.a = sheet.C5.v
  questions.r1q3.b = sheet.D5.v
  questions.r1q3.c = sheet.E5.v
  questions.r1q4.q = sheet.B6.v
  questions.r1q4.a = sheet.C6.v
  questions.r1q4.b = sheet.D6.v
  questions.r1q4.c = sheet.E6.v
  questions.r1q5.q = sheet.B7.v
  questions.r1q5.a = sheet.C7.v
  questions.r1q5.b = sheet.D7.v
  questions.r1q5.c = sheet.E7.v
  questions.r2q1.q = sheet.B9.v
  questions.r2q1.a = sheet.C9.v
  questions.r2q1.b = sheet.D9.v
  questions.r2q1.c = sheet.E9.v
  questions.r2q2.q = sheet.B10.v
  questions.r2q2.a = sheet.C10.v
  questions.r2q2.b = sheet.D10.v
  questions.r2q2.c = sheet.E10.v
  questions.r2q3.q = sheet.B11.v
  questions.r2q3.a = sheet.C11.v
  questions.r2q3.b = sheet.D11.v
  questions.r2q3.c = sheet.E11.v
  questions.r2q4.q = sheet.B12.v
  questions.r2q4.a = sheet.C12.v
  questions.r2q4.b = sheet.D12.v
  questions.r2q4.c = sheet.E12.v
  questions.r3q1.q = sheet.B14.v
  questions.r3q1.a = sheet.C14.v
  questions.r3q1.b = sheet.D14.v
  questions.r3q1.c = sheet.E14.v
  questions.r3q2.q = sheet.B15.v
  questions.r3q2.a = sheet.C15.v
  questions.r3q2.b = sheet.D15.v
  questions.r3q2.c = sheet.E15.v
  questions.r3q3.q = sheet.B16.v
  questions.r3q3.a = sheet.C16.v
  questions.r3q3.b = sheet.D16.v
  questions.r3q3.c = sheet.E16.v
  questions.r4q1.q = sheet.B18.v
  questions.r4q1.a = sheet.C18.v
  questions.r4q1.b = sheet.D18.v
  questions.r4q1.c = sheet.E18.v
  questions.r4q2.q = sheet.B19.v
  questions.r4q2.a = sheet.C19.v
  questions.r4q2.b = sheet.D19.v
  questions.r4q2.c = sheet.E19.v
  questions.r5q1.q = sheet.B21.v
  questions.r5q1.a = sheet.C21.v
  questions.r5q1.b = sheet.D21.v
  questions.r5q1.c = sheet.E21.v
  console.log(questions)
})

let qSeq = 0;
let roundNo = 0;
function showQnAToController(rnqId) {
  rnqDiv.text(questions[rnqId].i)
  qP.text(questions[rnqId].q)
  ansABtn.text(questions[rnqId].a)
  ansBBtn.text(questions[rnqId].b)
  ansCBtn.text(questions[rnqId].c)
}
function cycleQs() {
  cSock.emit('hideQnA')
  cSock.emit('resetPlayerAnswers')
  cSock.emit('resetTimeAndMoneyCountdown')
  cSock.emit('updateTime', 100)
  if (qSeq == 0) {
    rnqDiv.text('')
  }
  if (qSeq == 1) {
    showQnAToController('r1q1')
    roundNo = 1
    cSock.emit('newQnA', questions.r1q1, roundMoneys[roundNo - 1])
  }
  if (qSeq == 2) {
    showQnAToController('r1q2')
    cSock.emit('newQnA', questions.r1q2, roundMoneys[roundNo - 1])
  }
  if (qSeq == 3) {
    showQnAToController('r1q3')
    cSock.emit('newQnA', questions.r1q3, roundMoneys[roundNo - 1])
  }
  if (qSeq == 4) {
    showQnAToController('r1q4')
    cSock.emit('newQnA', questions.r1q4, roundMoneys[roundNo - 1])
  }
  if (qSeq == 5) {
    roundNo = 1
    showQnAToController('r1q5')
    cSock.emit('newQnA', questions.r1q5, roundMoneys[roundNo - 1])
  }
  if (qSeq == 6) {
    rnqDiv.text('Dừng V1/Tiếp V2')
    cSock.emit('stopOrGoMode', 'Dừng V1/Tiếp V2')
    cSock.emit('updateTime', 15)
  }
  if (qSeq == 7) {
    roundNo = 2
    showQnAToController('r2q1')
    cSock.emit('newQnA', questions.r2q1, roundMoneys[roundNo - 1])
  }
  if (qSeq == 8) {
    showQnAToController('r2q2')
    cSock.emit('newQnA', questions.r2q2, roundMoneys[roundNo - 1])
  }
  if (qSeq == 9) {
    showQnAToController('r2q3')
    cSock.emit('newQnA', questions.r2q3, roundMoneys[roundNo - 1])
  }
  if (qSeq == 10) {
    roundNo = 2
    showQnAToController('r2q4')
    cSock.emit('newQnA', questions.r2q4, roundMoneys[roundNo - 1])
  }
  if (qSeq == 11) {
    rnqDiv.text('Dừng V2/Tiếp V3')
    cSock.emit('stopOrGoMode', 'Dừng V2/Tiếp V3')
    cSock.emit('updateTime', 15)
  }
  if (qSeq == 12) {
    roundNo = 3
    showQnAToController('r3q1')
    cSock.emit('newQnA', questions.r3q1, roundMoneys[roundNo - 1])
  }
  if (qSeq == 13) {
    showQnAToController('r3q2')
    cSock.emit('newQnA', questions.r3q2, roundMoneys[roundNo - 1])
  }
  if (qSeq == 14) {
    roundNo = 3
    showQnAToController('r3q3')
    cSock.emit('newQnA', questions.r3q3, roundMoneys[roundNo - 1])
  }
  if (qSeq == 15) {
    rnqDiv.text('Dừng V3/Tiếp V4')
    cSock.emit('stopOrGoMode', 'Dừng V3/Tiếp V4')
    cSock.emit('updateTime', 15)
  }
  if (qSeq == 16) {
    roundNo = 4
    showQnAToController('r4q1')
    cSock.emit('newQnA', questions.r4q1, roundMoneys[roundNo - 1])
  }
  if (qSeq == 17) {
    roundNo = 4
    showQnAToController('r4q2')
    cSock.emit('newQnA', questions.r4q2, roundMoneys[roundNo - 1])
  }
  if (qSeq == 18) {
    rnqDiv.text('Dừng V4/Tiếp V5')
    cSock.emit('stopOrGoMode', 'Dừng V4/Tiếp V5')
    cSock.emit('updateTime', 15)
  }
  if (qSeq == 19) {
    roundNo = 5
    showQnAToController('r5q1')
    cSock.emit('newQnA', questions.r5q1, roundMoneys[roundNo - 1])
  }
}

prevQBtn.on('click', () => {
  if (qSeq >= 0) {
    qSeq--
    cycleQs()
  }
})
nextQBtn.on('click', () => {
  if (qSeq <= 19) {
    qSeq++
    cycleQs()
  }
})
showQBtn.on('click', () => {
  cSock.emit('showQ')
})
showABtn.on('click', () => {
  cSock.emit('showA')
})
showBBtn.on('click', () => {
  cSock.emit('showB')
})
showCBtn.on('click', () => {
  cSock.emit('showC')
})
showMoney50Btn.on('click', () => {
  cSock.emit('showA')
  cSock.emit('gpxShowMoneyA')
})
showMoney30Btn.on('click', () => {
  cSock.emit('showB')
  cSock.emit('gpxShowMoneyB')
})
showMoney20Btn.on('click', () => {
  cSock.emit('showC')
  cSock.emit('gpxShowMoneyC')
})


let countdown;
function countdown100() {
  clearInterval(countdown)
  let time = 100;
  timerText.text(time);
  cSock.emit('updateTime', time)
  countdown = setInterval(() => {
    time -= 1
    timerText.text(time);
    cSock.emit('updateTime', time)
    if (time == 0) {
      clearInterval(countdown)
    }
  }, 1000)
}
function countdown15() {
  clearInterval(countdown)
  let time = 15;
  timerText.text(time);
  cSock.emit('updateTime', time)
  countdown = setInterval(() => {
    time -= 1
    timerText.text(time);
    cSock.emit('updateTime', time)
    if (time == 0) {
      clearInterval(countdown)
    }
  }, 1000)
}

let roundMoneys = [4000, 10000, 20000, 40000, 100000] //total 20k,40k,60k,80k,100k
let moneyCountdown;
let thisQuestionMoney;
function countdownMoney(roundNo) {
  clearInterval(moneyCountdown)
  thisQuestionMoney = roundMoneys[roundNo - 1];
  cSock.emit('updateMoney', thisQuestionMoney)
  let minusInterval = roundMoneys[roundNo - 1] / 200
  moneyCountdown = setInterval(() => {
    thisQuestionMoney -= minusInterval
    thisQuestionMoneyDiv.text(thisQuestionMoney);
    console.log(thisQuestionMoney)
    cSock.emit('updateCdMoney', thisQuestionMoney)
    if (thisQuestionMoney == 0) {
      clearInterval(moneyCountdown)
    }
  }, 500)
}

function countdownBoth(roundNo) {
  revealQuestionSound.stop()
  clockSound.play()
  countdown100()
  countdownMoney(roundNo)
}

function stopClock() {
  clockSound.stop()
  lockInSound.play()
  clearInterval(countdown)
  clearInterval
    (moneyCountdown)
  clearInterval(divideMoneyCountdown)
  clearInterval(divideMoneyTimeCountdown)
}

function showMoneyIfCorrect() {
  console.log(currentTotal, thisQuestionMoney)
  questionAmountSound.play()
  moneyIfCorrectDiv.text(currentTotal + thisQuestionMoney)
  cSock.emit('showMoneyIfCorrect', currentTotal + thisQuestionMoney)
}
function showMoneyIfWrong25() {
  questionAmountSound.play()
  moneyIfWrongDiv.text(currentTotal * 3 / 4)
  cSock.emit('showMoneyIfWrong', currentTotal * 3 / 4)
  console.log(currentTotal * 3 / 4)
}
function showMoneyIfWrong50() {
  questionAmountSound.play()
  moneyIfWrongDiv.text(currentTotal / 2)
  cSock.emit('showMoneyIfWrong', currentTotal / 2)
}
function showMoneyIfWrong100() {
  questionAmountSound.play()
  moneyIfWrongDiv.text('0')
  cSock.emit('showMoneyIfWrong', '0')
}
async function updateMoneyCorrect() {
  currentTotal += thisQuestionMoney
  currentTotalDiv.text(currentTotal)
  cSock.emit('updateCurrentTotal', currentTotal)
  await updateDocEntry('kth', 'states', { currentTotalVar: currentTotal })
}
async function updateMoneyWrong25() {
  currentTotal = currentTotal * 3 / 4
  currentTotalDiv.text(currentTotal)
  cSock.emit('updateCurrentTotal', currentTotal)
  await updateDocEntry('kth', 'states', { currentTotalVar: currentTotal })
}
async function updateMoneyWrong50() {
  currentTotal = currentTotal / 2
  currentTotalDiv.text(currentTotal)
  cSock.emit('updateCurrentTotal', currentTotal)
  await updateDocEntry('kth', 'states', { currentTotalVar: currentTotal })
}
async function updateMoneyWrong100() {
  currentTotal = 0
  currentTotalDiv.text(currentTotal)
  cSock.emit('updateCurrentTotal', currentTotal)
  await updateDocEntry('kth', 'states', { currentTotalVar: currentTotal })
}

countdown100Btn.on('click', () => {
  countdownBoth(roundNo)
  cSock.emit('play100s')
})
countdown15Btn.on('click', () => {
  countdown15()
  cSock.emit('play15sStopOrGo')
})
countdown15DividedBtn.on('click', () => {
  countdown15()
  cSock.emit('play15sOpinion')
})

wrongAnsBtn.on('click', () => {
  cSock.emit('wrongAns')
})
correctAnsBtn.on('click', () => {
  cSock.emit('correctAns')
})
showMoneyIfCorrectBtn.on('click', () => {
  showMoneyIfCorrect()

})
showMoneyIfWrong25Btn.on('click', () => {
  showMoneyIfWrong25()
})
showMoneyIfWrong50Btn.on('click', () => {
  showMoneyIfWrong50()
})
showMoneyIfWrong100Btn.on('click', () => {
  showMoneyIfWrong100()
})
updateMoneyCorrectBtn.on('click', () => {
  updateMoneyCorrect()
  cSock.emit('updateMoneyCorrect', currentTotalDiv.text())
})
updateMoneyWrong25Btn.on('click', () => {
  updateMoneyWrong25()
  cSock.emit('updateMoneyWrong', currentTotalDiv.text())
})
updateMoneyWrong50Btn.on('click', () => {
  updateMoneyWrong50()
  cSock.emit('updateMoneyWrong', currentTotalDiv.text())
})
updateMoneyWrong100Btn.on('click', () => {
  updateMoneyWrong100()
  cSock.emit('updateMoneyWrong', currentTotalDiv.text())
})
resetPlayerAnswersBtn.on('click', () => {
  cSock.emit('resetPlayerAnswers')
})
resetTimeAndMoneyCountdownBtn.on('click', () => {
  cSock.emit('resetTimeAndMoneyCountdown')
})

async function getCurrentTotalFromCloud() {
  await getDocEntry('kth', 'states').then(res => {
    currentTotal = res.currentTotalVar
  })
}
getCurrentTotalFromCloud()

let money50, money30, money20
async function divideMoneyRoundGraphics() {
  money50 = currentTotal * 1 / 2
  money30 = currentTotal * 3 / 10
  money20 = currentTotal * 1 / 5
  console.log(currentTotal, money50, money30, money20)
  timerText.text('100')
  qP.text('Bạn chọn mức tiền nào?')
  qP.css('opacity', '1')
  rnqDiv.text('')
  thisQuestionMoneyDiv.text('')
  ansABtn.css('opacity', '1')
  ansBBtn.css('opacity', '1')
  ansCBtn.css('opacity', '1')
  cSock.emit('updateDividedMoneyAnswers', { a: money50, b: money30, c: money20 })
  cSock.emit('updateTime', 100)

  currentTotal = parseInt(currentTotalDiv.text())
  ansABtn.text(money50)
  ansBBtn.text(money30)
  ansCBtn.text(money20)
}

let divideMoneyCountdown, divideMoneyTimeCountdown, money50MinusInterval, money30MinusInterval, money20MinusInterval
function divideMoneyRound100Countdown() {
  cSock.emit('playDivideFirstHalf')
  money50 = currentTotal * 1 / 2
  money30 = currentTotal * 3 / 10
  money20 = currentTotal * 1 / 5
  let money50Half = money50 / 2
  let money30Half = money30 / 2
  let money20Half = money20 / 2
  money50MinusInterval = money50 / 200
  money30MinusInterval = money30 / 200
  money20MinusInterval = money20 / 200
  clearInterval(divideMoneyCountdown)
  divideMoneyCountdown = setInterval(() => {
    money50 -= money50MinusInterval
    money30 -= money30MinusInterval
    money20 -= money20MinusInterval
    ansABtn.text(money50.toFixed(0))
    ansBBtn.text(money30.toFixed(0))
    ansCBtn.text(money20.toFixed(0))
    cSock.emit('updateDividedMoneyAnswers', { a: money50.toFixed(0), b: money30.toFixed(0), c: money20.toFixed(0) })
  }, 500)
  clearInterval(divideMoneyTimeCountdown)
  let time = 100;
  divideMoneyTimeCountdown = setInterval(() => {
    time -= 1
    timerText.text(time);
    cSock.emit('updateTime', time)
    if (time == 50) {
      clearInterval(divideMoneyTimeCountdown)
      clearInterval(divideMoneyCountdown)
      ansABtn.text(money50Half)
      ansBBtn.text(money30Half)
      ansCBtn.text(money20Half)
      cSock.emit('updateDividedMoneyAnswers', { a: money50Half, b: money30Half, c: money20Half })
      console.log(money50Half, money30Half, money20Half)
    }
  }, 1000)
}
function divideMoneyRound50Countdown() {
  cSock.emit('playDivideSecondHalf')
  money50 = (currentTotal * 1 / 2)
  money30 = (currentTotal * 3 / 10)
  money20 = (currentTotal * 1 / 5)
  let money50Half = money50 / 2
  let money30Half = money30 / 2
  let money20Half = money20 / 2
  money50MinusInterval = money50 / 200
  money30MinusInterval = money30 / 200
  money20MinusInterval = money20 / 200
  clearInterval(divideMoneyCountdown)
  divideMoneyCountdown = setInterval(() => {
    money50Half -= money50MinusInterval
    money30Half -= money30MinusInterval
    money20Half -= money20MinusInterval
    ansABtn.text(money50Half.toFixed(0))
    ansBBtn.text(money30Half.toFixed(0))
    ansCBtn.text(money20Half.toFixed(0))
    cSock.emit('updateDividedMoneyAnswers', { a: money50Half.toFixed(0), b: money30Half.toFixed(0), c: money20Half.toFixed(0) })
  }, 500)
  clearInterval(divideMoneyTimeCountdown)
  let time = 50;
  divideMoneyTimeCountdown = setInterval(() => {
    time -= 1
    timerText.text(time);
    cSock.emit('updateTime', time)
    if (time == 0) {
      ansABtn.text('0')
      ansBBtn.text('0')
      ansCBtn.text('0')
      cSock.emit('updateDividedMoneyAnswers', { a: 0, b: 0, c: 0 })
      clearInterval(divideMoneyTimeCountdown)
      clearInterval(divideMoneyCountdown)
    }
  }, 1000)
}
divideMoneyRoundBtn.on('click', () => {
  cSock.emit('divideMoneyRound', { a: money50, b: money30, c: money20 })
  ansABtn.css('opacity', '1')
  ansBBtn.css('opacity', '1')
  ansCBtn.css('opacity', '1')
  divideMoneyRoundGraphics()
})
countdown100DivideMoneyBtn.on('click', () => {
  divideMoneyRound100Countdown()
})
countdown50DivideMoneyBtn.on('click', () => {
  divideMoneyRound50Countdown()
})

cSock.on('p1Ans', data => {
  p1AnsP.text(data)
})
cSock.on('p2Ans', data => {
  p2AnsP.text(data)
})
cSock.on('p3Ans', data => {
  p3AnsP.text(data)
})
cSock.on('cd100', (rndN) => {
  countdownBoth(rndN)
})
cSock.on('cd15StopOrGo', () => {
  countdown15()

})
cSock.on('cd15Divided', () => {
  countdown15()

})
cSock.on('stopClock', () => {
  stopClock()
})
cSock.on('p1Buzz', () => {
  p1AnsDiv.css('border-color', 'rgb(237, 145, 33)')
  p1NameDiv.css('border-color', 'rgb(237, 145, 33)')
})
cSock.on('p2Buzz', () => {
  p2AnsDiv.css('border-color', 'rgb(237, 145, 33)')
  p2NameDiv.css('border-color', 'rgb(237, 145, 33)')
})
cSock.on('p3Buzz', () => {
  p3AnsDiv.css('border-color', 'rgb(237, 145, 33)')
  p3NameDiv.css('border-color', 'rgb(237, 145, 33)')
})
cSock.on('p1Unbuzz', () => {
  p1AnsDiv.css('border-color', '#358BA0')
  p1NameDiv.css('border-color', '#358BA0')
})
cSock.on('p2Unbuzz', () => {
  p2AnsDiv.css('border-color', '#358BA0')
  p2NameDiv.css('border-color', '#358BA0')
})
cSock.on('p3Unbuzz', () => {
  p3AnsDiv.css('border-color', '#358BA0')
  p3NameDiv.css('border-color', '#358BA0')
})
cSock.on('p1gianhquyen', data => {
  p1AnsP.text(data)
  p2AnsP.text(data)
  p3AnsP.text(data)
  changePlayerAnserDivBorderColors('buzzed')
  p1AnsDiv.css('border-color', '#FFD700')
  p1NameDiv.css('border-color', '#FFD700')

})
cSock.on('p2gianhquyen', data => {
  p2AnsP.text(data)
  p1AnsP.text(data)
  p3AnsP.text(data)
  changePlayerAnserDivBorderColors('buzzed')
  p2AnsDiv.css('border-color', '#FFD700')
  p2NameDiv.css('border-color', '#FFD700')
})
cSock.on('p3gianhquyen', data => {
  p3AnsP.text(data)
  p2AnsP.text(data)
  p1AnsP.text(data)
  changePlayerAnserDivBorderColors('buzzed')
  p3AnsDiv.css('border-color', '#FFD700')
  p3NameDiv.css('border-color', '#FFD700')
})
cSock.on('p1Stop', () => {
  p1AnsP.text('Dừng lại')
})
cSock.on('p2Stop', () => {
  p2AnsP.text('Dừng lại')
})
cSock.on('p3Stop', () => {
  p3AnsP.text('Dừng lại')
})
cSock.on('p1Continue', () => {
  p1AnsP.text('Tiếp tục')
})
cSock.on('p2Continue', () => {
  p2AnsP.text('Tiếp tục')
})
cSock.on('p3Continue', () => {
  p3AnsP.text('Tiếp tục')
})

playIntroSoundBtn.on('click', () => {
  cSock.emit('playIntro')
  gSock.emit('playIntro')
})
playContestantsEntranceSoundBtn.on('click', () => {
  cSock.emit('playContestantsEntrance')
})
playWaitCorrectAnswerSoundBtn.on('click', () => {
  cSock.emit('playWaitCorrectAnswer')
})
playBedAfterAnswerBtn.on('click', () => {
  cSock.emit('playBedAfterAnswer')
})
playShareBedBtn.on('click', () => {
  cSock.emit('playShareBed')
})
playWinLoseBedBtn.on('click', () => {
  cSock.emit('playWinLoseBed')
})
playOutroBtn.on('click', () => {
  cSock.emit('playOutro')
})
stopAllSoundsBtn.on('click', () => {
  cSock.emit('stopAllSounds')
})

playBedAfterAnswerUKBtn.on('click', () => {
  cSock.emit('playBedAfterAnswerUK')
})
playContestantsEntranceSoundBedBtn.on('click', () => {
  cSock.emit('playContestantsEntranceBed')
})
playWaitCorrectAnswerSoundVioBtn.on('click', () => {
  cSock.emit('playWaitCorrectAnswerVio')
})

show3HeartsBtn.on('click', () => {
  cSock.emit('updateNumberOfHearts', 3)
})
show2HeartsBtn.on('click', () => {
  cSock.emit('updateNumberOfHearts', 2)
})
show1HeartBtn.on('click', () => {
  cSock.emit('updateNumberOfHearts', 1)
})
show0HeartsBtn.on('click', () => {
  cSock.emit('updateNumberOfHearts', 0)
})
show2TakeoversBtn.on('click', () => {
  cSock.emit('updateNumberOfTakeovers', 2)
})
show1TakeoverBtn.on('click', () => {
  cSock.emit('updateNumberOfTakeovers', 1)
})
show0TakeoversBtn.on('click', () => {
  cSock.emit('updateNumberOfTakeovers', 0)
})

correctAnsIsABtn.on('click', () => {
  cSock.emit('gpxCorrectAns', 'A')
})
correctAnsIsBBtn.on('click', () => {
  cSock.emit('gpxCorrectAns', 'B')
})
correctAnsIsCBtn.on('click', () => {
  cSock.emit('gpxCorrectAns', 'C')
})
correctAnsIsABBtn.on('click', () => {
  cSock.emit('gpxCorrectAns', 'AB')
})
correctAnsIsACBtn.on('click', () => {
  cSock.emit('gpxCorrectAns', 'AC')
})
correctAnsIsBCBtn.on('click', () => {
  cSock.emit('gpxCorrectAns', 'BC')
})
correctAnsIsABCBtn.on('click', () => {
  cSock.emit('gpxCorrectAns', 'ABC')
})
correctAnsIsACBBtn.on('click', () => {
  cSock.emit('gpxCorrectAns', 'ACB')
})
correctAnsIsBACBtn.on('click', () => {
  cSock.emit('gpxCorrectAns', 'BAC')
})
correctAnsIsBCABtn.on('click', () => {
  cSock.emit('gpxCorrectAns', 'BCA')
})
correctAnsIsCABBtn.on('click', () => {
  cSock.emit('gpxCorrectAns', 'CAB')
})
correctAnsIsCBABtn.on('click', () => {
  cSock.emit('gpxCorrectAns', 'CBA')
})

fadeoutQnAGpxBtn.on('click', () => {
  cSock.emit('fadeoutQnAGpx')
})
fadeinQnAGpxBtn.on('click', () => {
  cSock.emit('fadeinQnAGpx')
})
fadeoutMoneyGpxBtn.on('click', () => {
  cSock.emit('fadeoutMoneyGpx')
})
fadeinMoneyGpxBtn.on('click', () => {
  cSock.emit('fadeinMoneyGpx')
})

resetDataBtn.on('click', () => {
  cSock.emit('resetData')
})
updatePlayerNamesBtn.on('click', () => {
  cSock.emit('updatePlayerNames', { p1: $('#inputPlayer1Name').val(), p2: $('#inputPlayer2Name').val(), p3: $('#inputPlayer3Name').val() })
})