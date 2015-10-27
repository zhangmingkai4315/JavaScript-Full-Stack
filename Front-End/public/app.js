var parseID='cbOH056YtJQvNuMlyxmJUowIcGkNcGSoQXTnyVe2';
var parseRestKey='Ezj1diHmjd1keAURajJTMELdl30kC8XwH9yG6rFo';
$(document).ready(function () {
    getMessage();
    $('#send').click(function () {
      var username=$('input[name=username]').attr('value');
      var password=$('input[name=password]').attr('value');
      console.log(username);
      console.log('!');
      $.ajax({
        url:'http://api.parse.com/1/classes/messageBoard',
        headers:{
          'X-Parse-Application-Id':parseID,
          'X-Parse-REST-API-Key':parseRestKey
        },
        contentType:'application/json',
        dataType:'json',
        processData:false,
        data:JSON.stringify({
          'username':username,
          'password':password
        }),
        type:'POST',
        success:function () {
          console.log('sent');
          getMessage();
        },
        error:function () {
          console.log('error');
        }
      });
    });
    function getMessage() {
      $.ajax({
        url:'http://api.parse.com/1/users/messageBoard',
        headers:{
          'X-Parse-Application-Id':parseID,
          'X-Parse-REST-API-Key':parseRestKey
        },
        contentType:'application/json',
        dataType:'json',
        type:'GET',
        success:function (data) {
          console.log('Get');
          updateView(data);
        },
        error:function () {
          console.log('error');
        }
      });
    }

    function updateView(messages) {
      var table=$('.table tbody');
      table.html('');
      $.each(messages.results,function (index,value) {
        var trEl=$('<tr><td>'
                    + value.username
                    + '</td><td>'
                    + value.message +
                    '</td></tr>');
        table.append(trEl);
      });
      console.log(messages);
    }
});
