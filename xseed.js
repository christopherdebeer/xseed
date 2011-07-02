
var xseed = {
  email: "",
  api: {
    user: {
      login: function () {
      
        // get info from login inputs and submit for authentication
        xseed.email = $("#loginWindow .emailInput").val();
        var password = $("#loginWindow .passwordInput").val();
        $("#loginWindow #loginSubmitButton").val("Checking your details...");
        
        
        $.ajax({
          type: 'POST',
          url: "login.php",
          data: $("#loginForm").serialize(),
          success: function (r) {xseed.api.user.checkLogin(r)}
        });
      
      },
      checkLogin: function (r) {
        
        data = $.parseJSON(r);
        
        if (data.status == "200") {
          // if valid close modal and update interfaces
          $("#loginWindow .feedback").html();
          $("#loginWindow").hide();
          xseed.api.user.userLoggedInState();
          $("#loginWindow #loginSubmitButton").val("Sign in");
        } else {
          // otherwise output error message
          $("#loginWindow .feedback").html(data.message);
          $("#loginWindow #loginSubmitButton").val("Sign in");
        }

      },
      userLoggedInState: function () {
        $(".noUser").hide();
        $(".userLoggedIn").show();
        $("#signupPage").hide();
        $("#notificationsPage").show();
      },
      checkCookie : function () {}
    },
    search : {
      query : "",
      seeds : 0,
      baseURL: "http://query.yahooapis.com/v1/public/yql?q=",
      hasLoaded: {
        tpb: false
      },
      hasLoadedAll: function () {
        
        // if all the torrent modules have loaded, then check if they have results if not display error if so then remove loading icon
        if (  xseed.api.search.hasLoaded.tpb ) {
          $("#searchResults .loading").hide();
          if ($("#searchResults ul").html() == "") {$("#searchResults ul").html("<li class='noResults'>It would seem that your search criteria bore no fruit, try editing your request or perhaps you'd like to <a href='#notify'>set up a Notification</a>, for when this search returns results.</li>")}
        }
      },
      init : function () {
        
        $("#searchForm").addClass("mini");
        xseed.api.search.query = $("#searchForm #queryInput").val();
        xseed.api.search.seeds = $("#searchForm #seedsSelect").val();
        
        
        $("#searchResults ul").html("");
        $("#searchResults").show();
        $("#searchResults .loading").show();
        
        // start search processes
        xseed.api.search.searchTPB(xseed.api.search.query,xseed.api.search.seeds);

      },
      searchTPB: function(query,seeds) {
        
        // start a YQL query of The Pirate Bay
        var yql = xseed.api.search.baseURL + "select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fthepiratebay.org%2Fsearch%2F" + encodeURI(encodeURI(query)) + "%2F0%2F7%2F0%22%20and%0A%20%20%20%20%20%20xpath%3D'%2F%2Ftable%5B%40id%3D%22searchResult%22%5D%2Ftr'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=xseed.api.search.receiveTPB";
        var tpb = document.createElement( 'script' );
        tpb.type = 'text/javascript';
        tpb.src = yql;
        $("body").append( tpb );
        
      },
      receiveTPB: function (e) {
        
        // get torrent readings from The Pirate Bay:
        $("#searchResults").show();
        if (e.query.count > 0) {
          $.each(e.query.results.tr, function (data) {
            seeds = e.query.results.tr[data].td[2].p;
            link = e.query.results.tr[data].td[1].a[0].href;
            title = e.query.results.tr[data].td[1].div.a.content;
            if (parseInt(seeds) >= xseed.api.search.seeds) {
              $("#searchResults ul").append("<li><a class='torrent' href='" + link + "'>" + title + "</a><a href='#' class='info'>info</a><a class='seeds' data-seeds='"+seeds.toString()+"'>"+seeds.toString()+" Seeds</a></li>");
            }
          });
        }
        xseed.api.search.hasLoaded.tpb = true;
        xseed.api.search.hasLoadedAll();
      }
    },
    notify : {
      setUrl : "http://xxx.com",
      deleteUrl : "http://xxx.com",
      setNotification : function (query, seeds) {},
      deleteNotification : function (query, seeds) {}
    }
  },
  init: function () {
    
    // functionality for sign in button - show modal
    $(".loginButton").live("click",function(e) {e.preventDefault();$("#loginWindow").show(); return false;});
    
    // functionality for sign in button - show modal
    $(".closeButton").live("click",function(e) {e.preventDefault();$("#loginWindow").hide().find(".feedback").html(""); return false;});
    
    // functionality for main search button
    $("#searchButton").live("click",function (e) {e.preventDefault();xseed.api.search.init(); return false;});
    
    // login form functionality
    $("#loginSubmitButton").live("click", function(e) {e.preventDefault(); xseed.api.user.login();});
  }
}
