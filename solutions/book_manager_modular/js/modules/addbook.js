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