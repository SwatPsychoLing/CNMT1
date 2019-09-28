PennController.ResetPrefix(null)

PennController.Sequence( "welcome" , "preload", randomize("experiment") , "send" , "final" )

PennController( "welcome" ,
    defaultText
        .print()
    ,
    newHtml("instructions", "instructions.htm")
            .print()
    ,
    newText("<p>Please enter your ID and then click the button below to start the experiment.</p>")
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
    newImage("one", variable.Image1)
        .settings.size(200,200)
    ,
    newImage("two", variable.Image2)
        .settings.size(200,200)
    ,
    newImage("three", variable.Image3)
        .settings.size(200,200)
    ,
    newImage("four", variable.Image4)
        .settings.size(200,200)
    ,
    newCanvas("images", 1200, 200)
        .settings.add(0   , 0 , getImage("one") )
        .settings.add(200 , 0 , getImage("two") )
        .settings.add(800 , 0 , getImage("three") )
        .settings.add(1000, 0 , getImage("four") )
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
        .settings.add( getImage("two") , getImage("one") , getImage("three") , getImage("four"))
        //.shuffle()
        .settings.log()
        .wait()
    ,
    getMouseTracker("mouse")
        .stop()
    ,
    getAudio("description")
       .wait("first")
    ,
    newTimer(500)
        .start()
        .wait()
  )
  .log( "ID"     , getVar("ID")    )
  //.log( "Item"   , variable.Item   )
  //.log( "Ending" , variable.Ending )
  //.log( "Group"  , variable.Group  ) TODO: can probably group by layout for easier analysis
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