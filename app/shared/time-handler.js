define(['moment'], function (moment) {
    var min = moment('0001-01-01T00:00:00Z');
    function parse(time) {
        if (time) {
            var t = moment(time);
            if (!t.isSame(min)) {
                return t;
            }
        }
        return null;
    }

    var vm = {
        formatTime: function (time, foramt) {
            var t = parse(time);
            return t && t.format(foramt);
        },
        diff: function (startTime, endTime, type, asFloat) {
            var start = parse(startTime);
            var end = parse(endTime);
            return end.diff(start, type, asFloat);
        }
    };
    return vm;
});