function timeStringToMinutes(timeStr) {
    let time = timeStr
        .split(':')
        .map((timePart) => parseInt(timePart, 10));

    time = time[0] * 60 + time[1];

    return time;
}

function minutesToTimeString(minutes) {
    let hh = (~~(minutes / 60)).toString();
    let mm = (minutes % 60).toString();

    if (mm.length === 1) {
        mm = '0' + mm;
    }

    return `${hh}:${mm}`;
}

function findTime(schedules, duration) {
    const MIN_TIME = timeStringToMinutes('9:00');
    const MAX_TIME = timeStringToMinutes('19:00');

    const schedulesInMinutes = schedules
        .map((person) => {
            return person
                .map((appointment) => {
                    return appointment.map(timeStringToMinutes);
                });
        });

    const spareTimeSchedule = schedulesInMinutes
        .map((person) => {
            person.unshift([MIN_TIME, MIN_TIME]);
            person.push([MAX_TIME, MAX_TIME]);

            const personSpareTime = [];

            let l = person.length;
            for (let i = 0; i < l; i++) {
                if (i + 1 === l) continue;
                personSpareTime.push([person[i][1], person[i + 1][0]]);
            }

            return personSpareTime.filter((time) => {
                return (time[1] - time[0]) >= duration;
            });
        });

    function walk(time, arr) {
        for (let i = 0; i < arr.length; i++) {
            let intersectTime = [Math.max(time[0], arr[i][0]), Math.min(time[1], arr[i][1])];
            if (intersectTime[1] - intersectTime[0] >= duration) {
                return intersectTime;
            }
        }

        return null;
    }

    for (let i = 0; i < spareTimeSchedule[0].length; i++) {
        let time = spareTimeSchedule[0][i];

        for (let r = 1; r < spareTimeSchedule.length; r++) {
            time = walk(time, spareTimeSchedule[r]);
        }

        return time && time.map(minutesToTimeString)[0];
    }

    return null;
}

let schedules = [
    [
        ['09:00', '11:30'],
        ['13:30', '16:00'],
        ['16:00', '17:30'],
        ['17:45', '19:00']
    ],
    [
        ['09:15', '12:00'],
        ['14:00', '16:30'],
        ['17:00', '17:30']
    ],
    [
        ['11:30', '12:15'],
        ['15:00', '16:30'],
        ['17:45', '19:00']
    ]
];

console.assert(findTime(schedules, 60) === '12:15');
