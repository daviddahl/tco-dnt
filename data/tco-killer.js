// Twitter's t.co is a tracking service and 3rd party cookie system. This
// addon replaces all of the t.co links with the original links:)
// Author: David Dahl <ddahl@mozilla.com>

window.addEventListener("load", subTitleForHref, false);

// look for all anchors that use "t.co"
function subTitleForHref()
{
  window.removeEventListener("load", arguments.callee, false);
  var links = document.querySelectorAll(".twitter-timeline-link");
  for (var idx in links) {
    links[idx].href = links[idx].title;
  }
}

// select the target node
var target = document.querySelector('ol#stream-items-id');

// create an observer instance
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (!mutation.addedNodes.length) {
     return;
    }
    for (var i = 0; i < mutation.addedNodes.length; i++) {
      var links =
        mutation.addedNodes.item(i).querySelectorAll(".twitter-timeline-link");
      for (var idx in links) {
        links[idx].href = links[idx].title;
      }
    }
  });
});

// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true };

// pass in the target node, as well as the observer options
observer.observe(target, config);
