var uploadLimit = 20;
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
                        $('#todayCount').text(dataObj[i].details.today_count);
                        //alert(dataObj[i].details.today_count);
                    }
                }
            }
            else{
                alert(jqXHR.status);
            }                   
        }
    });
});

$('form').on('submit',(function(e) {
    var fd = new FormData($(this)[0]);
    e.preventDefault();
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
                alert(jqXHR.responseText);
                window.location.href = '/'; 
            }           
        }
    });
}));
