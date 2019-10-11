
$(function(){
    //get/read
    $('#get-button').on( 'click',function(){
$.ajax({
url:'/users',
contentType: 'application/json',
success: function(response){
    var tbodyEl =$('tbody');
    tbodyEl.html('');
    response.user.forEach(function(user){
        tbodyEl.append('\
        <tr>\
            <td class="id">' + user.id + '</td>\
            <td><input type="text" class="name" value="' + user.random + '"></td>\
            \
            <td><input type="text" class="name" value="' + user.fname + '"></td>\
            \
            <td><input type="text" class="name" value="' + user.email + '"></td>\
            <td>\
                <button class="update-button">UPDATE/PUT</button>\
                <button class="delete-button">DELETE</button>\
            </td>\
        </tr>\
    ');
    });
}
});
    });

    //create/post
    // $('#addform1').submit(function(event){
    //     event.preventDefault();
    //     var fname= $('#fnameid1').val();
    //     var email= $('#emailid1').val();
    //     var Uss={
    //         "fname":fname,
    //         "email" : email
    //     };
        
    //     var data=JSON.stringify(Uss);
    //     console.log(data)
    //     $.ajax({
    //             url:'/users',
    //             type:'POST',
    //             contentType: 'application/json',
    //             data :data,
    //             dataType:"json",
    //             success: function(data){
    //                 console.log(data);
    //                 // fname.val('');
    //                 // email.val('');
    //             },
    //             error:function(){
    //                 console.log('Error');
    //             }

    //     });
    // });
});

