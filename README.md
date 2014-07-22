**Text Scroll Panel**
=================
Features:
- Plugin to add blocks of scrolling text, html or images.
- Blocks scroll (up or down) via a timer or optional buttons.

Tasks:
- [x] Responsively adjust panel on window resize.
- [ ] Add horizontal scrolling option
- [ ] User defined buttons
- [ ] Move setup of html blocks out of plugin setup and into html (?)

Setup:
```

<!--In <head> block-->
    <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css">
    <link rel="stylesheet"  href='scrolltext.css' />


<!-- Include the panel somewhere within the <body> of your document. -->
      <div id='scroll_pane_1'>
      </div>

<!--include script and plugin initialization before end body tag -->
    <script src ='jquery.scrolltext.js'></script>
    <script>
    $(document).ready(function(){
        $('#scroll_pane_1').scrolltext({
            textDisplayDuration: 8000,
            minPanelHeight: 35,
            scrollSpeed: 700, 
            scrollDirection: 'down', 
            showButtons: true,
            htmlBlocks: [
                "<h2 style='width: 100%; text-align: center;'>This is an Image</h2><img src='../images/logo_2.JPG'>",
                "<img src='../images/logo_fin.png'>",
                "Just plain text without html",
                "<p>This is the third block</p>"
            ]
        });
    });
    </script>
</body>    
```
