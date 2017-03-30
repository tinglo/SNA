$("form").submit(function(e){
	e.preventDefault();
    $.ajax({
    	url: "/account/change_password/",
        type: "POST",
		data: {'origin_password':$('input[name=origin_password]').val(),
               'new_password':$('input[name=new_password]').val(), 
               'confirm_new_password':$('input[name=confirm_new_password]').val()
        },
        dataType: "json",
        complete: function(jqXHR,ajaxOptions, thrownError) {
            if (jqXHR.status === 200){ //login success;
                alert("密碼修改成功!");
            	window.location.href = "/account/signin/";
            }
            else{
                alert(jqXHR.status);
            }	            
        }
    });
});