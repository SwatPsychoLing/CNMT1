PennController.ResetPrefix(null)
PennController.DebugOff()
PennController.Sequence( "consent" , "intro" , "preload" , randomize("experiment") , "send" , "final" )
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


PennController.Template( 
  variable => PennController( "experiment" ,
    newButton("Go")
        .print( "center at 50vw" , "center at 90vh" )
        .wait()
        .remove()
    ,
    newMouseTracker("mouse")
        .settings.log()
        .start()
    ,
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
    newTimer(1200)
        .start()
        .wait()
    ,
    newAudio("description", variable.AudioFile)
        .play()
    ,
    newSelector()
        .settings.add( getImage("1") , getImage("2") , getImage("3") , getImage("4"))
        .settings.log()
        .wait()
    ,
    getMouseTracker("mouse")
        .stop()
    //,
    //getAudio("description")
    //   .wait("first")
  )
  .log( "ID"     , getVar("ID")    )
  .log( "Target"   , variable.TargetLocation  )
  .log( "TrialType" , variable.TrialType )
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
