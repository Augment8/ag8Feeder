entry_number = 5;
selector = ".feed"
template = """
<h1><a href=\"${url}\">${title}</a></h1>
{{each entries}}
   <li><a href=\"${link}\">${title}</a> - ${pubDate}</li>
{{/each}}
"""

google.load("feeds", "1")

format_date = (date_string) ->
  date = new Date date_string
  yy = date.getYear()
  yy += 1900 if yy < 2000
  mm = date.getMonth() + 1
  dd = date.getDate()
  "#{yy}-#{mm}-#{dd}"

class Feeder
  constructor: (@$this) ->

  render: ->
    feedURL = @$this.data 'url'
    feed = new google.feeds.Feed feedURL
    feed.setNumEntries entry_number
    that = this
    feed.load (result) ->
      if !result.error
        that.render_html result.feed

  render_html: (feed) ->
    $(feed.entries).each ->
      this.pubDate = format_date(this.publishedDate)
    html = $.tmpl template,
      title: feed.title
      url: feed.link
      entries: feed.entries
    @$this.append $(html)

do ($=jQuery) ->
  window.google.setOnLoadCallback ->
    $(selector).each ->
      new Feeder($(this)).render()
