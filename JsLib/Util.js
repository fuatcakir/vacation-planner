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
    chk.addEventListener('change', function () {

      calculateVacations();
    });
    cell1.appendChild(chk);


    let cell2 = row.insertCell();
    let text2 = document.getElementById("manualDatePicker").value.split('-')[0].trim();
    let text3 = document.getElementById("manualDatePicker").value.split('-')[1].trim();
    // cell2.appendChild(document.createTextNode(text2+'-'+text3));
    let g = document.createElement('input');
    g.setAttribute("id", "inputlp4" + i);
    g.setAttribute("class", "pointer");
    cell2.appendChild(g);

    var pickerManuel = new Litepicker({
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
    pickerManuel.setDateRange(text2, text3);


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

    let cellRatings = row.insertCell();
    cellRatings.innerHTML = '';


    document.getElementById("manualDescription").value = '';
    document.getElementById("manualDatePicker").value = '';
    // new Litepicker({ element: document.getElementById("manualDatePicker") }).clearSelection();
    manualDatePicker.clearSelection();

    calculateVacations();
    refreshYearPreview(4, false);
  } else {
    alert("Lütfen tatil aralığını seçiniz.");
    document.getElementById("manualDatePicker").focus();
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

  calculateVacations();
  refreshYearPreview(4, false);
}

function calculateVacations() {
  let tblVacations = document.getElementById("tblPlannedVacations4");
  //clear table
  var tableHeaderRowCount = 1;
  var rowCount = tblVacations.rows.length;
  let totalPlannedVacations = 0.0;
  let totalHolidayCount = 0;
  let totalUnPlannedVacationCount = 14.0;

  let vacationCount = document.getElementById("vacationCount").value;

  if (vacationCount) {
    totalUnPlannedVacationCount = vacationCount;
  }
  for (var i = tableHeaderRowCount; i < rowCount; i++) {

    if (tblVacations.rows[i].cells[0].childNodes[0].checked == true) {
      totalPlannedVacations += parseFloat(tblVacations.rows[i].cells[2].textContent.replace(',', '.'));
      totalHolidayCount += parseInt(tblVacations.rows[i].cells[3].textContent);
      totalUnPlannedVacationCount -= parseFloat(tblVacations.rows[i].cells[2].textContent.replace(',', '.'));
    }
  }

  let vacationStatusHtml1 = '<h5>Toplam Planlanan İzin <span class="badge badge-secondary">' + totalPlannedVacations + '</span></h5>';
  let vacationStatusHtml2 = '<h5>Kalan İzin Adedi <span class="badge badge-secondary">' + totalUnPlannedVacationCount + '</span></h5>';
  let vacationStatusHtml3 = '<h5>Toplam Tatil Günü <span class="badge badge-secondary">' + totalHolidayCount + '</span></h5>';


  document.getElementById("vacationStatus1").innerHTML = vacationStatusHtml1;
  document.getElementById("vacationStatus2").innerHTML = vacationStatusHtml2;
  document.getElementById("vacationStatus3").innerHTML = vacationStatusHtml3;

  return decimalFormat(totalPlannedVacations + totalUnPlannedVacationCount);
}
function disableFooter() {
  visibiltyHolidayPreButtons(false);
}

function msg(txt) {
  alert(txt);
}

function repeatedControl(obj) {
  let selectedSimilarVacat = false;
  let selectedHldyDesc = '';

  let checkedIndex = obj.rowIndex;
  let tblVacations = document.getElementById("tblPlannedVacations4");
  selectedHldyDesc = tblVacations.rows[checkedIndex].cells[4].textContent;

  //clear table
  var tableHeaderRowCount = 1;
  var rowCount = tblVacations.rows.length;

  for (var i = tableHeaderRowCount; i < rowCount; i++) {
    if (checkedIndex != i && tblVacations.rows[i].cells[0].childNodes[0].checked == true) {
      selectedSimilarVacat = selectedHldyDesc && tblVacations.rows[i].cells[4].textContent && (selectedHldyDesc.includes(tblVacations.rows[i].cells[4].textContent) || tblVacations.rows[i].cells[4].textContent.includes(selectedHldyDesc));
      if (selectedSimilarVacat) {
        break;
      }

    }
  }



  if (selectedSimilarVacat) {
    msg(selectedHldyDesc + ' tatillerinden sadece bir tanesini seçebilirsiniz.');
  }

  return selectedSimilarVacat;
}

function showWelcomePage() {
  $('#nav-tab a[href="#nav-welcome"]').tab('show');
  visibiltyHolidayPreButtons(false);
}

function chooseDescription(desc1, desc2) {
  let desc = '';
  if (desc1 && desc2 && desc1 != desc2) {
    desc = desc1 + "<br>" + desc2;
  } else if (desc1 && !desc2) {
    desc = desc1;
  } else if (!desc1 && desc2) {
    desc = desc2;
  } else {
    desc = desc1;
  }

  return desc;
}

function table4RowClick(obj) {
  let tblVacations = document.getElementById("tblPlannedVacations4");

  if (tblVacations.rows[obj.rowIndex].cells[0].childNodes[0].checked) {
    let repeatedFlg = repeatedControl(obj);
    if (repeatedFlg) {
      tblVacations.rows[obj.rowIndex].cells[0].childNodes[0].checked = false;
    }
  }
  calculateVacations();
  refreshYearPreview(4, false);
}


var sort_by;
(function () {
  // utility functions
  var default_cmp = function (a, b) {
    if (a == b) return 0;
    return a < b ? -1 : 1;
  },
    getCmpFunc = function (primer, reverse) {
      var cmp = default_cmp;
      if (primer) {
        cmp = function (a, b) {
          return default_cmp(primer(a), primer(b));
        };
      }
      if (reverse) {
        return function (a, b) {
          return -1 * cmp(a, b);
        };
      }
      return cmp;
    };

  // actual implementation
  sort_by = function () {
    var fields = [],
      n_fields = arguments.length,
      field, name, reverse, cmp;

    // preprocess sorting options
    for (var i = 0; i < n_fields; i++) {
      field = arguments[i];
      if (typeof field === 'string') {
        name = field;
        cmp = default_cmp;
      }
      else {
        name = field.name;
        cmp = getCmpFunc(field.primer, field.reverse);
      }
      fields.push({
        name: name,
        cmp: cmp
      });
    }

    return function (A, B) {
      var a, b, name, cmp, result;
      for (var i = 0, l = n_fields; i < l; i++) {
        result = 0;
        field = fields[i];
        name = field.name;
        cmp = field.cmp;

        if (name.includes('day')) {
          result = cmp(A[name.split('.')[0]][name.split('.')[1]], B[name.split('.')[0]][name.split('.')[1]]);
        } else {
          result = cmp(A[name], B[name]);

        }
        if (result !== 0) break;
      }
      return result;
    }
  }
}());

function getStarRatings(starCount) {
  let starContainer = "";
  for (let index = 0; index < starCount; index++) {
    starContainer += '<span class="fa fa-star checked"></span>';
  }
  return starContainer;
}

function setMothPreview(pBtn, isGreen) {
  if (isGreen) {
    pBtn.setAttribute('class', 'btn btn-success disabled');
  } else {
    pBtn.setAttribute('class', 'btn btn-secondary disabled');
  }
}

function getMontPreviewButton(pMonthOrder) {
  var whichBtnMonth = null;
  switch (pMonthOrder) {
    case 1:
      whichBtnMonth = document.getElementById("btnJan");
      break;
    case 2:
      whichBtnMonth = document.getElementById("btnFeb");
      break;
    case 3:
      whichBtnMonth = document.getElementById("btnMar");
      break;
    case 4:
      whichBtnMonth = document.getElementById("btnApr");
      break;
    case 5:
      whichBtnMonth = document.getElementById("btnMay");
      break;
    case 6:
      whichBtnMonth = document.getElementById("btnJun");
      break;
    case 7:
      whichBtnMonth = document.getElementById("btnJly");
      break;
    case 8:
      whichBtnMonth = document.getElementById("btnAug");
      break;
    case 9:
      whichBtnMonth = document.getElementById("btnSep");
      break;
    case 10:
      whichBtnMonth = document.getElementById("btnOct");
      break;
    case 11:
      whichBtnMonth = document.getElementById("btnNov");
      break;
    case 12:
      whichBtnMonth = document.getElementById("btnDec");
      break;
    default:
      whichBtnMonth = document.getElementById("");
      break;
  }

  return whichBtnMonth;
}

function refreshYearPreview(page, pReset) {
  let tblVacations = null;

  if (page == 1) {
    tblVacations = document.getElementById("tblPlannedVacations1");
  } else if (page == 2) {
    tblVacations = document.getElementById("tblPlannedVacations2");
  } else if (page == 3) {
    tblVacations = document.getElementById("tblPlannedVacations3");
  } else {
    tblVacations = document.getElementById("tblPlannedVacations4");
  }

  let reset = pReset;
  var tableHeaderRowCount = 1;
  var rowCount = tblVacations.rows.length;

  if (page == 4 && reset) {
    for (let index = 1; index <= 12; index++) {
      setMothPreview(getMontPreviewButton(index), false);
    }
  } else {

    var monthArr = [];
    var monthArrOFF = [];
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
      let dateRange = tblVacations.rows[i].cells[1].childNodes[0].value;
      let startDateMonth = parseInt(dateRange.split('-')[0].split('/')[1]);
      let endDateMonth = parseInt(dateRange.split('-')[1].split('/')[1]);

      if (page < 4 || tblVacations.rows[i].cells[0].childNodes[0].checked) {
        monthArr.push(startDateMonth);
        monthArr.push(endDateMonth);
      }
    }

    const unique = (value, index, self) => {
      return self.indexOf(value) === index
    }
    monthArr = monthArr.filter(unique);

    for (let index = 1; index <= 12; index++) {
      if (monthArr.includes(index)) {
        setMothPreview(getMontPreviewButton(index), true);
      } else {
        setMothPreview(getMontPreviewButton(index), false);

      }

    }
  }
}

function isThereAnyManuelPlan() {
  var tableHeaderRowCount = 1;
  let tblVacations = document.getElementById("tblPlannedVacations4");
  var rowCount = tblVacations.rows.length;
  let checkedHolidays = false;
  for (var i = tableHeaderRowCount; i < rowCount; i++) {
    if (tblVacations.rows[i].cells[0].childNodes[0].checked) {
      checkedHolidays = true;
      break;
    }
  }
  let vacatCount = calculateVacations();
  let enteredVacatCount = document.getElementById("vacationCount").value;
  if (checkedHolidays && enteredVacatCount && vacatCount == enteredVacatCount) {
    return true;
  }
  return false;
}

function prepareSharePanel() {

  document.getElementById("loader").style.display = "block";
  document.getElementById("staticBackdropLabel").innerText = "Paylaşım Linki Hazırlanıyor";
  let url = window.location.href;

  let table = null;

  let panelIndx = 0;
  if (document.getElementById('nav-sugplan1-tab').getAttribute('aria-selected') == "true") {
    table = document.getElementById("tblPlannedVacations1");
    panelIndx = 1;
  } else if (document.getElementById('nav-sugplan2-tab').getAttribute('aria-selected') == "true") {
    table = document.getElementById("tblPlannedVacations2");
    panelIndx = 2;
  } else if (document.getElementById('nav-sugplan3-tab').getAttribute('aria-selected') == "true") {
    table = document.getElementById("tblPlannedVacations3");
    panelIndx = 3;
  } else if (document.getElementById('nav-manuel-tab').getAttribute('aria-selected') == "true") {
    table = document.getElementById("tblPlannedVacations4");
    panelIndx = 4;
  } else if (document.getElementById('nav-compare-tab').getAttribute('aria-selected') == "true") {
    table = document.getElementById("tableLeaveCompare");
    panelIndx = 5;
  }

  let sharedesc = document.getElementById('txtSharePlan').value;
  if (sharedesc) {
    document.getElementById('anyShareBtn').setAttribute('data-a2a-title', sharedesc);
  }

  if (panelIndx == 0) {
    document.getElementById("loader").style.display = "none";
    document.getElementById("staticBackdropLabel").innerText = "Paylaşım Linki Hazır";
    let surl = "https://izniniplanla.com/";
    document.getElementById('sharingurl').value = surl;
    document.getElementById('anyShareBtn').setAttribute('data-a2a-url', surl);
  } else if (panelIndx == 05) {
    let surl = window.location.href + '?c=' + getCompareTableAllIDs();
    document.getElementById('sharingurl').value = surl;
    document.getElementById('anyShareBtn').setAttribute('data-a2a-url', surl);
    document.getElementById("loader").style.display = "none";
    document.getElementById("staticBackdropLabel").innerText = "Paylaşım Linki Hazır";
  } else {
    let manuelPlan = document.getElementById('nav-manuel-tab').getAttribute('aria-selected') == "true";

    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    let vpJSON = {};
    vpJSON.tablevacat = [];
    vpJSON.sharedesc = document.getElementById('txtSharePlan').value;
    let totalvacatcount = document.getElementById('vacationCount').value;
    vpJSON.totalvacationcount = totalvacatcount ? totalvacatcount : 14;

    let vacationIndex = 0;
    for (let index = tableHeaderRowCount; index < rowCount; index++) {
      if (manuelPlan &&
        table.rows[index].cells[0].childNodes[0].checked == false) {
        continue;
      }
      const vRow = table.rows[index];

      let startDate = table.rows[index].cells[1].childNodes[0].value.split('-')[0].trim();
      let endDate = table.rows[index].cells[1].childNodes[0].value.split('-')[1].trim();

      let myRow = {
        daystart: startDate.split('/')[2] + '-' + startDate.split('/')[1] + '-' + startDate.split('/')[0],
        dayend: endDate.split('/')[2] + '-' + endDate.split('/')[1] + '-' + endDate.split('/')[0],
        vacationcount: parseFloat(table.rows[index].cells[2].textContent.replace(',', '.')),
        holidaycount: parseFloat(table.rows[index].cells[3].textContent.replace(',', '.')),
        description: table.rows[index].cells[4].textContent
      }
      vpJSON.tablevacat[vacationIndex] = myRow;
      vacationIndex = vacationIndex + 1;
    }

    if (vpJSON.tablevacat.length > 0) {

      const data = vpJSON;
      /** */
      fetch('https://vphrestapi.herokuapp.com/api/vacations/', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          document.getElementById("loader").style.display = "none";
          document.getElementById("staticBackdropLabel").innerText = "Paylaşım Linki Hazır";

          document.getElementById('sharingurl').value = url + '?q=' + data.data._id;
          let surl = url + '?q=' + data.data._id;

          document.getElementById('anyShareBtn').setAttribute('data-a2a-url', surl);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }
}

function copyText() {
  /* Get the text field */
  var copyText = document.getElementById("sharingurl");

  /* Select the text field */
  copyText.select();

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  // alert("Copied the text: " + copyText.value);
}

function outFunc() {
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy to clipboard";
}

function focusTotalVacation() {
  document.getElementById("vacationCount").focus();
}

function addLeaveCompareTable(data) {
  let selectedYaar = parseInt(document.getElementById('inputGroupSelectYears').value);

  // let selectedYaar = 2020;

  if (selectedYaar) {
    selectedYaar = parseInt(selectedYaar);
  }

  let tableB = document.getElementById('tableLeaveCompareB');
  let tableBTR = document.createElement('tr');

  for (let index = 0; index < 14; index++) {
    let tableBTd = document.createElement('td');

    // if (index == 0) {
    //   let chk = document.createElement('input');
    //   chk.setAttribute("id", "chklpc" + index);
    //   chk.setAttribute("type", "checkbox");
    //   // chk.setAttribute("class", "zui-sticky-col");

    //   cell.appendChild(chk);
    // } else 
    if (index == 0) {
      let inp = document.createElement('input');
      inp.setAttribute("id", "txtIdlpc" + index);
      inp.setAttribute("type", "text");
      inp.setAttribute("value", data.sharedesc);
      tableBTd.setAttribute("class", "zui-sticky-col");
      tableBTd.appendChild(inp);
    } else if (index == 13) {
      tableBTd.appendChild(document.createTextNode(data._id));
    } else {
      var daysIndex = new Date(selectedYaar, index - 1, 1, 1, 1, 1, 1);

      let subtable = document.createElement('table');
      subtable.setAttribute("border", "1");
      let tbody = document.createElement('tbody');
      let tr = document.createElement('tr');


      while (daysIndex.getFullYear() <= selectedYaar && daysIndex.getMonth() == (index - 1)) {
        let td = document.createElement('td');
        td.appendChild(document.createTextNode(String(daysIndex.getDate()).padStart(2, '0')));
        let searchDate = selectedYaar + "-" + String(index).padStart(2, '0') + "-" + String(daysIndex.getDate()).padStart(2, '0');

        if (isItWeekend(searchDate)) {
          td.setAttribute("class", "comptablecellWEBG");
        }
        let pDay = {};
        pDay.year = selectedYaar;
        pDay.month = index;
        pDay.day = daysIndex.getDate();
        holidayCheck(pDay)
        if (pDay.dayType == 'E') {
          td.setAttribute("class", "comptablecellEveBG");
          td.setAttribute("title", pDay.description);
        }
        if (pDay.dayType == 'H') {
          td.setAttribute("class", "comptablecellHolidayBG");
          td.setAttribute("title", pDay.description);
        }

        if (isItToday(searchDate)) {
          td.setAttribute("class", "comptablecellTodayBG");
        }
        if (isItVacation(data, searchDate)) {
          td.setAttribute("class", "comptablecellBG");
        }
        tr.appendChild(td);
        daysIndex.setDate(daysIndex.getDate() + 1);
      }
      tbody.appendChild(tr);
      subtable.appendChild(tbody);
      tableBTd.appendChild(subtable);
    }
    tableBTR.appendChild(tableBTd);
    tableB.appendChild(tableBTR);
  }
}


function addLeaveCompareTableByURL(pId) {
  var url_string = document.getElementById("txtLeavesCompare").value;
  if (url_string || pId) {
    var url = null;
    var q = null;
    try {
      if (url_string) {
        url = new URL(url_string);
        q = url.searchParams.get("q");
      } else if (pId) {
        q = pId;
      }
    } catch (error) {
      alert('Lütfen ' + window.location.href + ' tarafından verilen paylaşım linkini giriniz.')
    }
    if (q) {
      document.getElementById("loader2").style.display = "block";
      console.log(q);
      fetch('https://vphrestapi.herokuapp.com/api/vacations/' + q)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          document.getElementById("loader2").style.display = "none";
          console.log(data);
          addLeaveCompareTable(data.data);
          document.getElementById("txtLeavesCompare").value = "";
        });
    } else {
      alert('Lütfen ' + window.location.href + ' tarafından verilen paylaşım linkini giriniz.')
    }
  }
}

function isItVacation(data, searchDate) {
  let selectedYaar = parseInt(document.getElementById('inputGroupSelectYears').value);
  let vacations = data.tablevacat;
  let isItHoliday = false;
  for (let index = 0; index < vacations.length; index++) {
    const vacat = vacations[index];
    let dStart = new Date(vacat.daystart);
    let dStartM = new Date(dStart.getFullYear(), dStart.getMonth(), dStart.getDate(), 0, 0, 0, 0);

    let dEnd = new Date(vacat.dayend);
    let dEndM = new Date(dEnd.getFullYear(), dEnd.getMonth(), dEnd.getDate(), 0, 0, 0, 0);

    let searchDt = new Date(searchDate);
    let searchDtM = new Date(searchDt.getFullYear(), searchDt.getMonth(), searchDt.getDate(), 0, 0, 0, 0);

    isItHoliday = (searchDtM >= dStartM && searchDtM <= dEndM);
    if (isItHoliday) {
      break;
    }
  }

  return isItHoliday;
}


function visibiltyHolidayPreButtons(visible) {

  let vdisplay = "none";
  if (visible) {
    vdisplay = "inline-block";
  } else {
    vdisplay = "none";
  }

  document.getElementById("btnGroupAddon").style.display = vdisplay;

  document.getElementById("btnJan").style.display = vdisplay;

  document.getElementById("btnFeb").style.display = vdisplay;

  document.getElementById("btnMar").style.display = vdisplay;

  document.getElementById("btnApr").style.display = vdisplay;

  document.getElementById("btnMay").style.display = vdisplay;

  document.getElementById("btnJun").style.display = vdisplay;

  document.getElementById("btnJly").style.display = vdisplay;

  document.getElementById("btnAug").style.display = vdisplay;

  document.getElementById("btnSep").style.display = vdisplay;

  document.getElementById("btnOct").style.display = vdisplay;

  document.getElementById("btnNov").style.display = vdisplay;

  document.getElementById("btnDec").style.display = vdisplay;

  document.getElementById("vacatStatusDiv").style.display = vdisplay;

  // document.getElementById("btnGroupYearCont").style.display = vdisplay;



}

function displayCompareTable() {
  document.getElementById('txtSharePlan').value = "";
  visibiltyHolidayPreButtons(false);
}

function getCompareTableAllIDs() {
  let cmpTable = document.getElementById('tableLeaveCompare');
  var tableHeaderRowCount = 1;
  var rowCount = cmpTable.rows.length;
  let allID = "";
  for (let index = tableHeaderRowCount; index < rowCount; index++) {
    let id = cmpTable.rows[index].cells[13].textContent
    allID += id + "_";
  }
  return allID;
}

function loadComparableData(cUrl) {
  $('#nav-tab a[href="#nav-compare"]').tab('show');
  let shareIDlist = cUrl.split('_');
  for (let index = 0; index < shareIDlist.length; index++) {
    const shareId = shareIDlist[index];
    if (shareId) {
      addLeaveCompareTableByURL(shareId);
    }

  }
}


