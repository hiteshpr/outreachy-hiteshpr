$(document).ready(function(){
        
        $("input[name='username']").keyup(function(){
  			
  			if($(this).val().length > 0){
  				$("#success-icon").css("display","block");
  				$(this).parent().parent().addClass("has-success");	
  				$("#error-icon").css("display","none");
				$(this).parent().parent().removeClass("has-error");
  			}
  			else{
  				$("#success-icon").css("display","none");	
  				$(this).parent().parent().removeClass("has-success");
  			}
		});
        
});

function formSubmit(){
 
 var userName = $("input[name='username']");

	if(validateForm(userName)){
		dispalyResult(userName);
	}
}

function validateForm(userName){


	if(userName.val().length > 0 ) {
		$("#error-icon").css("display","none");
		$(userName).parent().parent().removeClass("has-error");
		return true;
	}else{
	
		$("#error-icon").css("display","block");
		$(userName).parent().parent().addClass("has-error");	
		return false;
	}
}

function dispalyResult(userName){
	/*
	console.log(userName.val());*/

	$.ajax({
            type:"GET",
            dataType:"html",
            url:"https://en.wikipedia.org/w/api.php?action=query&action=centralauthtoken&format=jsonp&list=usercontribs&ucuser="+userName.val()+"&ucdir=older",
   

            success: function(result){
               alert("Data: "+ "\nStatus: " + status);
            }
        });
}