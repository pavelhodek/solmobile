    // every time scripts

/*
; jQuery(function ($) {
    $(document)
        .on("pagecreate", "#rozvrh", function (event, ui) {
            //app.log("create rozvrh");

            $("#rozvrh")
                .swipeleft(function (event) {
                    //app.log("swipeleft");
                    event.stopImmediatePropagation();
                    event.stopPropagation();
                    event.preventDefault();

                    addSelectedDateDays(-1);
                    refreshSelectedDate();

                    //$.mobile.pageContainer.pagecontainer("change", "dochazka.html", {});
                })
                .swiperight(function (event) {
                    //app.log("swiperight");
                    event.stopImmediatePropagation();
                    event.stopPropagation();
                    event.preventDefault();

                    addSelectedDateDays(1);
                    refreshSelectedDate()

                    //$.mobile.pageContainer.pagecontainer("change", "hodnoceni.html", {});
                });
        })
});
*/

//var selectedDate = new Date();
/*
    function selectDate() {
        var options = {
            date: selectedDate, //new Date(),
            mode: 'date'
        };

        datePicker.show(options, function (date) {
            alert(date);
            alert(date.getTime());

            if (isNaN(date.getTime())) {
                selectedDate = date;
            }


            refreshSelectedDate();
        });
    }
*/

/*
function dateToString(date) {
    var temp = date || new Date();

    var dateStr = getDayName(temp) + " " + padStr(temp.getDate()) + "." + padStr(1 + temp.getMonth()) + "." + padStr(temp.getFullYear());

    return dateStr;
    //debug(dateStr);
}

function padStr(i) {
    return (i < 10) ? "0" + i : "" + i;
}


function addSelectedDateDays(numberOfDaysToAdd) {
    selectedDate.setDate(selectedDate.getDate() + numberOfDaysToAdd);
    //app.log(selectedDate);
}

function refreshSelectedDate() {
    $("#selectedDate").text(dateToString(selectedDate));
    //app.log("refreshSelectedDate");
}


function addDays(someDate, numberOfDaysToAdd) {
    someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
}


function getMonthName(someDate) {
    //var m = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    //'August', 'September', 'October', 'November', 'December'];
    var m = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];

    return m[someDate.getMonth()];
}

function getDayName(someDate) {
    //var d = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var names = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];
    return names[someDate.getDay()];
}



function setSelectedDate(date) {
    selectedDate = date;

    //app.log(selectedDate);
    //app.log(dateToString(selectedDate));

    $("#selectedDate").val(dateToString(selectedDate));
}


//app.log(selectedDate);
//app.log(selectedDate.getDate());
//app.log(dateToString(selectedDate));
$("#selectedDate").text(dateToString(selectedDate));
*/
