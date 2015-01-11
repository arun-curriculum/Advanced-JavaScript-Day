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