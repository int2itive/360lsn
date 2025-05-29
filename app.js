const main = document.querySelector('.ll-header');
let threshold = 30;
let hiddenState = "-hidden", nav_dark = "page-header";
let linkSections = document.querySelectorAll('.css-8trac');
let links = document.querySelectorAll('.link--sections .link a');
const anchorLinks = document.querySelectorAll('a[href*="#"]');
//get site domain
const domain = window.location.hostname;

var threshold = 30,
  uBound = 7, 
  position = 0, 
  lastScroll = 0, 
  n_event = 0;


window.addEventListener("scroll", function () {
    var position = window.scrollY || document.documentElement.scrollTop;
    
    if (position > threshold && position > lastScroll) {
      main.classList.add(hiddenState);
    } else {
      main.classList.remove(hiddenState);
      if (window.scrollY > 40) {
        main.classList.add(nav_dark);
      } else {
        main.classList.remove(nav_dark);
      }
    }

    lastScroll = position <= 0 ? 0 : position;

  });

/*
   @param pos: the y-position to scroll to (in pixels)
   @param time: the exact amount of time the scrolling will take (in milliseconds)
*/
function scrollToSmoothly(pos, time) {
    let currentPos = window.pageYOffset;
    let start = null;
    if(time == null) time = 500;
    pos = +pos, time = +time;
    window.requestAnimationFrame(function step(currentTime) {
        start = !start ? currentTime : start;
        let progress = currentTime - start;
        if (currentPos < pos) {
            window.scrollTo(0, ((pos - currentPos) * progress / time) + currentPos);
        } else {
            window.scrollTo(0, currentPos - ((currentPos - pos) * progress / time));
        }
        if (progress < time) {
            window.requestAnimationFrame(step);
        } else {
            window.scrollTo(0, pos);
        }
    });
}

if (anchorLinks) {
  anchorLinks.forEach(link => {
    let hostname = link.getAttribute('href').split('/')[2];
    //check if link is to current site
    if (hostname && hostname === domain) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        let href = link.getAttribute('href');
        let url = new URL(href);
        target = document.getElementById(url.hash.replace('#', ''));
        if (target) {
          console.log(target);
          scrollToSmoothly(target, 1000);
        }
      });
    }
  });
}

linkSections.forEach((link) => {
  let articles = link.querySelectorAll('.util-article');
  if (articles[0] !== undefined) { 
    // console.log(typeof articles[0]);
    let m = articles[0].parentNode.offsetTop;
    // console.log(m);
  }
  // 
  // let rec = articles[0].getBoundingClientRect();
//   console.log(articles[0].children.length);
});

let markdownString =
  '[JavaScript Pro Tips With CSS](https://medium.com/@kaklotarrahul79/14-javascript-pro-tips-with-css-fa1185b6f126)';

let re =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)$/;

let result = re.test(markdownString);
