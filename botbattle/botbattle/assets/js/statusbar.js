function addRow(turnNum, stdIn, stdOut, stdErr) {
    var newRow = "<tr>" +
                    "<td class='turn_column'>#TURN#</td>" +
                    "<td class='data_column'>#STDIN#</td>" +
                    "<td class='data_column'>#STDOUT#</td>" +
                    "<td class='data_column_red'>#STDERR#</td>" +
                    "</tr>";
    newRow = newRow.replace("#TURN#", turnNum);
    newRow = newRow.replace("#STDIN#", stdIn);
    newRow = newRow.replace("#STDOUT#", stdOut);
    newRow = newRow.replace("#STDERR#", stdErr);
    
    var cur = document.getElementById("tbl_status").innerHTML;
    document.getElementById("tbl_status").innerHTML = cur + newRow;
}