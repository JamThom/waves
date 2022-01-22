import styles from './styles.css';
const cursorImage = require('./cursor.png');
console.log(cursorImage);


class PenCursor {

    private ele: HTMLElement;
    
    private onMousemove: (e: MouseEvent) => void;

    constructor() {
    }
    
    init() {
        this.ele = document.createElement('div');
        this.ele.setAttribute('class', styles.dot);
        this.ele.style.backgroundImage = `url('${cursorImage.default}')`
        this.onMousemove = ((e: MouseEvent) => {
            this.ele.style.top = `${e.clientY}px`;
            this.ele.style.left = `${e.clientX}px`;
        }).bind(this);
        document.addEventListener('mousemove', this.onMousemove);
        document.body.style.cursor = 'none';
        document.body.append(this.ele);
    }

    setPenMode() {
        this.ele.setAttribute('class', styles.pen);
    }

    setHoverMode() {
        this.ele.setAttribute('class', styles.hover);
    }

    reset() {
        this.ele.setAttribute('class', styles.dot);
    }

}

export default new PenCursor();