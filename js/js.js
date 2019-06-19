
/* Banner state change */
$(window).scroll(function() { /* tells the browser to do something during scroll */
	"use strict";
    var scroll = $(this).scrollTop(); /* set the scroll */
    if (scroll >= 120) { /* sets pixel height for scroll to activate */
        $("#banner").addClass("is-stuck"); /* add class after scrolling x height */
    } 
	else {
        $("#banner").removeClass("is-stuck"); /* removes class to return to original state */
    }
});


/* Sidebar sticky on scroll */

/* define the length in order to offset the scroll from the top. */
var length = $('#right').height() - $('#sidebar').height() + $('#right').offset().top; 

$(window).scroll(function () {
    "use strict";
    var scroll = $(this).scrollTop(); /* set scroll */
    var height = $('#sidebar').height() + 'px'; /* define the height (in px) of the sidebar */
    var offsetBanner = $('#banner').height() + 'px'; /* pays attention to the banner height */
    /* var offsetNum = 60; /* [Optional] set the number offset. replace with offsetBanner if used */
    
    if (scroll < $('#right').offset().top) { /* element default state */
        $('#sidebar').css({
            'position': 'absolute',
            'top': '0',
            'height': height
        });
    }
    else if (scroll > length) { /* need to move element when it hits the footer */
        $('#sidebar').css({
            'position': 'absolute',
            'bottom': '0',
            'top': 'auto'
        });
    } 
    else {
        $('#sidebar').css({
            'position': 'fixed', /* fix position of sidebar after scroll */
            'top': offsetBanner, /* top position from the banner height. this can be a number as well */
            'height': height /* callback the height var so it is not huge when we scroll back */
        });
    }
});

/* Go to Top button */
$(document).ready(function(){
    $(window).scroll(function(){ 
        if ($(this).scrollTop() > 500) { /* show the button when user scrolls down 500px*/
            $('#toTop').fadeIn(); /* fade in effect when user scrolls down*/
        }
        else { 
            $('#toTop').fadeOut(); /* fade out when user is at the top */
        } 
    }); 
    $('#toTop').click(function(){ /* user must click the button to make it work! */
        $("html, body").animate({ scrollTop: 0 }, 600); /* Animate scroll effect to 600 milliseconds. */
    }); 
});


/* Popup/Cookie warning. Comment out for it to appear again. localhost may make it disappear after refresh */
$(document).ready(function() {
    if(localStorage.getItem('popState') != 'shown'){ /* If the state has never been shown, we show it */
        $("#cookieConsent").delay(500).fadeIn(); /* pop message up.*/
        localStorage.setItem('popState','shown') /* put the shown state into local storage */
    }
    $('#cookieClose').click(function(e) { /* Clicking the close button */
        $('#cookieConsent').fadeOut(); /* Message is now hidden */
    });
});


/* IP address validator */
(function () {
    function getValidIP(str) {
        const result = [];  /* reserved for resulting arrays */
        const length = str.length; /* used to check the length of the input value */

        check(0, 0, ''); /* find out if the argument is empty or not */

        function check(start, level, previous){ /* function check to see if the value is valid */
            let i = 0;
            let num;

            if (level === 3) {
                num = str.substring(start);
                if (num && num < 256) { /* need to make sure that numbers are lower than 256 (not part of IPv4) */
                    result.push(`${previous}.${num}`); /* push results into the reserved array */
                }
                return;
            }
            
            num = str.substring(start, start + 1);
            
            if (num == 0) { /*  */
                check(start + 1, level + 1, level === 0 ? `${num}`: `${previous}.${num}`);
            } 
            
            else { 
                while (num.length < 4 && num < 256 && start + i + 1 < length) { /* running this until IP is false  */
                    check(start + i + 1, level + 1, level === 0 ? `${num}`: `${previous}.${num}`);
                    i++;
                    num = str.substring(start, start + i + 1);
                }
            }
        }

        return result;
    
    }
    
    document.getElementById("myForm").addEventListener('submit', functSubmit); /* need to listen for the submit button click within the form */
    function functSubmit(event) {
        var ipValue = document.getElementById("myText").value; /* gets the value of the text being input */
        
        if (getValidIP(ipValue).length >= 2) { /* any array length of 2 valid IP addresses or more  */
            document.getElementById('someResult').innerHTML = 'Multi Values: ' + getValidIP(ipValue);
        }
        else if (getValidIP(ipValue).length == 1) { /* array length 1 IP address only  */
            document.getElementById('someResult').innerHTML = 'Value is: ' + getValidIP(ipValue);
        }
        else { /* all invalid IP arrays are valued at 0 */
            document.getElementById('someResult').innerHTML = 'Value is: INVALID';
        }
        event.preventDefault() /* prevent the form from default submission so we stay on the page */
    }    
    
    console.log(ipValue)
    console.time('1-1');
    console.log(getValidIP(ipValue));
    console.timeEnd('1-1');
    
})();










/*
function isValidIpv4Addr(ip) {
  return /^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/.test(ip);
}
var testAddr = ['192.68.35.35','0.0.0.0','255.0.0.0','192.168.1.0','192.168.0.1','255.255.255.0','1.1.1.1','255.255.255.255','249.249.249.249','200.200.200.200','199.199.199.199','100.100.100.100','99.99.99.99','0.0.0.0','9.9.9.9','10.10.10.10','99.99.99.99','100.100.100.100','109.109.109.109','110.110.110.110','199.199.199.199','200.200.200.200','249.249.249.249','250.250.250.250','255.255.255.255','256.256.256.260','192.168.0.0/24','192.168..1','192.168.1','1','1.','1.1','1.1.','1.1.1','1.1.1.','1.1.1.1.','1.1.1.1.1','.1.1.1.1','01.01.01.01','09.09.09.09','1.0.0.1.0','010.1.1.1','123456','123123123123','.127.0.0.1'];
for (var i = 0; i < testAddr.length; i++) {
  document.getElementById('ipv4tests').innerHTML += '<li>' + testAddr[i] + ' ' + (isValidIpv4Addr(testAddr[i]) ? '<font color="green">VALID!</font>' : '<font color="red">INVALID!</font>') + '</li>';
}
*/
