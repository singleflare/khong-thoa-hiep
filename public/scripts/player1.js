p1Sock.on('init', data => {
  qDiv.text(data.q)
  ansADiv.text(data.ansA)
  ansBDiv.text(data.ansB)
  ansCDiv.text(data.ansC)
  currentTotalDiv.text(data.currentTotalVar)
  p1AnsP.text(data.player1Ans)
  p2AnsP.text(data.player2Ans)
  p3AnsP.text(data.player3Ans)
  p1NameP.text(data.player1Name)
  p2NameP.text(data.player2Name)
  p3NameP.text(data.player3Name)
  updateNumberOfHearts(data.numberOfHearts)
  updateNumberOfTakeovers(data.numberOfTakeovers)
})

ansABtn.on('click', () => {
  normalRoundAnsEventHandler('A')
})
ansBBtn.on('click', () => {
  normalRoundAnsEventHandler('B')
})
ansCBtn.on('click', () => {
  normalRoundAnsEventHandler('C')
})
delBtn.on('click', () => {
  p1AnsP.text('')
  gianhquyenBtn.prop('disabled', true)
  let data = p1AnsP.text()
  p1Sock.emit('p1Ans', data)
})
gianhquyenBtn.on('click', () => {
  p1Sock.emit('p1gianhquyen', p1AnsP.text())
  Howler.stop()
  lockInSound.play()
})

function pressBuzzer() {
  if (buzzerPressed == false) {
    buzzerPressed = true
    p1AnsDiv.css('border-color', '#ED9121')
    p1NameDiv.css('border-color', '#ED9121')
    p1Sock.emit('p1Buzz')
  }
  else {
    buzzerPressed = false
    p1AnsDiv.css('border-color', '#358BA0')
    p1NameDiv.css('border-color', '#358BA0')
    p1Sock.emit('p1Unbuzz')
  }
}

function stopOrGo() {
  stopOrGoMode = true
  disableAnswers()
  qDiv.css('opacity', '1')
  ansADiv.css('opacity', '1')
  ansBDiv.css('opacity', '1')
  ansCDiv.css('opacity', '1')

  qDiv.text('Bạn muốn tiếp tục hay dừng lại?')
  ansADiv.text('Tiếp tục')
  ansBDiv.text('Dừng lại')
  ansCDiv.text('')

  ansABtn.on('click', () => {
    p1AnsP.text('Tiếp tục')
    p1Sock.emit('p1Continue')
  })
  ansBBtn.on('click', () => {
    p1AnsP.text('Dừng lại')
    p1Sock.emit('p1Stop')
  })
}

function normalRoundAnsEventHandler(ans) {
  console.log(p1AnsP)
  if (ans == 'A' && p1AnsP.text().length < 3) {
    p1AnsP.append('A')
    if (numberOfTakeovers > 0 && stopOrGoMode == false && divideMode == false) gianhquyenBtn.prop('disabled', false)
    let data = p1AnsP.text()
    p1Sock.emit('p1Ans', data)
    chooseAnsSound.play()
  }
  if (ans == 'B' && p1AnsP.text().length < 3) {
    p1AnsP.append('B')
    if (numberOfTakeovers > 0 && stopOrGoMode == false && divideMode == false)
      gianhquyenBtn.prop('disabled', false)
    let data = p1AnsP.text()
    p1Sock.emit('p1Ans', data)
    chooseAnsSound.play()
  }
  if (ans == 'C' && p1AnsP.text().length < 3) {
    p1AnsP.append('C')
    if (numberOfTakeovers > 0 && stopOrGoMode == false && divideMode == false)
      gianhquyenBtn.prop('disabled', false)
    let data = p1AnsP.text()
    p1Sock.emit('p1Ans', data)
    chooseAnsSound.play()
  }
}

p1Sock.on('p3Ans', data => {
  p3AnsP.text(data)
  chooseAnsSound.play()
})
p1Sock.on('p2Ans', data => {
  p2AnsP.text(data)
  chooseAnsSound.play()
})
p1Sock.on('p3gianhquyen', data => {
  p3AnsP.text(data)
  p2AnsP.text(data)
  p1AnsP.text(data)
  changePlayerAnserDivBorderColors('buzzed')
  p3AnsDiv.css('border-color', '#FFD700')
  p3NameDiv.css('border-color', '#FFD700')
  buzzer.prop('disabled', true)
  gianhquyenBtn.prop('disabled', true)
  disableAnswers()
  Howler.stop()
  lockInSound.play()
})
p1Sock.on('p2gianhquyen', data => {
  p3AnsP.text(data)
  p2AnsP.text(data)
  p1AnsP.text(data)
  changePlayerAnserDivBorderColors('buzzed')
  p2AnsDiv.css('border-color', '#FFD700')
  p2NameDiv.css('border-color', '#FFD700')
  buzzer.prop('disabled', true)
  gianhquyenBtn.prop('disabled', true)
  disableAnswers()
  Howler.stop()
  lockInSound.play()
})
p1Sock.on('p1gianhquyen', data => {
  p3AnsP.text(data)
  p2AnsP.text(data)
  p1AnsP.text(data)
  changePlayerAnserDivBorderColors('buzzed')
  p1AnsDiv.css('border-color', '#FFD700')
  p1NameDiv.css('border-color', '#FFD700')
  buzzer.prop('disabled', true)
  gianhquyenBtn.prop('disabled', true)
  disableAnswers()
})
p1Sock.on('p2Buzz', () => {
  p2AnsDiv.css('border-color', '#ED9121')
  p2NameDiv.css('border-color', '#ED9121')
})
p1Sock.on('p3Buzz', () => {
  p3AnsDiv.css('border-color', '#ED9121')
  p3NameDiv.css('border-color', '#ED9121')
})
p1Sock.on('p2Unbuzz', () => {
  p2AnsDiv.css('border-color', '#358BA0')
  p2NameDiv.css('border-color', '#358BA0')
})
p1Sock.on('p3Unbuzz', () => {
  p3AnsDiv.css('border-color', '#358BA0')
  p3NameDiv.css('border-color', '#358BA0')
})
p1Sock.on('p2Continue', () => {
  p2AnsP.text('Tiếp tục')
})
p1Sock.on('p2Stop', () => {
  p2AnsP.text('Dừng lại')
})
p1Sock.on('p3Continue', () => {
  p3AnsP.text('Tiếp tục')
})
p1Sock.on('p3Stop', () => {
  p3AnsP.text('Dừng lại')
})

p1Sock.on('lockBuzzerAndTakeover', () => {
  buzzer.prop('disabled', true)
  gianhquyenBtn.prop('disabled', true)
})

p1Sock.on('play100s', () => {
  Howler.stop()
  clockSound.play()
  enableAnswers()
})
p1Sock.on('play15sStopOrGo', () => {
  stopOrGo15sSound.play()
  enableAnswers()
})
p1Sock.on('play15sOpinion', () => {
  fifteenSecOpinionSound.play()
})

p1Sock.on('stopAllSoundsAndPlayLockIn', () => {
  Howler.stop()
  lockInSound.play()
  disableAnswers()
  buzzer.prop('disabled', true)
})
p1Sock.on('stopAllSoundsAndPlayStopOrGoPlay', () => {
  Howler.stop()
  playOnSound.play()
})
p1Sock.on('stopAllSoundsAndPlayStopOrGoStop', () => {
  Howler.stop()
  stopSound.play()
})
p1Sock.on('stopAllSoundsAndPlaySharedLock', () => {
  Howler.stop()
  sharesLockSound.play()
})
p1Sock.on('playBedAfterAnswer', () => {
  bedAfterAnswerSound.play()
})
p1Sock.on('playShareBed', () => {
  shareBedSound.play()
})
p1Sock.on('playWinLoseBed', () => {
  winLoseSound.play()
})
p1Sock.on('playOutro', () => {
  outroSound.play()
})
p1Sock.on('stopAllSounds', () => {
  Howler.stop()
})

p1Sock.on('showQ', () => {
  revealQuestionSound.play()
  qDiv.css('opacity', '1')
})
p1Sock.on('showA', () => {
  ansADiv.css('opacity', '1')
})
p1Sock.on('showB', () => {
  ansBDiv.css('opacity', '1')
})
p1Sock.on('showC', () => {
  ansCDiv.css('opacity', '1')
})
p1Sock.on('correctAns', () => {
  changePlayerAnserDivBorderColors('correct')
})
p1Sock.on('wrongAns', () => {
  changePlayerAnserDivBorderColors('wrong')
})
p1Sock.on('resetPlayerAnswers', () => {
  resetPlayerAnswers()
})
p1Sock.on('resetTimeAndMoneyCountdown', () => {
  resetTimeAndMoneyCountdown()
})
p1Sock.on('divideMoneyRound', (data) => {
  divideMode = true
  qDiv.css('opacity', '1')
  rnqDiv.text('Chia tiền')
  qDiv.text('Bạn chọn mức tiền nào?')
  ansADiv.css('opacity', '0')
  ansBDiv.css('opacity', '0')
  ansCDiv.css('opacity', '0')
  ansADiv.text(data.a)
  ansBDiv.text(data.b)
  ansCDiv.text(data.c)
})
p1Sock.on('lockBuzzer', () => {
  buzzer.prop('disabled', true)
})
p1Sock.on('unlockBuzzer', () => {
  buzzer.prop('disabled', false)
})

//Question received
p1Sock.on('newQnA', (data, money) => {
  stopOrGoMode = false
  divideMode = false
  disableAnswers()
  newQuestionGraphicsReset()
  thisQuestionMoneyDiv.text(money)
  rnqDiv.text(data.i)
  qDiv.text(data.q)
  ansADiv.text(data.a)
  ansBDiv.text(data.b)
  ansCDiv.text(data.c)
  ansABtn.off('click')
  ansBBtn.off('click')
  ansCBtn.off('click')
  ansABtn.on('click', () => {
    normalRoundAnsEventHandler('A')
  })
  ansBBtn.on('click', () => {
    normalRoundAnsEventHandler('B')
  })
  ansCBtn.on('click', () => {
    normalRoundAnsEventHandler('C')
  })
})
p1Sock.on('stopOrGoMode', data => {
  rnqDiv.text(data)
  stopOrGo()
})
p1Sock.on('buzzedIsFalse', () => {
  buzzerPressed = false
})

p1Sock.on('playIntro', () => {
  introSound.play()
})
p1Sock.on('playOpeningEntrance', () => {
  openingEntranceSound.play()
})
p1Sock.on('playContestantsEntrance', () => {
  contestantsEntranceSound.play()
})
p1Sock.on('playWaitCorrectAnswer', () => {
  waitCorrectAnswerSound.play()
})
p1Sock.on('updateCdMoney', data => {
  thisQuestionMoneyDiv.text(data)
})
p1Sock.on('updateTime', data => {
  timerText.text(data)
})
p1Sock.on('updateCurrentTotal', data => {
  hideMoneyIfWrongAndCorrect()
  currentTotalDiv.text(data)
})
p1Sock.on('showMoneyIfCorrect', data => {
  moneyIfCorrectDiv.text(data)
  questionAmountSound.play()
})
p1Sock.on('showMoneyIfWrong', data => {
  moneyIfWrongDiv.text(data)
  questionAmountSound.play()
})
p1Sock.on('updateDividedMoneyAnswers', data => {
  ansADiv.text(data.a)
  ansBDiv.text(data.b)
  ansCDiv.text(data.c)
})
p1Sock.on('updateNumberOfTakeovers', data => {
  console.log(data)
  updateNumberOfTakeovers(data)
})
p1Sock.on('updateNumberOfHearts', data => {
  updateNumberOfHearts(data)
})
p1Sock.on('updatePlayerNames', data => {
  p1NameP.text(data.p1)
  p2NameP.text(data.p2)
  p3NameP.text(data.p3)
})
p1Sock.on('disableAnswers', () => {
  disableAnswers()
})
p1Sock.on('enableAnswers', () => {
  enableAnswers()
})

p1Sock.on('playBedAfterAnswerUK', () => {
  bedAfterAnswerUKSound.play()
})
p1Sock.on('playContestantsEntranceBed', () => {
  contestantsEntranceBedSound.play()
})
p1Sock.on('playWaitCorrectAnswerVio', () => {
  waitCorrectAnswerVioSound.play()
  setTimeout(() => {
    bedAfterAnswerUKSound.stop()
  }, 500)
})
p1Sock.on('playDivideFirstHalf', () => {
  divideFirstHalfSound.play()
  enableAnswers()
})
p1Sock.on('playDivideSecondHalf', () => {
  divideSecondHalfSound.play()
  enableAnswers()
})
p1Sock.on('playDivideSuccessBed', () => {
  divideSuccessBedSound.play()
})