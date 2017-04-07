
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
    dataObj.push({'group': 'K-means Method','details': {'anc': 0.5200, 'nmi': 0.0640, 'latest_time': 'null', 'today_count': 'null', 'total_count': 'null'}});
    dataObj.push({'group': 'Random Method','details': {'anc': 0.5800, 'nmi': 0.4286, 'latest_time': 'null', 'today_count': 'null', 'total_count': 'null'}});
    dataObj.push({'group': 'Louvain Method','details': {'anc': 0.5225, 'nmi': 0.0956, 'latest_time': 'null', 'today_count': 'null', 'total_count': 'null'}});
    dataObj.push({'group': 'Girvan-Newman Method','details': {'anc': 0, 'nmi': 0, 'latest_time': 'null', 'today_count': 'null', 'total_count': 'null'}});
    dataObj.push({'group': 'Label Propagation Method','details': {'anc': 0, 'nmi': 0, 'latest_time': 'null', 'today_count': 'null', 'total_count': 'null'}});
    dataObj.push({'group': 'Kernighan-Lin Bisection Method','details': {'anc': 0, 'nmi': 0, 'latest_time': 'null', 'today_count': 'null', 'total_count': 'null'}});

    dataObj.sort(function(a,b){return b.details.nmi - a.details.nmi});
    fillTable(dataObj, '#tableNMI');

    dataObj.sort(function(a,b){return b.details.anc - a.details.anc});
    fillTable(dataObj, '#tableANC');
}
function fillTable(dataObj, id){
    for(i = 0; i < dataObj.length; i++){
        tmpNmi = new Number(dataObj[i].details.nmi);
        tmpAnc = new Number(dataObj[i].details.anc);

        if(dataObj[i].group.indexOf('Method')!=-1){
            rankHtml = '<td>' + (i+1) + '</td>';
            groupHtml = '<td style="background-color: #B3D9D9; font-style:oblique; border-radius: 10px;">' + dataObj[i].group + '</td>';
            nmiHtml = '<td>' + tmpNmi.toFixed(4) + '</td>';
            ancHtml = '<td>' + tmpAnc.toFixed(4) + '</td>';
            timeHtml = '<td>' + dataObj[i].details.latest_time + '</td>';
            countHtml = '<td>' + dataObj[i].details.total_count + '</td>';            
        }
        else{
            if(currentGroup === dataObj[i].group){
                rankHtml = '<td style="font-weight: bold"><i class="fa fa-flag animated infinite bounce" style="animation-duration: 2s;animation-iteration-count:1" aria-hidden="true"></i>  ' + (i+1) + '</td>';
                groupHtml = '<td style="font-weight: bold;">' + dataObj[i].group + '</td>';
                nmiHtml = '<td style="font-weight: bold">' + tmpNmi.toFixed(4) + '</td>';
                ancHtml = '<td style="font-weight: bold">' + tmpAnc.toFixed(4) + '</td>';
                timeHtml = '<td style="font-weight: bold">' + dataObj[i].details.latest_time + '</td>';
                countHtml = '<td style="font-weight: bold">' + dataObj[i].details.total_count + '</td>';
            }
            else{
                rankHtml = '<td>' + (i+1) + '</td>';
                groupHtml = '<td>' + dataObj[i].group + '</td>';
                nmiHtml = '<td>' + tmpNmi.toFixed(4) + '</td>';
                ancHtml = '<td>' + tmpAnc.toFixed(4) + '</td>';
                timeHtml = '<td>' + dataObj[i].details.latest_time + '</td>';
                countHtml = '<td>' + dataObj[i].details.total_count + '</td>';
            }
        }

        $(id).append('<tr>' + rankHtml + groupHtml + nmiHtml + ancHtml + timeHtml + countHtml + '</tr>');
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