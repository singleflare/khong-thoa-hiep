p1Sock.on('init', data => {
  console.log(data.currentTotal)
  ansABtn.text(data.ansA)
  ansBBtn.text(data.ansB)
  ansCBtn.text(data.ansC)
  currentTotalDiv.text(data.currentTotalVar)
  p1AnsP.text(data.player1Ans)
  p2AnsP.text(data.player2Ans)
  p3AnsP.text(data.player3Ans)
  p1NameP.text(data.player1Name)
  p2NameP.text(data.player2Name)
  p3NameP.text(data.player3Name)
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
  qP.css('opacity', '1')
  ansABtn.css('opacity', '1')
  ansBBtn.css('opacity', '1')
  ansCBtn.css('opacity', '1')

  qP.text('Bạn muốn tiếp tục hay dừng lại?')
  ansABtn.text('Tiếp tục')
  ansBBtn.text('Dừng lại')
  ansCBtn.text('')

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
  if (ans == 'A') {
    p1AnsP.append('A')
    if (numberOfTakeovers > 0)
      gianhquyenBtn.prop('disabled', false)
    let data = p1AnsP.text()
    p1Sock.emit('p1Ans', data)
    chooseAnsSound.play()
  }
  if (ans == 'B') {
    p1AnsP.append('B')
    if (numberOfTakeovers > 0)
      gianhquyenBtn.prop('disabled', false)
    let data = p1AnsP.text()
    p1Sock.emit('p1Ans', data)
    chooseAnsSound.play()
  }
  if (ans == 'C') {
    p1AnsP.append('C')
    if (numberOfTakeovers > 0)
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
  gianhquyenBtn.prop('disabled', true)
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
  gianhquyenBtn.prop('disabled', true)
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
  gianhquyenBtn.prop('disabled', true)
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
p1Sock.on('play100s', () => {
  clockSound.play()
  Howler.stop()
})
p1Sock.on('play15sStopOrGo', () => {
  stopOrGo15sSound.play()
})
p1Sock.on('play15sOpinion', () => {
  fifteenSecOpinionSound.play()
})
p1Sock.on('stopAllSoundsAndPlayLockIn', () => {
  Howler.stop()
  lockInSound.play()
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
  qP.css('opacity', '1')
})
p1Sock.on('showA', () => {
  ansABtn.css('opacity', '1')
})
p1Sock.on('showB', () => {
  ansBBtn.css('opacity', '1')
})
p1Sock.on('showC', () => {
  ansCBtn.css('opacity', '1')
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
  qP.css('opacity', '1')
  rnqDiv.text('Chia tiền')
  qP.text('Bạn chọn mức tiền nào?')
  ansABtn.css('opacity', '0')
  ansBBtn.css('opacity', '0')
  ansCBtn.css('opacity', '0')
  ansABtn.text(data.a)
  ansBBtn.text(data.b)
  ansCBtn.text(data.c)
})
p1Sock.on('lockBuzzer', () => {
  buzzer.prop('disabled', true)
})
p1Sock.on('unlockBuzzer', () => {
  buzzer.prop('disabled', false)
})

//Question received
p1Sock.on('newQnA', (data, money) => {
  newQuestionGraphicsReset()
  thisQuestionMoneyDiv.text(money)
  rnqDiv.text(data.i)
  qP.text(data.q)
  ansABtn.text(data.a)
  ansBBtn.text(data.b)
  ansCBtn.text(data.c)
  if (data.i == 'Vòng 1 Câu 1' || data.i == 'Vòng 2 Câu 1' || data.i == 'Vòng 3 Câu 1' || data.i == 'Vòng 4 Câu 1' || data.i == 'Vòng 5 Câu 1') {
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
  }
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
  ansABtn.text(data.a)
  ansBBtn.text(data.b)
  ansCBtn.text(data.c)
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

p1Sock.on('playBedAfterAnswerUK', () => {
  bedAfterAnswerUKSound.play()
})
p1Sock.on('playContestantsEntranceBed', () => {
  contestantsEntranceBedSound.play()
})
p1Sock.on('playWaitCorrectAnswerVio', () => {
  waitCorrectAnswerVioSound.play()
})
p1Sock.on('playDivideFirstHalf', () => {
  divideFirstHalfSound.play()
})
p1Sock.on('playDivideSecondHalf', () => {
  divideSecondHalfSound.play()
})