'use strict'

const xmr = new XMLHttpRequest();
const userSearch = 0;
let resolveRepos;
let resolveUser;

//
function waitForResolve(){

  resolveUser= JSON.parse(this.responseText);
  document.querySelector('#error').style.visibility= "hidden";
  document.querySelector('#isCorrect').style.visibility = 'hidden';
  document.querySelector('#error').style.position = "absolute";
  document.querySelector('#isCorrect').style.position = "absolute";

  if(resolveUser.login == null){
    
    document.querySelector('#error').style.position = "relative";
    document.querySelector('#error').style.visibility = "visible";
   
  }else {

    document.querySelector('#isCorrect').style.visibility = 'visible';
    document.querySelector('#isCorrect').style.position = 'relative';
    document.querySelector('#searchUser').value = null;
    document.querySelector('#img').src= resolveUser.avatar_url;
    document.querySelector('#userLogin').innerHTML = "@"+resolveUser.login;
    document.querySelector('#fullName').innerHTML = resolveUser.name;
    document.querySelector('#bio').innerHTML = resolveUser.bio;
    GetRepos(resolveUser.repos_url);

  }
  
}

// show the list in the index.html
function showList(){
  var list="";
  resolveRepos = JSON.parse(this.responseText);
   resolveRepos.forEach(function(repo) {    
    list = list+"<div class='repositories'><div class='repoName'>"+repo.name
    +"</div><div class='ratings'><svg class='octicon' viewBox='0 0 14 16' version='1.1' "
    +"width='14' height='16' aria-hidden='true'><path fill-rule='evenodd'"
    +"d='M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z'>"
    +"</path></svg>"
		+ repo.stargazers_count + 
    " <svg class='octicon' viewBox='0 0 10 16' version='1.1' width='10' height='16'"
    +"aria-hidden='true'><path fill-rule='evenodd' "
    +"d='M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z'></path></svg> "
    + repo.forks_count + "</div></div>";
   
   });
   document.querySelector('#List').innerHTML = list;
}

function GetRepos(url){
  
  xmr.open('GET',url,true);
  xmr.onload = showList;
  xmr.send();     

}

 function GetUsers() {

  let userSearch = document.querySelector('#searchUser').value;
  xmr.onload = waitForResolve;  
  xmr.open('GET','https://api.github.com/users/'+userSearch ,true)
  xmr.send();
  
}

 



