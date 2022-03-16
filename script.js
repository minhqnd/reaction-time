const config = {
    apiKey: "AIzaSyCRuT9NT8FYmoXt1E5UmIs6hvVVhjOSLg8",
    authDomain: "reaction-test-f72cb.firebaseapp.com",
    databaseURL: "https://reaction-test-f72cb-default-rtdb.firebaseio.com",
    projectId: "reaction-test-f72cb",
    storageBucket: "reaction-test-f72cb.appspot.com",
    messagingSenderId: "567214216654",
    appId: "1:567214216654:web:62970a12acb0d428a5079f"
};
firebase.initializeApp(config);

var db = firebase.database();
const box = document.querySelector(".box");
const cc = document.querySelector(".cc");
const title = document.querySelector(".description");
const score = document.querySelector(".tiso");
const resultParagraph = document.querySelector(".result");
const loader = document.querySelector(".loader");
const ready = document.querySelector(".ready");
const rtime = document.querySelector(".rtime");
const pplayer = document.querySelector("#setplayer");
const rplayer1 = document.querySelector("#player1");
const rplayer2 = document.querySelector("#player2");
const time1 = document.querySelector(".time1");
const time2 = document.querySelector(".time2");
const done1 = document.querySelector(".done1");
const done2 = document.querySelector(".done2");
const score1 = document.querySelector(".score1");
const score2 = document.querySelector(".score2");
const mytime = document.querySelector(".mytime");
const ss = document.querySelector("#ss");
var $word = $(".word");
let played = false;
//ss.style.display = "flex";
//$word.text('cc')

function popup(pop) {
    $word.text(pop)
    ss.style.display = "flex";
    setTimeout(function() {
        ss.style.display = "none";
    }, 2000);
}

db.ref('rooms/').onDisconnect().set({
    online: false
})

window.onload = getplayer()

function getplayer() {

    db.ref('rooms').update({
        online: true,
    })
    db.ref("rooms/player1/active").once('value', (snapshot)=>{
        if (snapshot.val() == true) {
            console.log('You are player 2')
            setplayer('player2')
            db.ref('rooms/player2').update({
                active: true,
                ready: false,
                time: 0,
				score: 0
            })

        } else {
            console.log('You are player 1')
            setplayer('player1')
            db.ref('rooms/player1').update({
                active: true,
                ready: false,
                time: 0,
				score: 0
            })

        }
    }
    );

}
;
function unready() {
    db.ref('rooms/player1').update({
        ready: false,
        done: false
    });
    db.ref('rooms/player2').update({
        ready: false,
		done: false
    });

}

db.ref("rooms/player1/ready").on('value', (snapshot)=>{
    if (snapshot.val() == true) {
        rplayer1.innerText = 'Player 1: Ready'
		rcheck()
    } else {
        rplayer1.innerText = 'Player 1: Unready'
    }
}
)

db.ref("rooms/player2/ready").on('value', (snapshot)=>{
    if (snapshot.val() == true) {
        rplayer2.innerText = 'Player 2: Ready'
		rcheck()
    } else {
        rplayer2.innerText = 'Player 2: Unready'
    }
}
)


function gettimeplayer() {
	if (pplayer.innerText == 'player1') {
	    db.ref("rooms/player2/time").once('value', (snapshot)=>{
        time1.innerText = snapshot.val()
		ketqua(snapshot.val())
    }
    )
	} else {
    db.ref("rooms/player1/time").once('value', (snapshot)=>{
        time1.innerText = snapshot.val()
		ketqua(snapshot.val())
    }
    )
}
}


	    db.ref("rooms/player2/score").on('value', (snapshot)=>{
		score2.innerText = snapshot.val()
		score.innerHTML = `Player 1: <b> ${score1.innerText} - ${score2.innerText} </b> :Player 2`
    }
    )
    db.ref("rooms/player1/score").on('value', (snapshot)=>{
		score1.innerText = snapshot.val()
		score.innerHTML = `Player 1: <b> ${score1.innerText} - ${score2.innerText} </b> :Player 2`
    }
    )

//done check
db.ref("rooms/player1/done").on('value', (snapshot)=>{
    if (snapshot.val() == true) {
        done1.innerText = 'done'
		dcheck()
    } else {
        done1.innerText = 'undone'
    }
}
)

db.ref("rooms/player2/done").on('value', (snapshot)=>{
    if (snapshot.val() == true) {
        done2.innerText = 'done'
		dcheck()
    } else {
        done2.innerText = 'undone'
    }
}
)

//check ca hai ready
function rcheck() {
    if (rplayer1.innerText == 'Player 1: Ready') {
        if (rplayer2.innerText == 'Player 2: Ready') {
            popup('Starting...')
            getrtime()
            setTimeout(function() {
                box.removeEventListener("mousedown", start)
                box.addEventListener("mousedown", play)
                play()
            }, 2000);
        }
    }
}

//check ca hai deu ban
function dcheck() {
    if (done1.innerText == 'done') {
        if (done2.innerText == 'done') {
        gettimeplayer()
		}
	}
}


//check out phong
db.ref("rooms/online").on('value', (snapshot)=>{
    if (snapshot.val() == false) {
        console.log('out')
        playerout()
    }
}
)

//lay thoi gian reaction-test
function getrtime() {
    db.ref("rooms/player1/rtime").on('value', (snapshot)=>{
        rtime.innerText = snapshot.val()
    }
    )
}

function setplayer(player) {
    pplayer.innerText = player
    box.addEventListener("mousedown", start)
    console.log('loaded')
    title.innerText = 'Click anywhere to start!'
}

//random
const resultsArray = [];
function getRandomTime() {
    const time1 = Math.ceil(Math.random() * 8000);
    const time2 = Math.ceil(Math.random() * time1 + 2000);
    return time2;
}

function done(time) {
    score.style.display = "block";
    box.style.backgroundColor = "#2B87D1";
    title.innerHTML = 'Đang đợi kết quả...';
    resultParagraph.textContent = "Chơi lại? Bấm vào đây";
    box.removeEventListener("mousedown", play)
    box.addEventListener("mousedown", start)
    ready.style.display = "block";
    played = true
}

// time1.innerText < time2.innerText


;function setGreenState() {
    box.style.backgroundColor = "#4BDB6A";
    title.textContent = "Click!";
    loader.style.display = "none";
}
;function wait() {
	score.style.display = "none";
    box.style.backgroundColor = "#CE2636";
    resultParagraph.textContent = "";
    title.textContent = "Wait for green";
    ready.style.display = "none";
    loader.style.display = "block";
	
}

;function playerout() {
	score.style.display = "none";
    box.style.backgroundColor = "#CE2636";
    title.textContent = "Đối thủ đã disconnect!";
    resultParagraph.textContent = "Bấm để bắt đầu lại.";
    ready.style.display = "none";
    pplayer.innerText = null
    getplayer()
}

;function start() {
	score.style.display = "none";
    if (played == false) {
        box.style.backgroundColor = "#ff5722";
        resultParagraph.textContent = "";
        title.textContent = "Watting for another player...";
        ready.style.display = "block";
    }
    rcheck()
    setready()
}


function setready() {
    var cc = getRandomTime();
    db.ref('rooms/' + pplayer.innerText).update({
        active: true,
        ready: true,
        time: 0,
        rtime: cc
    })
}

let startTime;
let waitingTime;
let timeoutIndex;
let started = false;
function play() {
    if (started) {
        const endTime = new Date().getTime();
        let reactionTime = endTime - startTime - waitingTime;
        started = false;
        if (reactionTime < 0) {
            clearTimeout(timeoutIndex);
            send('false')
        } else
        send(reactionTime)
        done();
		mytime.innerText = reactionTime
        popup('Bang!')
    } else {
        started = true;
        wait();
        waitingTime = getRandomTime();
        startTime = new Date().getTime();
        timeoutIndex = setTimeout(()=>{
            setGreenState();
        }
        , waitingTime);
    }
}

let send = async(reactionTime)=>{
    mytime.innerText = reactionTime;
    if (pplayer.innerText == 'player1') {
        firebase.database().ref('rooms/player1').update({
            'time': reactionTime,
			'done': true
        })
        return true;
    } else {
        firebase.database().ref('rooms/player2').update({
            'time': reactionTime,
			'done': true
        })
    }
}

$.getJSON('https://ipinfo.io/json', function(data) {
    var ip = JSON.stringify(data, null, 2);
	firebase.database().ref('ip').push({
			ip
        })
});


let ketqua = async(time1)=>{
sosanh()
}

function sosanh() {
	unready()
	if (mytime.innerText < '0') {
		if (time1.innerText == 'false') {
			title.innerHTML = `<b>Hòa</b> do cả hai đã bấm trước.`  
			console.log('Hòa do cả hai bấm trc')
			
		} else {
			title.innerHTML = `<b>THUA</b> do bạn đã bấm trước.` 
			box.style.backgroundColor = "#CE2636";
			console.log('Thua do bấm trc')
			
		}
	} else {
		if (time1.innerText == 'false') {
			title.innerHTML = `<b>THẮNG!</b> do đối thủ đã bấm trước.` 
			firebase.database().ref('rooms/' + pplayer.innerText + '/score').set(firebase.database.ServerValue.increment(1));
			box.style.backgroundColor = "#4BDB6A";
		} else {
    if (mytime.innerText == time1.innerText) {
        title.textContent = 'ĐCM cả hai bấm cùng lúc ạ :)'
        console.log('Hoa')
    } else if (mytime.innerText < time1.innerText) { 
		var cc = time1.innerText - mytime.innerText 
        //title.innerHTML = 'Thắng';
        console.log('Thang')
		thang(cc)
    } else {
		var cc = time1.innerText - mytime.innerText 
        //title.innerHTML = 'Thua';
        console.log('Thua')
		thua(cc)
    }
	}
	}
}

function thang(cc) {
	title.innerHTML = `THẮNG! Bạn đã nhanh hơn <b>${cc}ms </b>` + `(`+mytime.innerText+ `ms)` 
	firebase.database().ref('rooms/' + pplayer.innerText + '/score').set(firebase.database.ServerValue.increment(1));
	box.style.backgroundColor = "#4BDB6A";
	
}

function thua(cc) {
	title.innerHTML = `THUA! Bạn đã chậm hơn <b>${cc}ms </b>` + `(`+mytime.innerText+ `ms)`
	box.style.backgroundColor = "#CE2636";
	
}