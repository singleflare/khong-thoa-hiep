const express = require('express');
const { join } = require('path');
const { initializeApp } = require('firebase/app')
const { getFirestore, getDoc, doc, updateDoc } = require('firebase/firestore')

const app = express();

const server = app.listen(process.env.PORT || 3000)
app.use(express.static('public'));

const ioServer = require('socket.io')(server)

console.log('localhost:')
console.log('Player 1: http://localhost:3000/player1')
console.log('Player 2: http://localhost:3000/player2')
console.log('Player 3: http://localhost:3000/player3')
console.log('Control: http://localhost:3000/control')
console.log('Gpx: http://localhost:3000/gpx')
console.log('---------------------------------')
console.log('glitch: coming soon')

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

app.get('/', (req, res) => {
  res.send("HelloWorld")
})

app.get('/player1', (req, res) => {
  res.sendFile(join(__dirname, '/public/pages/player1.html'))
})

app.get('/player2', (req, res) => {
  res.sendFile(join(__dirname, '/public/pages/player2.html'))
})

app.get('/player3', (req, res) => {
  res.sendFile(join(__dirname, '/public/pages/player3.html'))
})

app.get('/control', (req, res) => {
  res.sendFile(join(__dirname, '/public/pages/control.html'))
})

app.get('/gpx', (req, res) => {
  res.sendFile(join(__dirname, '/public/pages/gpx.html'))
})

const p1ns = ioServer.of('/player1')
const p2ns = ioServer.of('/player2')
const p3ns = ioServer.of('/player3')
const cns = ioServer.of('/control')
const gns = ioServer.of('/gpx')

let p1Buzzed = false
let p2Buzzed = false
let p3Buzzed = false
let p1Ans;
let p2Ans;
let p3Ans;
let isDividedRound = false;
let stopOrGoMode = false;

function broadcastToAllPlayers(event) {
  p1ns.emit(event)
  p2ns.emit(event)
  p3ns.emit(event)
}

function broadcastDataToAllPlayers(event, ...data) {
  p1ns.emit(event, ...data)
  p2ns.emit(event, ...data)
  p3ns.emit(event, ...data)
}

function checkAllBuzzed() {
  console.log(p1Buzzed, p2Buzzed, p3Buzzed)
  if ((p1Buzzed == true) && p2Buzzed && p3Buzzed) {
    cns.emit('stopClock')
    if (stopOrGoMode) {
      if (p1Ans == 'A') {
        broadcastToAllPlayers('stopAllSoundsAndPlayStopOrGoPlay')
        gns.emit('stopAllSoundsAndPlayStopOrGoPlay')
      }
      else if (p1Ans == 'B') {
        broadcastToAllPlayers('stopAllSoundsAndPlayStopOrGoStop')
        gns.emit('stopAllSoundsAndPlayStopOrGoStop')
      }
    }
    else if (isDividedRound) {
      broadcastToAllPlayers('stopAllSoundsAndPlaySharedLock')
      gns.emit('stopAllSoundsAndPlaySharedLock')
    }
    else {
      broadcastToAllPlayers('stopAllSoundsAndPlayLockIn')
      gns.emit('stopAllSoundsAndPlayLockIn')
    }
    gns.emit('highlightChosenAnswer', p1Ans)
    broadcastToAllPlayers('disableAnswers')
    broadcastToAllPlayers('lockBuzzerAndTakeover')
  }
}
function checkAllSameAns() {
  console.log(p1Ans, p2Ans, p3Ans)
  if ((p1Ans == p2Ans) && (p2Ans == p3Ans) && p1Ans != '' && p2Ans != '' && p3Ans != '') {
    broadcastToAllPlayers('unlockBuzzer')
  }
  else {
    broadcastToAllPlayers('lockBuzzer')
  }
}
function checkAllDifferentAns() {
  console.log(`p1: ${p1Ans}, p2: ${p2Ans}, p3: ${p3Ans},p1!=p2: ${p1Ans != p2Ans}, p2!=p3: ${p2Ans != p3Ans}, p1!=p3: ${p1Ans != p3Ans}`)
  if ((p1Ans != p2Ans) && (p2Ans != p3Ans) && (p1Ans != p3Ans) && (p1Ans != '' && p1Ans != undefined) && (p2Ans != '' && p2Ans != undefined) && (p3Ans != '' && p3Ans != undefined) && p1Ans.length == 1 && p2Ans.length == 1 && p3Ans.length == 1) {
    broadcastToAllPlayers('unlockBuzzer')
  }
  else {
    broadcastToAllPlayers('lockBuzzer')
  }
}

async function resetAns() {
  p1Ans = ''
  p2Ans = ''
  p3Ans = ''
  broadcastToAllPlayers('lockBuzzer')
  broadcastToAllPlayers('buzzedIsFalse')
  p1Buzzed = false
  p2Buzzed = false
  p3Buzzed = false
  await updateDocEntry('kth', 'states', { player1Ans: '', player2Ans: '', player3Ans: '' })
}

let initData = {
  ansA: '',
  ansB: '',
  ansC: '',
  currentTotalVar: '',
  player1Ans: '',
  player2Ans: '',
  player3Ans: '',
  player1Name: '',
  player2Name: '',
  player3Name: '',
}

async function initStates() {
  await getDocEntry('kth', 'states').then(data => {
    initData.ansA = data.ansA
    initData.ansB = data.ansB
    initData.ansC = data.ansC
    initData.currentTotalVar = data.currentTotalVar
    initData.player1Ans = data.player1Ans
    initData.player2Ans = data.player2Ans
    initData.player3Ans = data.player3Ans
    initData.player1Name = data.player1Name
    initData.player2Name = data.player2Name
    initData.player3Name = data.player3Name
    initData.numberOfHearts = data.numberOfHearts
    initData.numberOfTakeovers = data.numberOfTakeovers
  })
}

let takeoverLocked = false;
p1ns.on('connection', p1Sock => {
  initStates().then(() => {
    console.log(initData)
    p1ns.emit('init', initData)
  })
  p1Sock.on('p1Ans', data => {
    p1Ans = data
    p2ns.emit('p1Ans', data)
    p3ns.emit('p1Ans', data)
    cns.emit('p1Ans', data)
    gns.emit('p1Ans', data)
    updateDocEntry('kth', 'states', { player1Ans: data })
    if (isDividedRound) checkAllDifferentAns()
    else checkAllSameAns()
  })
  p1Sock.on('p1Continue', () => {
    p2ns.emit('p1Continue')
    p3ns.emit('p1Continue')
    cns.emit('p1Continue')
    gns.emit('p1Continue')
  })
  p1Sock.on('p1Stop', () => {
    p2ns.emit('p1Stop')
    p3ns.emit('p1Stop')
    cns.emit('p1Stop')
    gns.emit('p1Stop')
  })
  p1Sock.on('p1Buzz', () => {
    p1Buzzed = true
    p2ns.emit('p1Buzz')
    p3ns.emit('p1Buzz')
    cns.emit('p1Buzz')
    gns.emit('p1Buzz')
    checkAllBuzzed()
  })
  p1Sock.on('p1Unbuzz', () => {
    p1Buzzed = false
    p2ns.emit('p1Unbuzz')
    p3ns.emit('p1Unbuzz')
    cns.emit('p1Unbuzz')
    gns.emit('p1Unbuzz')
    checkAllBuzzed()
  })
  p1Sock.on('p1gianhquyen', (data) => {
    if (!takeoverLocked) {
      takeoverLocked = true
      broadcastToAllPlayers('stopClock')
      cns.emit('stopClock')
      broadcastDataToAllPlayers('p1gianhquyen', data)
      cns.emit('p1gianhquyen', data)
      gns.emit('p1gianhquyen', data)
    }
  })
  p1Sock.on('disconnect', () => { })
})

p2ns.on('connection', async p2Sock => {
  await initStates()
  p2ns.emit('init', initData)
  p2Sock.on('p2Ans', data => {
    p2Ans = data
    p1ns.emit('p2Ans', data)
    p3ns.emit('p2Ans', data)
    cns.emit('p2Ans', data)
    gns.emit('p2Ans', data)
    updateDocEntry('kth', 'states', { player2Ans: data })
    if (isDividedRound) checkAllDifferentAns()
    else checkAllSameAns()
  })
  p2Sock.on('p2Continue', () => {
    p1ns.emit('p2Continue')
    p3ns.emit('p2Continue')
    cns.emit('p2Continue')
    gns.emit('p2Continue')
  })
  p2Sock.on('p2Stop', () => {
    p1ns.emit('p2Stop')
    p3ns.emit('p2Stop')
    cns.emit('p2Stop')
    gns.emit('p2Stop')
  })
  p2Sock.on('p2Buzz', () => {
    p2Buzzed = true
    p1ns.emit('p2Buzz')
    p3ns.emit('p2Buzz')
    cns.emit('p2Buzz')
    gns.emit('p2Buzz')
    checkAllBuzzed()
  })
  p2Sock.on('p2Unbuzz', () => {
    p2Buzzed = false
    p1ns.emit('p2Unbuzz')
    p3ns.emit('p2Unbuzz')
    cns.emit('p2Unbuzz')
    gns.emit('p2Unbuzz')
    checkAllBuzzed()
  })
  p2Sock.on('p2gianhquyen', (data) => {
    if (!takeoverLocked) {
      takeoverLocked = true
      broadcastToAllPlayers('stopClock')
      cns.emit('stopClock')
      broadcastDataToAllPlayers('p2gianhquyen', data)
      cns.emit('p2gianhquyen', data)
      gns.emit('p2gianhquyen', data)
    }
  })
  p2Sock.on('disconnect', () => { })
})

p3ns.on('connection', async p3Sock => {
  await initStates()
  p3ns.emit('init', initData)
  p3Sock.on('p3Ans', data => {
    p3Ans = data
    p2ns.emit('p3Ans', data)
    p1ns.emit('p3Ans', data)
    cns.emit('p3Ans', data)
    gns.emit('p3Ans', data)
    updateDocEntry('kth', 'states', { player3Ans: data })
    if (isDividedRound) checkAllDifferentAns()
    else checkAllSameAns()
  })
  p3Sock.on('p3Continue', () => {
    p2ns.emit('p3Continue')
    p1ns.emit('p3Continue')
    cns.emit('p3Continue')
    gns.emit('p3Continue')
  })
  p3Sock.on('p3Stop', () => {
    p2ns.emit('p3Stop')
    p1ns.emit('p3Stop')
    cns.emit('p3Stop')
    gns.emit('p3Stop')
  })
  p3Sock.on('p3Buzz', () => {
    p3Buzzed = true
    p2ns.emit('p3Buzz')
    p1ns.emit('p3Buzz')
    cns.emit('p3Buzz')
    gns.emit('p3Buzz')
    checkAllBuzzed()
  })
  p3Sock.on('p3Unbuzz', () => {
    p3Buzzed = false
    p2ns.emit('p3Unbuzz')
    p1ns.emit('p3Unbuzz')
    cns.emit('p3Unbuzz')
    gns.emit('p3Unbuzz')
    checkAllBuzzed()
  })
  p3Sock.on('p3gianhquyen', (data) => {
    if (!takeoverLocked) {
      takeoverLocked = true
      broadcastToAllPlayers('stopClock')
      cns.emit('stopClock')
      broadcastDataToAllPlayers('p3gianhquyen', data)
      cns.emit('p3gianhquyen', data)
      gns.emit('p3gianhquyen', data)
    }
  })
  p3Sock.on('disconnect', () => { })
})

cns.on('connection', cSock => {
  cSock.on('updateTime', time => {
    console.log(time)
    broadcastDataToAllPlayers('updateTime', time)
    gns.emit('updateTime', time)
  })
  cSock.on('updateCdMoney', cdMoney => {
    console.log(cdMoney)
    broadcastDataToAllPlayers('updateCdMoney', cdMoney)
    gns.emit('updateCdMoney', cdMoney)
    cns.emit('updateCdMoney', cdMoney)
  })
  cSock.on('hideQnA', () => {
    gns.emit('hideQnA')
  })
  cSock.on('showQ', () => {
    console.log('showQ')
    broadcastToAllPlayers('showQ')
    gns.emit('showQ')
  })
  cSock.on('showA', () => {
    broadcastToAllPlayers('showA')
    console.log(isDividedRound)
    if (!isDividedRound)
      gns.emit('showA')
  })
  cSock.on('showB', () => {
    broadcastToAllPlayers('showB')
    if (!isDividedRound)
      gns.emit('showB')
  })
  cSock.on('showC', () => {
    broadcastToAllPlayers('showC')
    if (!isDividedRound)
      gns.emit('showC')
  })
  cSock.on('newQnA', async (data, money) => {
    stopOrGoMode = false
    resetAns()
    takeoverLocked = false
    console.log(data, money)
    broadcastDataToAllPlayers('newQnA', data, money)
    gns.emit('newQnA', data, money)
    await updateDocEntry('kth', 'states', { question: data.q, ansA: data.a, ansB: data.b, ansC: data.c })
  })

  cSock.on('stopOrGoMode', data => {
    stopOrGoMode = true
    resetAns()
    broadcastDataToAllPlayers('stopOrGoMode', data)
    gns.emit('stopOrGoMode')
  })
  cSock.on('enableAnswers', () => {
    broadcastToAllPlayers('enableAnswers')
  })
  cSock.on('disableAnswers', () => {
    broadcastToAllPlayers('disableAnswers')
  })
  cSock.on('correctAns', () => {
    broadcastToAllPlayers('correctAns')
    gns.emit('correctAns')
  })
  cSock.on('wrongAns', () => {
    broadcastToAllPlayers('wrongAns')
    gns.emit('wrongAns')
  })
  cSock.on('resetPlayerAnswers', () => {
    broadcastToAllPlayers('resetPlayerAnswers')
  })
  cSock.on('resetTimeAndMoneyCountdown', () => {
    broadcastToAllPlayers('resetTimeAndMoneyCountdown')
  })
  cSock.on('showMoneyIfCorrect', (data) => {
    takeoverLocked = false
    console.log(data)
    broadcastDataToAllPlayers('showMoneyIfCorrect', data)
    gns.emit('showMoneyIfCorrect')
  })
  cSock.on('showMoneyIfWrong', (data) => {
    broadcastDataToAllPlayers('showMoneyIfWrong', data)
    gns.emit('showMoneyIfWrong')
  })
  cSock.on('updateCurrentTotal', (data) => {
    broadcastDataToAllPlayers('updateCurrentTotal', data)
  })
  cSock.on('divideMoneyRound', (data) => {
    resetAns()
    isDividedRound = true
    broadcastDataToAllPlayers('divideMoneyRound', data)
  })
  cSock.on('updateDividedMoneyAnswers', (data) => {
    broadcastDataToAllPlayers('updateDividedMoneyAnswers', data)
    gns.emit('updateDividedMoneyAnswers', data)
  })
  cSock.on('updateNumberOfHearts', (data) => {
    console.log(data)
    broadcastDataToAllPlayers('updateNumberOfHearts', data)
    gns.emit('updateNumberOfHearts', data)
  })
  cSock.on('updateNumberOfTakeovers', (data) => {
    console.log(data)
    broadcastDataToAllPlayers('updateNumberOfTakeovers', data)
  })
  cSock.on('gpxShowMoneyA', () => {
    gns.emit('gpxShowMoneyA')
  })
  cSock.on('gpxShowMoneyB', () => {
    gns.emit('gpxShowMoneyB')
  })
  cSock.on('gpxShowMoneyC', () => {
    gns.emit('gpxShowMoneyC')
  })
  cSock.on('gpxCorrectAns', data => {
    console.log(data)
    gns.emit('gpxCorrectAns', data)
  })
  cSock.on('fadeoutQnAGpx', () => {
    gns.emit('fadeoutQnAGpx')
  })
  cSock.on('fadeoutMoneyGpx', () => {
    gns.emit('fadeoutMoneyGpx')
  })
  cSock.on('fadeinQnAGpx', () => {
    gns.emit('fadeinQnAGpx')
  })
  cSock.on('fadeinMoneyGpx', () => {
    gns.emit('fadeinMoneyGpx')
  })

  cSock.on('playIntro', () => {
    broadcastToAllPlayers('playIntro')
    gns.emit('playIntro')
  })
  cSock.on('playContestantsEntrance', () => {
    broadcastToAllPlayers('playContestantsEntrance')
    gns.emit('playContestantsEntrance')
  })
  cSock.on('playBedAfterAnswer', () => {
    broadcastToAllPlayers('playBedAfterAnswer')
    gns.emit('playBedAfterAnswer')
  })
  cSock.on('playShareBed', () => {
    broadcastToAllPlayers('playShareBed')
    gns.emit('playShareBed')
  })
  cSock.on('playWinLoseBed', () => {
    broadcastToAllPlayers('playWinLoseBed')
    gns.emit('playWinLoseBed')
  })
  cSock.on('playOutro', () => {
    broadcastToAllPlayers('playOutro')
    gns.emit('playOutro')
  })
  cSock.on('stopAllSounds', () => {
    broadcastToAllPlayers('stopAllSounds')
    gns.emit('stopAllSounds')
  })

  cSock.on('playWaitCorrectAnswer', () => {
    broadcastToAllPlayers('playWaitCorrectAnswer')
    gns.emit('playWaitCorrectAnswer')
  })
  cSock.on('play100s', () => {
    broadcastToAllPlayers('play100s')
    gns.emit('run100sAnimation')
  })
  cSock.on('play15sStopOrGo', () => {
    broadcastToAllPlayers('play15sStopOrGo')
    gns.emit('run15sStopOrGoAnimation')
  })
  cSock.on('play15sOpinion', () => {
    broadcastToAllPlayers('play15sOpinion')
    gns.emit('play15sOpinion')
  })

  cSock.on('playBedAfterAnswerUK', () => {
    broadcastToAllPlayers('playBedAfterAnswerUK')
    gns.emit('playBedAfterAnswerUK')
  })
  cSock.on('playContestantsEntranceBed', () => {
    broadcastToAllPlayers('playContestantsEntranceBed')
    gns.emit('playContestantsEntranceBed')
  })
  cSock.on('playWaitCorrectAnswerVio', () => {
    broadcastToAllPlayers('playWaitCorrectAnswerVio')
    gns.emit('playWaitCorrectAnswerVio')
  })
  cSock.on('playDivideFirstHalf', () => {
    broadcastToAllPlayers('playDivideFirstHalf')
    gns.emit('playDivideFirstHalf')
  })
  cSock.on('playDivideSecondHalf', () => {
    broadcastToAllPlayers('playDivideSecondHalf')
    gns.emit('playDivideSecondHalf')
  })
  cSock.on('playDivideSuccessBed', () => {
    broadcastToAllPlayers('playDivideSuccessBed')
    gns.emit('playDivideSuccessBed')
  })


  cSock.on('resetData', async () => {
    await updateDocEntry('kth', 'states', { ansA: '', ansB: '', ansC: '', currentTotalVar: '', player1Ans: '', player2Ans: '', player3Ans: '', player1Name: '', player2Name: '', player3Name: '' })
  })
  cSock.on('updatePlayerNames', async (data) => {
    await updateDocEntry('kth', 'states', { player1Name: data.p1, player2Name: data.p2, player3Name: data.p3 })
    broadcastDataToAllPlayers('updatePlayerNames', data)
    gns.emit('updatePlayerNames', data)
  })
  cSock.on('disconnect', () => { })
})

gns.on('connection', gSock => {
  initStates()
  gns.emit('init', initData)
  gSock.on('showQ', () => {
    console.log('showQ')
  })
  gSock.on('disconnect', () => { })
})