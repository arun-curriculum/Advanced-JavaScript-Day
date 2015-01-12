var socket = io.connect("http://27a459e6.ngrok.com/");

var chatMessageTemplate;

$(document).ready(function() {
	$("#get-username-modal").modal("show");

	var chatMessageSource = $("#chat-message-template").html();
	chatMessageTemplate = Handlebars.compile(chatMessageSource);
});

$(document).on("click", "#save-username-button", function() {
	localStorage.setItem("username", $("#username-input").val());

	$("#get-username-modal").modal("hide");
});

$(document).on("click", "#send-message-button", function() {
	if ($("#chat-message").val() === "") {
		return false;
	} else {
		socket.emit("chat", {
			chatText: $("#chat-message").val(),
			userName: localStorage.getItem("username")
		});

		var html = chatMessageTemplate({
			userName: localStorage.getItem("username"),
			chatText: $("#chat-message").val()
		});

		$("#chat-wrapper").append(html);
		$("#chat-message").val("");
	}
});

socket.on("chat", function(chatInfo) {
	var html = chatMessageTemplate(chatInfo);
	$("#chat-wrapper").append(html);
	$("#chat-message").val("");
});