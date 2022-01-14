import styles from './styles.css';
const cursorImage = require('./cursor.png');
console.log(cursorImage);


export default class PenCursor {

    private ele: HTMLElement;
    
    private onMousemove: (e: MouseEvent) => void;

    constructor() {
        this.ele = document.createElement('div');
        this.ele.classList.add(styles.pen);
        this.ele.classList.add(styles.hidden);
        this.ele.style.backgroundImage = `url('${cursorImage.default}')`
        this.onMousemove = ((e: MouseEvent) => {
            this.ele.style.top = `${e.clientY}px`;
            this.ele.style.left = `${e.clientX}px`;
        }).bind(this);
        document.body.append(this.ele);
    }

    show() {
        this.ele.classList.remove(styles.hidden);
        document.addEventListener('mousemove', this.onMousemove);
        document.body.style.cursor = 'none';
    }

    hide() {
        document.removeEventListener('mousemove', this.onMousemove);
        document.body.style.cursor = '';
        this.ele.classList.add(styles.hidden);
    }

}