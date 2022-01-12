import styles from './styles.css';

export default class Button {

    ele: HTMLButtonElement;

    constructor() {
        this.ele = document.createElement('button');
        this.ele.classList.add(styles.button);
    }

    appendTo(target: HTMLElement) {
        target.append(this.ele);
    }
}