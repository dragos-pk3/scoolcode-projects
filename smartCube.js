stage {
    backdrop LevelBackground("gallery:General/Homogene 2")
    default backdrop MenuBackground("gallery:General/Homogene 7")
    let gridSize = 28;
    let rr = 25;
    let playerBlocked = false;
    let levelOn = false;
    let win = 0;
    let gameOver;
    function lp(sX, eX, rC) {
        let p = (eX - sX) / (rC - 1);
        let pts = [  ];
        for(let i = 0; i < rC; i++) {
            pts.push(sX + p * i);
        }
        return pts
    }
    function plp(sX, eX, yH, y0, rC) {
        let h = (sX + eX) / 2;
        let a = 4 * (y0 - yH) / (sX - eX) ** 2;
        let x = [  ];
        x = this.lp(sX, eX, rC);
        let y = [  ];
        for(let i = 0; i < x.length; i++) {
            y.push(a * (x[i] - h) ** 2 + yH);
        }
        let v2 = [  ];
        for(let i = 0; i < rC; i++) {
            v2.push(x[i]);
            v2.push(y[i]);
        }
        return v2
    }
    when started {
        this.setScene(this.MenuBackground);
    }
    when signalReceived("startLevel") {
        while(!levelOn);
        while(levelOn) {
            if(this.isKeyPressed("r")) {
                this.Square.deleteAllClones();
                this.Player.hide();
                this.Among_Numbers.deleteAllClones();
                levelOn = false;
            }
        }
    }
    
    actor LevelCreator {
        let levelClones;
        let currentLevel;
        when stage.dataReceived("startThisLevel") {
            this.wait(0.5);
            Player.isFalling = false;
            setScene(LevelBackground);
            currentLevel = event.data;
            levelClones = 0;
            if(event.data == 1) {
                physics.collisionShape = "box";
                Square.goAfter(Player);
                Square.setPosition(0, Square.offset);
                Square.squareWeight = -1;
                createClone(Square);
                Square.squareWeight = 2;
                Among_Numbers.setCostume(Square.squareWeight);
                Square.setPosition(gridSize, Square.offset);
                Among_Numbers.goTo(Square);
                createClone(Square);
                createClone(Among_Numbers);
                levelClones += 1;
                Square.setPosition(-170, 120);
                Square.hide();
                Player.setPosition(0, 0);
            }
            if(event.data == 2) {
                physics.collisionShape = "box";
                Square.goAfter(Player);
                Square.setPosition(0, Square.offset);
                Square.squareWeight = -1;
                createClone(Square);
                Square.squareWeight = 2;
                Among_Numbers.setCostume(Square.squareWeight);
                Square.setPosition(-gridSize, Square.offset);
                Among_Numbers.goTo(Square);
                createClone(Square);
                createClone(Among_Numbers);
                levelClones += 1;
                Square.squareWeight = 1;
                Among_Numbers.setCostume(Square.squareWeight);
                Square.setPosition(-gridSize * 2, Square.offset);
                Among_Numbers.goTo(Square);
                createClone(Square);
                createClone(Among_Numbers);
                levelClones += 1;
                Square.setPosition(-170, 120);
                Square.hide();
                Player.setPosition(0, 0);
            }
            if(event.data == 3) {
                physics.collisionShape = "box";
                Square.goAfter(Player);
                Square.setPosition(0, Square.offset);
                Square.squareWeight = -1;
                createClone(Square);
                Square.squareWeight = 2;
                Among_Numbers.setCostume(Square.squareWeight);
                Square.setPosition(gridSize, Square.offset);
                Among_Numbers.goTo(Square);
                createClone(Square);
                createClone(Among_Numbers);
                levelClones += 1;
                Square.squareWeight = -1;
                Among_Numbers.setCostume(Square.squareWeight);
                Square.setPosition(gridSize * 2, Square.offset);
                createClone(Square);
                Square.squareWeight = 1;
                Among_Numbers.setCostume(Square.squareWeight);
                Square.setPosition(gridSize * 3, Square.offset);
                Among_Numbers.goTo(Square);
                createClone(Square);
                createClone(Among_Numbers);
                levelClones += 1;
                Square.setPosition(-170, 120);
                Square.hide();
                Player.setPosition(0, 0);
            }
            if(event.data == 4) {
                physics.collisionShape = "box";
                Square.goAfter(Player);
                Square.setPosition(0, Square.offset);
                Square.squareWeight = -1;
                createClone(Square);
                Square.setPosition(gridSize * 2, Square.offset);
                createClone(Square);
                Square.setPosition(gridSize, Square.offset - gridSize * 2);
                createClone(Square);
                Square.setPosition(gridSize * 3, Square.offset - gridSize * 2);
                createClone(Square);
                Square.squareWeight = 2;
                Among_Numbers.setCostume(Square.squareWeight);
                Square.setPosition(gridSize, Square.offset);
                Among_Numbers.goTo(Square);
                createClone(Square);
                createClone(Among_Numbers);
                levelClones += 1;
                Square.squareWeight = 1;
                Among_Numbers.setCostume(Square.squareWeight);
                Square.setPosition(gridSize * 2, Square.offset - gridSize * 2);
                Among_Numbers.goTo(Square);
                createClone(Square);
                createClone(Among_Numbers);
                levelClones += 1;
                Square.squareWeight = 2;
                Among_Numbers.setCostume(Square.squareWeight);
                Square.setPosition(0, Square.offset - gridSize * 2);
                Among_Numbers.goTo(Square);
                createClone(Square);
                createClone(Among_Numbers);
                levelClones += 1;
                Square.setPosition(-170, 120);
                Square.hide();
                Player.setPosition(0, 0);
            }
            if(event.data == 5) {
                physics.collisionShape = "box";
                Square.goAfter(Player);
                Square.setPosition(0, Square.offset);
                Square.squareWeight = -1;
                createClone(Square);
                Square.squareWeight = 2;
                Among_Numbers.setCostume(Square.squareWeight);
                Square.setPosition(gridSize, Square.offset);
                Among_Numbers.goTo(Square);
                createClone(Square);
                createClone(Among_Numbers);
                levelClones += 1;
                Square.squareWeight = 2;
                Among_Numbers.setCostume(Square.squareWeight);
                Square.setPosition(gridSize, Square.offset - gridSize * 2);
                Among_Numbers.goTo(Square);
                createClone(Square);
                createClone(Among_Numbers);
                levelClones += 1;
                Square.squareWeight = 1;
                Among_Numbers.setCostume(Square.squareWeight);
                Square.setPosition(gridSize * 2, Square.offset - gridSize * 2);
                Among_Numbers.goTo(Square);
                createClone(Square);
                createClone(Among_Numbers);
                levelClones += 1;
                Square.setPosition(-170, 120);
                Square.hide();
                Player.setPosition(0, 0);
            }
            levelOn = true;
            broadcast("startLevel");
            while(!((levelClones <= 0) || !levelOn));
            if(levelOn == true) {
                win += 1;
                levelOn = false;
            }
            Square.deleteAllClones();
            Player.hide();
            Among_Numbers.deleteAllClones();
            setScene(MenuBackground);
        }
    }
    
    actor Player {
        costume Pătrat_Roșu("gallery:Objects/Square Red")
        let nextPos;
        let currentTime = 0;
        let yh = 20;
        let cx;
        let nx;
        let cy;
        let gv = 1;
        let pts = [  ];
        let isMoving = false;
        let isJumping = false;
        let isFalling = false;
        function pfp(nx, m) {
            while(this.x != nx) {
                for(let ix = 0; ix < m.length / 2; ix++) {
                    this.x = m[ix * 2];
                    this.y = m[ix * 2 + 1];
                    this.wait(0.01);
                }
                isMoving = false;
            }
        }
        function snap(_x, _y) {
            let cell_x = Math.round(_x / gridSize) * gridSize;
            let cell_y = Math.round(_y / gridSize) * gridSize;
            let snapPos = [  ];
            snapPos.push(cell_x);
            snapPos.push(cell_y);
        }
        when stage.started {
            this.hide();
            physics.collisionShape = "box";
            this.size = 50;
        }
        when stage.signalReceived("startLevel") {
            this.show();
            isFalling = false;
            this.wait(0.3);
            broadcastAndWait("pingSquareYDown?");
            while(!levelOn);
            while(levelOn) {
                if(isKeyPressed("d") && !isFalling && !isMoving) {
                    playerBlocked = false;
                    broadcastAndWait("pingSquareXRight?");
                    isMoving = true;
                    cx = this.x;
                    nx = this.x + gridSize;
                    cy = this.y;
                    pts = plp(cx, nx, cy + yh, cy, rr);
                    this.pfp(nx, pts);
                    broadcastAndWait("pingSquareYDown?");
                    if(!playerBlocked) {
                        isFalling = true;
                    }
                    else {
                        isFalling = false;
                    }
                }
                if(isKeyPressed("a") && !isFalling && !isMoving) {
                    playerBlocked = false;
                    broadcastAndWait("pingSquareXLeft?");
                    isMoving = true;
                    cx = this.x;
                    nx = this.x - gridSize;
                    cy = this.y;
                    pts = plp(cx, nx, cy + yh, cy, rr);
                    this.pfp(nx, pts);
                    broadcastAndWait("pingSquareYDown?");
                    if(!playerBlocked) {
                        isFalling = true;
                    }
                    else {
                        isFalling = false;
                    }
                }
            }
        }
        when stage.signalReceived("queueFall") {
            this.wait(0.5);
            if(!isMoving && levelOn) {
                isFalling = true;
                playerBlocked = false;
            }
        }
        when stage.signalReceived("startLevel") {
            this.wait(0.5)
            while(!levelOn);
            while(levelOn) {
                if(isFalling) {
                    let pctY = lp(this.y, this.y - gridSize, rr);
                    for(let i = 0; i < pctY.length; i++) {
                        this.y = pctY[i];
                        this.wait(0.01);
                    }
                    broadcastAndWait("pingSquareYDown?");
                    if(!playerBlocked) {
                        isFalling = true;
                    }
                    else {
                        isFalling = false;
                    }
                }
                this.wait(0.05);
            }
        }
    }
    
    actor Square {
        costume Pătrat_Portocaliu("gallery:Objects/Square Orange")
        costume Pătrat_Galben("gallery:Objects/Square Yellow")
        costume Pătrat_Roz("gallery:Objects/Square Pink")
        costume Pătrat_Trandafiriu("gallery:Objects/Square Rose")
        costume Pătrat_Gri("gallery:Objects/Square Grey")
        let squareWeight = 4;
        let offset = -21;
        when stage.started {
            this.hide();
        }
        when stage.sceneChanged(LevelBackground) {
            this.show();
        }
        when cloned {
            if(squareWeight >= 0) {
                this.show();
                this.setCostume(5 - squareWeight);
                while(!levelOn);
                while(levelOn) {
                    if(squareWeight <= 0) {
                        broadcast("queueFall");
                        LevelCreator.levelClones -= 1;
                        this.deleteClone();
                    }
                }
            }
            else {
                this.setCostume(5);
            }
        }
        when stage.signalReceived("pingSquareYDown?") {
            if(this.x == Player.x && this.y == Player.y + offset) {
                playerBlocked = true;
                if(squareWeight != -1) {
                    squareWeight -= 1;
                    let data = [  ];
                    data.push(cloneId);
                    data.push(squareWeight);
                    broadcastData("decreaseNumber", data);
                    this.nextCostume();
                }
            }
        }
        when stage.signalReceived("pingSquareXLeft?") {
            if(this.x == Player.x - gridSize && this.y == (Player.y + gridSize) + offset) {
                Player.isJumping = true;
                let pctY = lp(Player.y, Player.y + gridSize, rr);
                for(let i = 0; i < pctY.length; i++) {
                    Player.y = pctY[i];
                    Player.wait(0.01);
                }
                Player.isJumping = false;
            }
        }
        when stage.signalReceived("pingSquareXRight?") {
            if(this.x == Player.x + gridSize && this.y == (Player.y + gridSize) + offset) {
                Player.isJumping = true;
                let pctY = lp(Player.y, Player.y + gridSize, rr);
                for(let i = 0; i < pctY.length; i++) {
                    Player.y = pctY[i];
                    Player.wait(0.01);
                }
                Player.isJumping = false;
            }
        }
    }
    
    actor Among_Numbers {
        costume Among_Numbers_One("gallery:Text/Among Numbers One")
        costume Among_Numbers_Two("gallery:Text/Among Numbers Two")
        costume Among_Numbers_Three("gallery:Text/Among Numbers Three")
        costume Among_Numbers_Four("gallery:Text/Among Numbers Four")
        costume Among_Numbers_Five("gallery:Text/Among Numbers Five")
        costume Among_Numbers_Six("gallery:Text/Among Numbers Six")
        costume Among_Numbers_Seven("gallery:Text/Among Numbers Seven")
        costume Among_Numbers_Eight("gallery:Text/Among Numbers Eight")
        costume Among_Numbers_Nine("gallery:Text/Among Numbers Nine")
        costume Among_Numbers_Ten("gallery:Text/Among Numbers Ten")
        let myClone;
        when stage.started {
            this.size = 50;
            this.goBefore(Square);
            this.hide();
        }
        when cloned {
            this.show();
            myClone = Square.cloneCount;
        }
        when stage.dataReceived("decreaseNumber") {
            let data = [  ];
            data = event.data;
            if(myClone == data[0]) {
                if(data[1] > 0) {
                    this.setCostume(data[1]);
                }
                else {
                    this.deleteClone();
                }
            }
        }
    }
    
    actor Among_Numbers_Framed {
        costume Among_Numbers_Framed_One("gallery:Text/Among Numbers Framed One")
        costume Among_Numbers_Framed_Two("gallery:Text/Among Numbers Framed Two")
        costume Among_Numbers_Framed_Three("gallery:Text/Among Numbers Framed Three")
        costume Among_Numbers_Framed_Four("gallery:Text/Among Numbers Framed Four")
        costume Among_Numbers_Framed_Five("gallery:Text/Among Numbers Framed Five")
        costume Among_Numbers_Framed_Six("gallery:Text/Among Numbers Framed Six")
        costume Among_Numbers_Framed_Seven("gallery:Text/Among Numbers Framed Seven")
        costume Among_Numbers_Framed_Eight("gallery:Text/Among Numbers Framed Eight")
        costume Among_Numbers_Framed_Nine("gallery:Text/Among Numbers Framed Nine")
        costume Among_Numbers_Framed_Ten("gallery:Text/Among Numbers Framed Ten")
        costume Among_Numbers_Framed_Eleven("gallery:Text/Among Numbers Framed Eleven")
        costume Among_Numbers_Framed_Twelve("gallery:Text/Among Numbers Framed Twelve")
        costume Among_Numbers_Framed_Thirteen("gallery:Text/Among Numbers Framed Thirteen")
        costume Among_Numbers_Framed_Fourteen("gallery:Text/Among Numbers Framed Fourteen")
        costume Among_Numbers_Framed_Fifteen("gallery:Text/Among Numbers Framed Fifteen")
        costume Among_Numbers_Framed_Sixteen("gallery:Text/Among Numbers Framed Sixteen")
        costume Among_Numbers_Framed_Seventeen("gallery:Text/Among Numbers Framed Seventeen")
        costume Among_Numbers_Framed_Eighteen("gallery:Text/Among Numbers Framed Eighteen")
        costume Among_Numbers_Framed_Nineteen("gallery:Text/Among Numbers Framed Nineteen")
        costume Among_Numbers_Framed_Twenty("gallery:Text/Among Numbers Framed Twenty")
        function checkWins() {
            if(win + 1 >= this.cloneId) {
                this.opacity = 100;
            }
            else {
                this.opacity = 50;
            }
        }
        when stage.sceneChanged(MenuBackground) {
            if(this.isClone) {
                this.show();
                this.checkWins();
                while(isSceneSelected(MenuBackground)) {
                    if(this.isPointerOver(this) && this.opacity == 100) {
                        this.size = 85;
                    }
                    else {
                        this.size = 75;
                    }
                }                
                this.wait(0.1);
            }
        }
        when stage.sceneChanged(LevelBackground) {
            this.hide();
        }
        when stage.started {
            win = 0;
            this.show();
            this.size = 75;
            let startPos = -256;
            let levelNr = 5;
            let increasePos = 640 / levelNr;
            this.setCostume(this.Among_Numbers_Framed_One);
            for(let i = 0; i < levelNr; i++) {
                this.setPosition(startPos + increasePos * i, 0);
                createClone(this);
                this.nextCostume();
            }
            this.hide();
        }
        when cloned {
            this.checkWins();
                  while(isSceneSelected(MenuBackground)) {
                    if(this.isPointerOver(this) && this.opacity == 100) {
                        this.size = 85;
                    }
                    else {
                        this.size = 75;
                    }
                  }
        }
        when clicked {
            if(this.opacity == 100) {
                broadcastDataAndWait("startThisLevel", this.cloneId);
                this.wait(0.5)
            }
        }
    }
    
    actor Dreptunghi {
        costume Dreptunghi_Negru_1("gallery:Shapes/Rectangle Black 1")
        costume Dreptunghi_Negru_2("gallery:Shapes/Rectangle Black 2")
        costume Dreptunghi_Alb_1("gallery:Shapes/Rectangle White 1")
        costume Dreptunghi_Alb_2("gallery:Shapes/Rectangle White 2")
        when stage.started {
            this.hide();
            this.size = 1500;
            this.setPosition(0, -380);
        }
        when stage.sceneChanged(LevelBackground) {
            this.show();
            this.goToFront();
            this.setPosition(0, -380);
            broadcast("waterLevelRise");
        }
        when stage.sceneChanged(MenuBackground) {
            this.hide();
        }
        when stage.signalReceived("waterLevelRise") {
            while(!levelOn);
            while(levelOn) {
                this.y += 1;
                this.wait(0.07);
                if(this.touching(Player)) {
                    levelOn = false;
                }
            }
        }
    }
    
    actor Lacey {
        costume Lacey_Pelerina_Plutitoare_1("gallery:Rajzpályázat/Lacey Floating Cape 1")
        costume Lacey_Pelerina_Plutitoare_2("gallery:Rajzpályázat/Lacey Floating Cape 2")
        costume Lacey_Pelerina_Plutitoare_3("gallery:Rajzpályázat/Lacey Floating Cape 3")
        costume Lacey_Pelerina_Plutitoare_4("gallery:Rajzpályázat/Lacey Floating Cape 4")
        costume Lacey_Pelerina_Plutitoare_5("gallery:Rajzpályázat/Lacey Floating Cape 5")
        when stage.started {
            this.setPosition(-260, 100);
            this.size = 35;
        }
        when stage.sceneChanged(LevelBackground) {
            this.hide();
            this.say("")
        }
        when stage.sceneChanged(MenuBackground) {
            this.show();
            this.say("'A'/'D' - LEFT/RIGHT");
            while(isSceneSelected(MenuBackground)) {
                this.nextCostume();
                this.wait(0.1);
            }
        }
    }
    
    actor Robbit {
        costume Robbit_Flacara_1("gallery:Rajzpályázat/Robbit Flame 1")
        costume Robbit_Flacara_2("gallery:Rajzpályázat/Robbit Flame 2")
        costume Robbit_Flacara_3("gallery:Rajzpályázat/Robbit Flame 3")
        costume Robbit_Flacara_4("gallery:Rajzpályázat/Robbit Flame 4")
        costume Robbit_Flacara_5("gallery:Rajzpályázat/Robbit Flame 5")
        costume Robbit_Flacara_6("gallery:Rajzpályázat/Robbit Flame 6")
        when stage.started {
            this.setPosition(260, 100);
            this.size = 35;
        }
        when stage.sceneChanged(LevelBackground) {
            this.hide();
            this.say("")

        }
        when stage.sceneChanged(MenuBackground) {
            this.show();
            this.say("'R' - Reset");
            while(isSceneSelected(MenuBackground)) {
                this.nextCostume();
                this.wait(0.1);
            }
        }
    }
}