let holidayTR1 = {
    year: 2020,
    month: 1,
    day: 1,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'YILBAŞI'
};

let holidayTR2 = {
    year: 2020,
    month: 4,
    day: 23,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'ULUSAL EGEMENLİK VE ÇOCUK BAYRAMI'
};
let holidayTR3 = {
    year: 2020,
    month: 5,
    day: 1,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'EMEK VE DAYANIŞMA GÜNÜ'
};
let holidayTR4 = {
    year: 2020,
    month: 5,
    day: 19,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'ATATÜRKÜ ANMA GENÇLİK VE SPOR BAYRAMI'
};
let holidayTR5 = {
    year: 2020,
    month: 5,
    day: 23,
    dayType: 'E', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'RAMAZAN BAYRAMI'
};
let holidayTR6 = {
    year: 2020,
    month: 5,
    day: 24,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'RAMAZAN BAYRAMI'
};
let holidayTR7 = {
    year: 2020,
    month: 5,
    day: 25,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'RAMAZAN BAYRAMI'
};
let holidayTR8 = {
    year: 2020,
    month: 5,
    day: 26,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'RAMAZAN BAYRAMI'
};
let holidayTR9 = {
    year: 2020,
    month: 7,
    day: 15,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: '​DEMOKRASİ VE MİLLİ BİRLİK GÜNÜ'
};
let holidayTR10 = {
    year: 2020,
    month: 7,
    day: 30,
    dayType: 'E', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'KURBAN BAYRAMI'
};
let holidayTR11 = {
    year: 2020,
    month: 7,
    day: 31,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'KURBAN BAYRAMI'
};
let holidayTR12 = {
    year: 2020,
    month: 8,
    day: 1,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'KURBAN BAYRAMI'
};
let holidayTR13 = {
    year: 2020,
    month: 8,
    day: 2,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'KURBAN BAYRAMI'
};
let holidayTR14 = {
    year: 2020,
    month: 8,
    day: 3,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'KURBAN BAYRAMI'
};
let holidayTR15 = {
    year: 2020,
    month: 8,
    day: 30,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'ZAFER BAYRAMI'
};
let holidayTR16 = {
    year: 2020,
    month: 10,
    day: 28,
    dayType: 'E', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'CUMHURİYET BAYRAMI'
};
let holidayTR17 = {
    year: 2020,
    month: 10,
    day: 29,
    dayType: 'E', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'CUMHURİYET BAYRAMI'
};

var holidaysTR = [
    holidayTR1,
    holidayTR2,
    holidayTR3,
    holidayTR4,
    holidayTR5,
    holidayTR6,
    holidayTR7,
    holidayTR8,
    holidayTR9,
    holidayTR10,
    holidayTR11,
    holidayTR12,
    holidayTR13,
    holidayTR14,
    holidayTR15,
    holidayTR16,
    holidayTR17
];

function holidayCheck(pDay) {
    for (const hold in holidaysTR) {
        if (holidaysTR.hasOwnProperty(hold)) {
            const holiday = holidaysTR[hold];
            if (pDay.year == holiday.year && pDay.month == holiday.month && pDay.day == holiday.day) {
                pDay.dayType = holiday.dayType;
                pDay.description = holiday.description;
                break;
            }

        }
    }

}

function getHolidayDescription(pDay) {
    let hldyDesc = null;

    for (const hold in holidaysTR) {
        if (holidaysTR.hasOwnProperty(hold)) {
            const holiday = holidaysTR[hold];
            if (pDay.year == holiday.year && pDay.month == holiday.month && pDay.day == holiday.day) {
                hldyDesc = holiday.description;
                break;
            }

        }
    }
    return hldyDesc;
}
