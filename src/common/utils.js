export default {
    px2rem(pxv) {
        return `${parseInt(pxv) / 75}rem`;
    },
    getDpr() {
        let dpr = window.devicePixelRatio;
        const isIPhone = window.navigator.appVersion.match(/iphone/gi);
        if(dpr > 3) dpr = 3;
        if(!isIPhone) dpr = 1;
        return dpr;
    },
    getFontSize(fspx) {
        const dpr = this.getDpr();
        return `${fspx * dpr}px`;
    }
}