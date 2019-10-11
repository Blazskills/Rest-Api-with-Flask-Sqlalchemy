
$(document).on('submit', '#addform1', function(e) {
    
    
        e.preventDefault();

       var fname= $('#fnameid1').val();
       var email= $('#emailid1').val();
     
       function hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
      }

      


        if (fname =="" ||  hasWhiteSpace(fname)){
            document.getElementById('fnameid').innerHTML="** Please fill the Full Name";
          
        }
        else{
            document.getElementById('fnameid').innerHTML="";
        }

        if (email =="" ||  hasWhiteSpace(email)){
            document.getElementById('emailid').innerHTML="** Please fill the Email feilds";
         
        }
        else{
            document.getElementById('emailid').innerHTML="";
        }

        if ( hasWhiteSpace(fname) ||  hasWhiteSpace(email) ) return false;
        
        
        if (fname=='' || email=='') return false;

        $.ajax({
            type: 'POST',
            url: '/users',
            data:JSON.stringify({
                fname: $('#fnameid1').val(),
                email: $('#emailid1').val(),
            }),
            contentType: 'application/json',
            
            beforeSend: function(){
                document.getElementById('btn').value="Loading..."
            },
        
            success: function(data){
               

                if (data.error){
                    $('#errorAlert').text(data.error).show();
                    $('#successAlert').hide();
                }
                else{
                    $('#successAlert').text(data.message).show();
                    $('#errorAlert').hide();
                    // window.location='/datatable'
                }
                
            document.getElementById('fnameid1').value="";
            document.getElementById('emailid1').value="";
                        
                    },
                    
                    
            statusCode : {
                403 : function(){
                        alert('method forbidden')
                },
                500 : function(){
                    alert('internal server error')
            },
            404 : function(){
                alert('not found')
        },
            },                 error : function(XMLHttpRequest, textStatus, errorThrown){
                                    }
        });
});
