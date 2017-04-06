var GLOBAL = {
    uploadLimit: 40,
    todayCount: 0
}

window.GLOBAL = GLOBAL;


$(document).ready(function() {
    $.ajax({
        url: "/online_judge/rank_list/",
        type: "GET",
        dataType: "json",
        complete: function(jqXHR,ajaxOptions, thrownError) {
            if (jqXHR.status === 200){ //login success
                var dataObj = JSON.parse(jqXHR.responseText);
                for(i=0;i<dataObj.length;i++){
                    if(dataObj[i].group === current_group){
                        var tmp = GLOBAL.uploadLimit - dataObj[i].details.today_count;
                        if(tmp < 0){
                            $('#todayCount').text('0');
                        }
                        if(tmp >=0){
                            $('#todayCount').text(GLOBAL.uploadLimit - dataObj[i].details.today_count);
                        }
                        GLOBAL.todayCount = dataObj[i].details.today_count;
                        
                        if(GLOBAL.todayCount >= GLOBAL.uploadLimit){
                            $('#formId').hide();
                            $('#forbiddenId').show();
                        }
                        if(GLOBAL.todayCount < GLOBAL.uploadLimit){
                            $('#formId').show();
                            $('#forbiddenId').hide();        
                        }
                    }
                }
            }
            else{
                alert(jqXHR.status);
            }                   
        }
    });
});
function showFileName(files){
    $('#fileName').text(files[0].name);
}
$('form').on('submit',(function(e) {
    e.preventDefault();

    var fd = new FormData($(this)[0]);
    var fileData = $('#fileId').get(0).files[0];

    if(fileData.size > 20000000){ //20MB
        swal({
          title: "檔案大小不得超過20MB!",
          type: "warning",
          confirmButtonColor: "#5CADAD",
          confirmButtonText: "了解",
          closeOnConfirm: false
        });
    }
    else{
        $('#formId').hide();
        $('#remainId').hide();
        $('#waitId').show();

        $.ajax({
            url: "/online_judge/upload/",
            type: "POST",
            data: fd,
            dataType: "json",

            enctype: 'multipart/form-data',
            
            contentType: false,      
            cache: false,             
            processData:false,  
            
            complete: function(jqXHR,ajaxOptions, thrownError) {
                if (jqXHR.status === 200){ //login success
                    var dataObj = JSON.parse(jqXHR.responseText);
                    swal({
                      title: "評分結果",
                      text: "NMI: " + dataObj.nmi.toFixed(4) + '\n\tANC: ' + dataObj.anc.toFixed(4),
                      showCancelButton: true,

                      confirmButtonColor: "#5CADAD",
                      
                      confirmButtonText: "前往Leaderboard頁面",
                      cancelButtonText: "繼續上傳檔案",
                      closeOnConfirm: false,
                      closeOnCancel: false
                    },
                    function(isConfirm){
                      if (isConfirm) {
                        window.location.href = '/';
                      } else {
                        location.reload();
                      }
                    });                    
                }
                else{
                    alert(jqXHR.responseText);
                }           
            }
        });
    }
}));
