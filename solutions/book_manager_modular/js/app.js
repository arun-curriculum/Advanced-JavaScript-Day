(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(bookData, finish) {
	$.ajax({
		url: "http://daretodiscover.net/books",
		type: "POST",
		data: bookData,
		success: function() {
			$("#new-book-title").val("");
			$("#new-book-author").val("");
			$("#new-book-image").val("");
			$("#new-book-release").val("");
			
			$("#add-book-modal").modal("hide");
			finish();
		},
		error: function() {
			alert("Something went wrong...");
		}
	});
}
},{}],2:[function(require,module,exports){
module.exports = function(id, finish) {
	$.ajax({
		url: "http://daretodiscover.net/books/" + id,
		type: "DELETE",
		success: function() {
			finish();
		},
		error: function() {
			alert("Something went wrong...");
		}
	});
}
},{}],3:[function(require,module,exports){
module.exports = function(id, bookData, finish) {
	$.ajax({
		url: "http://daretodiscover.net/books/" + id,
		type: "PUT",
		data: bookData,
		success: function() {
			finish();
		},
		error: function() {
			alert("Something went wrong...");
		}
	});
}
},{}],4:[function(require,module,exports){
module.exports = function() {
	$.ajax({
		url: "http://daretodiscover.net/books",
		type: "GET",
		success: function(data) {
			$("#book-container").html("");

			var bookSource = $("#one-book-template").html();
			var bookTemplate = Handlebars.compile(bookSource);

			data.forEach(function(book, index) {
				if ((index + 1)%2 === 0) {
					var row = true;
				} else {
					var row = false;
				}

				var html = bookTemplate({
					id: book.id,
					title: book.title,
					author: book.author,
					image: book.image,
					release_date: book.release_date,
					row: row
				});

				$("#book-container").append(html);
			});
		},
		error: function() {
			alert("Something went wrong...");
		}
	});
}
},{}],5:[function(require,module,exports){
module.exports = function(id) {
	$.ajax({
		url: "http://daretodiscover.net/books/" + id,
		type: "GET",
		success: function(data) {
			var editBookSource = $("#edit-book-template").html();
			var editBookTemplate = Handlebars.compile(editBookSource);

			var html = editBookTemplate(data);

			$("#book-container").html(html);
		},
		error: function() {
			alert("Something went wrong...");
		}
	});
}
},{}],6:[function(require,module,exports){
var loadbooks = require("./modules/loadbooks");
var loadone = require("./modules/loadone");
var editbook = require("./modules/editbook");
var deletebook = require("./modules/deletebook");
var addbook = require("./modules/addbook");

$(document).ready(function() {
	loadbooks();
});

//Go to edit page

$(document).on("click", ".edit-book-button", function(event) {
	event.preventDefault();

	loadone($(this).attr("data-id"));
});

//Cancel edits

$(document).on("click", "#cancel-edit-button", function(event) {
	event.preventDefault();

	loadbooks();
});

//Submit edits

$(document).on("click", "#submit-edits-button", function(event) {
	event.preventDefault();

	var bookData = {
		title: $("#edit-title").val(),
		author: $("#edit-author").val(),
		image: $("#edit-image").val(),
		release_date: $("#edit-release").val()
	};

	editbook($(this).attr("data-id"), bookData, function() {
		loadbooks();
	});
});

//Delete book

$(document).on("click", "#delete-book-button", function(event) {
	event.preventDefault();

	deletebook($(this).attr("data-id"), function() {
		loadbooks();
	});
});

//Add a book

$(document).on("click", "#save-book-button", function(event) {
	event.preventDefault();

	var bookData = {
		title: $("#new-book-title").val(),
		author: $("#new-book-author").val(),
		image: $("#new-book-image").val(),
		release_date: $("#new-book-release").val()
	};

	addbook(bookData, function() {
		loadbooks();
	});
});
},{"./modules/addbook":1,"./modules/deletebook":2,"./modules/editbook":3,"./modules/loadbooks":4,"./modules/loadone":5}]},{},[6]);
