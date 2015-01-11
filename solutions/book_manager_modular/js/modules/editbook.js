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