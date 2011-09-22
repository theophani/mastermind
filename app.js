        function SetGameType(type) {
                GameType = new Number()
                GameType.src = type
        }

        function ToggleType() {
                if (GameType.src == 0) GameType.src = 1
                else GameType.src = 0
                document.images[120].src = rules[GameType.src].src
                ReloadGame()
        }

        function InitializeVariables() {


                poo = new MakeNumberArray(4)

                dummypoo = new MakeNumberArray(4)

                guess = new MakeNumberArray(4)

                clues = new MakeNumberArray(4)

                dummy = new MakeNumberArray(6)

                dummy[1].src = 6
                dummy[2].src = 5
                dummy[3].src = 4
                dummy[4].src = 3
                dummy[5].src = 2
                dummy[6].src = 1

                rules = new MakeImageArray(2)

                rules[0].src = "repeated.gif"
                rules[1].src = "unique.gif"

                cluepegs = new MakeImageArray(3)

                cluepegs[0].src = "blank.gif"
                cluepegs[1].src = "black.gif"
                cluepegs[2].src = "white.gif"

                colours = new MakeImageArray(7)

                colours[0].src = "question.gif"
                colours[1].src = "yellow.gif"
                colours[2].src = "green.gif"
                colours[3].src = "blue.gif"
                colours[4].src = "red.gif"
                colours[5].src = "grey.gif"
                colours[6].src = "orange.gif"

                turn = new Make2DNumberArray(12,10)

        }


        function InitializeBoard() {
                InitializeVariables()
                MakeAnswer(GameType.src)
                for (var i=0; i<4; i++) {
                        document.images[110+i].src = "question.gif"
                }
                InitializeNext(1)
        }

        function InitializeNext(i) {
                if ( i==11 ) {
                        GameOver(0)
                }
                else {
                        if ( i>1 ) {
                                document.images[ (i-1)*10 - 1 ].src = "blank.gif"
                        }
                        document.images[ i*10 - 1 ].src = "submit.gif"
                        for (var j=0; j<4; j++){
                                document.images[ (i-1)*10 + j ].src = colours[0].src
                        }
                        turn[i][5].src = 1
                }
        }


        function MakeAnswer(type) {
                if (type == 1) {
                        for (var i = 1; i<=4; i++) {
                                var j = Math.round( 1 + Math.random()*(6-1) )
                                poo[i].src = dummy[j].src
                        }
                }
                else {
                        for (var i = 1; i<=4; i++) {
                                var j = Math.round( 1 + Math.random()*(6-i) )
                                poo[i].src = dummy[j].src
                                dummy[j].src = 0
                                mySort(dummy,7-i)
                        }
                }
        }

        function MakeImageArray(n) {
                this.length = n
                for (var i = 0; i<n; i++) {
                        this[i] = new Image()
                }

              return this
        }

        function Make2DNumberArray(r,c) {
                this.length = r
                for (var i = 1; i<=r; i++) {
                        this[i] = new Array(c)
                        for (var j = 1; j<=c; j++) {
                                this[i][j]     = new Number()
                                this[i][j].src = 0
                        }
                }

              return this
        }


        function MakeNumberArray(n) {
                this.length = n
                for (var i = 1; i<=n; i++) {
                        this[i] = new Number()
                        this[i].src = 0
                }

              return this
        }


        function TurnStatus(i,j){
                if ( turn[i][5].src ) {
                        if ( j < 5 ) {
                                RotateColour(i,j)
                        }
                        else if ( j==10 && turn[i][1].src && turn[i][2].src && turn[i][3].src && turn[i][4].src ) {
                                SubmitGuess(i)
                        }
                }
        }


        function RotateColour(i,j) {
                n = turn[i][j].src
                if (n == 6 ) turn[i][j].src = 0
                else turn[i][j].src = n+1
                document.images[ (i-1)*10 + (j-1) ].src = colours[turn[i][j].src].src
        }


        function SubmitGuess(i) {
                turn[i][5].src = 0
                for (var j=1; j<=4; j++) {
                        guess[j].src = turn[i][j].src
                }
                if ( (guess[1].src == poo[1].src) && (guess[2].src == poo[2].src) && (guess[3].src == poo[3].src) && (guess[4].src == poo[4].src) ) {
                        GameOver(1)
                }
                else {
                        ReportResults(i)
                        InitializeNext(i+1)
                }
        }

        function GameOver(win) {
                if (win) {
                        document.images[100].src = "letterW.gif"
                        document.images[101].src = "letterI.gif"
                        document.images[102].src = "letterN.gif"
                        document.images[103].src = "exclaim.gif"
                }
                else     {
                        document.images[100].src = "letterL.gif"
                        document.images[101].src = "letterO.gif"
                        document.images[102].src = "letterS.gif"
                        document.images[103].src = "letterE.gif"
                }
                RevealAnswer()
        }


        function ReportResults(i) {
                for (var j=1; j<=4; j++) {
                        dummypoo[j].src = poo[j].src
                        clues[j].src = 0
                }
                for (var j=1; j<=4; j++) {
                        if ( guess[j].src == dummypoo[j].src ) {
                                clues[j].src = 2
                                guess[j].src = 0
                                dummypoo[j].src = 7
                        }
                }
                for (var j=1; j<=4; j++) {
                        if ( guess[1].src == dummypoo[j].src ) {
                                clues[j].src = 1
                                guess[1].src = 0
                                dummypoo[j].src = 7
                        }
                        else if ( guess[2].src == dummypoo[j].src ) {
                                clues[j].src = 1
                                guess[2].src = 0
                                dummypoo[j].src = 7
                        }
                        else if ( guess[3].src == dummypoo[j].src ) {
                                clues[j].src = 1
                                guess[3].src = 0
                                dummypoo[j].src = 7
                        }
                        else if ( guess[4].src == dummypoo[j].src ) {
                                clues[j].src = 1
                                guess[4].src = 0
                                dummypoo[j].src = 7
                        }
                }
                mySort(clues,4)
                for (var j=1; j<=4; j++) {
                        document.images[ (i-1)*10 + j + 4 ].src = cluepegs[ clues[j].src ].src
                }
        }


        function mySort(myArray, n) {
                for (var i=1; i<n; i++) {
                        for (var j=(i+1); j<=n; j++) {
                                if ( myArray[j].src > myArray[i].src) {
                                        var temp = myArray[i].src
                                        myArray[i].src = myArray[j].src
                                        myArray[j].src = temp
                                }
                        }
                }
        }

        function ReloadGame() {
                for (var i=0; i<109; i++) document.images[i].src = "blank.gif"
                InitializeBoard()
        }

        function RevealAnswer() {
                for (var i=1; i<=10; i++) {
                        turn[i][5].src = 0
                }
                for (var i=1; i<=4; i++) {
                        document.images[109+i].src = colours[poo[i].src].src
                }

        }
