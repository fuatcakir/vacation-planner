function createDayObject(date) {

    var d = new Date(date);

    let newDay = {
        year: 2020,
        month: 11,
        day: 1,
        dayType: 'WE', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
        description: '',
        dayCode: 'Su'
    };

    newDay.day = d.getDate();
    newDay.month = d.getMonth() + 1;
    newDay.year = d.getFullYear();
    switch (d.getDay()) {
        case 0:
            newDay.dayCode = 'Su';
            newDay.dayType = 'WE';
            break;
        case 1:
            newDay.dayCode = 'Mo';
            newDay.dayType = 'WD';
            break;
        case 2:
            newDay.dayCode = 'Tu';
            newDay.dayType = 'WD';
            break;
        case 3:
            newDay.dayCode = 'We';
            newDay.dayType = 'WD';
            break;
        case 4:
            newDay.dayCode = 'Th';
            newDay.dayType = 'WD';
            break;
        case 5:
            newDay.dayCode = 'Fr';
            newDay.dayType = 'WD';
            break;
        case 6:
            newDay.dayCode = 'Sa';
            newDay.dayType = 'WE';
            break;
        default:
            newDay.dayCode = 'Su';
            newDay.dayType = 'WE';
            break;
    }
    newDay.fullDateStr = d.toDateString();
    holidayCheck(newDay);
    newDay.description = getHolidayDescription(newDay);
    return newDay;
}

function createCalendar() {

    var day2020SIndex = new Date(2020, 0, 1, 1, 1, 1, 1);

    let dayList = [];

    while (day2020SIndex.getFullYear() <= 2020) {
        dayList.push(createDayObject(day2020SIndex));
        day2020SIndex.setDate(day2020SIndex.getDate() + 1);
    }

    return dayList;
}

function findNextWeekDay(pDay, dayList) {
    let dayFound = false;
    if (pDay.dayType == 'WD') {
        return pDay;
    }
    else {
        for (let index = 0; index < dayList.length; index++) {
            const element = dayList[index];
            if (pDay.year == element.year && pDay.month == element.month && pDay.day == element.day) {
                dayFound = true;
            } else {
                if (dayFound && element.dayType == 'WD') {
                    return element;
                }
            }

        }
    }

    return pDay;
}

function findPreivousFirstHoliDay(pDay, dayList) {
    let dayPrevWdFound = false;
    let previousWDindex = 0;
    let preivousFirstHoliDay = {};

    if (pDay.dayType != 'WD') {
        return pDay;
    }
    else {
        for (let index = (dayList.length - 1); index >= 0; index--) {
            const element = dayList[index];
            if (pDay.year == element.year && pDay.month == element.month && pDay.day == element.day) {
                dayPrevWdFound = true;
            } else {
                if (dayPrevWdFound && element.dayType == 'WD') {
                    pDay = element;
                    previousWDindex = index;
                }
            }

        }
    }
    if (previousWDindex + 1 < dayList.length) {
        preivousFirstHoliDay = dayList[previousWDindex + 1];
    } else {
        preivousFirstHoliDay = dayList[previousWDindex];
    }
    return preivousFirstHoliDay;
}

function findDayIndex(pDay, dayList) {

    for (let index = 0; index < dayList.length; index++) {
        const element = dayList[index];
        if (pDay.year == element.year && pDay.month == element.month && pDay.day == element.day) {
            return index;
        }
    }
    return 0;
}

function dateRangeCount(pStartDay, pEndDay, dayList) {
    return findDayIndex(pEndDay, dayList) - findDayIndex(pStartDay, dayList) ;
}

function getEfficencyRatio(pVacationCount, pDateRangeCount) {
    return pDateRangeCount / pVacationCount ;
}