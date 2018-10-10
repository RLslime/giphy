$( document ).ready(function() {
    // An array of topics, new topics will be pushed into this array;
    var topics = ["Pride", "Lust", "Greed", "Sloth", "Gluttony", "Wrath", "Envy"];
    // function and method creation
    function displayGifButtons(){
        $("#gifButtonsView").empty();
        for (var i = 0; i < topics.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("action");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", topics[i]);
            gifButton.text(topics[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    // adding new button
    function addNewButton(){
        $("#addGif").on("click", function(){
        var action = $("#action-input").val().trim();
        if (action == ""){
          return false; // so user cannot add a blank button
        }
        topics.push(action);
    
        displayGifButtons();
        return false;
        });
    }
    // heres the function to remove any added topics
    function removeLastButton(){
        $("removeGif").on("click", function(){
        topics.pop(action);
        displayGifButtons();
        return false;
        });
    }
    // function that will display the desired gifs
    function displayGifs(){
        var action = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=8eohUsBTlBMYyW48D5K7fr3ZQGNwTSZs";
        console.log(queryURL); // displays url
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response);
            $("#gifsView").empty();
            var results = response.data; //shows results of gifs
            if (results == ""){
              alert("There isn't a gif for this selected button");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); //div for results to be shown
                gifDiv.addClass("gifDiv");
                // pull
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                // pulling gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
                gifImage.attr("data-state", "still"); 
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                // pull
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    // Calling Functions & Methods
    displayGifButtons(); // displays list of created topics
    addNewButton();
    removeLastButton();
    $(document).on("click", ".action", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });
