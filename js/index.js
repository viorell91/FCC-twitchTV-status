//set of channels to monitor
channel=["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","comster404"];

//---------------
//FUNCTIONALITY
//---------------
//DISPLAY ALL THE CHANNELS
function getAllUsers(){
		while (document.getElementById("userList").hasChildNodes()) {
		document.getElementById("userList").removeChild(document.getElementById("userList").firstChild);
	}
	//iterate over predefined channels
	for(i=0;i<channel.length;i++){
	//call twitch api to get the channels' status
		$.getJSON('https://api.twitch.tv/kraken/streams/'+channel[i]+'?client_id=8oc6j2emcgf602iosrsmei7l6297d6r&callback=?', function(data) {
			//case when user doesn't exist
			if(data.hasOwnProperty("error")){
				var userContainer = document.createElement("div");
				userContainer.setAttribute("class","results")
				userContainer.setAttribute("id","entry"+i);

				var p_userName = document.createElement("p");
				p_userName.setAttribute("class","invalid_channel");

				var textnode_userName = document.createTextNode(data.message+".");
				p_userName.appendChild(textnode_userName);
	
				userContainer.appendChild(p_userName);
				document.getElementById("userList").appendChild(userContainer);
			}
			
			//case when user is streaming
			else if(data.stream != null){
				
				//case when user is streaming undefined stuff
				if(data.stream.game == null){
					var userContainer = document.createElement("div");

					userContainer.setAttribute("class","results")
					userContainer.setAttribute("id","entry"+i);
					//logo of the channel
					var logo = document.createElement("img");
					logo.setAttribute("src",data.stream.channel.logo);
					logo.setAttribute("id","user_logo"+i);
					//status
					var status_led = document.createElement("div");
					status_led.setAttribute("class","status_online");
					//username
					var p_userName = document.createElement("p");
					p_userName.setAttribute("class","headers");
					var p_streamName = document.createElement("p");
					p_streamName.setAttribute("class","sub_headers");
					//streaming content
					var textnode_streamName = document.createTextNode(data.stream.channel.status);
					var textnode_userName = document.createTextNode(data.stream.channel.name);
					p_userName.appendChild(textnode_userName);
					p_streamName.appendChild(textnode_streamName);
					//redirect to channels' page on click
					$(userContainer).on("click",function(){
	window.open("https://www.twitch.tv/"+data.stream.channel.name);
});				
					userContainer.appendChild(p_userName);
					userContainer.appendChild(logo);
					userContainer.appendChild(status_led);
					userContainer.appendChild(p_streamName);
					document.getElementById("userList").appendChild(userContainer);
				}
				
				//case when user is streaming properly
				else{
					userContainer = document.createElement("div");

					userContainer.setAttribute("class","results")
					userContainer.setAttribute("id","entry"+i);

					var p_userName = document.createElement("p");
					
					p_userName.setAttribute("class","headers");
					var p_streamName = document.createElement("p");
					p_streamName.setAttribute("class","sub_headers");

					var logo = document.createElement("img");
					logo.setAttribute("src",data.stream.channel.logo);
					logo.setAttribute("id","user_logo"+i);

					var status_led = document.createElement("div");
					status_led.setAttribute("class","status_online");
					
					var textnode_userName = document.createTextNode(data.stream.channel.name);
					var textnode_streamName = document.createTextNode(data.stream.game+" "+data.stream.channel.status);
					p_userName.appendChild(textnode_userName);
					
					p_streamName.appendChild(textnode_streamName);
					
					$(userContainer).on("click",function(){
	window.open("https://www.twitch.tv/"+data.stream.channel.name);
});
					userContainer.appendChild(p_userName);
					userContainer.appendChild(logo);
					userContainer.appendChild(status_led);
					userContainer.appendChild(p_streamName);
					document.getElementById("userList").appendChild(userContainer);

				}


			}
			//case when user is offline
			else{
				userContainer = document.createElement("div");

				userContainer.setAttribute("class","results")
				userContainer.setAttribute("id","entry"+i);

				var p_streamName = document.createElement("p");
				p_streamName.setAttribute("class","sub_headers");

				var textnode_streamName = document.createTextNode("User offline");
				p_streamName.appendChild(textnode_streamName);

				userContainer.appendChild(p_streamName);
				
					document.getElementById("userList").appendChild(userContainer);

				$.getJSON(data._links.channel+'?client_id=8oc6j2emcgf602iosrsmei7l6297d6r', function(data) {
					var logo = document.createElement("img");
					logo.setAttribute("src",data.logo);
					logo.setAttribute("id","user_logo"+i);
					
					var status_led = document.createElement("div");
					status_led.setAttribute("class","status_offline");
					
					var p_userName = document.createElement("p");
					p_userName.setAttribute("class","headers");

					var textnode_userName = document.createTextNode(data.name);
					p_userName.appendChild(textnode_userName);
					
					$(userContainer).on("click",function(){
	window.open("https://www.twitch.tv/"+data.name);
});			
					userContainer.appendChild(p_userName);
					userContainer.appendChild(logo);
					userContainer.appendChild(status_led);
					document.getElementById("userList").appendChild(userContainer);
				});

			}

		});
	}
}
//DISPLAY ALL THE OFFLINE CHANNELS
function getOfflineUsers(){
	while (document.getElementById("userList").hasChildNodes()) {
		document.getElementById("userList").removeChild(document.getElementById("userList").firstChild);
		$("#place").html("User Offline");
	}	
	
	for(j=0;j<channel.length;j++){
	
		$.getJSON('https://api.twitch.tv/kraken/streams/'+channel[j]+'?client_id=8oc6j2emcgf602iosrsmei7l6297d6r', function(data) {
			
			if(data.stream == null){
				var userContainer = document.createElement("div");

				userContainer.setAttribute("class","results")
				userContainer.setAttribute("id","entry"+j);

				var p_streamName = document.createElement("p");
				p_streamName.setAttribute("class","sub_headers");

				var status_led = document.createElement("div");
				status_led.setAttribute("class","status_offline");
				
				var textnode_streamName = document.createTextNode("User offline");
				p_streamName.appendChild(textnode_streamName);

				userContainer.appendChild(p_streamName);
				userContainer.appendChild(status_led);
				
				document.getElementById("userList").appendChild(userContainer);

				$.getJSON(data._links.channel+'?client_id=8oc6j2emcgf602iosrsmei7l6297d6r', function(data) {
					var logo = document.createElement("img");
					logo.setAttribute("src",data.logo);
					logo.setAttribute("id","user_logo"+j);

					var p_userName = document.createElement("p");
					p_userName.setAttribute("class","headers");

					var textnode_userName = document.createTextNode(data.name);
					p_userName.appendChild(textnode_userName);

					$(userContainer).on("click",function(){
	window.open("https://www.twitch.tv/"+data.name);
});
					
					userContainer.appendChild(p_userName);

					userContainer.appendChild(logo);
					document.getElementById("userList").appendChild(userContainer);
				
				});
			}
		});
	}
}


function getOnlineUsers(){
	while (document.getElementById("userList").hasChildNodes()) {
		document.getElementById("userList").removeChild(document.getElementById("userList").firstChild);
		
	}	
	
	for(j=0;j<channel.length;j++){
	
		$.getJSON('https://api.twitch.tv/kraken/streams/'+channel[j]+'?client_id=8oc6j2emcgf602iosrsmei7l6297d6r', function(data) {
			
			if(data.stream.game == null){
				var userContainer = document.createElement("div");
			
				userContainer.setAttribute("class","results")
				userContainer.setAttribute("id","entry"+i);
				
				var logo = document.createElement("img");
				logo.setAttribute("src",data.stream.channel.logo);
				logo.setAttribute("id","user_logo"+i);
				
				var p_userName = document.createElement("p");
				p_userName.setAttribute("class","headers");
				
				var status_led = document.createElement("div");
				status_led.setAttribute("class","status_online");
				
				var p_streamName = document.createElement("p");
				p_streamName.setAttribute("class","sub_headers");

				var textnode_streamName = document.createTextNode(data.stream.channel.status);
				var textnode_userName = document.createTextNode(data.stream.channel.name);
				p_userName.appendChild(textnode_userName);
				p_streamName.appendChild(textnode_streamName);
				
				$(userContainer).on("click",function(){
					window.open("https://www.twitch.tv/"+data.stream.channel.name);
				});
				userContainer.appendChild(status_led);
				userContainer.appendChild(p_userName);
				userContainer.appendChild(logo);
				userContainer.appendChild(p_streamName);
				
				document.getElementById("userList").appendChild(userContainer);
			}
			else{
				userContainer = document.createElement("div");
			
				userContainer.setAttribute("class","results")
				userContainer.setAttribute("id","entry"+i);

				var p_userName = document.createElement("p");
				p_userName.setAttribute("class","headers");
				
				var status_led = document.createElement("div");
				status_led.setAttribute("class","status_online");
				
				var p_streamName = document.createElement("p");
				p_streamName.setAttribute("class","sub_headers");

				var logo = document.createElement("img");
				logo.setAttribute("src",data.stream.channel.logo);
				logo.setAttribute("id","user_logo"+i);
				
				var textnode_userName = document.createTextNode(data.stream.channel.name);
				var textnode_streamName = document.createTextNode(data.stream.game+" "+data.stream.channel.status);
				p_userName.appendChild(textnode_userName);
				p_streamName.appendChild(textnode_streamName);
				
				$(userContainer).on("click",function(){
					window.open("https://www.twitch.tv/"+data.stream.channel.name);
				});
				userContainer.appendChild(status_led);
				userContainer.appendChild(p_userName);
				userContainer.appendChild(logo);
				userContainer.appendChild(p_streamName);
				
				document.getElementById("userList").appendChild(userContainer);
			}
		});
	}
}

$(document).ready(getAllUsers());