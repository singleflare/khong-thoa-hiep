const openingEntranceSound = new Howl({
  src: ['../media/Div_Opening_Entrance.mp3'],
})
const contestantsEntranceSound = new Howl({
  src: ['../media/Div_ContestantsEntrance-1.mp3'],
})
const clockSound = new Howl({
  src: ['../media/Div_Clock.mp3'],
})
const lockInSound = new Howl({
  src: ['../media/Div_LockIn.mp3'],
  volume: 0.5
})
const bankSound = new Howl({
  src: ['../media/Div_Bank.mp3'],
})
const questionAmountSound = new Howl({
  src: ['../media/Div_QuestionAmount.mp3'],
  volume: 0.5
})
const correctSound = new Howl({
  src: ['../media/Div_Correct.mp3'],
  volume: 0.5
})
const incorrectSound = new Howl({
  src: ['../media/Div_Incorrect.mp3'],
})
const revealQuestionSound = new Howl({
  src: ['../media/Div_RevealQuestion.mp3'],
})
const waitCorrectAnswerSound = new Howl({
  src: ['../media/Div_Wait_For_Answer.mp3'],
  volume: 0.3
})
const introSound = new Howl({
  src: ['../media/Nhạc id.mp3'],
})
const stopOrGo15sSound = new Howl({
  src: ['../media/Div_ContinueClock.mp3'],
})
const fifteenSecOpinionSound = new Howl({
  src: ['../media/Div_15sOpinion.mp3'],
})
const chooseAnsSound = new Howl({
  src: ['../media/Div_ChooseAns.mp3'],
  volume: 0.5
})
const playOnSound = new Howl({
  src: ['../media/Div_PlayOn.mp3'],
})
const stopSound = new Howl({
  src: ['../media/Div_Stop.mp3'],
})
const sharesLockSound = new Howl({
  src: ['../media/Div_SharesLock.mp3'],
})
const bedAfterAnswerSound = new Howl({
  src: ['../media/Div_AfterAnsweringBed.mp3'],
  volume: 0.5
})
const shareBedSound = new Howl({
  src: ['../media/Div_Shares_Bed.mp3'],
})
const winLoseSound = new Howl({
  src: ['../media/Div_GameOverBed-1.mp3'],
})
const outroSound = new Howl({
  src: ['../media/Div_Closing.mp3'],
})

const contestantsEntranceBedSound = new Howl({
  src: ['../media/Div_GeneralBedIntro_DivideRnd.mp3'],
})
const waitCorrectAnswerVioSound = new Howl({
  src: ['../media/Div_Suspense.mp3'],
})
const bedAfterAnswerUKSound = new Howl({
  src: ['../media/Div_generalWaitForAnsBed.mp3'],
})

const divideFirstHalfSound = new Howl({
  src: ['../media/Div_First50sDivided.mp3'],
})
const divideSecondHalfSound = new Howl({
  src: ['../media/Div_Second50sDivided.mp3'],
})

const divideSuccessBedSound = new Howl({
  src: ['../media/Div_DivideSuccessBed.mp3'],
  volume: 0.5
})

const controlSocket = io('/control')

const p1Sock = io('/player1')
const p1AnsP = $('#player1 .playerAnsDiv p')
const p1AnsDiv = $('#player1 .playerAnsDiv')
const p1NameDiv = $('#player1 .playerNameDiv')
const p1NameP = $('#player1 .playerNameDiv p')

const p2Sock = io('/player2')
const p2AnsP = $('#player2 .playerAnsDiv p')
const p2AnsDiv = $('#player2 .playerAnsDiv')
const p2NameDiv = $('#player2 .playerNameDiv')
const p2NameP = $('#player2 .playerNameDiv p')

const p3Sock = io('/player3')
const p3AnsP = $('#player3 .playerAnsDiv p')
const p3AnsDiv = $('#player3 .playerAnsDiv')
const p3NameDiv = $('#player3 .playerNameDiv')
const p3NameP = $('#player3 .playerNameDiv p')

const heart1Div = $('#heart1')
const heart2Div = $('#heart2')
const heart3Div = $('#heart3')

const rnqDiv = $('#rnq div')
const qDiv = $('#q div')
const timerText = $('#timer div')
const ansABtn = $('#ans1')
const ansBBtn = $('#ans2')
const ansCBtn = $('#ans3')
const ansADiv = $('#ans1 div')
const ansBDiv = $('#ans2 div')
const ansCDiv = $('#ans3 div')
const delBtn = $('#del')
const buzzer = $('#buzzer')
const gianhquyenBtn = $('#gianhquyen')

const thisQuestionMoneyDiv = $('#thisQuestionMoney div')
const moneyIfWrongDiv = $('#ifWrong .money')
const currentTotalDiv = $('#currentTotalDiv .money')
const moneyIfCorrectDiv = $('#ifCorrect .money')

let buzzerPressed = false
let stopOrGoMode = false
let divideMode = false

document.getElementsByTagName('body')[0].addEventListener('contextmenu', e => {
  //e.preventDefault()
})

function hideAnswers() {
  qDiv.css('opacity', '0')
  ansADiv.css('opacity', '0')
  ansBDiv.css('opacity', '0')
  ansCDiv.css('opacity', '0')
}

function hideMoneyIfWrongAndCorrect() {
  moneyIfWrongDiv.text('')
  moneyIfCorrectDiv.text('')
}

function changePlayerAnserDivBorderColors(status) {
  if (status == 'correct') {
    correctSound.play()
    p1AnsDiv.css('border-color', '#7CFC00')
    p1NameDiv.css('border-color', '#7CFC00')
    p2AnsDiv.css('border-color', '#7CFC00')
    p2NameDiv.css('border-color', '#7CFC00')
    p3AnsDiv.css('border-color', '#7CFC00')
    p3NameDiv.css('border-color', '#7CFC00')
  }
  else if (status == 'wrong') {
    incorrectSound.play()
    p1AnsDiv.css('border-color', '#C00000')
    p1NameDiv.css('border-color', '#C00000')
    p2AnsDiv.css('border-color', '#C00000')
    p2NameDiv.css('border-color', '#C00000')
    p3AnsDiv.css('border-color', '#C00000')
    p3NameDiv.css('border-color', '#C00000')
  }
  else if (status == 'normal') {
    p1AnsDiv.css('border-color', '#358BA0')
    p1NameDiv.css('border-color', '#358BA0')
    p2AnsDiv.css('border-color', '#358BA0')
    p2NameDiv.css('border-color', '#358BA0')
    p3AnsDiv.css('border-color', '#358BA0')
    p3NameDiv.css('border-color', '#358BA0')
  }
  else if (status == 'buzzed') {
    p1AnsDiv.css('border-color', '#ED9121')
    p1NameDiv.css('border-color', '#ED9121')
    p2AnsDiv.css('border-color', '#ED9121')
    p2NameDiv.css('border-color', '#ED9121')
    p3AnsDiv.css('border-color', '#ED9121')
    p3NameDiv.css('border-color', '#ED9121')
  }
}

function resetPlayerAnswers() {
  p1AnsP.text('')
  p2AnsP.text('')
  p3AnsP.text('')
  changePlayerAnserDivBorderColors('normal')
}
function resetTimeAndMoneyCountdown() {
  timerText.text('')
  thisQuestionMoneyDiv.text('')
}

function newQuestionGraphicsReset() {
  changePlayerAnserDivBorderColors('normal')
  hideAnswers()
  buzzer.prop('disabled', true)
  gianhquyenBtn.prop('disabled', true)//todo:gpx not showing 3 answes
}

let numberOfTakeovers;
function updateNumberOfTakeovers(numOfTakeovers) {
  numberOfTakeovers = numOfTakeovers
  gianhquyenBtn.text(`Giành quyền (x${numberOfTakeovers})`)
}

function updateNumberOfHearts(num) {
  if (num == 3) {
    heart1Div.css('background-color', 'white')
    heart2Div.css('background-color', 'white')
    heart3Div.css('background-color', 'white')
  }
  else if (num == 2) {
    heart1Div.css('background-color', 'red')
    heart2Div.css('background-color', 'white')
    heart3Div.css('background-color', 'white')
  }
  else if (num == 1) {
    heart1Div.css('background-color', 'red')
    heart2Div.css('background-color', 'red')
    heart3Div.css('background-color', 'white')
  }
  else if (num == 0) {
    heart1Div.css('background-color', 'red')
    heart2Div.css('background-color', 'red')
    heart3Div.css('background-color', 'red')
  }
}

function disableAnswers() {
  ansABtn.prop('disabled', true)
  ansBBtn.prop('disabled', true)
  ansCBtn.prop('disabled', true)
  delBtn.prop('disabled', true)
}
function enableAnswers() {
  ansABtn.prop('disabled', false)
  ansBBtn.prop('disabled', false)
  ansCBtn.prop('disabled', false)
  delBtn.prop('disabled', false)
}
