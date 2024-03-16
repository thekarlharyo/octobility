// Get Current Year
function getCurrentYear() {
    var d = new Date();
    var year = d.getFullYear();
    document.querySelector("#displayDateYear").innerText = year;
}
getCurrentYear()

//client section owl carousel
$(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    navText: [
        '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
        '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'
    ],
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1000: {
            items: 2
        }
    }
});

/** google_map js **/

function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}


function loadDecode() {
			  var xhttp = new XMLHttpRequest();
			  xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				  var data = JSON.parse(this.responseText);
				  document.getElementById("myimage").src = data.results[0].picture.large
				}
			  };
			  xhttp.open("GET", "https://randomuser.me/api", true);
			  xhttp.send();
}

$("#button2").click( async function() {
    
    const assignment = await getAssignment();
   // $("#imagedisp").attr("src", 'data:image/gif;base64,' + $("#frame").text());
    const assignment2 = await getAssignment3();

});




async function getAssignment() {

        fetch('https://5jege89gij.execute-api.ap-southeast-1.amazonaws.com/default/converttexttoimage?text=hello',{
       	method: "GET",
        mode: "cors",
        
        
        })
      // Retrieve its body as ReadableStream
      .then(response => response.body)
      .then(rs => {
        const reader = rs.getReader();
    
        return new ReadableStream({
          async start(controller) {
            while (true) {
              const { done, value } = await reader.read();
    
              // When no more data needs to be consumed, break the reading
              if (done) {
                break;
              }
    
              // Enqueue the next data chunk into our target stream
              controller.enqueue(value);
            }
    
            // Close the stream
            controller.close();
            reader.releaseLock();
          }
        })
      })
      // Create a new response out of the stream
      .then(rs => {
          
          return new Response(rs);
      
      })
      // Create an object URL for the response
      .then(response => {
          value = response.text();
          
          return value;
      
      })
      .then(text => {
          console.dir(text);
          imagedisp.src = 'data:image/gif;base64,' + text;
    
      })
      .catch(console.error);
    
    
}   


$("#button3").click( async function() {
    
    const assignment = await getAssignment3();
   
});



async function getAssignment3() {
    $("#button").prop("disabled", true);

    fetch('https://demoml.cakra.ai/tts/synthesize_audio',{
   	method: "POST",
    mode: "cors",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({text: $("#text").val() })    
    
    })
  // Retrieve its body as ReadableStream
  .then(response => response.body)
  .then(rs => {
    const reader = rs.getReader();

    return new ReadableStream({
      async start(controller) {
        while (true) {
          const { done, value } = await reader.read();

          // When no more data needs to be consumed, break the reading
          if (done) {
            break;
          }

          // Enqueue the next data chunk into our target stream
          controller.enqueue(value);
        }

        // Close the stream
        controller.close();
        reader.releaseLock();
      }
    })
  })
  // Create a new response out of the stream
  .then(rs => {
      
      return new Response(rs);
  
  })
  // Create an object URL for the response
  .then(response => {
      value = response.json();
      
      return value;
  
  })
  .then(text => {
      //console.dir(text.audio);
      var snd = new Audio('data:audio/wav;base64,' + text.audio);
      audioplayer.src = 'data:audio/wav;base64,' + text.audio;
      $("#button").prop("disabled", false);
  })
  .catch(console.error);

}