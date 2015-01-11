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