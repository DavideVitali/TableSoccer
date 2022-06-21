const loadImage = url => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`warning: loading of image at ${url} has failed`));
    });
};

distance = function (start, end) {
    let d = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
    return d;
}