var stringsTiming;
var stringsPause;
var content;
var section;

$(document).ready(function(){
    stringsTiming = 3000;
    stringsPause = 1000;
    content = $(".hidden-section>div").html();
    section = $(".visible-section").html(content).attr("class", "visible-section col-center padding-bottom");
});

function playAnimation(){
    $(".second", section).addClass("show");
    $(".second-typed-string", section).typed({
        strings: ["MwalimuOnline"],
        typeSpeed: 100,
        startDelay: 1000,
        preStringTyped: function() {
            $(".second-typed-string", section).addClass("highlighted")
        }
    });
}

function playBottomAnimation(){
    $(".second", section).delay(0).queue(function(next){
        $(".first", section).addClass("show")
        next();
    }).delay(200).queue(function(next){
          $(".first-typed-string", section).addClass("highlighted")
        next();
    }).delay(200).queue(function(next){
          $('.first-typed-string').typeIt({
            speed: 100,
            lifeLike: false,
            autoStart: true,
              startDelete: true
          })
          .tiType('Login')
          .tiPause(stringsPause);
        next();
    }).delay(200).queue(function(next){
          $(".third-typed-string", section).addClass("highlighted")
        next();
    }).delay(stringsTiming).queue(function(next){
        $(".third", section).addClass("show");
          $('.third-typed-string').typeIt({
            speed: 100,
            lifeLike: false,
            autoStart: false
          })
          .tiType('As a Teacher.')
          .tiPause(stringsPause)
        next();
    }).delay(stringsTiming).queue(function(next){
          $('.third-typed-string').typeIt({
            speed: 100,
            lifeLike: false,
            autoStart: false,
              html: true
          })
          .tiType('As a School Entity.')
          .tiPause(stringsPause)
        next();
    }).delay(stringsTiming).queue(function(next){
          $('.third-typed-string').typeIt({
            speed: 70,
            lifeLike: false,
            autoStart: false,
            html: true,
            callback: playBottomAnimation
            })
         next(); 
    })
}
    


