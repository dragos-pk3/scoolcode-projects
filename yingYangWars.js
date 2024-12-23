stage {
    default backdrop Gri_Deschis("gallery:General/Grey Light")
    let speed = 0;
    let yin = 0;
    let yang = 0;
    let win_score = 0;
    let yang_wins = 0;
    let yin_wins = 0;
    let canDraw = false;
    when started {
        speed = 10;
        win_score = 99;
        yin_wins = 0;
        yang_wins = 0;
        this.showVariable(ref yin);
        this.showVariable(ref yang);
    }
    when started {
        while(true) {
            if(yin > win_score) {
                this.broadcast("reset");
                yin_wins += 1;
                this.broadcast("yinWinner");
            }
            if(yang > win_score) {
                this.broadcast("reset");
                yang_wins += 1;
                this.broadcast("yangWinner");
            }
        }
    }
    
    actor Tile {
        default costume Light("gallery:Objects/Square White")
        costume Night("gallery:Objects/Square Black")
        function deseneaza_tabla() {
            canDraw = false;
            yin = 0;
            yang = 0;
            deleteAllClonesOf(Tile);
            this.show();
            this.wait(0.2);
            this.heading = 90;
            this.tintShade = 100;
            this.setPosition(-210, 110);
            for(let j = 1; j <= 9; j++) {
                for(let i = 1; i <= 8; i++) {
                    createClone(this);
                    this.move(28);
                }
                this.setPosition(-210, this.y - 28);
            }
            this.tintShade = 0;
            this.wait(0.2);
            this.setPosition(210, 110);
            this.heading = -90;
            for(let j = 1; j <= 9; j++) {
                for(let i = 1; i <= 8; i++) {
                    createClone(this);
                    this.move(28);
                }
                this.setPosition(210, this.y - 28);
            }
            this.setPosition(-320, -180);
            this.hide();
            canDraw = true;
        }
        when stage.started {
            this.deseneaza_tabla();
        }
        when cloned {
            this.goToBack();
            this.show();
            if(this.tintShade == 100) {
                yin += 1;
            }
            else {
                yang += 1;
            }
            while(true) {
                if(this.touching(Yin_Ball) && this.tintShade == 100) {
                    this.tintShade = 0;
                    yin += 1;
                    yang -= 1;
                    broadcast("pong");
                }
                if(this.touching(Yang_Ball) && this.tintShade == 0) {
                    this.tintShade = 100;
                    yang += 1;
                    yin -= 1;
                    broadcast("ping");
                }
            }
        }
        when stage.signalReceived("reset") {
            this.deseneaza_tabla();
        }
    }
    
    actor Yin_Ball {
        default costume Disc_Alb("gallery:Shapes/Circle White")
        when stage.started {
            this.size = 50;
            physics.collisionShape = "circle";
            this.setPosition(320, 180);
            this.wait(1.7);
            this.setPosition(150, 0);
            this.heading = Math.randomBetween(0, 180);
            this.goToFront();
            this.goAfter(thumbnail);
            broadcast("start");
        }
        when stage.signalReceived("pong") {
            this.heading = this.heading * -1;
        }
        when stage.signalReceived("reset") {
            this.hide();
            this.wait(1.7);
            this.show();
            this.setPosition(150, 0);
        }
        when stage.signalReceived("start") {
            while(true) {
                this.wait(0.01);
                this.move(speed);
                if(this.touching(MargineSus)) {
                    this.wait(0.01);
                    this.heading = -165;
                }
                if(this.touching(MargineStanga)) {
                    this.wait(0.01);
                    this.heading = Math.randomBetween(45, 135);
                }
                if(this.touching(MargineJos)) {
                    this.wait(0.01);
                    this.heading = -45;
                }
                if(this.touching(MargineDreapta)) {
                    this.wait(0.01);
                    this.heading = Math.randomBetween(-45, -135);
                }
            }
        }
    }
    
    actor Yang_Ball {
        costume Disc_Negru("gallery:Shapes/Circle Black")
        when stage.started {
            this.size = 50;
            physics.collisionShape = "circle";
            this.setPosition(-320, 180);
            this.wait(0.8);
            this.setPosition(-150, 0);
            this.heading = Math.randomBetween(0, 180);
            this.goToFront();
            this.goAfter(thumbnail);
        }
        when stage.signalReceived("start") {
            while(true) {
                this.wait(0.01);
                this.move(speed);
                if(this.touching(MargineSus)) {
                    this.wait(0.01);
                    this.heading = 135;
                }
                if(this.touching(MargineStanga)) {
                    this.wait(0.01);
                    this.heading = Math.randomBetween(60, 115);
                }
                if(this.touching(MargineJos)) {
                    this.wait(0.01);
                    this.heading = 30;
                }
                if(this.touching(MargineDreapta)) {
                    this.wait(0.01);
                    this.heading = Math.randomBetween(-45, -135);
                }
            }
        }
        when stage.signalReceived("ping") {
            this.heading = this.heading * -1;
        }
        when stage.signalReceived("reset") {
            this.hide();
            this.wait(1.7);
            this.show();
            this.setPosition(-150, 0);
            this.heading = Math.randomBetween(0, 180);
        }
    }
    
    actor MargineSus {
        costume Linie_Inactiva("gallery:Objects/Line Idle")
        when stage.started {
            this.goToFront();
            this.setPosition(0, 126);
        }
    }
    
    actor MargineDreapta {
        costume Linie_Inactiva("gallery:Objects/Line Idle")
        when stage.started {
            this.goToFront();
            this.setPosition(224, 0);
            this.heading = 180;
        }
    }
    
    actor MargineJos {
        costume Linie_Inactiva("gallery:Objects/Line Idle")
        when stage.started {
            this.goToFront();
            this.setPosition(0, -130);
        }
    }
    
    actor MargineStanga {
        costume Linie_Inactiva("gallery:Objects/Line Idle")
        when stage.started {
            this.goToFront();
            this.setPosition(-224, 0);
            this.heading = 180;
        }
    }
    
    actor Bomb_Sphere {
        default costume Restart_Button_Light_Crafty("gallery:Games/Restart Button Light Crafty")
        when stage.started {
            this.size = 34;
            this.show();
            this.tintShade = 100;
            this.setPosition(275, 80);
        }
        when clicked {
            if(canDraw) {
                for(let i = 1; i <= 3; i++) {
                    this.size -= 3;
                    this.tintHue += 15;
                    this.wait(0.01);
                }
                for(let i = 1; i <= 3; i++) {
                    this.size += 3;
                    this.tintHue -= 15;
                    this.wait(0.01);
                }
                broadcast("reset");
            }
        }
    }
    
    actor Mouse_Robot {
        costume Mouse_Robot_Inactiv("gallery:Rajzpályázat/Mouse Robot Idle")
        costume Mouse_Robot_Intins_1("gallery:Rajzpályázat/Mouse Robot Stretching 1")
        costume Mouse_Robot_Intins_2("gallery:Rajzpályázat/Mouse Robot Stretching 2")
        costume Mouse_Robot_Intins_3("gallery:Rajzpályázat/Mouse Robot Stretching 3")
        costume Mouse_Robot_Intins_4("gallery:Rajzpályázat/Mouse Robot Stretching 4")
        costume Mouse_Robot_Intins_5("gallery:Rajzpályázat/Mouse Robot Stretching 5")
        costume Mouse_Robot_Intins_6("gallery:Rajzpályázat/Mouse Robot Stretching 6")
        costume Mouse_Robot_Prinde_Sageata_1("gallery:Rajzpályázat/Mouse Robot Grab Arrow 1")
        costume Mouse_Robot_Prinde_Sageata_2("gallery:Rajzpályázat/Mouse Robot Grab Arrow 2")
        function dance_and_say(message) {
            this.show();
            this.say(message);
            for(let i = 1; i <= 9; i++) {
                this.wait(0.1);
                this.nextCostume();
            }
            this.say("");
            this.hide();
        }
        when stage.started {
            this.size = 25;
            this.setPosition(275, 0);
            this.dance_and_say("Welcome to Yin Yang Wars");
            dance_and_say(concat("The first one to ", concat(win_score + 1, " wins.")));
        }
        when stage.signalReceived("yinWinner") {
            this.dance_and_say(concat("Yin has ", concat(yin_wins, " wins.")));
        }
        when stage.signalReceived("yangWinner") {
            this.dance_and_say(concat("Yang has ", concat(yang_wins, " wins.")));
        }


    }
    
    actor thumbnail {
        costume yinyangwars("user:#####/yinyangwars")
        when stage.started {
            this.size = 43;
            this.goToFront();
            this.hide();
        }
        when stage.keyPressed("0") {
            this.show();
            hideVariable(ref yin);
            hideVariable(ref yang);
            this.wait(1.2);
            this.hide();
            showVariable(ref yin);
            showVariable(ref yang);
        }
    }
}