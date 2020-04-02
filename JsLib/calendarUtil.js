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

    let selectedYaar = parseInt(document.getElementById('inputGroupSelectYears').value);
    if (selectedYaar) {
        selectedYaar = parseInt(selectedYaar);
    }
    var daysIndex = new Date(selectedYaar, 0, 1, 1, 1, 1, 1);

    let dayList = [];

    while (daysIndex.getFullYear() <= selectedYaar) {
        dayList.push(createDayObject(daysIndex));
        daysIndex.setDate(daysIndex.getDate() + 1);
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

function findLastHoliDay(pDay, dayList) {
    let dayFound = false;
    let dayFoundIndx = 0;

    for (let index = 0; index < dayList.length; index++) {
        const element = dayList[index];
        if (pDay.year == element.year && pDay.month == element.month && pDay.day == element.day) {
            dayFound = true;
        } else {
            if (dayFound && element.dayType == 'WD') {
                pDay = element;
                dayFoundIndx = index;
                break;
            }
        }

    }

    if (dayFoundIndx == 0) {
        pDay = dayList[dayList.length - 1];
    } else {
        pDay = dayList[dayFoundIndx - 1];

    }
    return pDay;
}

function dateRangeCount(pStartDay, pEndDay, dayList) {
    return findDayIndex(pEndDay, dayList) - findDayIndex(pStartDay, dayList) + 1;
}

function getEfficencyRatio(pVacationCount, pDateRangeCount) {
    return pDateRangeCount / pVacationCount;
}

function calculateVacation(pStartDay, pEndDay, pDayList) {
    let totalVacation = 0;
    let startDayIndex = findDayIndex(pStartDay, pDayList);
    let endDayIndex = findDayIndex(pEndDay, pDayList);
    for (let index = startDayIndex; index <= endDayIndex; index++) {
        const element = pDayList[index];
        holidayCheck(element)
        if (element.dayType == 'WD') {
            totalVacation += 1;
        }
        if (element.dayType == 'E') {
            totalVacation += 0.5;
        }
    }
    return totalVacation;
}

function getHolidayDescription(pStartDay, pEndDay) {
    let hldyDesc = ' ';
    var currHolidays = getSelectedYearHolidays();

    for (const hold in currHolidays) {
        if (currHolidays.hasOwnProperty(hold)) {
            const holiday = currHolidays[hold];
            if (pStartDay.year == holiday.year && pStartDay.month == holiday.month && pStartDay.day == holiday.day) {
                hldyDesc += holiday.description + ' ';

            }

        }
    }
    return hldyDesc.trim();
}

function holidayCheck(pDay) {
    var currHolidays = getSelectedYearHolidays();

    for (const hold in currHolidays) {
        if (currHolidays.hasOwnProperty(hold)) {
            const holiday = currHolidays[hold];
            if (pDay.year == holiday.year && pDay.month == holiday.month && pDay.day == holiday.day) {
                pDay.dayType = holiday.dayType;
                pDay.description = holiday.description;
                break;
            }

        }
    }
}

function getSelectedYearHolidays() {
    let selectedYear = parseInt(document.getElementById('inputGroupSelectYears').value);
    var currentYearHolidays = [];
    if (selectedYear == '2020') {
        currentYearHolidays = holidaysTR2020;
    } else if (selectedYear == '2021') {
        currentYearHolidays = holidaysTR2021;
    } else if (selectedYear == '2022') {
        currentYearHolidays = holidaysTR2022;
    } else if (selectedYear == '2023') {

    }

    return currentYearHolidays;
}

function getVacationPriority(pVacation) {
    let priority = 5;
    if (pVacation.description) {
        priority = 1;
    } else if (!pVacation.description && (pVacation.dayEnd.month == 6 || pVacation.dayEnd.month == 7 || pVacation.dayEnd.month == 8)) {
        priority = 2;
    } else {
        priority = 3;
    }
    return priority;
}

function isNotImpHolidayPlannedMoth(pVacList, pCurrentVacat) {
    pVacList.forEach(element => {
        if (element.priority == 2 && pCurrentVacat.dayEnd.month == element.dayEnd.month) {
            return true;
        }
    });
    return false;
}

function isItWeekend(pSearchDate) {
    let searchDt = new Date(pSearchDate);
    let searchDtM = new Date(searchDt.getFullYear(), searchDt.getMonth(), searchDt.getDate(), 0, 0, 0, 0);
    if (searchDtM.getDay() == 0 || searchDtM.getDay() == 6) {
        return true;
    }
    return false;
}

function isItToday(pSearchDate) {
    let pDay = new Date()
    let searchDt = new Date(pSearchDate);
    let searchDtM = new Date(searchDt.getFullYear(), searchDt.getMonth(), searchDt.getDate(), 0, 0, 0, 0);
    if (pDay.getFullYear() == searchDtM.getFullYear() && pDay.getMonth() == searchDtM.getMonth() && pDay.getDate() == searchDtM.getDate()) {
        return true;
    }
    return false;
}

