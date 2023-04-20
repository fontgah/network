function isPersian(str) {

    var persianArabicRegex = /[\u0600-\u06FF\u0750-\u077F]/g;
    var matches = str.match(persianArabicRegex);

    if (matches) {
        var percentage = (matches.length / str.length) * 100;
        if (percentage > 50) {
            return true
        }
    }
    return false

}


function setItems() {


    $(".items-center .group.w-full").each(function() {

        let pList = $(this).find("p,ol,ul")
        let streaming = $(this).find(".result-streaming")

        if (pList.length) {


            let backD = false
            pList.each(function() {


                $(this).p
                if (!$(this).hasClass("AsOk") || streaming.length) {
                    $(this).addClass('AsOk');


                    if ($(this).prop('nodeName') === "P") {

                        const text = $(this).text()

                        if (isPersian(text)) {
                            $(this).addClass('AsRtl');
                            $(this).addClass('FontSet');
                            backD = true
                        } else {
                            backD = false
                        }

                    } else {
                        if (backD) {
                            $(this).addClass('AsRtl');
                            $(this).addClass('FontSet');
                        }
                    }

                }
            });

        } else {

            const D = $(this).find(".items-start")


            if (!D.hasClass("AsOk") || streaming.length) {
                D.addClass('AsOk');

                const text = D.text()

                if (isPersian(text)) {
                    D.addClass('AsRtl');
                    D.addClass('FontSet');
                }

            }


        }


    });


}


$(document).ready(function() {

    setInterval(() => {

        setItems()


        if (chrome.runtime?.id) {

            const alisaffari = chrome.runtime.getURL('images/alisaffari-72.png')
            const fontiran = chrome.runtime.getURL('images/fontiran-72.png')
            if (!$("main .absolute .text-center").hasClass("AsOk")) {
                $("main .absolute .text-center").addClass("AsOk")
                $("main .absolute .text-center").append(`<div class="AsRtl FontSet AsBox">
                راستچین شده با عشق توسط 
                
                <a href="https://github.com/ali-saffari" target="_blank"><img src="
${alisaffari}" alt="ali saffari"></a>
                جان گرفته با
               
                 <a href="https://fontiran.com/">
                
              <img src="${fontiran}" target="_blank" alt="font iran"></a>
            </div>`)


            }

        }

        if (!$(".items-center .w-full").hasClass("AsOk")) {
            $(".items-center .w-full").addClass("AsOk")

            $(".items-center .w-full").change(function(index) {
                console.log("items-center .w-full for .change() called.");
                setItems()
            });

        }

        if (!$("textarea").hasClass("AsOk")) {
            $("textarea").addClass("AsOk")

            $("textarea").change(function(index) {
                console.log("textarea change");

            });

            $("textarea").keypress(function() {
                console.log("textarea keypress");

                const text = $("textarea").text()

                if (isPersian(text)) {
                    if (!$("textarea").hasClass("AsRtl")) {
                        $(this).addClass('AsRtl');
                        $(this).addClass('FontSet');
                    }
                } else {
                    if ($("textarea").hasClass("AsRtl")) {
                        $(this).removeClass('AsRtl');
                        $(this).removeClass('FontSet');
                    }
                }


            });

        }


    }, 1000)


});