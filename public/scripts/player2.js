p2Sock.on('init', data => {
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
  qP.css('opacity', '1')
  ansABtn.css('opacity', '1')
  ansBBtn.css('opacity', '1')
  ansCBtn.css('opacity', '1')

  qP.text('Bạn muốn tiếp tục hay dừng lại?')
  ansABtn.text('Tiếp tục')
  ansBBtn.text('Dừng lại')
  ansCBtn.text('')

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
  if (ans == 'A') {
    p2AnsP.append('A')
    if (numberOfTakeovers > 0)
      gianhquyenBtn.prop('disabled', false)
    let data = p2AnsP.text()
    p2Sock.emit('p2Ans', data)
    chooseAnsSound.play()
  }
  if (ans == 'B') {
    p2AnsP.append('B')
    if (numberOfTakeovers > 0)
      gianhquyenBtn.prop('disabled', false)
    let data = p2AnsP.text()
    p2Sock.emit('p2Ans', data)
    chooseAnsSound.play()
  }
  if (ans == 'C') {
    p2AnsP.append('C')
    if (numberOfTakeovers > 0)
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
p2Sock.on('play100s', () => {
  clockSound.play()
  Howler.stop()
})
p2Sock.on('play15sStopOrGo', () => {
  stopOrGo15sSound.play()
})
p2Sock.on('play15sOpinion', () => {
  fifteenSecOpinionSound.play()
})
p2Sock.on('stopAllSoundsAndPlayLockIn', () => {
  Howler.stop()
  lockInSound.play()
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
  qP.css('opacity', '1')
})
p2Sock.on('showA', () => {
  ansABtn.css('opacity', '1')
})
p2Sock.on('showB', () => {
  ansBBtn.css('opacity', '1')
})
p2Sock.on('showC', () => {
  ansCBtn.css('opacity', '1')
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
p2Sock.on('lockBuzzer', () => {
  buzzer.prop('disabled', true)
})
p2Sock.on('unlockBuzzer', () => {
  buzzer.prop('disabled', false)
})

//Question received
p2Sock.on('newQnA', (data, money) => {
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
  ansABtn.text(data.a)
  ansBBtn.text(data.b)
  ansCBtn.text(data.c)
})
p2Sock.on('updateNumberOfTakeovers', data => {
  updateNumberOfTakeovers(data)
})
p2Sock.on('updateNumberOfHearts', data => {
  updateNumberOfHearts(data)
})