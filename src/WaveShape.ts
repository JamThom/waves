interface callback {
    (wave: number[]): void
}

export default class waveShape {

    private callbacks: callback[] = [];

    private wave: number[];

    private lastEdited: number;

    private lastIndex: number;

    setShape(x: number, y: number) {
        const index = Math.round(this.wave.length * x);
        if ((Date.now() - this.lastEdited) < 300) {
            const from = Math.min(index, this.lastIndex);
            const to = Math.max(index, this.lastIndex);
            const delta = (to - from);
            for (let i = 0; i < delta; i++) {
                this.wave[from + i] = this.wave[from] + ((this.wave[to] - this.wave[from]) * (i / delta))
            }
        } else {
            this.lastIndex = index;
            this.wave[index] = y;
        }
        this.lastEdited = Date.now();
        this.callbacks.forEach((callback) => callback(this.wave));
    }

    constructor() {
        const waveLength = 1000;
        this.wave = [...new Array(waveLength).fill(0).map((x, i) => (Math.sin((i/waveLength) * Math.PI) + 1) / 2)]
    }

    onUpdate(callback: callback) {
        this.callbacks.push(callback);
        callback(this.wave);
    }

}