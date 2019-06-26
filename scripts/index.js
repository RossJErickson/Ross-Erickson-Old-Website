var debugMode = true;

$(".arm").click(function() {
    flicker($(this));
    edgeShift($(this));
});

$(".arm").hover(function() {
  outwardShift($(this), true);
  },
  function() {
  outwardShift($(this), false);
  }
);

$(document).click(function(){
  clickedElement = $(".clicked");
  if(clickedElement.length != 0) {
    edgeShift(clickedElement);
  }
});


function dL(output) {
  if(debugMode == true) {
    console.log(output);
  }
}

function displaySubpage(target) {
  target.removeClass("hideaway");
  target.addClass("visible");
  target.removeClass("invisible", 300);
  fixSafariSubpage(target.children(0));
}

function fixSafariSubpage(target) {
  target.width(target.width()-100);
  setTimeout(function() {
    target.removeAttr("style");
  }, 10
  );
}

function hideSubpage(target, callbackFunction) {
  target.removeClass("visible");
  target.addClass("invisible", 300, function(){
    target.addClass("hideaway");
    if (typeof(callbackFunction) == "function") {
      callbackFunction();
    }
    }
  );
}

function edgeShift(target) {
  var targetClass;
  var timeDelay = 300;
  if ($(window).width() <= 1024) {
    timeDelay = 5;
  }
  if (target.hasClass("upper-left-arm")) {
    targetClass = "upper-left-arm";
  } else if (target.hasClass("upper-right-arm")) {
    targetClass = "upper-right-arm";
  } else if (target.hasClass("lower-right-arm")) {
    targetClass = "lower-right-arm";
  } else if (target.hasClass("lower-left-arm")) {
    targetClass = "lower-left-arm";
  }
  if (!target.hasClass(targetClass + "-clicked")) {
    target.addClass(targetClass + "-clicked", timeDelay, function() {
      target.addClass("clicked");
      displaySubpage( $("#" + target.attr("data-subpage")) );
      }
    );
  } else {
    target.removeClass("clicked");
    target.attr("data-disabled", "true");
    hideSubpage($("#" + target.attr("data-subpage")), function() {
      target.removeClass(targetClass + "-clicked", timeDelay, function(){
        target.attr("data-disabled", "false");
        }
      );
      }
    );
    setTimeout(function() {
      target.removeClass(targetClass + "-hovered");
      }, timeDelay
    );
  }
}

function flicker(target) {
  target.addClass("pressed");
  setTimeout(function(){
      target.removeClass("pressed");
    }, 100
  );
}

function outwardShift(target, outwards) {
  if (target.queue("fx").length > 2) {
    target.queue("fx", target.queue("fx").slice(0, target.queue("fx").length - 2));
  }
  var targetClass;
  if (target.hasClass("upper-left-arm")) {
    targetClass = "upper-left-arm-hovered";
  } else if (target.hasClass("upper-right-arm")) {
    targetClass = "upper-right-arm-hovered";
  } else if (target.hasClass("lower-right-arm")) {
    targetClass = "lower-right-arm-hovered";
  } else if (target.hasClass("lower-left-arm")) {
    targetClass = "lower-left-arm-hovered";
  }
  if (outwards && target.attr("data-disabled") != "true") {
    target.addClass(targetClass, 300);
  } else if (!outwards) {
    target.removeClass(targetClass, 300);
  }
}
