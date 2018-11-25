let chtImage = {};

export default new Promise((resolve, reject) => {
    let completeCount = 0;
    function complete(count) {
        if (count < 12) return;
        resolve(chtImage);
    }
    for (let i = 1; i <= 9; i++) {
        let tempImage = new Image();
        tempImage.src = `./images/cht0${i}.png`;
        tempImage.onload = () => {complete(++completeCount);};
        tempImage.onerror = (error) => {reject(error);};
        chtImage[`cht0${i}`] = tempImage;
    }
    for (let i = 1; i <= 3; i++) {
        let tempImage = new Image();
        tempImage.src = `./images/bg0${i}.png`;
        tempImage.onload = () => {complete(++completeCount);};
        tempImage.onerror = (error) => {reject(error);};
        chtImage[`bg0${i}`] = tempImage;
    }
});
