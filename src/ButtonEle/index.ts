import styles from './styles.css';

export default class Button {

    private active = false;

    ele: HTMLButtonElement;

    constructor({ onToggle }: { onToggle: (active: boolean) => void }) {
        this.ele = document.createElement('button');
        this.ele.classList.add(styles.button);
        const dot = document.createElement('div');
        dot.classList.add(styles.dot);
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
    }

    appendTo(target: HTMLElement) {
        target.append(this.ele);
    }
}