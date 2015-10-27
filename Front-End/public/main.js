$(document).ready(function () {
  $('#btn').click(function () {
    var username=$('#username').val();
    var url='http://api.twitter.com/1/status/user.json?inc=true&username='+username+'&count=1000';
    if(username!==''){
      list=[];
      counter={};
      var pages=0;
      getData(url);
    }else{
      alert("No username!");
    }
  });
});

function getData(url) {
  var request=$.ajax({
    url:url,
    dataType:'jsonp',
    jsonpCallback:'fetchData',
    type:'GET'
  });
}
var list=[];
var counter={};
var pages=0;

function fetchData(m) {
  //处理逻辑
}
