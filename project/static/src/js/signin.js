/* confirm input */

$(document).ready(function() {

});

/* submit input */
$("form").submit(function(e){
	e.preventDefault();
    $.ajax({
    	url: "/account/signin/",
        type: "POST",
		data: {'username':$('input[name=username]').val(),
               'password':$('input[name=password]').val()
        },
        dataType: "json",
        complete: function(jqXHR,ajaxOptions, thrownError) {
            if (jqXHR.status === 200){ //login success
                window.location.href = "/";
            }
            else{
                alert(jqXHR.status);
            }   	            
        }
    });
});


