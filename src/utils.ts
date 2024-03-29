export class Utils {
    static loadImage(url: string) {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`warning: loading of image at ${url} has failed`));
        });
    };
}