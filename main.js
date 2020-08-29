/**LINKS
 * API : https://rel.ink/
 * Challenge : https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G
 * stackoverflow : https://stackoverflow.com/questions/9713058/send-post-data-using-xmlhttprequest 
 */

var input = document.getElementById('linkInput');
var shortBtn = document.getElementById('testBtn');
var links = document.querySelector('.links');


shortBtn.addEventListener('click', function () {
    console.log(this);

    if (input.value) {

        // POST
        var http = new XMLHttpRequest();
        var url = 'https://rel.ink/api/links/';
        var params = `url=${input.value}`;

        http.open('POST', url, true);

        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');


        http.onreadystatechange = function () {//Call a function when the state changes.

            if (http.readyState == XMLHttpRequest.DONE && http.status == 201) {
                var data = JSON.parse(http.responseText);
                console.log(data);
                console.log(`https://rel.ink/${data.hashid}`);
                addNewLink(data);
            }
        };

        http.send(params);

    }


});
function  CopyFunction() {
    console.log('function copy')
    var copyText = document.getElementById("myinput");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
   
  }

function addNewLink(data){
    
    // https://rel.ink/kzq0vg

    var url = data.url.length < 32 ? data.url : data.url.substr(0, 32) + '...';  
    var shorthLink = `https://rel.ink/${data.hashid}`;

    var linkDiv = 
    `<div class="showLinks   d-flex justify-content-between align-items-baseline">
      <p>${url}</p>
      
      <div class = 'd-flex' >
        <input id = 'myinput' value="${shorthLink}" class='  col-10 input  h-100 ' /> 
        <button onclick= CopyFunction() class='  btn btn-info ml-3' >Copy</button>
      </div>
    
    </div>`;


    links.innerHTML += linkDiv;

}

