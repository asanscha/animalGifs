$(function(){
   populateButtons(searchAnimals, 'searchButton', '#buttonsSection'); 
})

var searchAnimals = ['Dog', 'Cat', 'Bird'];

function populateButtons(searchAnimals, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for(var i=0; i<searchAnimals.length; i++){
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type', searchAnimals[i]);
        a.text(searchAnimals[i]);
        $(areaToAddTo).append(a);
    }
}

$(document).on('click', '.searchButton', function(){
    var type = $(this).data('type'); 
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Nxy4t101ZqeIwdNH6v09mXNoJII8oqT6&q="+type+"&limit=10&offset=0&rating=G&lang=en";
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        .done(function(response) {
            console.log(response);
            for(var i=0; i<response.data.length; i++){
                var searchDiv = $('<div class="search-item">');
                var rating = response.data[i].rating;
                var p = $('<p>').text('Rating:' + rating);
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $('<img>');
                image.attr('src', still);
                image.attr('data-still', still);
                image.attr('data-animated', animated);
                image.attr('data-state', 'still');
                image.addClass('searchImage');
                searchDiv.append(p);
                searchDiv.append(image);
                $('#searches').append(searchDiv)
            }
        })
})
