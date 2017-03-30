
$(document).ready(function() {
    $.ajax({
        url: "/online_judge/rank_list/",
        type: "GET",
        dataType: "json",
        complete: function(jqXHR,ajaxOptions, thrownError) {
            if (jqXHR.status === 200){ //login success
                var dataObj = JSON.parse(jqXHR.responseText);
                showData(dataObj);
            }
            else{
                alert(jqXHR.status);
            }                   
        }
    });
});
function showData(dataObj){
    dataObj.sort(function(a,b){return b.details.nmi - a.details.nmi});
    for(i = 0; i < dataObj.length; i++){
        rankHtml = '<td>' + (i+1) + '</td>';
        groupHtml = '<td>' + dataObj[i].group + '</td>';
        nmiHtml = '<td>' + dataObj[i].details.nmi + '</td>';
        ancHtml = '<td>' + dataObj[i].details.anc + '</td>';
        timeHtml = '<td>' + dataObj[i].details.latest_time + '</td>';
        countHtml = '<td>' + dataObj[i].details.total_count + '</td>';

        $('#tableNMI').append('<tr>' + rankHtml + groupHtml + nmiHtml + ancHtml + timeHtml + countHtml + '</tr>');
    }
    dataObj.sort(function(a,b){return b.details.anc - a.details.anc});
    for(i = 0; i < dataObj.length; i++){
        rankHtml = '<td>' + (i+1) + '</td>';
        groupHtml = '<td>' + dataObj[i].group + '</td>';
        nmiHtml = '<td>' + dataObj[i].details.nmi + '</td>';
        ancHtml = '<td>' + dataObj[i].details.anc + '</td>';
        timeHtml = '<td>' + dataObj[i].details.latest_time + '</td>';
        countHtml = '<td>' + dataObj[i].details.total_count + '</td>';

        $('#tableANC').append('<tr>' + rankHtml + groupHtml + nmiHtml + ancHtml + timeHtml + countHtml + '</tr>');
    }  
}
function sortNMI(){
    $('#tableNMI').show();
    $('#tableANC').hide();
}
function sortANC(){
    $('#tableANC').show();
    $('#tableNMI').hide();
}