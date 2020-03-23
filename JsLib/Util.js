function lPad(param) {
    return param.toString().padStart(2,'0');
}

function decimalFormat(num) {
    return (
      num
        .toString()
        .replace('.', ',') // replace decimal point character with ,
    ) // use . as a separator
  }