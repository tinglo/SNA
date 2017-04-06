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
                swal({
                  title: "帳號或密碼錯誤",
                  showCancelButton: false,
                  type: "error",
                  confirmButtonColor: "#5CADAD",
                  
                  confirmButtonText: "OK",
                }); 
            }   	            
        }
    });
});


