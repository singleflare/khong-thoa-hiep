p3Sock.on('init', data => {
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
  p3AnsP.text('')
  gianhquyenBtn.prop('disabled', true)
  let data = p3AnsP.text()
  p3Sock.emit('p3Ans', data)
})
gianhquyenBtn.on('click', () => {
  p3Sock.emit('p3gianhquyen', p3AnsP.text())
  Howler.stop()
  lockInSound.play()
})

function pressBuzzer() {
  if (buzzerPressed == false) {
    buzzerPressed = true
    p3AnsDiv.css('border-color', 'rgb(237, 145, 33)')
    p3NameDiv.css('border-color', 'rgb(237, 145, 33)')
    p3Sock.emit('p3Buzz')
  }
  else {
    buzzerPressed = false
    p3AnsDiv.css('border-color', '#358BA0')
    p3NameDiv.css('border-color', '#358BA0')
    p3Sock.emit('p3Unbuzz')
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
    p3AnsP.text('Tiếp tục')
    p3Sock.emit('p3Continue')
  })
  ansBBtn.on('click', () => {
    p3AnsP.text('Dừng lại')
    p3Sock.emit('p3Stop')
  })
}

function normalRoundAnsEventHandler(ans) {
  if (ans == 'A' && p3AnsP.text().length < 3) {
    p3AnsP.append('A')
    if (numberOfTakeovers > 0 && stopOrGoMode == false && divideMode == false)
      gianhquyenBtn.prop('disabled', false)
    let data = p3AnsP.text()
    p3Sock.emit('p3Ans', data)
    chooseAnsSound.play()
  }
  if (ans == 'B' && p3AnsP.text().length < 3) {
    p3AnsP.append('B')
    if (numberOfTakeovers > 0 && stopOrGoMode == false && divideMode == false)
      gianhquyenBtn.prop('disabled', false)
    let data = p3AnsP.text()
    p3Sock.emit('p3Ans', data)
    chooseAnsSound.play()
  }
  if (ans == 'C' && p3AnsP.text().length < 3) {
    p3AnsP.append('C')
    if (numberOfTakeovers > 0 && stopOrGoMode == false && divideMode == false)
      gianhquyenBtn.prop('disabled', false)
    let data = p3AnsP.text()
    p3Sock.emit('p3Ans', data)
    chooseAnsSound.play()
  }
}

p3Sock.on('p1Ans', data => {
  p1AnsP.text(data)
  chooseAnsSound.play()
})
p3Sock.on('p1gianhquyen', data => {
  p3AnsP.text(data)
  p2AnsP.text(data)
  p1AnsP.text(data)
  changePlayerAnserDivBorderColors('buzzed')
  p1AnsDiv.css('border-color', '#FFD700')
  p1NameDiv.css('border-color', '#FFD700')
  gianhquyenBtn.prop('disabled', true)
  buzzer.prop('disabled', true)
  disableAnswers()
  Howler.stop()
  lockInSound.play()
})
p3Sock.on('p2Ans', data => {
  p2AnsP.text(data)
})
p3Sock.on('p2gianhquyen', data => {
  p3AnsP.text(data)
  p2AnsP.text(data)
  p1AnsP.text(data)
  changePlayerAnserDivBorderColors('buzzed')
  p2AnsDiv.css('border-color', '#FFD700')
  p2NameDiv.css('border-color', '#FFD700')
  gianhquyenBtn.prop('disabled', true)
  buzzer.prop('disabled', true)
  disableAnswers()
  Howler.stop()
  lockInSound.play()
})
p3Sock.on('p3gianhquyen', data => {
  p3AnsP.text(data)
  p2AnsP.text(data)
  p1AnsP.text(data)
  changePlayerAnserDivBorderColors('buzzed')
  p3AnsDiv.css('border-color', '#FFD700')
  p3NameDiv.css('border-color', '#FFD700')
  gianhquyenBtn.prop('disabled', true)
  buzzer.prop('disabled', true)
  disableAnswers()
})
p3Sock.on('p1Stop', () => {
  p1AnsP.text('Dừng lại')
})
p3Sock.on('p2Stop', () => {
  p2AnsP.text('Dừng lại')
})
p3Sock.on('p1Continue', () => {
  p1AnsP.text('Tiếp tục')
})
p3Sock.on('p2Continue', () => {
  p2AnsP.text('Tiếp tục')
})
p3Sock.on('p2Buzz', () => {
  p2AnsDiv.css('border-color', 'rgb(237, 145, 33)')
  p2NameDiv.css('border-color', 'rgb(237, 145, 33)')
})
p3Sock.on('p1Buzz', () => {
  p1AnsDiv.css('border-color', 'rgb(237, 145, 33)')
  p1NameDiv.css('border-color', 'rgb(237, 145, 33)')
})
p3Sock.on('p2Unbuzz', () => {
  p2AnsDiv.css('border-color', '#358BA0')
  p2NameDiv.css('border-color', '#358BA0')
})
p3Sock.on('p1Unbuzz', () => {
  p1AnsDiv.css('border-color', '#358BA0')
  p1NameDiv.css('border-color', '#358BA0')
})

p3Sock.on('lockBuzzerAndTakeover', () => {
  buzzer.prop('disabled', true)
  gianhquyenBtn.prop('disabled', true)
})

p3Sock.on('play100s', () => {
  Howler.stop()
  clockSound.play()
  enableAnswers()
})
p3Sock.on('play15sStopOrGo', () => {
  stopOrGo15sSound.play()
  enableAnswers()
})
p3Sock.on('play15sOpinion', () => {
  fifteenSecOpinionSound.play()
})
p3Sock.on('stopAllSoundsAndPlayLockIn', () => {
  Howler.stop()
  lockInSound.play()
  disableAnswers()
  buzzer.prop('disabled', true)
})
p3Sock.on('stopAllSoundsAndPlayStopOrGoPlay', () => {
  Howler.stop()
  playOnSound.play()
})
p3Sock.on('stopAllSoundsAndPlayStopOrGoStop', () => {
  Howler.stop()
  stopSound.play()
})
p3Sock.on('stopAllSoundsAndPlaySharedLock', () => {
  Howler.stop()
  sharesLockSound.play()
})
p3Sock.on('playBedAfterAnswer', () => {
  bedAfterAnswerSound.play()
})
p3Sock.on('playShareBed', () => {
  shareBedSound.play()
})
p3Sock.on('playWinLoseBed', () => {
  winLoseSound.play()
})
p3Sock.on('playOutro', () => {
  outroSound.play()
})
p3Sock.on('stopAllSounds', () => {
  Howler.stop()
})

p3Sock.on('showQ', () => {
  revealQuestionSound.play()
  qDiv.css('opacity', '1')
})
p3Sock.on('showA', () => {
  ansADiv.css('opacity', '1')
})
p3Sock.on('showB', () => {
  ansBDiv.css('opacity', '1')
})
p3Sock.on('showC', () => {
  ansCDiv.css('opacity', '1')
})
p3Sock.on('correctAns', () => {
  changePlayerAnserDivBorderColors('correct')
})
p3Sock.on('wrongAns', () => {
  changePlayerAnserDivBorderColors('wrong')
})
p3Sock.on('resetPlayerAnswers', () => {
  resetPlayerAnswers()
})
p3Sock.on('resetTimeAndMoneyCountdown', () => {
  resetTimeAndMoneyCountdown()
})
p3Sock.on('divideMoneyRound', (data) => {
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
p3Sock.on('lockBuzzer', () => {
  buzzer.prop('disabled', true)
})
p3Sock.on('unlockBuzzer', () => {
  buzzer.prop('disabled', false)
})

//Question received
p3Sock.on('newQnA', (data, money) => {
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
p3Sock.on('stopOrGoMode', data => {
  rnqDiv.text(data)
  stopOrGo()
})
p3Sock.on('buzzedIsFalse', () => {
  buzzerPressed = false
})

p3Sock.on('playIntro', () => {
  introSound.play()
})
p3Sock.on('playOpeningEntrance', () => {
  openingEntranceSound.play()
})
p3Sock.on('playContestantsEntrance', () => {
  contestantsEntranceSound.play()
})
p3Sock.on('playWaitCorrectAnswer', () => {
  waitCorrectAnswerSound.play()
})
p3Sock.on('updateCdMoney', data => {
  thisQuestionMoneyDiv.text(data)
})
p3Sock.on('updateTime', data => {
  timerText.text(data)
})
p3Sock.on('updateCurrentTotal', data => {
  hideMoneyIfWrongAndCorrect()
  currentTotalDiv.text(data)
})
p3Sock.on('showMoneyIfCorrect', data => {
  moneyIfCorrectDiv.text(data)
  questionAmountSound.play()
})
p3Sock.on('showMoneyIfWrong', data => {
  moneyIfWrongDiv.text(data)
  questionAmountSound.play()
})
p3Sock.on('updateDividedMoneyAnswers', data => {
  ansADiv.text(data.a)
  ansBDiv.text(data.b)
  ansCDiv.text(data.c)
})
p3Sock.on('updateNumberOfTakeovers', data => {
  updateNumberOfTakeovers(data)
})
p3Sock.on('updateNumberOfHearts', data => {
  updateNumberOfHearts(data)
})
p3Sock.on('updatePlayerNames', data => {
  p1NameP.text(data.p1)
  p2NameP.text(data.p2)
  p3NameP.text(data.p3)
})
p3Sock.on('disableAnswers', () => {
  disableAnswers()
})
p3Sock.on('enableAnswers', () => {
  enableAnswers()
})

p3Sock.on('playBedAfterAnswerUK', () => {
  bedAfterAnswerUKSound.play()
})
p3Sock.on('playContestantsEntranceBed', () => {
  contestantsEntranceBedSound.play()
})
p3Sock.on('playWaitCorrectAnswerVio', () => {
  waitCorrectAnswerVioSound.play()
  setTimeout(() => {
    bedAfterAnswerUKSound.stop()
  }, 500)
})
p3Sock.on('playDivideFirstHalf', () => {
  divideFirstHalfSound.play()
  enableAnswers()
})
p3Sock.on('playDivideSecondHalf', () => {
  divideSecondHalfSound.play()
  enableAnswers()
})
p3Sock.on('playDivideSuccessBed', () => {
  divideSuccessBedSound.play()
})