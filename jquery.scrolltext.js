(function ($) {
    $.fn.scrolltext = function(options){
        var textDisplayDuration = options.textDisplayDuration || 4000;
        var scrollSpeed = options.scrollSpeed || 1000;
        var scrollDirection = options.scrollDirection || 'down';
        var scrollMultiplier = scrollDirection === 'down' ? -1 : 1;
        var afterSetupFunction = options.afterSetupCallback || null;   
        var pauseOnHover = options.pauseOnHover || false;
        var showButtons = options.showButtons || false;
        var minBlockHeight = options.minPanelHeight || 40;
        var totalBlocks;
        var currentBlock = {};
        var nextBlock = {};
        var blockArray = [];
        var scrollDistance;
        var maxBlockHeight = minBlockHeight;
        var scrollTimer;
        var resizeTimer;
        var scrolling = false;
        var inHover = false;
        var scrollContainer = $(this);
        var scrollPanel;

        init();
        
        function init(){
            scrollPanel = $("<div class='scroll_panel'></div>");
            if(showButtons) {
                scrollPanel.append("<i class='icon-chevron-up scroll_up'></i><i class='icon-chevron-down scroll_down'></i>");
            }
            scrollContainer.append(scrollPanel);
       
            createBlocks();            
        }

        $(window).resize(onResize);  

        function onResize(){
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

        console.log(pauseOnHover);
        if(pauseOnHover) {
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
            if(scrollDirection === 'up')
                scrollBlocks();
            else
                reverseScrollBlocks('up');
        });

        scrollPanel.children('.scroll_down').click(function(){
            if(scrolling)
                return;
            clearScrollTimer();
            if(scrollDirection === 'down')
                scrollBlocks();
            else
                reverseScrollBlocks('down');
        });

        function createBlocks() {
            totalBlocks = options.htmlBlocks.length;
            for(var i = 0; i < totalBlocks; i++ ){
                var newBlock = $('<div class="text_block">' + options.htmlBlocks[i] + '</div>');
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

            scrollPanel.children('.text_block').css('top', "10000px");
            setParameters(blockArray[0], blockArray[1]);
        }

        function createScrollTimer() {
            if(!scrollTimer && !inHover && !scrolling){
                scrollTimer = setTimeout(scrollBlocks, textDisplayDuration);
            }
        }

        function clearScrollTimer (){
            clearTimeout(scrollTimer);
            scrollTimer = null;
        }

        function adjustParameters(){
            if(scrolling)
                onResize();

            maxBlockHeight = minBlockHeight;
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
            if(scrollDirection === 'up') {
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

            if(scrollDirection === 'up') {
                scrollDistance = "-=" + maxBlockHeight;
            }else{
                scrollDistance = "+=" + maxBlockHeight;
            }
            $(nextBlock.block).css('top', maxBlockHeight*scrollMultiplier + 'px');
            scrollPanel.children('.text_block').show();                                
            createScrollTimer(); 
            if(afterSetupFunction)
                afterSetupFunction();
        }



        function scrollCurrentBlock(){
          $(currentBlock.block).animate({"top":scrollDistance},{
            duration: scrollSpeed,
            easing: "linear",
            complete:function(){

            }                            
          });
        }

        function scrollNextBlock(){
          $(nextBlock.block).animate({"top":scrollDistance},{
            duration: scrollSpeed,
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
            
