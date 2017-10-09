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
 	$("#resultData").empty();
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
		alert("Username cannot be blank. Please enter correct data.");	
		return false;
	}
}

function dispalyResult(userName){
	
	var api ="https://en.wikipedia.org/w/api.php?action=query&format=json&list=usercontribs&ucuser="+userName.val()+"&ucdir=older&uclimit=5&callback=?";

	$.ajax({
			url: api,
			type: 'GET',
			contentType: "application/json;",
			dataType: "jsonp",
			async: false,
			headers: { 'Api-User-Agent': 'useredits-tool/1.0' },
   
			success: function(result,status,error){
				
				if(result.error == null) {
					
					ApiData = result.query.usercontribs;
					var string = "";
					console.log(ApiData);
					
					if(ApiData.length == 0) {
						string = "<h3> The user has made no edits yet. </h3>";
						
					}else{

						for(var i=0;i<ApiData.length;i++) {
							string+= "<div class='panel panel-default col-xs-4' > <div class='panel-body'>Title: " 
                        			+ ApiData[i].title + "<br>Date: " + (ApiData[i].timestamp).slice(0,10) + "<br>Comment: " + 
						ApiData[i].comment + '<br> <a href="https://en.wikipedia.org/w/index.php?pageid=' +ApiData[i].pageid+'&oldid='+ApiData[i].revid +'&diff=prev">'+ 'Go to page </a> <br>' + '</div></div>';
					}
				
					}
					console.log(string);
					$("#resultData").append(string);
            	}
        	},
            error: function(result,status,error) {
               console.log(error);
   }
        });
}