$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

/** index.js **/
$(function(){
	$('form#inspire').on('submit', function(e, a){ 
	
		var data; 
		
		e.preventDefault(); 
	
		data = $(e.target).serializeObject()
	
		$.post('/submit', data); 	
	
	}); 
}); 