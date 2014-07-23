**Text Scroll Panel**
=================

The demo @ http://gregscharf.com is displaying customer testimonials in the footer.

Features:
- Plugin to add blocks of scrolling text, html or images.
- Blocks scroll (up or down) via a timer or optional buttons.

Tasks:
- [x] Adjust panel height and max block height on window resize for responsize sites.
- [ ] Add horizontal scrolling option
- [ ] User defined buttons
- [ ] Move setup of html blocks out of plugin setup and into html (?)
- [ ] Code optimization.
- [ ] CSS transitions.

Setup:

**Include in head block**
```html
    <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css">
    <link rel="stylesheet"  href='scrolltext.css' />
```

**Include the panel somewhere in the body of your document**
```html
      <div id='scroll_pane_1'>
      </div>
```

**include script and plugin initialization before end body tag**

```javascript

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src ='jquery.scrolltext.js'></script>
    <script>
    $(document).ready(function(){
        $('#scroll_pane_1').scrolltext({
            textDisplayDuration: 8000,
            minPanelHeight: 35, /*if using the nav buttons it's best to set this 35 pixels high at a minimum*/
            scrollSpeed: 700, 
            pauseOnHover: true,
            scrollDirection: 'down', /*options are 'up' and 'down'*/
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
