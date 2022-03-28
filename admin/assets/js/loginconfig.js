$(document).ready(function(){
      
    var UserDetails = localStorage.getItem("UserDetails");
    UserDetails = JSON.parse(UserDetails);
    $.each(UserDetails,function(index,val){   
      $("#user-name").text(val.name);
    }); 

    var IsLoggedIn =  localStorage.getItem("IsLoggedIn");
    if( IsLoggedIn == false || IsLoggedIn == null){
      location.href = "login.html";
    }

    $("#logout-btn").click(function(){
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('UserDetails');
      localStorage.removeItem('IsLoggedIn');
      location.href = "login.html";        
    });
    
  });   