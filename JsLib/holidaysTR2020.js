let holidayTR1 = {
    year: 2020,
    month: 1,
    day: 1,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'Yilbasi (1 Ocak)'
};

let holidayTR2 = {
    year: 2020,
    month: 4,
    day: 23,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'Ulusal Egemenlik ve Cocuk Bayrami (23 Nisan)'
};
let holidayTR3 = {
    year: 2020,
    month: 5,
    day: 1,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'Emek ve Dayanisma Gunu (1 Mayis)'
};
let holidayTR4 = {
    year: 2020,
    month: 5,
    day: 19,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'Ataturku Anma Genclik ve Spor Bayrami (19 Mayis)'
};
let holidayTR5 = {
    year: 2020,
    month: 5,
    day: 23,
    dayType: 'E', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'Ramazan Bayrami (23 Mayis[Arefe] - 26 Mayis)'
};
let holidayTR6 = {
    year: 2020,
    month: 5,
    day: 24,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'Ramazan Bayrami (23 Mayis[Arefe] - 26 Mayis)'
};
let holidayTR7 = {
    year: 2020,
    month: 5,
    day: 25,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'Ramazan Bayrami (23 Mayis[Arefe] - 26 Mayis)'
};
let holidayTR8 = {
    year: 2020,
    month: 5,
    day: 26,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'Ramazan Bayrami (23 Mayis[Arefe] - 26 Mayis)'
};
let holidayTR9 = {
    year: 2020,
    month: 7,
    day: 15,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'Demokrasi ve Milli Birlik Gunu (15 Temmuz)'
};
let holidayTR10 = {
    year: 2020,
    month: 7,
    day: 30,
    dayType: 'E', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'Kurban Bayrami (30 Temmuz[Arefe] - 3 Agustos)'
};
let holidayTR11 = {
    year: 2020,
    month: 7,
    day: 31,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'Kurban Bayrami (30 Temmuz[Arefe] - 3 Agustos)'
};
let holidayTR12 = {
    year: 2020,
    month: 8,
    day: 1,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'Kurban Bayrami (30 Temmuz[Arefe] - 3 Agustos)'
};
let holidayTR13 = {
    year: 2020,
    month: 8,
    day: 2,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'Kurban Bayrami (30 Temmuz[Arefe] - 3 Agustos)'
};
let holidayTR14 = {
    year: 2020,
    month: 8,
    day: 3,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'Kurban Bayrami (30 Temmuz[Arefe] - 3 Agustos)'
};
let holidayTR15 = {
    year: 2020,
    month: 8,
    day: 30,
    dayType: 'H', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'Zafer Bayrami (30 Ağustos)'
};
let holidayTR16 = {
    year: 2020,
    month: 10,
    day: 28,
    dayType: 'E', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'Cumhuriyet Bayrami (28 Ekim[Arefe] - 29 Ekim)'
};
let holidayTR17 = {
    year: 2020,
    month: 10,
    day: 29,
    dayType: 'E', //WI : Haftaici, WE:Haftasonu, E: Arafe, H : Resmi tatil
    description: 'Cumhuriyet Bayrami (28 Ekim[Arefe] - 29 Ekim)'
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
    let hldyDesc = '';

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
