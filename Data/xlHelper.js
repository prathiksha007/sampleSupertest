var xlsx = require('xlsx');

var xlHelper = {

getRows: (filePath, sheetName, columnConditionPair) => {
    error = '\nSpecify a condition.\nExample: {"<column_name>": "column_value"}\nIf the Excel Sheet has a column with name "Batch" which has values Y,N or blank/empty and you want to retrieve all the rows which has Batch = Y Then condition paramter should be: {"Batch": "Y"}'
    var sheetData = xlHelper.getSheet(filePath, sheetName)
    if (!sheetData) {
        return null
    } else {
            if (!columnConditionPair) {
                console.log(error)
                return null
            } else {
                reqColumn = Object.keys(columnConditionPair)[0]
                if (reqColumn === undefined) {
                    console.log(error)
                    return null
                }
                var conditionalDataRows = []
                console.log('  Reading all rows where column: "' + reqColumn + '" is "' + columnConditionPair[reqColumn] + '"')
                sheetData.forEach ( (rowOfData) => {
                    if (rowOfData[reqColumn] == columnConditionPair[reqColumn]) {
                        conditionalDataRows.push(rowOfData)
                    }
                })
                return conditionalDataRows
            }
    }
},
getSheet: (filePath, sheetName) => {
    if (!sheetName) {
        console.log('\nSheet name or File path cannot be empty or undefined.')
        return null
    } else {
        var XL_data = xlHelper.getWorkbook(filePath);
        if (!XL_data) {
            return null
        } else {
            sheetNames = Object.keys(XL_data)
            if (sheetNames.includes(sheetName)) {
                console.log('  Reading from sheet: "' + sheetName + '"')
                return xlsx.utils.sheet_to_json(XL_data[sheetName])
            } else {
                console.log('Sheet: ' + sheetName + ' doesn`t exist in the file.')
                return null
            }
        }
    }
},
getWorkbook: (filePath) => {
    try {
        if (!filePath) {
            console.log('\nSpecify the path to the Excel file you want to read.')
            return null
        } else {
            pathSplit = filePath.split("/")
            fileName = pathSplit[pathSplit.length - 1]
            console.log('  Reading from file: "' + fileName + '"')
            return xlsx.readFile(filePath).Sheets;
        }
    } catch (err) {
        console.log(err)
        return null
    }
}


}
module.exports = xlHelper