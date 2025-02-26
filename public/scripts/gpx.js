const gSock = io('/gpx')

function changePlayerAnswerDivBorderColors(status) {
  console.log(status)
  if (status == 'correct') {
    $('.playerName').css('border-color', '#7CFC00')
    $('.playerAns').css('border-color', '#7CFC00')
  }
  else if (status == 'wrong') {
    $('.playerName').css('border-color', '#C00000')
    $('.playerAns').css('border-color', '#C00000')
  }
  else if (status == 'normal') {
    $('.playerName').css('border-color', '#2fb9d9')
    $('.playerAns').css('border-color', '#2fb9d9')
  }
  else if (status == 'buzzed') {
    $('.playerName').css('border-color', '#ED9121')
    $('.playerAns').css('border-color', '#ED9121')
  }
}

function changeAllAnsBorderColors(status) {
  if (status == 'correct') {
    $('#ansA').css('border-color', '#7CFC00')
    $('#ansB').css('border-color', '#7CFC00')
    $('#ansC').css('border-color', '#7CFC00')
    $('#letterA').css('border-color', '#7CFC00')
    $('#letterB').css('border-color', '#7CFC00')
    $('#letterC').css('border-color', '#7CFC00')
  }
  if (status == 'wrong') {
    $('#ansA').css('border-color', '#C00000')
    $('#ansB').css('border-color', '#C00000')
    $('#ansC').css('border-color', '#C00000')
    $('#letterA').css('border-color', '#C00000')
    $('#letterB').css('border-color', '#C00000')
    $('#letterC').css('border-color', '#C00000')
  }
  if (status == 'normal') {
    $('#ansA').css('border-color', '#2fb9d9')
    $('#ansB').css('border-color', '#2fb9d9')
    $('#ansC').css('border-color', '#2fb9d9')
    $('#letterA').css('border-color', '#2fb9d9')
    $('#letterB').css('border-color', '#2fb9d9')
    $('#letterC').css('border-color', '#2fb9d9')
  }
  if (status == 'buzzed') {
    $('#ansA').css('border-color', '#ED9121')
    $('#ansB').css('border-color', '#ED9121')
    $('#ansC').css('border-color', '#ED9121')
    $('#letterA').css('border-color', '#ED9121')
    $('#letterB').css('border-color', '#ED9121')
    $('#letterC').css('border-color', '#ED9121')
  }
}

function resetPlayerAnswers() {
  $('.playerAns p').text('')
  changePlayerAnswerDivBorderColors('normal')
}

function showQuestion() {
  $('#questionBar').addClass('wipe-ltr')
  $('#questionBar td').addClass('fade-in')
  $('#rnq').addClass('fade-in')
  $('#heartsContainer').addClass('fade-in')
  $('#currentMoney').addClass('fade-in')
  $('#greenMoneyBar').addClass('fade-in')
  $('#playerAnsContainer').addClass('appearUpToDown')
  revealQuestionSound.play()
}

function showAnsA() {
  $('#ansA').addClass('wipe-ltr')
  $('#letterA').addClass('wipe-ltr')
  $('#ansA td').addClass('fade-in')
  $('#letterA p').addClass('fade-in')
  $('#frame1').addClass('zoom-in')
  $('#frame2').addClass('zoom-in')
  $('#frame3').addClass('zoom-in')
}

function showAnsB() {
  $('#ansB').addClass('wipe-ltr')
  $('#letterB').addClass('wipe-ltr')
  $('#ansB td').addClass('fade-in')
  $('#letterB p').addClass('fade-in')
}

function showAnsC() {
  $('#ansC').addClass('wipe-ltr')
  $('#letterC').addClass('wipe-ltr')
  $('#ansC td').addClass('fade-in')
  $('#letterC p').addClass('fade-in')
}

function runTimer() {
  $('#currentMoney').removeClass('fade-in')
  $('#currentMoney').addClass('uptodown')
  $('#green').addClass('uptodown')
  Howler.stop()
  clockSound.play()
}

function stopTimer() {
  $('#currentMoney').css('animation-play-state', 'paused')
  $('#green').css('animation-play-state', 'paused')
  Howler.stop()
  lockInSound.play()
}

function resetAnimation() {
  $('#questionBar').removeClass('wipe-ltr')
  $('#questionBar td').removeClass('fade-in')
  $('#rnq').removeClass('fade-in')
  $('#heartsContainer').removeClass('fade-in')
  $('#currentMoney').removeClass('fade-in')
  $('#greenMoneyBar').removeClass('fade-in')
  $('#ansA').removeClass('wipe-ltr')
  $('#letterA').removeClass('wipe-ltr')
  $('#ansA td').removeClass('fade-in')
  $('#letterA p').removeClass('fade-in')
  $('#frame1').removeClass('zoom-in')
  $('#frame2').removeClass('zoom-in')
  $('#frame3').removeClass('zoom-in')
  $('#ansB').removeClass('wipe-ltr')
  $('#letterB').removeClass('wipe-ltr')
  $('#ansB td').removeClass('fade-in')
  $('#letterB p').removeClass('fade-in')
  $('#ansC').removeClass('wipe-ltr')
  $('#letterC').removeClass('wipe-ltr')
  $('#ansC td').removeClass('fade-in')
  $('#letterC p').removeClass('fade-in')
  $('#currentMoney').removeClass('uptodown')
  $('#green').removeClass('uptodown')
  $('#currentMoney').css('animation-play-state', 'running')
  $('#green').css('animation-play-state', 'running')
}

function showDividedMoneyA() {
  $('#divideLetterA').addClass('wipe-ltr')
  $('#divideLetterA p').addClass('fade-in')
  $('#moneyA').addClass('wipe-ltr')
  $('#moneyA td').addClass('fade-in')
}

function showDividedMoneyB() {
  $('#divideLetterB').addClass('wipe-ltr')
  $('#divideLetterB p').addClass('fade-in')
  $('#moneyB').addClass('wipe-ltr')
  $('#moneyB td').addClass('fade-in')
}

function showDividedMoneyC() {
  $('#divideLetterC').addClass('wipe-ltr')
  $('#divideLetterC p').addClass('fade-in')
  $('#moneyC').addClass('wipe-ltr')
  $('#moneyC td').addClass('fade-in')
}

gSock.on('init', data => {
  console.log(data)
  $('#player1Name p').text(data.player1Name)
  $('#player2Name p').text(data.player2Name)
  $('#player3Name p').text(data.player3Name)
})
gSock.on('showQ', () => showQuestion())
gSock.on('showA', () => showAnsA())
gSock.on('showB', () => showAnsB())
gSock.on('showC', () => showAnsC())
gSock.on('runTimer', () => runTimer())
gSock.on('updateCdMoney', data => {
  $('#thisRoundMoney').text(data)
})
gSock.on('stopTimer', () => stopTimer())
gSock.on('resetAnimation', () => resetAnimation())
gSock.on('run100sAnimation', () => {
  runTimer()
})
gSock.on('gpxShowMoneyA', () => showDividedMoneyA())
gSock.on('gpxShowMoneyB', () => showDividedMoneyB())
gSock.on('gpxShowMoneyC', () => showDividedMoneyC())
gSock.on('updateDividedMoneyAnswers', data => {
  $('#moneyA td #moneyASpan').text(data.a)
  $('#moneyB td #moneyBSpan').text(data.b)
  $('#moneyC td #moneyCSpan').text(data.c)
})

gSock.on('newQnA', (data, money) => {
  $('#letterA p').text('A')
  $('#letterB p').text('B')
  $('#letterC p').text('C')
  $('.playerAns p').css('font-size', '40pt')
  $('.playerAns p').css('margin-top', '17px')
  $('.playerAns p').text('')
  $('#thisRoundMoney').text(money)
  $('#rnq p').text(data.i)
  $('#questionBar td').text(data.q)
  $('#ansA td').text(data.a)
  $('#ansB td').text(data.b)
  $('#ansC td').text(data.c)
  $('#gpxContainer').removeClass('fade-out')
  $('#gpxContainer').removeClass('fade-in')
  $('#playerAnsContainer').removeClass('disappearDownToUp')
  $('#playerAnsContainer').removeClass('appearUpToDown')
  $('#fifteenSecTimer').removeClass('fade-out')
  $('#fifteenSecTimer').removeClass('fade-in')

  changePlayerAnswerDivBorderColors('normal')
  changeAllAnsBorderColors('normal')
  resetPlayerAnswers()
  resetAnimation()
})

gSock.on('stopOrGoMode', () => {
  $('.playerAns p').css('font-size', '30pt')
  $('.playerAns p').css('margin-top', '5px')
  $('.playerAns p').text('')
  changePlayerAnswerDivBorderColors('normal')
  changeAllAnsBorderColors('normal')
  resetPlayerAnswers()
  resetAnimation()
  $('#fifteenSecTimer p').text('15')
  $('#fifteenSecTimer').removeClass('fade-out')
  $('#fifteenSecTimer').removeClass('fade-in')
})

gSock.on('p1Ans', data => {
  $('#player1Ans p').text(data)
  chooseAnsSound.play()
})
gSock.on('p2Ans', data => {
  $('#player2Ans p').text(data)
  chooseAnsSound.play()
})
gSock.on('p3Ans', data => {
  $('#player3Ans p').text(data)
  chooseAnsSound.play()
})

gSock.on('p1Buzz', () => {
  $('#player1Ans').css('border-color', '#ED9121')
  $('#player1Name').css('border-color', '#ED9121')
})
gSock.on('p1Unbuzz', () => {
  $('#player1Ans').css('border-color', '#2fb9d9')
  $('#player1Name').css('border-color', '#2fb9d9')
})
gSock.on('p2Buzz', () => {
  $('#player2Ans').css('border-color', '#ED9121')
  $('#player2Name').css('border-color', '#ED9121')
})
gSock.on('p2Unbuzz', () => {
  $('#player2Ans').css('border-color', '#2fb9d9')
  $('#player2Name').css('border-color', '#2fb9d9')
})
gSock.on('p3Buzz', () => {
  $('#player3Ans').css('border-color', '#ED9121')
  $('#player3Name').css('border-color', '#ED9121')
})
gSock.on('p3Unbuzz', () => {
  $('#player3Ans').css('border-color', '#2fb9d9')
  $('#player3Name').css('border-color', '#2fb9d9')
})
gSock.on('p1Continue', () => {
  $('#player1Ans p').text('Tiếp tục')
})
gSock.on('p2Continue', () => {
  $('#player2Ans p').text('Tiếp tục')
})
gSock.on('p3Continue', () => {
  $('#player3Ans p').text('Tiếp tục')
})
gSock.on('p1Stop', () => {
  $('#player1Ans p').text('Dừng lại')
})
gSock.on('p2Stop', () => {
  $('#player2Ans p').text('Dừng lại')
})
gSock.on('p3Stop', () => {
  $('#player3Ans p').text('Dừng lại')
})

let currentAns
gSock.on('p1gianhquyen', data => {
  currentAns = data
  $('#player1Ans p').text(data)
  $('#player2Ans p').text(data)
  $('#player3Ans p').text(data)
  changePlayerAnswerDivBorderColors('buzzed')
  $('#player1Ans').css('border-color', '#FFD700')
  $('#player1Name').css('border-color', '#FFD700')
  $(`#ans${data}`).css('border-color', '#ED9121')
  $(`#letter${data}`).css('border-color', '#ED9121')
  stopTimer()
})
gSock.on('p2gianhquyen', data => {
  currentAns = data
  $('#player1Ans p').text(data)
  $('#player2Ans p').text(data)
  $('#player3Ans p').text(data)
  changePlayerAnswerDivBorderColors('buzzed')
  $('#player2Ans').css('border-color', '#FFD700')
  $('#player2Name').css('border-color', '#FFD700')
  $(`#ans${data}`).css('border-color', '#ED9121')
  $(`#letter${data}`).css('border-color', '#ED9121')
  stopTimer()
})
gSock.on('p3gianhquyen', data => {
  currentAns = data
  $('#player1Ans p').text(data)
  $('#player2Ans p').text(data)
  $('#player3Ans p').text(data)
  changePlayerAnswerDivBorderColors('buzzed')
  $('#player3Ans').css('border-color', '#FFD700')
  $('#player3Name').css('border-color', '#FFD700')
  $(`#ans${data}`).css('border-color', '#ED9121')
  $(`#letter${data}`).css('border-color', '#ED9121')
  stopTimer()
})

let originalAnsA, originalAnsB, originalAnsC
gSock.on('highlightChosenAnswer', data => {
  console.log(data)
  currentAns = data
  console.log(currentAns.length)
  if (currentAns.length == 1) {
    $(`#ans${currentAns}`).css('border-color', '#ED9121')
    $(`#letter${currentAns}`).css('border-color', '#ED9121')
  }
  else if (currentAns.length == 2) {
    $(`#ans${currentAns[0]}`).css('border-color', '#ED9121')
    $(`#letter${currentAns[0]}`).css('border-color', '#ED9121')
    $(`#ans${currentAns[1]}`).css('border-color', '#ED9121')
    $(`#letter${currentAns[1]}`).css('border-color', '#ED9121')
  }
  else if (currentAns.length == 3) {
    originalAnsA = $('#ansA').text()
    originalAnsB = $('#ansB').text()
    originalAnsC = $('#ansC').text()
    changeAllAnsBorderColors('buzzed')
    changeAnsPosition(currentAns)
  }
  stopTimer()
})

gSock.on('correctAns', () => {
  correctSound.play()
  changePlayerAnswerDivBorderColors('correct')
  if (currentAns.length == 1) {
    $(`#ans${currentAns}`).css('border-color', '#7CFC00')
    $(`#letter${currentAns}`).css('border-color', '#7CFC00')
  }
  else if (currentAns.length == 2) {
    $(`#ans${currentAns[0]}`).css('border-color', '#7CFC00')
    $(`#letter${currentAns[0]}`).css('border-color', '#7CFC00')
    $(`#ans${currentAns[1]}`).css('border-color', '#7CFC00')
    $(`#letter${currentAns[1]}`).css('border-color', '#7CFC00')
  }
  else if (currentAns.length == 3) {
    changeAllAnsBorderColors('correct')
  }
})

gSock.on('wrongAns', () => {
  incorrectSound.play()
  changePlayerAnswerDivBorderColors('wrong')
  if (currentAns.length == 1) {
    $(`#ans${currentAns}`).css('border-color', '#C00000')
    $(`#letter${currentAns}`).css('border-color', '#C00000')
  }
  else if (currentAns.length == 2) {
    $(`#ans${currentAns[0]}`).css('border-color', '#C00000')
    $(`#letter${currentAns[0]}`).css('border-color', '#C00000')
    $(`#ans${currentAns[1]}`).css('border-color', '#C00000')
    $(`#letter${currentAns[1]}`).css('border-color', '#C00000')
  }
  else if (currentAns.length == 3) {
    changeAllAnsBorderColors('wrong')
  }
})

function changeAnsPosition(ans) {
  if (ans == 'ABC') {
    $('#ansA td').text(originalAnsA)
    $('#ansB td').text(originalAnsB)
    $('#ansC td').text(originalAnsC)
    $('#letterA p').text('A')
    $('#letterB p').text('B')
    $('#letterC p').text('C')
  }
  else if (ans == 'ACB') {
    $('#ansA td').text(originalAnsA)
    $('#ansB td').text(originalAnsC)
    $('#ansC td').text(originalAnsB)
    $('#letterA p').text('A')
    $('#letterB p').text('C')
    $('#letterC p').text('B')
  }
  else if (ans == 'BAC') {
    $('#ansA td').text(originalAnsB)
    $('#ansB td').text(originalAnsA)
    $('#ansC td').text(originalAnsC)
    $('#letterA p').text('B')
    $('#letterB p').text('A')
    $('#letterC p').text('C')
  }
  else if (ans == 'BCA') {
    $('#ansA td').text(originalAnsB)
    $('#ansB td').text(originalAnsC)
    $('#ansC td').text(originalAnsA)
    $('#letterA p').text('B')
    $('#letterB p').text('C')
    $('#letterC p').text('A')
  }
  else if (ans == 'CAB') {
    $('#ansA td').text(originalAnsC)
    $('#ansB td').text(originalAnsA)
    $('#ansC td').text(originalAnsB)
    $('#letterA p').text('C')
    $('#letterB p').text('A')
    $('#letterC p').text('B')
  }
  else if (ans == 'CBA') {
    $('#ansA td').text(originalAnsC)
    $('#ansB td').text(originalAnsB)
    $('#ansC td').text(originalAnsA)
    $('#letterA p').text('C')
    $('#letterB p').text('B')
    $('#letterC p').text('A')
  }
}

gSock.on('gpxCorrectAns', data => {
  console.log(data)
  if (data.length == 1) {
    changeAllAnsBorderColors('normal')
    $(`#ans${data}`).css('border-color', '#7CFC00')
    $(`#letter${data}`).css('border-color', '#7CFC00')
  }
  else if (data.length == 2) {
    changeAllAnsBorderColors('normal')
    $(`#ans${data[0]}`).css('border-color', '#7CFC00')
    $(`#letter${data[0]}`).css('border-color', '#7CFC00')
    $(`#ans${data[1]}`).css('border-color', '#7CFC00')
    $(`#letter${data[1]}`).css('border-color', '#7CFC00')
  }
  else if (data.length == 3) {
    changeAllAnsBorderColors('normal')
    changeAnsPosition(data)
    changeAllAnsBorderColors('correct')
  }
})

gSock.on('fadeoutQnAGpx', () => {
  $('#gpxContainer').addClass('fade-out')
  $('#playerAnsContainer').addClass('disappearDownToUp')
  $('#playerAnsContainer').removeClass('appearUpToDown')
})
gSock.on('fadeinQnAGpx', () => {
  $('#gpxContainer').removeClass('fade-out')
  $('#gpxContainer').addClass('fade-in')
  $('#playerAnsContainer').removeClass('disappearDownToUp')
  $('#playerAnsContainer').addClass('appearUpToDown')
})
gSock.on('fadeoutMoneyGpx', () => {
  $('#divideMoneyAnswerContainer').addClass('fade-out')
})
gSock.on('fadeinMoneyGpx', () => {
  $('#divideMoneyAnswerContainer').addClass('fade-in')
  $('#divideMoneyAnswerContainer').removeClass('fade-out')
})
gSock.on('updateNumberOfHearts', data => {
  if (data == 3) {
    $('#heart1').css('background-color', 'white')
    $('#heart2').css('background-color', 'white')
    $('#heart3').css('background-color', 'white')
  }
  else if (data == 2) {
    $('#heart1').css('background-color', 'red')
    $('#heart2').css('background-color', 'white')
    $('#heart3').css('background-color', 'white')
  }
  else if (data == 1) {
    $('#heart1').css('background-color', 'red')
    $('#heart2').css('background-color', 'red')
    $('#heart3').css('background-color', 'white')
  }
  else if (data == 0) {
    $('#heart1').css('background-color', 'red')
    $('#heart2').css('background-color', 'red')
    $('#heart3').css('background-color', 'red')
  }
})

gSock.on('run15sStopOrGoAnimation', () => {
  stopOrGo15sSound.play()
  $('#fifteenSecTimer').removeClass('fade-out')
  $('#fifteenSecTimer').addClass('fade-in')
  $('#playerAnsContainer').addClass('appearUpToDown')
  setTimeout(() => {
    $('#fifteenSecTimer').addClass('fade-out')
  }, 17000)
  setTimeout(() => {
    $('#fifteenSecTimer').removeClass('fade-in')
    $('#fifteenSecTimer').removeClass('fade-out')
  }, 17500)
})

gSock.on('updateTime', data => {
  $('#fifteenSecTimer p').text(data)
})

gSock.on('playIntro', () => {
  introSound.play()
})
gSock.on('showMoney', () => {
  openingEntranceSound.play()
})
gSock.on('showMoneyIfCorrect', () => {
  questionAmountSound.play()
})
gSock.on('showMoneyIfWrong', () => {
  questionAmountSound.play()
})

gSock.on('stopAllSoundsAndPlayLockIn', () => {
  Howler.stop()
  lockInSound.play()
})
gSock.on('stopAllSoundsAndPlayStopOrGoPlay', () => {
  console.log('playOn')
  Howler.stop()
  playOnSound.play()
})
gSock.on('stopAllSoundsAndPlayStopOrGoStop', () => {
  console.log('stop')
  Howler.stop()
  stopSound.play()
})
gSock.on('stopAllSoundsAndPlaySharedLock', () => {
  Howler.stop()
  sharesLockSound.play()
})
gSock.on('playBedAfterAnswer', () => {
  bedAfterAnswerSound.play()
})
gSock.on('playWaitForCorrectAnswer', () => {
  waitCorrectAnswerSound.play()
})
gSock.on('playBedAfterAnswerUK', () => {
  bedAfterAnswerUKSound.play()
})
gSock.on('playContestantsEntrance', () => {
  contestantsEntranceSound.play()
})
gSock.on('playContestantsEntranceBed', () => {
  contestantsEntranceBedSound.play()
})
gSock.on('playWaitCorrectAnswerVio', () => {
  waitCorrectAnswerVioSound.play()
  setTimeout(() => {
    bedAfterAnswerUKSound.stop()
  }, 500)
})
gSock.on('playWaitCorrectAnswer', () => {
  waitCorrectAnswerSound.play()
})
gSock.on('playDivideFirstHalf', () => {
  divideFirstHalfSound.play()
})
gSock.on('playDivideSecondHalf', () => {
  divideSecondHalfSound.play()
})
gSock.on('play15sOpinion', () => {
  fifteenSecOpinionSound.play()
})
gSock.on('playShareBed', () => {
  shareBedSound.play()
})
gSock.on('playDivideSuccessBed', () => {
  divideSuccessBedSound.play()
})
gSock.on('playWinLoseBed', () => {
  winLoseSound.play()
})

gSock.on('stopAllSounds', () => {
  Howler.stop()
})

gSock.on('updatePlayerNames', (data) => {
  $('#player1Name p').text(data.p1)
  $('#player2Name p').text(data.p2)
  $('#player3Name p').text(data.p3)
})