var stompClient = null;

const connectBut = document.getElementById("connect-but");
connectBut.onclick = connect;

const disconnectBut = document.getElementById("disconnect-but");
disconnectBut.onclick = disconnect;

const notify = document.getElementById("c-send");
notify.onclick = notifiocation;

const update_notify = document.getElementById("u-send");
update_notify.onclick = update_notifiocation;


function connect() {
    console.log("WS connection...");

    //var socket = new SockJS('http://localhost:8081/ws/notification/connection');
	//var socket = new SockJS('http://develop.k1.int.parsiv.ru/ws/notification/connection');
	//var socket = new SockJS('https://parsiv4-demo-echd.mos.ru/ws/notification/connection');
	var socket = new SockJS('http://10.200.232.213:8080/ws/notification/connection');
    stompClient = Stomp.over(socket);
	
	var header = {
		"user-id" : "+79101002001"
	}
	
    stompClient.connect(header, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/user/ws/notification/message', function (greeting) {
            showGreeting(JSON.parse(greeting.body).name);
        });
    });
}

function showGreeting(message) {
    const greeting = document.getElementById('greetings');

    greeting.append(message);
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

function notifiocation(event) {
    event.preventDefault();
    const name = document.getElementById("c-name").value;
	stompClient.send("/ws/notification/", {}, name);
}

function update_notifiocation(event) {
    event.preventDefault();
    const name = document.getElementById("u-name").value;
    stompClient.send("/ws/notification/read", {}, name);
}