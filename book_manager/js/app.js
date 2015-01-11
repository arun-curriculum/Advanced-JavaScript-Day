var bookTemplate;
var editBookTemplate;

$(document).ready(function() {
	var bookSource = $("#one-book-template").html();
	bookTemplate = Handlebars.compile(bookSource);

	var editBookSource = $("#edit-book-template").html();
	editBookTemplate = Handlebars.compile(editBookSource);

	loadBooks();
});

function loadBooks() {
	$.ajax({
		url: "http://daretodiscover.net/books",
		type: "GET",
		success: function(data) {
			$("#book-container").html("");

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

//Go to edit page

$(document).on("click", ".edit-book-button", function(event) {
	event.preventDefault();

	$.ajax({
		url: "http://daretodiscover.net/books/" + $(this).attr("data-id"),
		type: "GET",
		success: function(data) {
			var html = editBookTemplate(data);

			$("#book-container").html(html);
		},
		error: function() {
			alert("Something went wrong...");
		}
	});
});

//Cancel edits

$(document).on("click", "#cancel-edit-button", function(event) {
	event.preventDefault();

	loadBooks();
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

	$.ajax({
		url: "http://daretodiscover.net/books/" + $(this).attr("data-id"),
		type: "PUT",
		data: bookData,
		success: function() {
			loadBooks();
		},
		error: function() {
			alert("Something went wrong...");
		}
	});
});

//Delete book

$(document).on("click", "#delete-book-button", function(event) {
	event.preventDefault();

	$.ajax({
		url: "http://daretodiscover.net/books/" + $(this).attr("data-id"),
		type: "DELETE",
		success: function() {
			loadBooks();
		},
		error: function() {
			alert("Something went wrong...");
		}
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
			loadBooks();
		},
		error: function() {
			alert("Something went wrong...");
		}
	});
});