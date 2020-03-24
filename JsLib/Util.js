function lPad(param) {
  return param.toString().padStart(2, '0');
}

function decimalFormat(num) {
  return (
    num
      .toString()
      .replace('.', ',') // replace decimal point character with ,
  ) // use . as a separator
}

function addRowToTable() {

  if (document.getElementById("manualDatePicker").value) {


    let tblVacations = document.getElementById("tblPlannedVacations4");

    let row = tblVacations.insertRow();

    let cell1 = row.insertCell();
    let i = tblVacations.rows.length;

    let chk = document.createElement('input');
    chk.setAttribute("id", "chk" + i);
    chk.setAttribute("type", "checkbox");
    chk.setAttribute("checked", "checked");
    cell1.appendChild(chk);


    let cell2 = row.insertCell();
    let text2 = document.getElementById("manualDatePicker").value.split('-')[0].trim();
    let text3 = document.getElementById("manualDatePicker").value.split('-')[1].trim();
    // cell2.appendChild(document.createTextNode(text2+'-'+text3));
    let g = document.createElement('input');
    g.setAttribute("id", "input" + i);
    g.setAttribute("class", "pointer");
    cell2.appendChild(g);

    var picker = new Litepicker({
      element: g,
      firstDay: 1,
      format: "DD/MM/YYYY",
      lang: 'tr-TR',
      numberOfMonths: 1,
      numberOfColumns: 1,
      selectForward: false,
      selectBackward: false,
      splitView: false,
      inlineMode: false,
      singleMode: false,
      autoApply: true,
      showWeekNumbers: false,
      showTooltip: true,
      disableWeekends: false,
      mobileFriendly: true
    });
    picker.setDateRange(text2, text3);


    let dayList = createCalendar();
    let pStartDay = {
      year: text2.split('/')[2],
      month: text2.split('/')[1],
      day: text2.split('/')[0]
    };
    let pEndDay = {
      year: text3.split('/')[2],
      month: text3.split('/')[1],
      day: text3.split('/')[0]
    };

    let totalVac = calculateVacation(pStartDay, pEndDay, dayList);

    let cell4 = row.insertCell();
    let text4 = document.createTextNode(" " + decimalFormat(totalVac));
    cell4.appendChild(text4);


    let rangeCount = dateRangeCount(pStartDay, pEndDay, dayList);

    let cell5 = row.insertCell();
    let text5 = document.createTextNode(" " + rangeCount);
    cell5.appendChild(text5);

    let cell6 = row.insertCell();
    let text6 = document.createTextNode(document.getElementById("manualDescription").value);
    cell6.appendChild(text6);

    document.getElementById("manualDescription").value = '';
    document.getElementById("manualDatePicker").value = '';
    new Litepicker({ element: document.getElementById("manualDatePicker") }).clearSelection();
  }
}

function deleteRowsByChecked(delCheckedRows) {
  let tblVacations = document.getElementById("tblPlannedVacations4");
  //clear table
  var tableHeaderRowCount = 1;
  var rowCount = tblVacations.rows.length;

  let deletedCount = 0;
  let reOrgIndex = tableHeaderRowCount;

  for (var i = tableHeaderRowCount; i < rowCount; i++) {
    if (delCheckedRows == 1 && tblVacations.rows[i - deletedCount].cells[0].childNodes[0].checked == true) {
      tblVacations.deleteRow(i - deletedCount);
      deletedCount++;
    }
    if (delCheckedRows == 0 && tblVacations.rows[i - deletedCount].cells[0].childNodes[0].checked == false) {
      tblVacations.deleteRow(i - deletedCount);
      deletedCount++;
    }

  }
}