; (function () {
    "use strict";
    var module = angular.module('sol.services');

    module.factory('SelectedDateService', [function () {
        var selectedDate = new Date(); //new Date(2014, 3, 1);

        return {
            getSelectedDate: function () {
                return selectedDate;
            },
            setSelectedDate: function (date) {
                selectedDate = date;
            },
            incrementSelectedDate: function () {
                selectedDate.setDate(selectedDate.getUTCDate() + 1);
                return selectedDate;
            },
            decrementSelectedDate: function () {
                selectedDate.setDate(selectedDate.getUTCDate() - 1);
                return selectedDate;
            }
        }
    }]);
})();


