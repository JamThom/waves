import penCursor from '../PenCursor';
import styles from './styles.css';

const makeEle = (type: string, attrs: { [key: string]: any }) => {
    const ele = document.createElement(type);
    for (let key in attrs) {
        ele.setAttribute(key, attrs[key]);
    }
    return ele;
}

export default class Button {

    private active = false;

    ele: HTMLElement;

    constructor({ onToggle, icons }: { onToggle: (active: boolean) => void, icons: string[] }) {
        this.ele = makeEle('button', { class: styles.button });
        const dot = makeEle('div', { class: styles.dot });
        const iconOn = makeEle('i', { class: `${styles.icon} ${icons[0]}` });
        const iconOff = makeEle('i', { class: `${styles.icon} ${icons[1]}` });
        this.ele.append(iconOn);
        this.ele.append(iconOff);
        this.ele.append(dot);
        this.ele.addEventListener('click',() => {
            this.active = !this.active;
            onToggle(this.active);
            if (this.active) {
                this.ele.classList.add(styles.active);
            } else {
                this.ele.classList.remove(styles.active);
            }
        });
        this.ele.addEventListener('mouseenter', () => penCursor.setHoverMode());
        this.ele.addEventListener('mouseleave', () => penCursor.reset());
    }

    appendTo(target: HTMLElement) {
        target.append(this.ele);
    }
}