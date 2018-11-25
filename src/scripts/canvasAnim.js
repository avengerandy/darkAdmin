import chtImagePromise from "./chtImage";
import '../css/chtCanvas.scss';
const ratio = 9/16;
const center = 900-606;
let onAnim = false;
let chtNumber = 1;
let newChtNumber = 1;
let bgNumber = 1;
let chtImage = {};
let nowPos = 900-606;
let prevPos = -1212;
let nextPos = 1800;
let slide = null;

window.requestAnimFrame = function(){
    return (
        window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();

let chtCanvas = document.getElementsByClassName("chtCanvas")[0];
let canvasContext = chtCanvas.getContext("2d");
chtCanvas.setAttribute("width", 1800);
chtCanvas.setAttribute("height", 1800 * ratio);

function resetPos() {
    nowPos = 900-606;
    prevPos = -1212;
    nextPos = 1800;
    slide = null;
}

function resizeRatio() {
    chtCanvas.style.height = chtCanvas.clientWidth * ratio + "px";  
}

function print() {
    canvasContext.drawImage(chtImage[`bg0${bgNumber}`], 0, 0, 1800, 1212);
    switch (slide) {
        case "next":
            nextPos -= 30;
            nowPos -= 30;
            if(nextPos < center) nextPos = center;
            canvasContext.drawImage(chtImage[`cht0${newChtNumber}`], nextPos, -100, 1212, 1212);
            canvasContext.drawImage(chtImage[`cht0${chtNumber}`], nowPos, -100, 1212, 1212);
            if (nextPos == center) {
                resetPos();
                onAnim = false;
                chtNumber = newChtNumber;
            }
            break;
        case "prev":
            prevPos += 30;
            nowPos += 30;
            if(prevPos > center) prevPos = center;
            canvasContext.drawImage(chtImage[`cht0${newChtNumber}`], prevPos, -100, 1212, 1212);
            canvasContext.drawImage(chtImage[`cht0${chtNumber}`], nowPos, -100, 1212, 1212);
            if (prevPos == center) {
                resetPos();
                onAnim = false;
                chtNumber = newChtNumber;
            }
            break;
        default:
            canvasContext.drawImage(chtImage[`cht0${chtNumber}`], 900-606, -100, 1212, 1212);
            break;
    }
    if (!onAnim) return;
    requestAnimFrame(print);
}

chtImagePromise.then((completeChtImage) => {
    chtImage = completeChtImage;
    resizeRatio();
    print();
    window.addEventListener("resize", () => {
        resizeRatio();
    });
    document.getElementsByClassName("bgChange")[0].addEventListener("click", () => {
        if (++bgNumber > 3) bgNumber = 1;
        if (!onAnim) print();
    });
    document.getElementsByClassName("next")[0].addEventListener("click", () => {
        if (onAnim) return;
        onAnim = true;
        newChtNumber = chtNumber;
        slide = "next";
        if (++newChtNumber > 9) newChtNumber = 1;
        print();
    });
    document.getElementsByClassName("prev")[0].addEventListener("click", () => {
        if (onAnim) return;
        onAnim = true;
        newChtNumber = chtNumber;
        slide = "prev";
        if (--newChtNumber < 1) newChtNumber = 9;
        print();
    });
}).catch((error) => {console.error(error)});
