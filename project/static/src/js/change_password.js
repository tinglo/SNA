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
                swal({
                  title: "密碼修改成功!",
                  showCancelButton: false,
                  type: "success",
                  confirmButtonColor: "#5CADAD",
                  
                  confirmButtonText: "前往登入頁面",
                  closeOnConfirm: false,
                  closeOnCancel: false
                },
                function(isConfirm){
                  if (isConfirm) {
                    window.location.href = "/account/signin/";
                  } 
                }); 
            }
            else{
                if(jqXHR.status === 400){
                    swal({
                      title: "新密碼輸入不一致",
                      showCancelButton: false,
                      type: "error",
                      confirmButtonColor: "#5CADAD",
                      
                      confirmButtonText: "OK",
                    }); 
                }
                if(jqXHR.status === 401){
                    swal({
                      title: "舊密碼輸入錯誤",
                      showCancelButton: false,
                      type: "error",
                      confirmButtonColor: "#5CADAD",
                      
                      confirmButtonText: "OK",
                    });                     
                }
                //alert(jqXHR.status);
            }	            
        }
    });
});