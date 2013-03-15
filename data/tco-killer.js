// Twitter's t.co is a tracking service and 3rd party cookie system. This
// addon replaces all of the t.co links with the original links:)
// Author: David Dahl <ddahl@mozilla.com>

console.log("tco-killer.js loaded...");

// look for all anchors that use "t.co"
function fixLinks() {
  var links = document.querySelectorAll(".twitter-timeline-link");
  console.log("links...");
  console.log(links);
  for (var idx in links) {
    if (!links[idx].title) {
      continue;
    }
    links[idx].href = links[idx].title;
  }
}

fixLinks();

window.setTimeout(fixLinks, 5000);

// select the target node
var target = document.querySelector('ol#stream-items-id');

// create an observer instance
var observer = new MutationObserver(function(mutations) {
  console.log("mutations!");
  console.log(mutations)
  mutations.forEach(function(mutation) {
    if (!mutation.addedNodes.length) {
     return;
    }
    for (var i = 0; i < mutation.addedNodes.length; i++) {
      var links =
        document.querySelectorAll(".twitter-timeline-link");
        // mutation.addedNodes.item(i).querySelectorAll(".twitter-timeline-link");
      for (var idx in links) {
        if (!links[idx].title) {
          continue;
        }
        links[idx].href = links[idx].title;
      }
    }
  });
});

// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true };

// pass in the target node, as well as the observer options
observer.observe(target, config);
