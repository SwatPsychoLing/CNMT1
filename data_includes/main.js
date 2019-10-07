PennController.ResetPrefix(null)
//PennController.DebugOff()
PennController.Sequence( "consent" , "intro" , "preload" , randomize("experiment") , "questions" , "send" , "final" )
var showProgressBar = false;

PennController( "consent" ,
    defaultText
        .print()
    ,
    newHtml("consent", "consent.html")
        .print()
    ,
    newButton("Continue")
        .print()
        .wait()
)

PennController( "intro" ,
    newHtml("instructions", "instructions.htm")
        .print()
    ,
    newText("<p>Please enter your Prolific ID and then click the button below to start the experiment.</p>")
    ,
    newTextInput("ID")
        .print()
    ,
    newButton("Start")
        .print()
        .wait()
    ,
    newVar("ID")
        .settings.global()
        .set( getTextInput("ID") )
)
.log( "ID" , getVar("ID") )

PennController.CheckPreloaded("experiment").label("preload")

PennController( "questions" ,
    newDropDown("mouse", "Select")
        .settings.add( "mouse" , "trackpad", "other") 
        .print()
        .settings.log()
    ,
    newText("Did you use a mouse or a trackpad (as on a laptop) during this experiment? &nbsp;")
        .settings.after( getDropDown("mouse") )
        .print()
    ,
    newDropDown("age", "Select")
        .settings.add("18-24", "25-34", "35-44" ,"45-54", "55-64", "65-74", "75 or older")
        .settings.log()
    ,
    newText("How old are you? &nbsp;")
        .settings.after( getDropDown("age") )
        .print()
    ,
    newDropDown("nativeEng", "Select")
        .settings.add("yes", "no")
        .settings.log()
    ,
    newText("Are you a native English speaker? &nbsp;")
        .settings.after( getDropDown("nativeEng") )
        .print()
    ,
    newText("If not in English, what is your native language?")
        .print()
    ,
    newTextInput("nativeLang", "")
        .settings.log()
        .settings.lines(0)
        .settings.size(200, 20)
        .print()
    ,
    newText("At what age did you begin learning English? If you're a native speaker, enter 0.")
        .print()
    ,        
    newTextInput("ageEng", "")
        .settings.log()
        .settings.lines(0)
        .settings.size(200, 20)
        .print()
    ,
    newText("What do you think this study is about?")
        .print()
    , 
    newTextInput("studyPurpose", "")
        .settings.log()
        .settings.lines(4)
        .settings.size(400, 60)
        .print()
    ,
    newText("Did you have any technical issues throughout the experiment? If so, please explain.")
        .print()
    , 
    newTextInput("issues", "")
        .settings.log()
        .settings.lines(4)
        .settings.size(400, 60)
        .print()
    ,
    newText("Do you have any other comments?")
        .print()
    , 
    newTextInput("comments", "")
        .settings.log()
        .settings.lines(4)
        .settings.size(400, 60)
        .print()
    ,
    newText("<p><p>")
        .print()
    , 
    newButton("Finish")
        .print()
        .wait()
)

PennController.SendResults( "send" )

PennController( "final" ,
    newText("<p>Thank you for your participation!</p>")
        .print()
    ,
    newText("<p><a href='https://www.put.your/platform/confirmation/link.here'>Click here to validate your participation.</a></p>")
        .print()
    ,
    newButton("void")
        .wait()
)

PennController.Template( 
  variable => PennController( "experiment" ,
    newImage("1", variable.Image1)
        .settings.size(200,200)
    ,
    newImage("2", variable.Image2)
        .settings.size(200,200)
    ,
    newImage("3", variable.Image3)
        .settings.size(200,200)
    ,
    newImage("4", variable.Image4)
        .settings.size(200,200)
    ,
    newCanvas("images", 1400, 200)
        .settings.center()
        .settings.add(0   , 0 , getImage("1") )
        .settings.add(200 , 0 , getImage("2") )
        .settings.add(1000 , 0 , getImage("3") )
        .settings.add(1200, 0 , getImage("4") )
        .print()
    ,
    newAudio("description", variable.AudioFile)
    ,
    newVar("isEarly", 0)
    ,
    newTooltip("earlyWarning", "STARTED TOO EARLY. You moved your mouse from the Go button before it was possible to guess the correct option. Please don't move your mouse until you're about to click.")
        .settings.position("top center")
    ,
    newVar("isLate", 0)
    ,
    newTooltip("lateWarning", "STARTED TOO LATE. You waited a bit too long to start moving your mouse. Try to start moving your mouse before the audio is completely over.")
        .settings.position("top center")
    ,
    newVar("slowClick", 0)
    ,
    newTooltip("slowClickWarning", "CLICKED TOO LATE. You took too long to click on your selection. Please try to click quicker next time!")
        .settings.position("top center")
    ,
    newTimer(1500) // 1500 ms to preview images
        .start()
        .wait()
    ,
    newButton("Go")
        .print( "center at 50vw" , "center at 90vh" )
        .wait()
        .remove()
    ,
    newTimer("earlyStart", variable.NPTime)
    ,
    newTimer("timeLimit", 5000)
    ,
    newMouseTracker("mouse")
        .settings.log()
        .settings.callback( getTimer("earlyStart").test.running().success(getVar("isEarly").set(1)) )
        .settings.callback( getAudio("description").test.hasPlayed().success(getVar("isLate").set(1)) )
        .settings.callback( getTimer("timeLimit").test.ended().success(getVar("slowClick").set(1)) )
        .start()
    ,
    getAudio("description")
        .play()
    ,
    getTimer("earlyStart").start()
    ,
    getTimer("timeLimit").start()
    ,
    newSelector()
        .settings.add( getImage("1") , getImage("2") , getImage("3") , getImage("4"))
        .settings.log()
        .wait()
    ,
    getAudio("description")
        .stop()
    ,
    getMouseTracker("mouse")
        .stop()
    ,
    getVar("isEarly")
        .test.is(1).success(getTooltip("earlyWarning").print().wait())
    ,
    getVar("isLate")
        .test.is(1).success(getTooltip("lateWarning").print().wait())
    ,
    getVar("slowClick")
        .test.is(1).success(getTooltip("slowClickWarning").print().wait())
  )
  .log( "ID"     , getVar("ID")    )
  .log( "Target"   , variable.TargetLocation  )
  .log( "TrialType" , variable.TrialType )
  .log( "EarlyStartMessage" , getVar("isEarly") )
  .log( "LateStartMessage" , getVar("isLate") )
  .log( "TooSlowClickMessage" , getVar("slowClick") )
)
