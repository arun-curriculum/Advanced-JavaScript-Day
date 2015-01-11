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