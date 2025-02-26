p2Sock.on('init', data => {
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
  p2AnsP.text('')
  gianhquyenBtn.prop('disabled', true)
  let data = p2AnsP.text()
  p2Sock.emit('p2Ans', data)
})
gianhquyenBtn.on('click', () => {
  p2Sock.emit('p2gianhquyen', p2AnsP.text())
  Howler.stop()
  lockInSound.play()
})

function pressBuzzer() {
  if (buzzerPressed == false) {
    buzzerPressed = true
    p2AnsDiv.css('border-color', 'rgb(237, 145, 33)')
    p2NameDiv.css('border-color', 'rgb(237, 145, 33)')
    p2Sock.emit('p2Buzz')
  }
  else {
    buzzerPressed = false
    p2AnsDiv.css('border-color', '#358BA0')
    p2NameDiv.css('border-color', '#358BA0')
    p2Sock.emit('p2Unbuzz')
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
    p2AnsP.text('Tiếp tục')
    p2Sock.emit('p2Continue')
  })
  ansBBtn.on('click', () => {
    p2AnsP.text('Dừng lại')
    p2Sock.emit('p2Stop')
  })
}

function normalRoundAnsEventHandler(ans) {
  if (ans == 'A' && p2AnsP.text().length < 3) {
    p2AnsP.append('A')
    if (numberOfTakeovers > 0 && stopOrGoMode == false && divideMode == false)
      gianhquyenBtn.prop('disabled', false)
    let data = p2AnsP.text()
    p2Sock.emit('p2Ans', data)
    chooseAnsSound.play()
  }
  if (ans == 'B' && p2AnsP.text().length < 3) {
    p2AnsP.append('B')
    if (numberOfTakeovers > 0 && stopOrGoMode == false && divideMode == false)
      gianhquyenBtn.prop('disabled', false)
    let data = p2AnsP.text()
    p2Sock.emit('p2Ans', data)
    chooseAnsSound.play()
  }
  if (ans == 'C' && p2AnsP.text().length < 3) {
    p2AnsP.append('C')
    if (numberOfTakeovers > 0 && stopOrGoMode == false && divideMode == false)
      gianhquyenBtn.prop('disabled', false)
    let data = p2AnsP.text()
    p2Sock.emit('p2Ans', data)
    chooseAnsSound.play()
  }
}

p2Sock.on('p1Ans', data => {
  p1AnsP.text(data)
  chooseAnsSound.play()
})
p2Sock.on('p3Ans', data => {
  p3AnsP.text(data)
})
p2Sock.on('p1gianhquyen', data => {
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
p2Sock.on('p3gianhquyen', data => {
  p3AnsP.text(data)
  p2AnsP.text(data)
  p1AnsP.text(data)
  changePlayerAnserDivBorderColors('buzzed')
  p3AnsDiv.css('border-color', '#FFD700')
  p3NameDiv.css('border-color', '#FFD700')
  gianhquyenBtn.prop('disabled', true)
  buzzer.prop('disabled', true)
  disableAnswers()
  Howler.stop()
  lockInSound.play()
})
p2Sock.on('p2gianhquyen', data => {
  p3AnsP.text(data)
  p2AnsP.text(data)
  p1AnsP.text(data)
  changePlayerAnserDivBorderColors('buzzed')
  p2AnsDiv.css('border-color', '#FFD700')
  p2NameDiv.css('border-color', '#FFD700')
  gianhquyenBtn.prop('disabled', true)
  buzzer.prop('disabled', true)
  disableAnswers()
})
p2Sock.on('p1Buzz', () => {
  p1AnsDiv.css('border-color', 'rgb(237, 145, 33)')
  p1NameDiv.css('border-color', 'rgb(237, 145, 33)')
})
p2Sock.on('p3Buzz', () => {
  p3AnsDiv.css('border-color', 'rgb(237, 145, 33)')
  p3NameDiv.css('border-color', 'rgb(237, 145, 33)')
})
p2Sock.on('p1Unbuzz', () => {
  p1AnsDiv.css('border-color', '#358BA0')
  p1NameDiv.css('border-color', '#358BA0')
})
p2Sock.on('p3Unbuzz', () => {
  p3AnsDiv.css('border-color', '#358BA0')
  p3NameDiv.css('border-color', '#358BA0')
})
p2Sock.on('p1Stop', () => {
  p1AnsP.text('Dừng lại')
  console.log('p1Stop')
})
p2Sock.on('p3Stop', () => {
  p3AnsP.text('Dừng lại')
})
p2Sock.on('p1Continue', () => {
  p1AnsP.text('Tiếp tục')
})
p2Sock.on('p3Continue', () => {
  p3AnsP.text('Tiếp tục')
})

p2Sock.on('lockBuzzerAndTakeover', () => {
  buzzer.prop('disabled', true)
  gianhquyenBtn.prop('disabled', true)
})

p2Sock.on('play100s', () => {
  Howler.stop()
  clockSound.play()
  enableAnswers()

})
p2Sock.on('play15sStopOrGo', () => {
  stopOrGo15sSound.play()
  enableAnswers()
})
p2Sock.on('play15sOpinion', () => {
  fifteenSecOpinionSound.play()
})
p2Sock.on('stopAllSoundsAndPlayLockIn', () => {
  Howler.stop()
  lockInSound.play()
  disableAnswers()
  buzzer.prop('disabled', true)
})
p2Sock.on('stopAllSoundsAndPlayStopOrGoPlay', () => {
  Howler.stop()
  playOnSound.play()
})
p2Sock.on('stopAllSoundsAndPlayStopOrGoStop', () => {
  Howler.stop()
  stopSound.play()

})
p2Sock.on('stopAllSoundsAndPlaySharedLock', () => {
  Howler.stop()
  sharesLockSound.play()
})
p2Sock.on('playBedAfterAnswer', () => {
  bedAfterAnswerSound.play()
})
p2Sock.on('playShareBed', () => {
  shareBedSound.play()
})
p2Sock.on('playWinLoseBed', () => {
  winLoseSound.play()
})
p2Sock.on('playOutro', () => {
  outroSound.play()
})
p2Sock.on('stopAllSounds', () => {
  Howler.stop()
})

p2Sock.on('showQ', () => {
  revealQuestionSound.play()
  qDiv.css('opacity', '1')
})
p2Sock.on('showA', () => {
  ansADiv.css('opacity', '1')
})
p2Sock.on('showB', () => {
  ansBDiv.css('opacity', '1')
})
p2Sock.on('showC', () => {
  ansCDiv.css('opacity', '1')
})
p2Sock.on('correctAns', () => {
  changePlayerAnserDivBorderColors('correct')
})
p2Sock.on('wrongAns', () => {
  changePlayerAnserDivBorderColors('wrong')
})
p2Sock.on('resetPlayerAnswers', () => {
  resetPlayerAnswers()
})
p2Sock.on('resetTimeAndMoneyCountdown', () => {
  resetTimeAndMoneyCountdown()
})
p2Sock.on('divideMoneyRound', (data) => {
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
p2Sock.on('lockBuzzer', () => {
  buzzer.prop('disabled', true)
})
p2Sock.on('unlockBuzzer', () => {
  buzzer.prop('disabled', false)
})

//Question received
p2Sock.on('newQnA', (data, money) => {
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
p2Sock.on('stopOrGoMode', data => {
  rnqDiv.text(data)
  stopOrGo()
})
p2Sock.on('buzzedIsFalse', () => {
  buzzerPressed = false
})

p2Sock.on('playIntro', () => {
  introSound.play()
})
p2Sock.on('playOpeningEntrance', () => {
  openingEntranceSound.play()
})
p2Sock.on('playContestantsEntrance', () => {
  contestantsEntranceSound.play()
})
p2Sock.on('playWaitCorrectAnswer', () => {
  waitCorrectAnswerSound.play()
})
p2Sock.on('updateCdMoney', data => {
  thisQuestionMoneyDiv.text(data)
})
p2Sock.on('updateTime', data => {
  timerText.text(data)
})
p2Sock.on('updateCurrentTotal', data => {
  hideMoneyIfWrongAndCorrect()
  currentTotalDiv.text(data)
})
p2Sock.on('showMoneyIfCorrect', data => {
  moneyIfCorrectDiv.text(data)
  questionAmountSound.play()
})
p2Sock.on('showMoneyIfWrong', data => {
  moneyIfWrongDiv.text(data)
  questionAmountSound.play()
})
p2Sock.on('updateDividedMoneyAnswers', data => {
  ansADiv.text(data.a)
  ansBDiv.text(data.b)
  ansCDiv.text(data.c)
})
p2Sock.on('updateNumberOfTakeovers', data => {
  updateNumberOfTakeovers(data)
})
p2Sock.on('updateNumberOfHearts', data => {
  updateNumberOfHearts(data)
})
p2Sock.on('updatePlayerNames', data => {
  p1NameP.text(data.p1)
  p2NameP.text(data.p2)
  p3NameP.text(data.p3)
})
p2Sock.on('disableAnswers', () => {
  disableAnswers()
})
p2Sock.on('enableAnswers', () => {
  enableAnswers()
})

p2Sock.on('playBedAfterAnswerUK', () => {
  bedAfterAnswerUKSound.play()
})
p2Sock.on('playContestantsEntranceBed', () => {
  contestantsEntranceBedSound.play()
})
p2Sock.on('playWaitCorrectAnswerVio', () => {
  waitCorrectAnswerVioSound.play()
  setTimeout(() => {
    bedAfterAnswerUKSound.stop()
  }, 500)
})
p2Sock.on('playDivideFirstHalf', () => {
  divideFirstHalfSound.play()
  enableAnswers()
})
p2Sock.on('playDivideSecondHalf', () => {
  divideSecondHalfSound.play()
  enableAnswers()
})
p2Sock.on('playDivideSuccessBed', () => {
  divideSuccessBedSound.play()
})