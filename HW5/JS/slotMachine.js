$(function(){
    
    function spin(){
        
        var classArray = ['red','white','blue'];
        
        if(balance < 0.05){
            var $quitMsg = $('.quitMsg');
            $quitMsg.html('You do not have enough credits to play. Come back soon!');
            quit();
            return;
        }
        
        if(winCounter > 3){
            nicCageMode = true;
            $('#logo').attr('src','Images/Ghost-Rider.gif');
        }
            
        if(nicCageMode){
           classArray = ['sereneNic','crazedNic','handsomeNic'];
        }
        
        for(i=0;i<3;i++){
        
            var randomNum;
        
            do{
                randomNum = Math.random() * 10;
                randomNum = Math.round(randomNum);
            }while (randomNum == 0 || randomNum > 3);
        
            switch (randomNum){  
                case 1:
                   $slotResults[i].className = classArray[0];
                    break;
                case 2:
                    $slotResults[i].className = classArray[1];
                    break;
                case 3:
                    $slotResults[i].className = classArray[2];
                    break;
                default:
                    break;
            }
        }
        
        if(winCounter > 3){
            nicCageMode = true;
            $('#logo').attr('src','Images/Ghost-Rider.gif');
            $('#spclMsg').html('<br/>You have unlocked NICK CAGE MODE!!!');
    
        }
        
        checkResult(classArray);
        msg='Spin Again'
        $spinBtn.html(msg);       
    }
    
    function checkResult(classArray){
        
        var $spinResultMsg = $('#spinResultMsg');
        var class1 = $slotResults.filter('.' + classArray[0]).length;
        var class2 = $slotResults.filter('.' + classArray[1]).length;
        var class3 = $slotResults.filter('.' + classArray[2]).length;
        
        if(class1 == 3){
            $spinResultMsg.html('Congratulations, you won!');
            updateBalance(0.00);
            winCounter = winCounter + 1;
            return;
        }
        if(class2 == 3){
            $spinResultMsg.html('Congratulations, you won!');
            updateBalance(0.10);
            winCounter = winCounter + 2;
            return;
        }
         if(class3 == 3){
            $spinResultMsg.html('Congratulations, you won!');
            updateBalance(0.15);
            winCounter = winCounter + 3;
            return;
        }
        
        $spinResultMsg.html('Sorry, try again.');
        
        winCounter = 0;
        updateBalance(-0.05);
        
    }
        
    function quit(){
        $('div').fadeOut(600);
        $('#buttons').fadeOut(600);
        $('#balance').fadeOut(600);
        $('#spclMsg').fadeOut(600);
        $('.quitMsg').fadeIn(4000);
        
        
    }
    
    function hover(e){
        
        eventType = e.type;
        
        if(eventType == 'mouseover'){
            $spinBtn.html('Spin Now');
            $spinBtn.toggleClass('hover');
        }
        if(eventType == 'mouseout'){
            $spinBtn.html(msg);
            $spinBtn.toggleClass('hover');
        }   
    }
    
    function updateBalance(spinResult){
        
        balance = balance + spinResult;
        var stringBalance = balance.toFixed(2);
        $balance.html('Balance: $' + stringBalance);       
    }
    
    var balance = 2;
    var $balance = $('#balance');
    updateBalance(0);
    
    var msg ='Spin';
    var $slotResults = $('div#slotResults span');
    
    var winCounter = 0;
    var nicCageMode = false;
    
    var $spinBtn = $('#spinBtn');
    $spinBtn.on('click', spin);
    $spinBtn.on('mouseover', function(e){hover(e)}).on('mouseout', function(e){hover(e)}); 
        
        
    var $quitBtn = $('#quitBtn');
    $quitBtn.on('click', quit);
           
});