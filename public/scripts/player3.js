p3Sock.on('init', data => {
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
  qP.css('opacity', '1')
  ansABtn.css('opacity', '1')
  ansBBtn.css('opacity', '1')
  ansCBtn.css('opacity', '1')

  qP.text('Bạn muốn tiếp tục hay dừng lại?')
  ansABtn.text('Tiếp tục')
  ansBBtn.text('Dừng lại')
  ansCBtn.text('')

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
  if (ans == 'A') {
    p3AnsP.append('A')
    if (numberOfTakeovers > 0)
      gianhquyenBtn.prop('disabled', false)
    let data = p3AnsP.text()
    p3Sock.emit('p3Ans', data)
    chooseAnsSound.play()
  }
  if (ans == 'B') {
    p3AnsP.append('B')
    if (numberOfTakeovers > 0)
      gianhquyenBtn.prop('disabled', false)
    let data = p3AnsP.text()
    p3Sock.emit('p3Ans', data)
    chooseAnsSound.play()
  }
  if (ans == 'C') {
    p3AnsP.append('C')
    if (numberOfTakeovers > 0)
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
p3Sock.on('play100s', () => {
  clockSound.play()
  Howler.stop()
})
p3Sock.on('play15sStopOrGo', () => {
  stopOrGo15sSound.play()
})
p3Sock.on('play15sOpinion', () => {
  fifteenSecOpinionSound.play()
})
p3Sock.on('stopAllSoundsAndPlayLockIn', () => {
  Howler.stop()
  lockInSound.play()
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
  qP.css('opacity', '1')
})
p3Sock.on('showA', () => {
  ansABtn.css('opacity', '1')
})
p3Sock.on('showB', () => {
  ansBBtn.css('opacity', '1')
})
p3Sock.on('showC', () => {
  ansCBtn.css('opacity', '1')
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
p3Sock.on('lockBuzzer', () => {
  buzzer.prop('disabled', true)
})
p3Sock.on('unlockBuzzer', () => {
  buzzer.prop('disabled', false)
})

//Question received
p3Sock.on('newQnA', (data, money) => {
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
  ansABtn.text(data.a)
  ansBBtn.text(data.b)
  ansCBtn.text(data.c)
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