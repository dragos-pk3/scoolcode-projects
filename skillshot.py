stage:
    backdrop Metal_Panel_Mixed_Green_Glow("gallery:Misc_Universe/Metal Panel Mixed Green Glow")
    default backdrop Top_Down_Forest_Summer("gallery:Nature/Top Down Forest Summer")
    HighScore = [  ]
    time = "0:00"
    timer = 0
    gameOn = True

    def ReturnMinutes():
        if timer % 60 < 10: 
            return concat("0", timer % 60)
        else: 
            return timer % 60


    def restart():
        timer = 0
        gameOn = True
        Player.targetX = 0
        Player.targetY = 0
        Player.show()
        Player.goTo(Position.center)
        GameOver.hide()
        RestartButton.hide()
        broadcast("StartTimer")
        Player.isDefeated = False

    when started:
        showVariable(ref time)
        broadcast("StartTimer")

    when signalReceived("StartTimer"):
        while gameOn: 
            time = concat(Math.floor(timer / 60), concat(":", ReturnMinutes()))
            wait(1)
            timer += 1

    when keyPressed("shift"):
        if isKeyPressed("q") and isKeyPressed("t"): 
            Cover.show()

    actor Player:
        costume Yellow_Robot_Player_Idle("gallery:Aliens_Universe/Yellow Robot Player Idle")
        costume Yellow_Robot_Player_Walk_1("gallery:Aliens_Universe/Yellow Robot Player Walk 1")
        costume Yellow_Robot_Player_Walk_2("gallery:Aliens_Universe/Yellow Robot Player Walk 2")
        costume Yellow_Robot_Player_Walk_3("gallery:Aliens_Universe/Yellow Robot Player Walk 3")
        costume Yellow_Robot_Player_Walk_4("gallery:Aliens_Universe/Yellow Robot Player Walk 4")
        costume Yellow_Robot_Player_Shoot_Walk_1("gallery:Aliens_Universe/Yellow Robot Player Shoot Walk 1")
        costume Yellow_Robot_Player_Shoot_Walk_2("gallery:Aliens_Universe/Yellow Robot Player Shoot Walk 2")
        costume Yellow_Robot_Player_Shoot_Walk_3("gallery:Aliens_Universe/Yellow Robot Player Shoot Walk 3")
        costume Yellow_Robot_Player_Shoot_Walk_4("gallery:Aliens_Universe/Yellow Robot Player Shoot Walk 4")
        costume Yellow_Robot_Player_Run_1("gallery:Aliens_Universe/Yellow Robot Player Run 1")
        costume Yellow_Robot_Player_Run_2("gallery:Aliens_Universe/Yellow Robot Player Run 2")
        costume Yellow_Robot_Player_Run_3("gallery:Aliens_Universe/Yellow Robot Player Run 3")
        costume Yellow_Robot_Player_Run_4("gallery:Aliens_Universe/Yellow Robot Player Run 4")
        costume Yellow_Robot_Player_Shoot_Run_1("gallery:Aliens_Universe/Yellow Robot Player Shoot Run 1")
        costume Yellow_Robot_Player_Shoot_Run_2("gallery:Aliens_Universe/Yellow Robot Player Shoot Run 2")
        costume Yellow_Robot_Player_Shoot_Run_3("gallery:Aliens_Universe/Yellow Robot Player Shoot Run 3")
        costume Yellow_Robot_Player_Shoot_Run_4("gallery:Aliens_Universe/Yellow Robot Player Shoot Run 4")
        costume Yellow_Robot_Player_Fly_1("gallery:Aliens_Universe/Yellow Robot Player Fly 1")
        costume Yellow_Robot_Player_Fly_2("gallery:Aliens_Universe/Yellow Robot Player Fly 2")
        costume Yellow_Robot_Player_Jump_1("gallery:Aliens_Universe/Yellow Robot Player Jump 1")
        costume Yellow_Robot_Player_Jump_2("gallery:Aliens_Universe/Yellow Robot Player Jump 2")
        costume Yellow_Robot_Player_Jump_3("gallery:Aliens_Universe/Yellow Robot Player Jump 3")
        costume Yellow_Robot_Player_Jump_4("gallery:Aliens_Universe/Yellow Robot Player Jump 4")
        costume Yellow_Robot_Player_Push_1("gallery:Aliens_Universe/Yellow Robot Player Push 1")
        costume Yellow_Robot_Player_Push_2("gallery:Aliens_Universe/Yellow Robot Player Push 2")
        costume Yellow_Robot_Player_Push_3("gallery:Aliens_Universe/Yellow Robot Player Push 3")
        costume Yellow_Robot_Player_Throw_1("gallery:Aliens_Universe/Yellow Robot Player Throw 1")
        costume Yellow_Robot_Player_Throw_2("gallery:Aliens_Universe/Yellow Robot Player Throw 2")
        costume Yellow_Robot_Player_Throw_3("gallery:Aliens_Universe/Yellow Robot Player Throw 3")
        costume Yellow_Robot_Player_Throw_4("gallery:Aliens_Universe/Yellow Robot Player Throw 4")
        costume Yellow_Robot_Player_Slide_1("gallery:Aliens_Universe/Yellow Robot Player Slide 1")
        costume Yellow_Robot_Player_Slide_2("gallery:Aliens_Universe/Yellow Robot Player Slide 2")
        costume Yellow_Robot_Player_Slide_3("gallery:Aliens_Universe/Yellow Robot Player Slide 3")
        costume Yellow_Robot_Player_Crouch("gallery:Aliens_Universe/Yellow Robot Player Crouch")
        costume Yellow_Robot_Player_Fall("gallery:Aliens_Universe/Yellow Robot Player Fall")
        costume Yellow_Robot_Player_Defend("gallery:Aliens_Universe/Yellow Robot Player Defend")
        costume Yellow_Robot_Player_Hurt("gallery:Aliens_Universe/Yellow Robot Player Hurt")
        costume Yellow_Robot_Player_Knocked_Out_1("gallery:Aliens_Universe/Yellow Robot Player Knocked Out 1")
        costume Yellow_Robot_Player_Knocked_Out_2("gallery:Aliens_Universe/Yellow Robot Player Knocked Out 2")
        IdleAnimation = [ Yellow_Robot_Player_Idle ]
        WalkAnimation = [ Yellow_Robot_Player_Idle, Yellow_Robot_Player_Shoot_Walk_1, Yellow_Robot_Player_Shoot_Walk_2, Yellow_Robot_Player_Shoot_Walk_3, Yellow_Robot_Player_Shoot_Walk_4 ]
        RunAnimation = [ Yellow_Robot_Player_Run_1, Yellow_Robot_Player_Run_2, Yellow_Robot_Player_Run_3, Yellow_Robot_Player_Run_4 ]
        HurtAnimation = [ Yellow_Robot_Player_Hurt, Yellow_Robot_Player_Idle ]
        KnockedAnimation = [ Yellow_Robot_Player_Idle, Yellow_Robot_Player_Knocked_Out_1, Yellow_Robot_Player_Knocked_Out_2 ]
        FlyAnimation = [ Yellow_Robot_Player_Fly_1, Yellow_Robot_Player_Fly_2 ]
        ShootRunAnimation = [ Yellow_Robot_Player_Shoot_Run_1, Yellow_Robot_Player_Shoot_Run_2, Yellow_Robot_Player_Shoot_Run_3, Yellow_Robot_Player_Shoot_Run_4 ]
        JumpAnimation = [ Yellow_Robot_Player_Jump_1, Yellow_Robot_Player_Jump_2, Yellow_Robot_Player_Jump_3, Yellow_Robot_Player_Jump_4 ]
        moving = False
        isDefeated = False
        abilityOnCooldown = False
        dashOnCooldown = False
        targetX = x
        targetY = y
        targetPos = [  ]
        moveSpeed = 5

        def AbilityCooldownTimer():
            wait(1.5)
            abilityOnCooldown = False

        def DashCooldownTimer():
            wait(5)
            dashOnCooldown = False

        def PlayAnimation(animationList):
            for frame in animationList: 
                setCostume(frame)
                wait(0.1)

        def lerp(targetX, targetY, speed):
            dx = targetX - x
            dy = targetY - y
            distance = Math.sqrt(dx * dx + dy * dy)
            if distance < speed or distance == 0: 
                return [ targetX, targetY ]
            newX = x + speed * dx / distance
            newY = y + speed * dy / distance
            return [ newX, newY ]

        when keyPressed("q"):
            if not abilityOnCooldown and not isDefeated: 
                abilityOnCooldown = True
                createClone(Projectile)
                AbilityCooldownTimer()

        when keyPressed("d"):
            if not dashOnCooldown and not isDefeated: 
                dashOnCooldown = True
                broadcast("PlayDash")
                move(120)
                DashCooldownTimer()

        when started:
            show()
            goTo(Position.center)
            moving = False
            isDefeated = False
            size = 20
            rotationStyle = "leftRight"
            while True: 
                if Pointer.isDown and gameOn: 
                    targetX = Pointer.x
                    targetY = Pointer.y
                    pointTowards(Pointer.position)
                    moving = True
                    broadcast("PlayAnimation")
                if moving: 
                    targetPos = lerp(targetX, targetY, moveSpeed)
                    setPosition(targetPos[0], targetPos[1])
                    if Math.abs(targetX - x) < 1 and abs(targetY - y) < 1: 
                        setPosition(targetX, targetY)
                        moving = False
                if touchingActorOrClone(Fireball) or touchingActorOrClone(Enemy): 
                    hide()
                    isDefeated = True
                    gameOn = False
                    deleteAllClonesOf(Projectile)
                    deleteAllClonesOf(Enemy)
                    deleteAllClonesOf(Fireball)
                    GameOver.show()
                    RestartButton.show()
                wait(0.05)

        when signalReceived("PlayAnimation"):
            while True: 
                if moving and not isDefeated: 
                    PlayAnimation(RunAnimation)
                else: 
                    PlayAnimation(IdleAnimation)


    actor Projectile:
        costume Comet_Fly_5("gallery:Galaxy/Comet Fly 5")
        costume Comet_Fly_4("gallery:Galaxy/Comet Fly 4")
        costume Comet_Fly_3("gallery:Galaxy/Comet Fly 3")
        costume Comet_Fly_2("gallery:Galaxy/Comet Fly 2")
        costume Comet_Fly_1("gallery:Galaxy/Comet Fly 1")
        sound Laser_shot_2("gallery:Effects/Laser shot 2")
        sound Laser_shot_1("gallery:Effects/Laser shot 1")

        when started:
            size = 15
            hide()
            rotationStyle = "allAround"

        when cloned:
            playSound(Laser_shot_2)
            heading = Player.heading
            goTo(Player)
            show()
            for i in range(0, 7): 
                if touching(Edge.any): 
                    deleteClone()
                else: 
                    move(25)
                    wait(0.05)

            deleteClone()

        when cloned:
            goAfter(Player)
            while True: 
                nextCostume()
                wait(0.1)

        when dataReceived("DeleteProjectileClone"):
            if cloneId == event.data: 
                deleteClone()

    actor Enemy:
        costume Skeleton_Warrior_Basic_Walk_1("gallery:Monsters/Skeleton Warrior Basic Walk 1")
        costume Skeleton_Warrior_Basic_Walk_2("gallery:Monsters/Skeleton Warrior Basic Walk 2")
        costume Skeleton_Warrior_Basic_Walk_3("gallery:Monsters/Skeleton Warrior Basic Walk 3")
        costume Skeleton_Warrior_Basic_Walk_4("gallery:Monsters/Skeleton Warrior Basic Walk 4")
        costume Skeleton_Warrior_Basic_Walk_5("gallery:Monsters/Skeleton Warrior Basic Walk 5")
        costume Skeleton_Warrior_Basic_Walk_6("gallery:Monsters/Skeleton Warrior Basic Walk 6")
        costume Skeleton_Warrior_Basic_Walk_7("gallery:Monsters/Skeleton Warrior Basic Walk 7")
        costume Skeleton_Warrior_Knight_Walk_1("gallery:Monsters/Skeleton Warrior Knight Walk 1")
        costume Skeleton_Warrior_Knight_Walk_2("gallery:Monsters/Skeleton Warrior Knight Walk 2")
        costume Skeleton_Warrior_Knight_Walk_3("gallery:Monsters/Skeleton Warrior Knight Walk 3")
        costume Skeleton_Warrior_Knight_Walk_4("gallery:Monsters/Skeleton Warrior Knight Walk 4")
        costume Skeleton_Warrior_Knight_Walk_5("gallery:Monsters/Skeleton Warrior Knight Walk 5")
        costume Skeleton_Warrior_Knight_Walk_6("gallery:Monsters/Skeleton Warrior Knight Walk 6")
        costume Skeleton_Warrior_Pirate_Walk_1("gallery:Monsters/Skeleton Warrior Pirate Walk 1")
        costume Skeleton_Warrior_Pirate_Walk_2("gallery:Monsters/Skeleton Warrior Pirate Walk 2")
        costume Skeleton_Warrior_Pirate_Walk_3("gallery:Monsters/Skeleton Warrior Pirate Walk 3")
        costume Skeleton_Warrior_Pirate_Walk_4("gallery:Monsters/Skeleton Warrior Pirate Walk 4")
        costume Skeleton_Warrior_Pirate_Walk_5("gallery:Monsters/Skeleton Warrior Pirate Walk 5")
        costume Skeleton_Warrior_Pirate_Walk_6("gallery:Monsters/Skeleton Warrior Pirate Walk 6")
        costume Skeleton_Warrior_Pirate_Walk_7("gallery:Monsters/Skeleton Warrior Pirate Walk 7")
        costume Skeleton_Warrior_Viking_Walk_1("gallery:Monsters/Skeleton Warrior Viking Walk 1")
        costume Skeleton_Warrior_Viking_Walk_2("gallery:Monsters/Skeleton Warrior Viking Walk 2")
        costume Skeleton_Warrior_Viking_Walk_3("gallery:Monsters/Skeleton Warrior Viking Walk 3")
        costume Skeleton_Warrior_Viking_Walk_4("gallery:Monsters/Skeleton Warrior Viking Walk 4")
        costume Skeleton_Warrior_Viking_Walk_5("gallery:Monsters/Skeleton Warrior Viking Walk 5")
        costume Skeleton_Warrior_Viking_Walk_6("gallery:Monsters/Skeleton Warrior Viking Walk 6")
        costume Skeleton_Warrior_Viking_Walk_7("gallery:Monsters/Skeleton Warrior Viking Walk 7")
        offset = 10

        def PlayAnimation(animationList):
            for frame in animationList: 
                setCostume(frame)
                wait(0.1)

        when started:
            setPosition(-450, 0)
            hide()
            size = 25
            rotationStyle = "leftRight"
            while True: 
                wait(randrange(2, 3.5))
                if not Player.isDefeated: 
                    createClone(Enemy)

        when cloned:
            show()
            side = randrange(0, 3, 1)
            if side == 0: 
                setPosition(-320 - offset, randrange(-180, 180, 1))
            if side == 1: 
                setPosition(320 + offset, randrange(-180, 180, 1))
            if side == 2: 
                setPosition(randrange(-320, 320, 1), 180 + offset)
            if side == 3: 
                setPosition(randrange(-320, 320, 1), -180 - offset)
            while True: 
                if touchingActorOrClone(Projectile): 
                    broadcastData("DeleteProjectileClone", Projectile.cloneId)
                    deleteClone()
                pointTowards(Player)
                move(2)
                wait(0.05)

        when cloned:
            choice = randrange(0, 4)
            BasicSkeleton = [ Skeleton_Warrior_Basic_Walk_1, Skeleton_Warrior_Basic_Walk_2, Skeleton_Warrior_Basic_Walk_3, Skeleton_Warrior_Basic_Walk_4, Skeleton_Warrior_Basic_Walk_5, Skeleton_Warrior_Basic_Walk_6, Skeleton_Warrior_Basic_Walk_7 ]
            KnightSkeleton = [ Skeleton_Warrior_Knight_Walk_1, Skeleton_Warrior_Knight_Walk_2, Skeleton_Warrior_Knight_Walk_3, Skeleton_Warrior_Knight_Walk_4, Skeleton_Warrior_Knight_Walk_5, Skeleton_Warrior_Knight_Walk_6 ]
            PirateSkeleton = [ Skeleton_Warrior_Pirate_Walk_1, Skeleton_Warrior_Pirate_Walk_2, Skeleton_Warrior_Pirate_Walk_3, Skeleton_Warrior_Pirate_Walk_4, Skeleton_Warrior_Pirate_Walk_5, Skeleton_Warrior_Pirate_Walk_6, Skeleton_Warrior_Pirate_Walk_7 ]
            VikingSkeleton = [ Skeleton_Warrior_Viking_Walk_1, Skeleton_Warrior_Viking_Walk_2, Skeleton_Warrior_Viking_Walk_3, Skeleton_Warrior_Viking_Walk_4, Skeleton_Warrior_Viking_Walk_5, Skeleton_Warrior_Viking_Walk_6, Skeleton_Warrior_Viking_Walk_7 ]
            while True: 
                if choice == 0: 
                    PlayAnimation(BasicSkeleton)
                if choice == 1: 
                    PlayAnimation(KnightSkeleton)
                if choice == 2: 
                    PlayAnimation(PirateSkeleton)
                if choice == 3: 
                    PlayAnimation(VikingSkeleton)

    actor Fireball:
        costume Fireball_Fly_1("gallery:Effects/Fireball Fly 1")
        costume Fireball_Fly_2("gallery:Effects/Fireball Fly 2")
        costume Fireball_Fly_3("gallery:Effects/Fireball Fly 3")
        costume Fireball_Fly_4("gallery:Effects/Fireball Fly 4")
        offset = 10

        when started:
            setPosition(-450, 0)
            hide()
            size = 40
            rotationStyle = "allAround"
            while True: 
                wait(randrange(1, 5))
                if not Player.isDefeated: 
                    createClone(Fireball)

        when cloned:
            show()
            side = randrange(0, 3, 1)
            if side == 0: 
                setPosition(-320 - offset, randrange(-180, 180, 1))
            if side == 1: 
                setPosition(320 + offset, randrange(-180, 180, 1))
            if side == 2: 
                setPosition(randrange(-320, 320, 1), 180 + offset)
            if side == 3: 
                setPosition(randrange(-320, 320, 1), -180 - offset)
            pointTowards(Player)
            while True: 
                move(9)
                wait(0.05)

        when cloned:
            while True: 
                nextCostume()
                wait(0.1)

    actor Cover:
        costume Cover("user:user/Cover")

        when started:
            size = 37
            hide()

    actor GameOver:
        costume Game_Over_Button_Light_Creepy("gallery:Games/Game Over Button Light Creepy")

        when started:
            hide()

    actor Blast_Green:
        costume Blast_Green_Blast_1("gallery:Effects_Universe/Blast Green Blast 1")
        costume Blast_Green_Blast_2("gallery:Effects_Universe/Blast Green Blast 2")
        costume Blast_Green_Blast_3("gallery:Effects_Universe/Blast Green Blast 3")
        costume Blast_Green_Blast_4("gallery:Effects_Universe/Blast Green Blast 4")
        costume Blast_Green_Blast_5("gallery:Effects_Universe/Blast Green Blast 5")
        costume Blast_Green_Blast_6("gallery:Effects_Universe/Blast Green Blast 6")
        costume Blast_Green_Blast_7("gallery:Effects_Universe/Blast Green Blast 7")
        costume Blast_Green_Blast_8("gallery:Effects_Universe/Blast Green Blast 8")
        costume Blast_Green_Blast_9("gallery:Effects_Universe/Blast Green Blast 9")
        costume Blast_Green_Blast_10("gallery:Effects_Universe/Blast Green Blast 10")
        costume Blast_Green_Blast_11("gallery:Effects_Universe/Blast Green Blast 11")
        sound Laser_shot_1("gallery:Effects/Laser shot 1")
        AnimationList = [ Blast_Green_Blast_1, Blast_Green_Blast_2, Blast_Green_Blast_3, Blast_Green_Blast_4, Blast_Green_Blast_5, Blast_Green_Blast_6, Blast_Green_Blast_7, Blast_Green_Blast_8, Blast_Green_Blast_9, Blast_Green_Blast_10, Blast_Green_Blast_11 ]

        def PlayAnimation(animationList):
            for frame in animationList: 
                setCostume(frame)
                wait(0.1)

        when started:
            hide()
            size = 50

        when signalReceived("PlayDash"):
            goTo(Player)
            show()
            playSound(Laser_shot_1)
            PlayAnimation(AnimationList)
            hide()

    actor RestartButton:
        costume Restart_Button_Light_Creepy("gallery:Games/Restart Button Light Creepy")

        when started:
            hide()
            size = 80
            setPosition(0, -80)

        when pointerOut:
            size = 80

        when pointerOver:
            size = 90

        when clicked:
            restart()