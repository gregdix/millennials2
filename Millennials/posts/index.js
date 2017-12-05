'use strict';

var urlPre = 'http://themillennialgen.com/wp-json/wp/v2/posts/?_embed';
var urlPreInclude = 'http://themillennialgen.com/wp-json/wp/v2/posts/?_embed&include=';
var uth = '';
var ppg = 5;
var srch = '';
var includeId = 1;

//srch = document.getElementById('srchterm').value;
//uth = document.getElementById('authid').value;
//ppg = document.getElementById('postpg').value;

srch = localStorage.getItem("searchTerm");
uth = localStorage.getItem("authorID");
ppg = localStorage.getItem("postShow");
includeId = localStorage.getItem("postID");

if (srch === null) {
    srch = '';
    document.getElementById('srchterm').value = srch;
};

if (ppg === null) {
    ppg = 3;
    document.getElementById('postpg').value = ppg;
};

if (uth === null) {
    uth = '1';
    document.getElementById('authid').value = uth;
};

if (includeId != '' && includeId != null) {
   // urlPre = urlPreInclude;
    document.getElementById('includeid').value = includeId;
};

//document.getElementById('srchterm').value = srch;
document.getElementById('postpg').value = ppg;
document.getElementById('authid').value = uth;
document.getElementById('includeid').value = includeId;
//includeId = document.getElementById('includeid').value;


// GGB var apiURL = urlPre + includeId + '&search=' + srch + '&per_page=' + ppg + '&author=';
//var apiURLX = 'http://themillennialgen.com/wp-json/wp/v2/posts/?_embed&search=&per_page=3&author='; 
var apiURLusers = 'http://themillennialgen.com/wp-json/wp/v2/users';
var apiURL = 'http://themillennialgen.com/wp-json/wp/v2/posts/?_embed&per_page=15&author=';

/**
 * Posts demo with ability to change author
 */
var check = '';
var counter = 0;
var postCounter = 0;
var counterLog = '';
var userLog = '';
var i = 0;

var posts = new Vue({

	el: '#app',

	data: {
        authors: ['1', '442', '443', '9'],
        currentAuthor: 1,
       // postPerpage: '3',
		posts: null
	},

	created: function created() {
		this.fetchData();
	},

	watch: {
		currentAuthor: 'fetchData'
	},

	methods: {
		fetchData: function fetchData() {
			var xhr = new XMLHttpRequest();
            var self = this;
            check = apiURL + self.currentAuthor;
            xhr.open('GET', apiURL + self.currentAuthor);
            
			xhr.onload = function () {
                self.posts = JSON.parse(xhr.responseText);
               // alert(self.posts[0].id);
                console.log(self.posts[0].link);
                console.log(self.posts[0].id);
                postCounter = self.posts.length;
                for (i = 0; i < self.posts.length; i++) {
                    counterLog += self.posts[i].id + " postNo= " + i + " link:" + self.posts[i].link + "<br>"; //post._embedded.author[0].name
                }
                
               // check = JSON.stringify(xhr.responseText);
               // check = JSON.stringify(self.posts);
                check = JSON.stringify(self.posts[2].link);
               // checkit();
                fetchUsers();
			};
            xhr.send();
            
        }
        
    }
    
}); 

function showFull(elmnt, disp, postid) {
    var GetPostid = postid;
    elmnt.style.display = disp;
    elmnt.id = elmnt.id+'hidden';
   // alert(name);
    document.getElementById(GetPostid).style.display = 'block';
   // this('div').className = "excerpt hide";
}

function checkit() {
   // alert(check);
    //$('#target').html(check);
    document.getElementById('target').innerHTML = check + "<br>" + ' Postcount: ' + postCounter + "<br>" + counterLog + "<br>" + ' Post#: ' + counter + "<br>";
    
}

var userPic = '';
function fetchUsers() {
    var xhr = new XMLHttpRequest();
    var user = this;
    var userID = 1;
   // xhr.open('GET', apiURLusers + userID);
    xhr.open('GET', apiURLusers);

    xhr.onload = function () {
        user = JSON.parse(xhr.responseText);
       // console.log(user[0].name);
       // console.log(user[0].id);
        postCounter = user.length;
        for (i = 0; i < user.length; i++) {
           // counterLog += self.posts[i].id + " postNo= " + i + " link:" + self.posts[i]._embedded.author.name + "<br>"; //post._embedded.author[0].name
            console.log(user[i].name);
            console.log(user[i].id);
            console.log(user[i].avatar_urls['48']);
           // var avatar = user[i].avatar_urls['48'];
            userPic = user[i].avatar_urls['48'];
                //avatar.replace("&r=g&d=mm", "&#038;r=g&#038;d=mm");
            userLog += user[i].id + " - " + user[i].name + "<img src='" + userPic + "' />" + "<br>";
        }
        
        popUserlist();
    };
    xhr.send();

}

function popUserlist() {
    // alert(check);
    //$('#target').html(check);
    document.getElementById('targetUsers').innerHTML = userLog + "<br>";

}
function setlocalParams() {
    srch = document.getElementById('srchterm').value;
    uth = document.getElementById('authid').value;
    ppg = document.getElementById('postpg').value;
    includeId = document.getElementById('includeid').value;

    localStorage.setItem("searchTerm", srch);
    localStorage.setItem("authorID", uth);
    localStorage.setItem("postShow", ppg);
    localStorage.setItem("postID", includeId);

}

