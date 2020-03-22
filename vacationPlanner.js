function planner(pPersonalData) {
    let wdCount = 0;
    let daySearchStart;
    let daySearchEnd;
    let searchedWdCounts = {};

    let vacation = {
        personMail: 'fuat.cakir@outlook.com',
        dayStart: null,
        dayEnd: null,
        vacationCount: 0
    };

    let allVacations = [];

    dayList = createCalendar();

    let index = 0;
    for (const key in dayList) {
        if (dayList.hasOwnProperty(key)) {
            const element = dayList[key];
            /*
            console.log(
                        element.year+'/'+
                        element.month+'/'+
                        element.day+'-'+
                        element.dayCode+' '+
                        element.dayType+' '+
                        element.description
                        );
            */

            //tatil günlerini tarama
            //ilk tatil günden itibaren sonraki ilk tatile kadar kaç çalışma günü var hesapla ve çık

            if (index == 0) {
                daySearchStart = element;
            }
            if (element.dayType == 'WD') {
                wdCount++;
            } else {

                if (element.dayType == 'E') {
                    wdCount = wdCount + 0.5;
                }

                if (wdCount > 0) {

                    daySearchEnd = element;

                    vacation = {};
                    vacation.personMail = pPersonalData.mail;
                    vacation.dayStart = daySearchStart;
                    vacation.dayEnd = findNextWeekDay(daySearchEnd, dayList);//daySearchEnd ; //
                    vacation.vacationCount = wdCount;

                    allVacations.push(vacation);
                    //reset all values
                    index = 0;
                    wdCount = 0;
                    daySearchStart = element;

                }
            }

            index++;
        }
    }

    /* 
        allVacations.forEach(vacation => {
            console.log(vacation.personMail + "\n" +
                "İzin araligi :"
                + vacation.dayStart.day + "/" + vacation.dayStart.month + "/" + vacation.dayStart.year + "-"
                + vacation.dayEnd.day + "/" + vacation.dayEnd.month + "/" + vacation.dayEnd.year + "\n" +
                "İzin adeti : " + vacation.vacationCount);
        });
    
    */
    var sortedVacations = [];

    sortedVacations = allVacations.sort(compareValues('vacationCount'));

    /*
    sortedVacations.forEach(vacation => {
        console.log(vacation.personMail + "\n" +
            "İzin araligi :"
            + vacation.dayStart.day + "/" + vacation.dayStart.month + "/" + vacation.dayStart.year + "-"
            + vacation.dayEnd.day + "/" + vacation.dayEnd.month + "/" + vacation.dayEnd.year + "\n" +
            "İzin adeti : " + vacation.vacationCount);
    });
    */
    return sortedVacations;
}


function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }
        const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}

function getPlannedVacations(personalData, vacationsOptions) {
    let totalVac = personalData.totalVacationCount;
    let plannedVacats = [];
    let currentVacatCount = 0;
    for (let index = 0; index < vacationsOptions.length; index++) {
        const vacation = vacationsOptions[index];
        currentVacatCount += vacation.vacationCount;
        if (currentVacatCount <= totalVac) {
            plannedVacats.push(vacation);
        }
    }

    personalData.plannedVacats = currentVacatCount;
    personalData.unPlannedVacationCount = totalVac - currentVacatCount;
    personalData.plannedVacations = plannedVacats;
}

function planMyVacations(personalData) {
    let sortedVacationOptions = planner(personalData);
    getPlannedVacations(personalData, sortedVacationOptions);
}