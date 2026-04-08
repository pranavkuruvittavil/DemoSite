(function loadCookieYesBanner() {
  if (document.getElementById("cookieyes")) {
    return;
  }

  var script = document.createElement("script");
  script.id = "cookieyes";
  script.type = "text/javascript";
  script.src = "https://cdn-mojoview.uk/client_data/fa11c0ffdf2ba4435fcf2eac97b5836d/script.js";
  document.head.appendChild(script);
})();
