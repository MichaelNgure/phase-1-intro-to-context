// Your code here

function createEmployeeRecord(employeeArrayDetails) {
    return {
      firstName: employeeArrayDetails[0],
      familyName: employeeArrayDetails[1],
      title: employeeArrayDetails[2],
      payPerHour: employeeArrayDetails[3],
      timeInEvents: [],
      timeOutEvents: []
    }
}

function createEmployeeRecords(array) {
    return array.map(record => createEmployeeRecord(record))
}

function createTimeInEvent(employeeRecord, date) {
    const newTimeInEvent = {
      type: "TimeIn",
      hour: parseInt(date.slice(-4)),
      date: date.slice(0, 10)
    }
    employeeRecord.timeInEvents.push(newTimeInEvent)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, date) {
    const newTimeOutEvent = {
      type: "TimeOut",
      hour: parseInt(date.slice(-4)),
      date: date.slice(0, 10)
    }
    employeeRecord.timeOutEvents.push(newTimeOutEvent)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour)/100;
}

function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
  }
  
function allWagesFor(employeeRecord) {
    const allWages = employeeRecord.timeInEvents.map(event => wagesEarnedOnDate(employeeRecord, event.date));
    return allWages.reduce((total, wage) => total + wage);
}
  
function calculatePayroll(employeeRecords) {
    const totalForEachEmployee = employeeRecords.map(record => allWagesFor(record))
    return totalForEachEmployee.reduce((total, empTotal) => total + empTotal)
}
  
function findEmployeeByFirstName(src, name) {
    return src.find(record => record.firstName === name);
}
