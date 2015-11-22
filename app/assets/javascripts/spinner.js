function showSpinner(type) {
    var size = 0;
    if (type == 1) {
        size = $(".files-selector")[0].files.length;
    }

    if(size > 0 || type == 2) {
        $(".spinner").spin({
            lines: 12, // The number of lines to draw
            length: 7, // The length of each line
            width: 9, // The line thickness
            radius: 30, // The radius of the inner circle
            color: '#000', // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: true // Whether to render a shadow
            //className: '', // The CSS class to assign to the spinner
        });
    }
}
