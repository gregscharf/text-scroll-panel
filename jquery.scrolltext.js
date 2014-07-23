(function ($) {
    $.fn.scrolltext = function(options){

        var defaults = {
          textDisplayDuration   : 5000,
          scrollSpeed           : 1000,
          scrollDirection       : 'down',
          afterSetupFunction    : null,
          pauseOnHover          :  true,
          minBlockHeight        :  40,
          verticalAlign         :  "none",
          horizontalAlign       :  "left",
          isResponsive          :  true,
          showButtons           :  true
        }

        var settings = $.extend({}, defaults, options);

        var scrollMultiplier = settings.scrollDirection === 'down' ? -1 : 1;
        var totalBlocks;
        var currentBlock = {};
        var nextBlock = {};
        var blockArray = [];
        var scrollDistance;
        var maxBlockHeight = settings.minBlockHeight;
        var scrollTimer;
        var resizeTimer;
        var scrolling = false;
        var inHover = false;
        var scrollContainer = $(this);
        var scrollPanel;


        init();
        
        function init(){
            console.log(settings);

            if(settings.isResponsive)
                $(window).resize(adjustScrollPanelHeight);  

            scrollPanel = $("<div class='scroll_panel'></div>");
            if(settings.showButtons) {
                scrollPanel.append("<i class='icon-chevron-up scroll_up'></i><i class='icon-chevron-down scroll_down'></i>");
            }
            scrollContainer.append(scrollPanel);
       
            createBlocks();            
        }


        function adjustScrollPanelHeight(){
            clearScrollTimer();
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(adjustParameters, 500);
        };

        $(window).focus(function(){
            createScrollTimer();
        });
        $(window).blur(function(){
            clearScrollTimer();
        });

        if(settings.pauseOnHover) {
           scrollPanel.hover(function(){
                clearScrollTimer();
                inHover = true;
           },
           function(){
                inHover = false;
                createScrollTimer();
           }
           ); 
        }

        scrollPanel.children('.scroll_up').click(function(){
            if(scrolling)
                return;
            clearScrollTimer();
            if(settings.scrollDirection === 'up')
                scrollBlocks();
            else
                reverseScrollBlocks('up');
        });

        scrollPanel.children('.scroll_down').click(function(){
            if(scrolling)
                return;
            clearScrollTimer();
            if(settings.scrollDirection === 'down')
                scrollBlocks();
            else
                reverseScrollBlocks('down');
        });

        function createBlocks() {
            totalBlocks = settings.htmlBlocks.length;
            for(var i = 0; i < totalBlocks; i++ ){
                var newBlock = $('<div class="text_block">' + settings.htmlBlocks[i] + '</div>');
                scrollPanel.append(newBlock);
                blockArray.push({block: $(newBlock), id: i});
                var image = newBlock.find('img');
                if(image.length !== 0) {
                    image.load(function() {
                        adjustParameters();
                    });
                }
                var height = $(newBlock).height();
                if(height > maxBlockHeight) 
                    maxBlockHeight = height;
            }

            var textBlock = scrollPanel.children('.text_block');
            textBlock.css('text-align', settings.horizontalAlign);
            switch(settings.verticalAlign) {
                case "top":
                    textBlock.addClass('v_align_block');
                    textBlock.find('>:first-child').addClass('v_align_child_top');
                    break;
                case "center":
                    textBlock.addClass('v_align_block');
                    textBlock.find('>:first-child').addClass('v_align_child_middle');
                    break;
                case "bottom":
                    textBlock.addClass('v_align_block');
                    textBlock.find('>:first-child').addClass('v_align_child_bottom');
                    break;
                case "none":
                    break;
            }
            setParameters(blockArray[0], blockArray[1]);
        }

        function createScrollTimer() {
            if(!scrollTimer && !inHover && !scrolling){
                scrollTimer = setTimeout(scrollBlocks, settings.textDisplayDuration);
            }
        }

        function clearScrollTimer (){
            clearTimeout(scrollTimer);
            scrollTimer = null;
        }

        function adjustParameters(){
            if(scrolling)
                adjustScrollPanelHeight();

            maxBlockHeight = settings.minBlockHeight;
            clearScrollTimer();
            for(var i = 0; i < totalBlocks; i++ ){
                var height = blockArray[i].block.height();
                if(height > maxBlockHeight) 
                    maxBlockHeight = height;
            }
            scrollPanel.children('.text_block').css('top', "1000px");
            setParameters(currentBlock, nextBlock);
        }

        function scrollBlocks() {
            scrolling = true;
            scrollCurrentBlock();
            scrollNextBlock();
        }

        function reverseScrollBlocks(direction){
            var currentId = currentBlock.id;
            //get previous block
            if(currentId === 0) {
                nextBlock = blockArray[totalBlocks - 1];
            } else {
                nextBlock = blockArray[currentId - 1];
            }

            if(direction === 'up') {
                scrollDistance = "-=" + maxBlockHeight;
            }else{
                scrollDistance = "+=" + maxBlockHeight;
            }
            var multiplier = direction === 'down' ? -1 : 1;
            $(nextBlock.block).css('top', maxBlockHeight*multiplier + 'px');
            scrollBlocks();
            //restore the original scroll direction
            if(settings.scrollDirection === 'up') {
                scrollDistance = "-=" + maxBlockHeight;
            }else{
                scrollDistance = "+=" + maxBlockHeight;
            }
        }   

        function setParameters(cBlock, nBlock) {
            scrollPanel.css('height', maxBlockHeight + 'px');
            currentBlock = cBlock;
            $(currentBlock.block).css('top', '0px');                                
            nextBlock = nBlock;
            $(nextBlock.block).css('top', maxBlockHeight + "px");

            if(settings.scrollDirection === 'up') {
                scrollDistance = "-=" + maxBlockHeight;
            }else{
                scrollDistance = "+=" + maxBlockHeight;
            }
            $(nextBlock.block).css('top', maxBlockHeight*scrollMultiplier + 'px');
            scrollPanel.children('.text_block').css('visibility', 'visible');                                
            createScrollTimer(); 
            if(settings.afterSetupFunction)
                settings.afterSetupFunction();
        }



        function scrollCurrentBlock(){
          $(currentBlock.block).animate({"top":scrollDistance},{
            duration: settings.scrollSpeed,
            easing: "linear",
            complete:function(){

            }                            
          });
        }

        function scrollNextBlock(){
          $(nextBlock.block).animate({"top":scrollDistance},{
            duration: settings.scrollSpeed,
            easing: "linear",
            complete:function(){
                currentBlock = nextBlock;
                var nextId = nextBlock.id + 1;
                if(nextId === totalBlocks)
                    nextId = 0;
                nextBlock = blockArray[nextId];
                $(nextBlock.block).css('top', maxBlockHeight*scrollMultiplier + "px");
                scrolling = false;
                scrollTimer = null;
                createScrollTimer();
            }                            
          });
        }
    };
    
})(jQuery);   
            
