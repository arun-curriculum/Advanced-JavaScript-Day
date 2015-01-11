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