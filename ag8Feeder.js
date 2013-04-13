(function() {
  var Feeder, entry_number, format_date, selector, template;

  entry_number = 5;

  selector = ".feed";

  template = "<h1><a href=\"${url}\">${title}</a></h1>\n{{each entries}}\n   <li><a href=\"${link}\">${title}</a> - ${pubDate}</li>\n{{/each}}";

  google.load("feeds", "1");

  format_date = function(date_string) {
    var date, dd, mm, yy;

    date = new Date(date_string);
    yy = date.getYear();
    if (yy < 2000) {
      yy += 1900;
    }
    mm = date.getMonth() + 1;
    dd = date.getDate();
    return "" + yy + "-" + mm + "-" + dd;
  };

  Feeder = (function() {
    function Feeder($this) {
      this.$this = $this;
    }

    Feeder.prototype.render = function() {
      var feed, feedURL, that;

      feedURL = this.$this.data('url');
      feed = new google.feeds.Feed(feedURL);
      feed.setNumEntries(entry_number);
      that = this;
      return feed.load(function(result) {
        if (!result.error) {
          return that.render_html(result.feed);
        }
      });
    };

    Feeder.prototype.render_html = function(feed) {
      var html;

      $(feed.entries).each(function() {
        return this.pubDate = format_date(this.publishedDate);
      });
      html = $.tmpl(template, {
        title: feed.title,
        url: feed.link,
        entries: feed.entries
      });
      return this.$this.append($(html));
    };

    return Feeder;

  })();

  (function($) {
    return window.google.setOnLoadCallback(function() {
      return $(selector).each(function() {
        return new Feeder($(this)).render();
      });
    });
  })(jQuery);

}).call(this);
