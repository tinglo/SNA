function showFileName(t){$("#fileName").text(t[0].name)}var GLOBAL={uploadLimit:20,todayCount:0};window.GLOBAL=GLOBAL,$(document).ready(function(){$.ajax({url:"/online_judge/rank_list/",type:"GET",dataType:"json",complete:function(t,o,e){if(200===t.status){var n=JSON.parse(t.responseText);for(i=0;i<n.length;i++)if(n[i].group===current_group){var a=GLOBAL.uploadLimit-n[i].details.today_count;a<0&&$("#todayCount").text("0"),a>=0&&$("#todayCount").text(GLOBAL.uploadLimit-n[i].details.today_count),GLOBAL.todayCount=n[i].details.today_count,GLOBAL.todayCount>=GLOBAL.uploadLimit&&($("#formId").hide(),$("#forbiddenId").show()),GLOBAL.todayCount<GLOBAL.uploadLimit&&($("#formId").show(),$("#forbiddenId").hide())}}else swal(t.responseText)}})}),$("form").on("submit",function(t){t.preventDefault();var o=new FormData($(this)[0]),e=$("#fileId").get(0).files[0];e.size>1e7?swal({title:"檔案大小不得超過10MB!",type:"warning",confirmButtonColor:"#5CADAD",confirmButtonText:"了解",closeOnConfirm:!1}):($("#formId").hide(),$("#remainId").hide(),$("#waitId").show(),$.ajax({url:"/online_judge/upload/",type:"POST",data:o,dataType:"json",enctype:"multipart/form-data",contentType:!1,cache:!1,processData:!1,complete:function(t,o,e){if(200===t.status){var n=JSON.parse(t.responseText);swal({title:"評分結果",text:"NMI: "+n.nmi.toFixed(4)+"\n\tANC: "+n.anc.toFixed(4),showCancelButton:!0,confirmButtonColor:"#5CADAD",confirmButtonText:"前往Leaderboard頁面",cancelButtonText:"繼續上傳檔案",closeOnConfirm:!1,closeOnCancel:!1},function(t){t?window.location.href="/":location.reload()})}else swal({title:"上傳格式錯誤",showCancelButton:!1,type:"error",confirmButtonColor:"#5CADAD",confirmButtonText:"重新上傳",closeOnConfirm:!1,closeOnCancel:!1},function(t){t&&location.reload()})}}))});