function logout(){
    $.ajax({
        url: "/account/signout/",
        type: "POST",
        complete: function(jqXHR,ajaxOptions, thrownError) {
            if (jqXHR.status === 200){ //logout success
                window.location.href = "/";
            }                 
        }
    });
}