$(document).ready(function(){}),$("form").submit(function(a){a.preventDefault(),$.ajax({url:"/account/signin/",type:"POST",data:{username:$("input[name=username]").val(),password:$("input[name=password]").val()},dataType:"json",complete:function(a,n,t){200===a.status?window.location.href="/":alert(a.status)}})});