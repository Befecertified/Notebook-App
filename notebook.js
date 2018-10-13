$(function(){
    //function to hide the loading screen
    function hideSplashScreen(){
        $("#splash-screen").hide();

        //invoke the show note screen function after loading the splash screen
        showNoteScreen(); //see line 11 for show note screen function
    }

    //function to show the notes screen after loading splash screen
    function showNoteScreen(){
        $("#note-screen").show();
    }

    //vanilla JS setTimeout function to call hide splash screen function after a two seconds interval 
    setTimeout(hideSplashScreen, 2000);

    //function to display note on screen
    function displayNote(note){
        //hide the no notes yet text 
            $("p.blank").hide();
        //add note to screen
            //vanilla js
        if(note.replace(/\s/g,"").length === 0){//test if user entered any text
            //do nothing
        } else {//add the note to screen
            $("#notes").prepend("<li class='note'><p>" + note + "</p><i class='fa fa-chevron-circle-right open-note'></i><i class='fa fa-trash delete'></i><i class='fa fa-edit edit'  data-toggle='modal' data-target='#edit-note'></i></li>");
        }
        
        //clear textarea field
        note = $("textarea").val("");
    }

    //display note when save button is clicked
    $("#save").click(function(){
        var note = $("textarea#note-maker").val();
        displayNote(note);
    })

    //expand note
    $("ul").delegate(".open-note", "click", function(){
        $(this).parent().addClass("note-grow");
        //change expand icon
            //remove current icon
        $(this).removeClass("fa-chevron-circle-right");
            //add new icon
        $(this).addClass("fa-chevron-circle-down");
        $(this).addClass("close-note");
        $(this).removeClass("open-note");        
    })

    //collapse note
    $("ul").on("click", ".close-note", function(){
        $(this).parent().removeClass("note-grow");
        //change expand icon
            //remove current icon
        $(this).removeClass("fa-chevron-circle-down");
            //add new icon
        $(this).addClass("fa-chevron-circle-right"); 
        $(this).addClass("open-note");
        $(this).removeClass("close-note");      
    }) 

    //delete note 
    $("ul").on("click", ".delete", function(){
        $(this).parent().fadeOut(400, function(){
            $(this).remove();
        });
    })  

    //edit note
    $("ul").on("click", ".edit", function(){
        //grab text from clicked note
        var content = $(this).parent().text();
        
        //create modal for current note to edit
        $(this).parents("ul").prepend("<div id='edit-note' class='modal fade' role='dialog'><div class='modal-dialog modal-sm'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'>&times;</button><h4 class='modal-title'>Edit Note</h4></div><div class='modal-body'><textarea id='note-edit' rows='10' placeholder='Type note here...'>" + content + "</textarea></div><div class='modal-footer'><button type='button' class='btn btn-brown' data-dismiss='modal' id='saved'>Save</button></div></div></div></div>");
        //create variable "context" to preserve context of "this" in the save button click listener
        var context = $(this);
        //save editted note
        $("#saved").click(function(){
            var note = $("textarea#note-edit").val();
            displayNote(note);
            context.parent().remove();
            //prevent buggy bootstrap behaviour
            $(".modal-backdrop.in").css("display", "none");
        })
    })
});