$('#setgender input').click(function() {
	$('#setgender input').not(this).prop('checked', false);
});