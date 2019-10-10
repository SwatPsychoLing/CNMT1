PennController.ResetPrefix(null)
PennController.DebugOff()
PennController.PreloadZip("https://continf.s3.amazonaws.com/ibexitems.zip");
PennController.Sequence( "consent" , "intro" , "preload" , "start_prac" , randomize("practice") , "end_prac" , rshuffle("critical", "filler", "contrast filler", "critical competitor") , "questions" , "send" , "final" )
var showProgressBar = false;

PennController( "consent" ,
    defaultText
        .print()
    ,
    newHtml("consent", "consent.html")
        .print()
    ,
    newButton("<p>I consent and am ready to continue.")
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

PennController( "start_prac" ,
    newHtml("practice_intro", "practice.htm")
        .print()
    ,
    newButton("<p>Start")
        .print()
        .wait()
)

PennController( "end_prac" ,
    newHtml("practice_end", "endpractice.htm")
        .print()
    ,
    newButton("<p>Start")
        .print()
        .wait()
)

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
    newText("How old are you? &nbsp;")
        .print()
    ,
    newTextInput("age", "")
        .settings.log()
        .settings.lines(0)
        .settings.size(50, 20)
        .print()
    ,
    newText("At what age did you begin learning English? If you're a native speaker, please enter 0.")
        .print()
    ,        
    newTextInput("ageEng", "")
        .settings.log()
        .settings.lines(0)
        .settings.size(50, 20)
        .print()
    ,
    newText("If not English, what is your dominant language?")
        .print()
    ,
    newTextInput("nativeLang", "")
        .settings.log()
        .settings.lines(0)
        .settings.size(50, 20)
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

