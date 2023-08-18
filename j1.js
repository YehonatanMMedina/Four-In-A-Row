var counter = 0;

var cols, rows, flag = 0, sequence, q = 0, g = 0, L = 0, V = 0;

var screen_width = screen.width;
var screen_height = screen.height;

var board_array;

var rowArray;
var colArray;
var alOneArray;
var alTwoArray;

var colPressed;
var rowPressed;
var numColorPressed

function BuildTable() {
    flag = 0;
    rows = +prompt("Enter rows : ");
    cols = +prompt("Enter cols : ");

    board_array = new Array(rows);
    for (var i = 0; i < rows; i++) {
        board_array[i] = new Array(cols);
        for (var x = 0; x < cols; x++) {
            board_array[i][x] = 0;
        }
    }

    rowArray = new Array(rows);
    for (var i = 0; i < rows; i++) {
        rowArray[i] = new Array(cols);
        for (var x = 0; x < cols; x++) {
            rowArray[i][x] = 0;
        }
    }
    colArray = new Array(rows);
    for (var i = 0; i < rows; i++) {
        colArray[i] = new Array(cols);
        for (var x = 0; x < cols; x++) {
            colArray[i][x] = 0;
        }
    }
    alOneArray = new Array(rows);
    for (var i = 0; i < rows; i++) {
        alOneArray[i] = new Array(cols);
        for (var x = 0; x < cols; x++) {
            alOneArray[i][x] = 0;
        }
    }
    alTwoArray = new Array(rows);
    for (var i = 0; i < rows; i++) {
        alTwoArray[i] = new Array(cols);
        for (var x = 0; x < cols; x++) {
            alTwoArray[i][x] = 0;
        }
    }


    sequence = +prompt("Enter sequence : ");

    if (sequence > rows || sequence > cols) {
        alert("sequence is too big");
        flag = 1;
    }
    else if (cols * 50 > screen_width || rows * 50 > screen_height) {

        alert("ERROR, size is bigger than screen")
        flag = 1;
    }
    else {
        if (sequence > cols) {
            alert("ERROR");
            flag = 1;
        }
        if (cols < 3) {
            alert("ERROR, cols must be bigger than 3.")
            flag = 1;
        }
    }
    if (sequence < 3) {
        alert("ERROR, sequence must be bigger than 2.")
        flag = 1;
    }
    var r = 0;
    var c;
    var s = "<table border='1' id='bored-table'>";
    var num = 0;
    if (flag == 0) {
        while (r < rows) {
            c = 0;
            s = s + "<tr>";
            while (c < cols) {
                s = s + "<td class='table-datas'" + " id='" +
                    num.toString() +
                    "'  onclick='Show(this)'  style='background-color: yellow; color: blue'>";
                s = s + "</td>";
                c++;
                num++;
            }
            s = s + "</tr>";
            r++;
        }
    }

    s = s + "</table>";
    document.getElementById("fff").innerHTML = s;


}
function Show(pressedButton) {

    var pressedId = pressedButton.id;
    colPressed = pressedId % cols;
    rowPressed = Math.floor(pressedId / cols);

    if (flag == 0) {

        L = 0;
        V = 0;
        q = 0;
        g = 0;


        for (var b = 0; b < rows; b++) {
            if (board_array[b][colPressed] != 0) {
                break;
            }
        }
        if (b > 0) {
            b = b - 1;
        }
        // calculating b - last avalible row

        //#region updateMonArray
        if (counter % 2 == 0) {
            document.getElementById(b * cols + colPressed).innerHTML = "<img src='Red.png' class='circle-image'/>"
            board_array[b][colPressed] = 1;

            for (i = 0; i < sequence; i++) {
                if (rowArray[b][colPressed - i] > 0) {
                    rowArray[b][colPressed - i] = 99;
                }
                else if (colPressed - i > -1 && rowArray[b][colPressed - i] != 99)
                    rowArray[b][colPressed - i] -= 1;
            }
            if (b > -1) {
                for (i = 0; i < sequence; i++) {
                    if (b + i < rows) {
                        if (colArray[b + i][colPressed] > 0) {
                            colArray[b + i][colPressed] = 99;
                        }
                        else if (colArray[b + i][colPressed] != 99) {
                            colArray[b + i][colPressed] -= 1;
                        }
                    }
    
                }
    

                for (i = 0; i < sequence; i++) {
                    if (b - i > 0) {
                        if (alOneArray[b - i][colPressed - i] > 0) {
                            alOneArray[b - i][colPressed - i] = 99;
                        }
                        else if (colPressed - i > -1 && alOneArray[b - i][colPressed - i] != 99)
                            alOneArray[b - i][colPressed - i] -= 1;
                    }

                }

                for (i = 0; i < sequence; i++) {
                    if (b + i < rows) {
                        if (alTwoArray[b + i][colPressed - i] > 0) {
                            alTwoArray[b + i][colPressed - i] = 99;
                        }
                        else if (colPressed - i > -1 && b + i < cols && alTwoArray[b + i][colPressed - i] != 99)
                            alTwoArray[b + i][colPressed - i] -= 1;
                    }

                }
            }

        }
        else {
            document.getElementById(b * cols + colPressed).innerHTML = "<img src='Blue.png' width='50' height='50'/>"
            board_array[b][colPressed] = 2;
            for (i = 0; i < sequence; i++) {
                if (rowArray[b][colPressed - i] < 0) {
                    rowArray[b][colPressed - i] = 99;
                }
                else if (colPressed - i > -1 && rowArray[b][colPressed - i] != 99)
                    rowArray[b][colPressed - i] += 1;
            }
            if (b > 0) {
                for (i = 0; i < sequence; i++) {
                    if (b + i < rows) {
                        if (colArray[b + i][colPressed] < 0) {
                            colArray[b + i][colPressed] = 99;
                        }
                        else if (colArray[b + i][colPressed] != 99) {
                            colArray[b + i][colPressed] += 1;
                        }
                    }
    
                }
    
                for (i = 0; i < sequence; i++) {
                    if (b - i > 0) {
                        if (alOneArray[b - i][colPressed - i] < 0) {
                            alOneArray[b - i][colPressed - i] = 99;
                        }
                        else if (colPressed - i > -1 && alOneArray[b - i][colPressed - i] != 99)
                            alOneArray[b - i][colPressed - i] += 1;
                    }

                }

                for (i = 0; i < sequence; i++) {
                    if (b + i < rows) {
                        if (alTwoArray[b + i][colPressed - i] > 0) {
                            alTwoArray[b + i][colPressed - i] = 99;
                        }
                        else if (colPressed - i > -1 && b + i < cols && alTwoArray[b + i][colPressed - i] != 99)
                            alTwoArray[b + i][colPressed - i] += 1;
                    }

                }
            }
        }

        //#endregion


        counter++;


        var colorPressed = document.getElementById((b) * cols + colPressed).style.backgroundColor;        // deside if to poot blue or red 
        numColorPressed = board_array[b][colPressed];
        rowPressed = b;   //in some calcs I used B and in some rowpressed but there the same const number.




        // #region wins
        //rows
        var i;

        for (i = 0; i <= sequence; i++) {
            if ((rowPressed <= rows - 1) && (colPressed <= cols - 1)) {
                if (board_array[rowPressed][colPressed + i] != numColorPressed) {
                    i = sequence + 11;
                }
                else {

                    q++;
                }
            }
        }

        for (i = 0; i <= sequence; i++) {
            if ((rowPressed <= rows - 1) && (colPressed <= cols - 1)) {
                if (board_array[rowPressed][colPressed - i] != numColorPressed) {
                    i = sequence + 11;
                }
                else {

                    q++;
                }
            }
        }
        if (q > sequence) {
            alert("win at row");
            flag = 1;
        }


        //cols
        for (i = 0; i <= sequence; i++) {

            if ((rowPressed + i <= rows - 1) && (colPressed <= cols - 1)) {
                if (board_array[rowPressed + i][colPressed] != numColorPressed) {
                    i = sequence + 11;
                }
                else {

                    g++;
                }
            }
        }



        for (i = 0; i <= sequence; i++) {

            if ((rowPressed - i >= 0) && (colPressed <= cols - 1)) {
                if (board_array[rowPressed - i][colPressed] != numColorPressed) {
                    i = sequence + 11;
                }
                else {

                    g++;
                }
            }
        }

        if (g > sequence) {
            alert("WIN AT COL");
            flag = 1;

        }


        ////alachsonim

        for (r = 0; r < sequence; r++) {

            if ((rowPressed + r <= rows - 1) && (colPressed - r <= cols - 1)) {//al +-

                if (board_array[rowPressed + r][colPressed - r] != numColorPressed) {
                    r = sequence + 11;
                }
                else {

                    L++;
                }
            }
        }
        for (r = 0; r < sequence; r++) {
            if ((rowPressed - r >= 0) && (colPressed + r <= cols - 1)) {//al -+

                if (board_array[rowPressed - r][colPressed + r] != numColorPressed) {
                    r = sequence + 11;
                }
                else {

                    L++;
                }
            }
        }
        if (L > sequence) {
            alert("WIN AT ALACHSON");
            flag = 1;
        }


        L = 0;


        for (r = 0; r < sequence; r++) {

            if ((rowPressed + r <= rows - 1) && (colPressed + r <= cols - 1)) {//al +-

                if (board_array[rowPressed + r][colPressed + r] != numColorPressed) {
                    i = sequence + 11;
                }
                else {

                    L++;
                }
            }
        }
        for (r = 0; r < sequence; r++) {
            if ((rowPressed - r >= 0) && (colPressed - r >= 0)) {//al -+

                if (board_array[rowPressed - r][colPressed - r] != numColorPressed) {
                    i = sequence + 11;
                }
                else {

                    L++;
                }
            }
        }
        if (L > sequence) {
            alert("WIN AT ALACHSON");
            flag = 1;
        }

        //#endregion 

    }

}
function compMove() {
    var ezMon = 0;
    var ezMonHashlama = 0;
    var biggestNum = 0;
    var biggestRow = 0;
    var biggestCol = 0;
    var biggestHashlama = 0;
    var whereIsEzMon = 0;
    var biggestWhereIsEzMOn = 0;
    var currentBiggestValueChanging;
    var currentTimewBiggestValueChanging;
    var ezNumBVC = 0;
    var ezNumTimesBVC = 0;
    var a = 0, e = 0, c = 0, d = 0, currentHashlama = 0, r = 0;
    if (flag == 0) {

        if (counter % 2 == 0) {
            numColorPressed = 1;
        }
        else {
            numColorPressed = 2;
        }
        for (var e = 0; e < cols; e++) {
            

            // for (var b = 0; b < rows; b++) {
            //     if (board_array[b][e] != 0) {
            //         break;
            //     }
            // }
            // if (b > 0) {
            //     b = b - 1;
            // }
            for (var b = 0; b < rows; b++) {
                ezMon = 0;
                if (Math.abs(rowArray[b][e]) >= ezMon && rowArray[b][e] != 99) {
                    ezMon = Math.abs(rowArray[b][e]);
                    whereIsEzMon = 0;
                }
                if (Math.abs(colArray[b][e]) >= ezMon && colArray[b][e] != 99) {
                    ezMon = Math.abs(colArray[b][e]);
                    whereIsEzMon = 1;
                }
                if (Math.abs(alOneArray[b][e]) >= ezMon && alOneArray[b][e] != 99) {
                    ezMon = Math.abs(alOneArray[b][e]);
                    whereIsEzMon = 2;
                }
                if (Math.abs(alTwoArray[b][e]) >= ezMon && alTwoArray[b][e] != 99) {
                    ezMon = Math.abs(alTwoArray[b][e]);
                    whereIsEzMon = 3;
                }

                if (ezMon >= biggestNum) {
                    biggestNum = ezMon;
                    biggestRow = b;
                    biggestCol = e;
                    biggestWhereIsEzMOn = whereIsEzMon;
                }
                //checkit cose i changed it after finnish hashlama

            }

        }

        rowPressed = biggestRow;
        colPressed = biggestCol;
        var retRowWCS = biggestRow;
        var retColWCS = biggestCol
        var rowBiggestHashlama, colBiggestHashlama;

        for (var rowI = 0; rowI < sequence; rowI++) {//for row 

            if ((rowPressed <= rows - 1) && (colPressed + rowI <= cols - 1) && biggestWhereIsEzMOn == 0) {


                if (rowPressed < rows - 1) {
                    if (board_array[rowPressed + 1][colPressed + rowI] == 0) {
                        var valid = false;
                    }
                    else {
                        var valid = true;
                    }
                }
                else {
                    var valid = true;
                }
                if (board_array[rowPressed][colPressed + rowI] == 0 && valid) {


                    var MrowPressed = rowPressed
                    var McolPressed = colPressed + rowI;


                    if (rowArray[MrowPressed][McolPressed] != 99) {
                        currentHashlama = 1;

                        for (var i = 1; i < sequence; i++) {
                            if ((MrowPressed <= rows - 1) && (McolPressed + i <= cols - 1)) {

                                if (board_array[MrowPressed][McolPressed + i] != numColorPressed) {
                                    i = sequence + 11;
                                }
                                else {
                                    currentHashlama++;
                                }
                            }
                        }

                        for (var i = 1; i < sequence; i++) {
                            if ((MrowPressed <= rows - 1) && (McolPressed - i >= 0)) {
                                if (board_array[MrowPressed][McolPressed - i] != numColorPressed) {
                                    i = sequence + 11;
                                }
                                else {

                                    currentHashlama++;
                                }
                            }
                        }
                        if (currentHashlama >= biggestHashlama) {

                            biggestHashlama = currentHashlama;
                            rowBiggestHashlama = MrowPressed;
                            colBiggestHashlama = McolPressed;

                        }
                    }

                }

            }

            if ((colPressed <= cols - 1) && biggestWhereIsEzMOn == 1) {


                if (board_array[rowPressed - rowI][colPressed] == 0) {

                    var MrowPressed = rowPressed - rowI;
                    var McolPressed = colPressed ;


                    if (rowArray[MrowPressed][McolPressed] != 99) {
                        currentHashlama = 1;

                        for (var i = 1; i < sequence; i++) {
                            if ((MrowPressed + i <= rows - 1) && (McolPressed <= cols - 1)) {

                                if (board_array[MrowPressed+i][McolPressed] != numColorPressed) {
                                    i = sequence + 11;
                                }
                                else {
                                    currentHashlama++;
                                }
                            }
                        }

                        for (var i = 1; i < sequence; i++) {
                            if ((MrowPressed - i > -1) && (McolPressed >= 0)) {
                                if (board_array[MrowPressed - i][McolPressed] != numColorPressed) {
                                    i = sequence + 11;
                                }
                                else {

                                    currentHashlama++;
                                }
                            }
                        }
                        if (currentHashlama >= biggestHashlama) {

                            biggestHashlama = currentHashlama;
                            rowBiggestHashlama = MrowPressed;
                            colBiggestHashlama = McolPressed;

                        }
                    }

                }

            }


            if ((rowPressed + rowI <= rows - 1) && (colPressed + rowI <= cols - 1 && biggestWhereIsEzMOn == 2)) {
                if (rowPressed + rowI + 1 < rows - 1) {
                    if (board_array[rowPressed + rowI + 1][colPressed + rowI] == 0) {
                        var valid = false;
                    }
                    else {
                        var valid = true;
                    }
                }
                else {
                    var valid = true;
                }

                if (board_array[rowPressed + rowI][colPressed + rowI] == 0 && valid) {


                    var MrowPressed = rowPressed + rowI;
                    var McolPressed = colPressed + rowI;


                    if (alOneArray[MrowPressed][McolPressed] != 99) {
                        //calc local hashlama and updating acordingly
                        currentHashlama = 1;

                        // alert(rowPressed)
                        // alert(colPressed)
                        for (var i = 1; i < sequence; i++) {
                            if ((MrowPressed + i <= rows - 1) && (McolPressed + i <= cols - 1)) {

                                if (board_array[MrowPressed + i][McolPressed + i] != numColorPressed) {
                                    i = sequence + 11;
                                }
                                else {
                                    currentHashlama++;
                                }
                            }
                        }

                        for (var i = 1; i < sequence; i++) {
                            if ((MrowPressed - i >= 0) && (McolPressed - i >= 0)) {
                                if (board_array[MrowPressed - i][McolPressed - i] != numColorPressed) {
                                    i = sequence + 11;
                                }
                                else {

                                    currentHashlama++;
                                }
                            }
                        }
                        if (currentHashlama >= biggestHashlama) {

                            biggestHashlama = currentHashlama;
                            rowBiggestHashlama = MrowPressed;
                            colBiggestHashlama = McolPressed;

                        }
                    }





                }


            }



            if ((rowPressed - rowI >= 0) && (colPressed + rowI <= cols - 1 && biggestWhereIsEzMOn == 3)) {
                if (rowPressed - rowI + 1 < rows - 1) {
                    if (board_array[rowPressed - rowI + 1][colPressed + rowI] == 0) {
                        var valid = false;
                    }
                    else {
                        var valid = true;
                    }
                }
                else {
                    var valid = true;
                }

                if (board_array[rowPressed - rowI][colPressed + rowI] == 0 && valid) {


                    var MrowPressed = rowPressed - rowI;
                    var McolPressed = colPressed + rowI;


                    if (alOneArray[MrowPressed][McolPressed] != 99) {
                        //calc local hashlama and updating acordingly
                        currentHashlama = 1;

                        // alert(rowPressed)
                        // alert(colPressed)
                        for (var i = 1; i < sequence; i++) {
                            if ((MrowPressed + i <= rows - 1) && (McolPressed + i <= cols - 1)) {

                                if (board_array[MrowPressed + i][McolPressed + i] != numColorPressed) {
                                    i = sequence + 11;
                                }
                                else {
                                    currentHashlama++;
                                }
                            }
                        }

                        for (var i = 1; i < sequence; i++) {
                            if ((MrowPressed - i >= 0) && (McolPressed - i >= 0)) {
                                if (board_array[MrowPressed - i][McolPressed - i] != numColorPressed) {
                                    i = sequence + 11;
                                }
                                else {

                                    currentHashlama++;
                                }
                            }
                        }
                        if (currentHashlama >= biggestHashlama) {

                            biggestHashlama = currentHashlama;
                            rowBiggestHashlama = MrowPressed;
                            colBiggestHashlama = McolPressed;

                        }
                    }





                }


            }

        }




        // remeber to update b&e to row best and col best now I'm working with them

        if (rowBiggestHashlama && colBiggestHashlama) {
            b = rowBiggestHashlama
            rowPressed = rowBiggestHashlama;
            biggestRow = rowBiggestHashlama

            colPressed = colBiggestHashlama;
            biggestCol = colBiggestHashlama;

        }
        else {
            b = retRowWCS
            rowPressed = retRowWCS;
            biggestRow = retRowWCS

            colPressed = retColWCS;
            biggestCol = retColWCS;

        }
        if (!biggestCol) {
            alert("sher")
        }

        if (rowBiggestHashlama < rows - 1) {
            if (board_array[rowBiggestHashlama + 1][colBiggestHashlama] == 0) {
                var s;
                s = 4;
            }

        }
        // #region place

        if (counter % 2 == 0) {

            document.getElementById(b * cols + biggestCol).innerHTML = "<img src='Red.png' width='50' height='50'/>"
            board_array[b][colPressed] = 1;

            for (i = 0; i < sequence; i++) {

                if (rowArray[b][colPressed - i] > 0) {
                    rowArray[b][colPressed - i] = 99;
                }
                else if (colPressed - i > -1 && rowArray[b][colPressed - i] != 99)
                    rowArray[b][colPressed - i] -= 1;


            }

            for (i = 0; i < sequence; i++) {
                if (b + i < rows) {
                    if (colArray[b + i][colPressed] > 0) {
                        colArray[b + i][colPressed] = 99;
                    }
                    else if (colArray[b + i][colPressed] != 99) {
                        colArray[b + i][colPressed] -= 1;
                    }
                }

            }

            for (i = 0; i < sequence; i++) {
                if (b - i > 0) {
                    if (alOneArray[b - i][colPressed - i] > 0) {
                        alOneArray[b - i][colPressed - i] = 99;
                    }
                    else if (colPressed - i > -1 && alOneArray[b - i][colPressed - i] != 99)
                        alOneArray[b - i][colPressed - i] -= 1;
                }

            }

            for (i = 0; i < sequence; i++) {
                if (b + i < rows) {
                    if (alTwoArray[b + i][colPressed - i] > 0) {
                        alTwoArray[b + i][colPressed - i] = 99;
                    }
                    else if (colPressed - i > -1 && b + i < cols && alTwoArray[b + i][colPressed - i] != 99)
                        alTwoArray[b + i][colPressed - i] -= 1;
                }

            }

        }
        else {


            document.getElementById(b * cols + biggestCol).innerHTML = "<img src='Blue.png' width='50' height='50'/>"
            board_array[b][biggestCol] = 2;

            for (var i = 0; i < sequence; i++) {

                if (rowArray[b][colPressed - i] < 0) {
                    rowArray[b][colPressed - i] = 99;
                }
                else if (colPressed - i > -1 && rowArray[b][colPressed - i] != 99)
                    rowArray[b][colPressed - i] += 1;

            }

            for (i = 0; i < sequence; i++) {
                if (b + i < rows) {
                    if (colArray[b + i][colPressed] < 0) {
                        colArray[b + i][colPressed] = 99;
                    }
                    else if (colArray[b + i][colPressed] != 99) {
                        colArray[b + i][colPressed] += 1;
                    }
                }

            }

            for (var i = 0; i < sequence; i++) {
                if (b - i > 0) {
                    if (alOneArray[b - i][colPressed - i] < 0) {
                        alOneArray[b - i][colPressed - i] = 99;
                    }
                    else if (colPressed - i > -1 && alOneArray[b - i][colPressed - i] != 99)
                        alOneArray[b - i][colPressed - i] += 1;
                }

            }

            for (i = 0; i < sequence; i++) {
                if (b + i < rows) {
                    if (alTwoArray[b + i][colPressed - i] < 0) {
                        alTwoArray[b + i][colPressed - i] = 99;
                    }
                    else if (colPressed - i > -1 && b + i < cols && alTwoArray[b + i][colPressed - i] != 99)
                        alTwoArray[b + i][colPressed - i] += 1;
                }

            }
        }





        //#endregion

        counter++;

        // #region wins
        numColorPressed = board_array[b][colPressed];
        L = 0;
        V = 0;
        q = 0;
        g = 0;
        //rows
        var i;

        for (i = 0; i <= sequence; i++) {
            if ((rowPressed <= rows - 1) && (colPressed <= cols - 1)) {
                if (board_array[rowPressed][colPressed + i] != numColorPressed) {
                    i = sequence + 11;
                }
                else {

                    q++;
                }
            }
        }

        for (i = 0; i <= sequence; i++) {
            if ((rowPressed <= rows - 1) && (colPressed <= cols - 1)) {
                if (board_array[rowPressed][colPressed - i] != numColorPressed) {
                    i = sequence + 11;
                }
                else {

                    q++;
                }
            }
        }
        if (q > sequence) {
            alert("win at row");
            flag = 1;
        }


        //cols
        for (i = 0; i <= sequence; i++) {

            if ((rowPressed + i <= rows - 1) && (colPressed <= cols - 1)) {
                if (board_array[rowPressed + i][colPressed] != numColorPressed) {
                    i = sequence + 11;
                }
                else {

                    g++;
                }
            }
        }



        for (i = 0; i <= sequence; i++) {

            if ((rowPressed - i >= 0) && (colPressed <= cols - 1)) {
                if (board_array[rowPressed - i][colPressed] != numColorPressed) {
                    i = sequence + 11;
                }
                else {

                    g++;
                }
            }
        }

        if (g > sequence) {
            alert("WIN AT COL");
            flag = 1;

        }


        ////alachsonim

        for (r = 0; r < sequence; r++) {

            if ((rowPressed + r <= rows - 1) && (colPressed - r <= cols - 1)) {//al +-

                if (board_array[rowPressed + r][colPressed - r] != numColorPressed) {
                    r = sequence + 11;
                }
                else {

                    L++;
                }
            }
        }
        for (r = 0; r < sequence; r++) {
            if ((rowPressed - r >= 0) && (colPressed <= cols - 1)) {//al -+

                if (board_array[rowPressed - r][colPressed + r] != numColorPressed) {
                    r = sequence + 11;
                }
                else {

                    L++;
                }
            }
        }
        if (L > sequence) {
            alert("WIN AT ALACHSON");
            flag = 1;
        }


        L = 0;


        for (r = 0; r < sequence; r++) {

            if ((rowPressed + r <= rows - 1) && (colPressed + r <= cols - 1)) {//al +-

                if (board_array[rowPressed + r][colPressed + r] != numColorPressed) {
                    r = sequence + 11;
                }
                else {

                    L++;
                }
            }
        }
        for (r = 0; r < sequence; r++) {
            if ((rowPressed - r >= 0) && (colPressed - r >= 0)) {//al -+

                if (board_array[rowPressed - r][colPressed - r] != numColorPressed) {
                    r = sequence + 11;
                }
                else {

                    L++;
                }
            }
        }
        if (L > sequence) {
            alert("WIN AT ALACHSON");
            flag = 1;
        }
        //#endregion



    }
}
