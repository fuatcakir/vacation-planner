function planner(pPersonalData, pAlternative) {
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
                    vacation.dayStart = findPreivousFirstHoliDay(daySearchStart, dayList);
                    vacation.dayEnd = findNextWeekDay(daySearchEnd, dayList);
                    vacation.vacationCount = wdCount;
                    vacation.description = getHolidayDescription(daySearchStart) ? getHolidayDescription(daySearchStart) : getHolidayDescription(daySearchEnd);
                    vacation.holidayCount = dateRangeCount(vacation.dayStart, vacation.dayEnd, dayList);
                    vacation.efficiencyRatio = getEfficencyRatio(vacation.vacationCount, vacation.holidayCount);
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

    sortedVacations = allVacations.sort(compareValues('description', 'desc'));

    var alternativeVacations1 = [];
    var alternativeVacations2 = [];
    var alternativeVacations3 = [];
    let repeatedCount = 0;
    let desc = '';
    let sortVacatIndex =0;

    sortedVacations.forEach(vac => {
        
        if (vac.description !='' && desc == vac.description && repeatedCount == 0) {
            alternativeVacations2.pop(sortedVacations[sortVacatIndex-1]);
            alternativeVacations2.push(vac);
            repeatedCount++;
        } else if (vac.description !='' && desc == vac.description && repeatedCount >= 1) {
            alternativeVacations3.pop(sortedVacations[sortVacatIndex-1]);
            alternativeVacations3.pop(sortedVacations[sortVacatIndex-2]);
            alternativeVacations3.push(vac);
            repeatedCount++;
        }
        else {
            alternativeVacations1.push(vac);
            alternativeVacations2.push(vac);
            alternativeVacations3.push(vac);

            repeatedCount = 0;
        }


        holdVac = vac;
        desc = vac.description;
        sortVacatIndex++;
    });


    /*
    sortedVacations.forEach(vacation => {
        console.log(vacation.personMail + "\n" +
            "İzin araligi :"
            + vacation.dayStart.day + "/" + vacation.dayStart.month + "/" + vacation.dayStart.year + "-"
            + vacation.dayEnd.day + "/" + vacation.dayEnd.month + "/" + vacation.dayEnd.year + "\n" +
            "İzin adeti : " + vacation.vacationCount);
    });
    */

    var plannedVacats =[];
    if (pAlternative == 1) {
        plannedVacats = alternativeVacations1;
    } else if (pAlternative == 2) {
        plannedVacats = alternativeVacations2;
    } else if (pAlternative == 3) {
        plannedVacats = alternativeVacations3;
    } else {
        plannedVacats = sortedVacations;
    }

    plannedVacats = plannedVacats.sort(compareValues('efficiencyRatio', 'desc'));
    return plannedVacats;
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

function compareValues2(key, childKey = null, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }
        const varA = (typeof a[key][childKey] === 'string')
            ? a[key][childKey].toUpperCase() : a[key][childKey];
        const varB = (typeof b[key][childKey] === 'string')
            ? b[key][childKey].toUpperCase() : b[key][childKey];

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
    let plannedVacatCount = 0;
    for (let index = 0; index < vacationsOptions.length; index++) {
        const vacation = vacationsOptions[index];
        currentVacatCount += vacation.vacationCount;
        if (currentVacatCount <= totalVac) {
            plannedVacatCount += vacation.vacationCount;
            plannedVacats.push(vacation);
        } else {
            break;
        }
    }

    personalData.plannedVacationCount = plannedVacatCount;
    personalData.unPlannedVacationCount = totalVac - plannedVacatCount;
    personalData.plannedVacations = plannedVacats.sort(compareValues2('dayStart', 'month'));
}

function planMyVacations(personalData,page) {
    let sortedVacationOptions = planner(personalData, page);
    getPlannedVacations(personalData, sortedVacationOptions);
}


function display(page) {
    //default
    let person = {
        name: 'Fuat',
        surname: 'CAKIR',
        mail: 'fuat.cakir@outlook.com',
        totalVacationCount: 18,
        plannedVacationCount: 0,
        unPlannedVacationCount: 0,
        plannedVacations: []
    };

    let vacationCount = document.getElementById("vacationCount").value;
    let mailInfo = null ;//document.getElementById("email").value;

    if (vacationCount) {
        person.totalVacationCount = vacationCount;
    }
    if (mailInfo) {
        person.mail = mailInfo;
    }

    console.log('Adi :' + person.name);
    console.log('Soyadı :' + person.surname);
    console.log('İletişim :' + person.mail);
    console.log('Toplam İzin Adedi :' + person.totalVacationCount);
    console.log('Planmış İzin Adedi :' + person.plannedVacationCount);
    console.log('Kalan İzin Adedi :' + person.unPlannedVacationCount);

    planMyVacations(person,page);

    let returnInfo = populateTable(person);

    let vacationStatusText = '';
    vacationStatusText += '[Planmış İzin Adedi :' + person.plannedVacationCount + '] ';
    vacationStatusText += '[Kalan İzin Adedi :' + person.unPlannedVacationCount + '] ';
    vacationStatusText += '[Toplam Tatil Günü :' + returnInfo.totalHolidayCountKey + '] ';
    vacationStatusText += '[Verimlilik Oranı :' +  returnInfo.totalEfficencyRatioKey.toFixed(2) + '] ';
   

    document.getElementById("vacationStatus").innerText = vacationStatusText;
}

function populateTable(person) {
    let tblVacations = document.getElementById("tblPlannedVacations");

    //clear table
    var tableHeaderRowCount = 1;
    var rowCount = tblVacations.rows.length;
    let totalHolidayCount = 0;
    let totalEfficencyRatio = 0;


    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        tblVacations.deleteRow(tableHeaderRowCount);
    }

    let index = 0;
    person.plannedVacations.forEach(vacation => {
        console.log(++index + ". İZİN\n" +
            "İzin araligi :"
            + vacation.dayStart.day + "/" + vacation.dayStart.month + "/" + vacation.dayStart.year + "-"
            + vacation.dayEnd.day + "/" + vacation.dayEnd.month + "/" + vacation.dayEnd.year + "\n" +
            "İzin adeti : " + vacation.vacationCount);

        let row = tblVacations.insertRow();

        let cell1 = row.insertCell();
        let text1 = document.createTextNode(index + ". izin");
        cell1.appendChild(text1);

        let cell2 = row.insertCell();
        let text2 = document.createTextNode(lPad(vacation.dayStart.day) + "/" + lPad(vacation.dayStart.month) + "/" + vacation.dayStart.year);
        cell2.appendChild(text2);

        let cell3 = row.insertCell();
        let text3 = document.createTextNode(lPad(vacation.dayEnd.day) + "/" + lPad(vacation.dayEnd.month) + "/" + vacation.dayEnd.year);
        cell3.appendChild(text3);

        let cell4 = row.insertCell();
        let text4 = document.createTextNode(" " + decimalFormat(vacation.vacationCount));
        cell4.appendChild(text4);

        let cell5 = row.insertCell();
        let text5 = document.createTextNode(" " + vacation.holidayCount);
        cell5.appendChild(text5);
        totalHolidayCount += vacation.holidayCount;

        let cell6 = row.insertCell();
        let text6 = document.createTextNode(vacation.description);
        cell6.appendChild(text6);

        totalEfficencyRatio += vacation.efficiencyRatio;
    });

    return {totalHolidayCountKey: totalHolidayCount, totalEfficencyRatioKey : totalEfficencyRatio};
}