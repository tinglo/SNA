$("form").submit(function(t){t.preventDefault(),$.ajax({url:"/account/change_password/",type:"POST",data:{origin_password:$("input[name=origin_password]").val(),new_password:$("input[name=new_password]").val(),confirm_new_password:$("input[name=confirm_new_password]").val()},dataType:"json",complete:function(t,n,o){200===t.status?swal({title:"密碼修改成功!",showCancelButton:!1,type:"success",confirmButtonColor:"#5CADAD",confirmButtonText:"前往登入頁面",closeOnConfirm:!1,closeOnCancel:!1},function(t){t&&(window.location.href="/account/signin/")}):(400===t.status&&swal({title:"新密碼輸入不一致",showCancelButton:!1,type:"error",confirmButtonColor:"#5CADAD",confirmButtonText:"OK"}),401===t.status&&swal({title:"舊密碼輸入錯誤",showCancelButton:!1,type:"error",confirmButtonColor:"#5CADAD",confirmButtonText:"OK"}))}})});