
//[2bed173f4257b0d7932c9ee9594caeb1, 50133504342eec6f606a6fb3f21dac07]

const app = document.getElementById('root');
//const title = document.createElement('h2')
//title.textContent = "News Tab"

const container = document.createElement('div');
container.setAttribute('class', 'container');

//app.appendChild(title);
app.appendChild(container);

// style testing without using API calls every refresh :)

// for(var i=0; i < 10; i++){

//             const card = document.createElement('div')
//             card.setAttribute('class','card')

//             const h1 = document.createElement('h1')
//             h1.textContent = "Man Bites Dog, Some Article Title That IS pretty Longj"

//             const p = document.createElement('p')
//             //data.articles[a].description = data.articles[a].description.substring(0,300) //limit 300 char
//             p.textContent = "sdf sndi snosidnf fsif  g iuhu uiu ug iu gg iuihifg guyfuguyf ig ig osn  aofenoawefo nweiofmwe nfweif wjen owfo enf nweofjwj fw fwe fjw ekjwefioweofiweifw wef owe oiwef owoiwfowe fowe f iwef weof weif woenf wn"

//             container.appendChild(card)

//             card.appendChild(h1)
//             card.appendChild(p)
// }





    // holds list of interests
    var interests = [];

    // checks if there are any saved interests in storage
    // if there are, it updates the displayed interests list
    chrome.storage.local.get(['interests_storage'], function(result){
        interests = result['interests_storage'];
        if(result['interests_storage'] !== undefined){
            document.getElementById('interestsList').innerHTML = '' + interests.join(', ');
            }
        else{
            document.getElementById('interestsList').innerHTML = '';
            interests = [];
        }    
    });


    // allows for user to hit enter key to add interest to list
    var input = document.getElementById('Interest');
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById('add').click();
        }
    });


    // event for if the add button is clicked
    document.getElementById('add').onclick = function() {
        
        var val = document.getElementById('Interest').value;
        document.getElementById('Interest').value ='';

        // allows for user to enter 'clear' and it will set the interests list to empty
        if(val === 'clear'){
            chrome.storage.local.set({'interests_storage': []});
            interests = []; 
            document.getElementById('interestsList').innerHTML = '';
        }
        else if(val === ''){
            
        }
        else{    
            // if the input interest isn't in the list, add it
            if(interests.indexOf(val) === -1){
                interests.push(val);

            };


            console.log(interests);

            document.getElementById('interestsList').innerHTML = '' + interests.join(', ');

            chrome.storage.local.set({'interests_storage': interests}); 
        }
    } 

    // event for if the remove button is clicked
    document.getElementById('remove').onclick = function(){
        var val = document.getElementById('Interest').value;
        document.getElementById('Interest').value ='';

        // allows for user to enter 'clear' and it will set the interests list to empty
        if(val === 'clear'){
            chrome.storage.local.set({'interests_storage': []});
            interests = []; 
            document.getElementById('interestsList').innerHTML = '';
        }
        else{
            // if the interest inputted is in the list, remove it
            if(interests.indexOf(val) !== -1){
                index = interests.indexOf(val);
                for(var i = 0; i < interests.length; i++){
                    if(i === index ){
                        interests.splice(i, 1);
                    }
                }

            }


            document.getElementById('interestsList').innerHTML = '' + interests.join(', ');

            chrome.storage.local.set({'interests_storage': interests}, function(){
                console.log(interests);
            });
        }
    }

// chrome.storage.sync.set({'myLine': "hey"}, function(){alert("hey");});

// actual API calls and stuff.


var proxy_url = ''
//var proxy_url = 'https://cors-anywhere.herokuapp.com/';
var api_key = 'eb5129eb7d1d5b118ad0f348cf91d4e2';
var search_key = 'software';
fetch(proxy_url+"https://gnews.io/api/v4/search?q="+search_key+"&token="+api_key+"&lang=en"+"&country=us")
//example: fetch('https://cors-anywhere.herokuapp.com/https://gnews.io/api/v4/search?q=software&token=50133504342eec6f606a6fb3f21dac07')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        for (var a in data.articles) {
            // here, we make divs and classes and other stuff like that
            console.log(data.articles[a])

            const card = document.createElement('div')
            card.setAttribute('class','card')
            // card.setAttribute('id', 'p2')


            const link = document.createElement('a');
            link.setAttribute('href', data.articles[a].url);

            const h1 = document.createElement('h1')
            h1.textContent = data.articles[a].title

            const p = document.createElement('p')
            data.articles[a].description = data.articles[a].description.substring(0,300) //limit 300 char
            p.textContent = data.articles[a].description

            container.appendChild(card)
            card.appendChild(link)

            link.appendChild(h1)
            link.appendChild(p)


        }
            //console.log(articles.title)

        console.log(data);
    });




