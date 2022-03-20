interface callback {
    (wave: number[]): void
}

interface WaveShapeConstructor {
    wave: number[]
}

export default class WaveShape {

    private wave: number[];

    private lastEdited: number;

    private lastIndex: number;

    private callbacks: callback[] = [];

    getWave(): number[] {
        return this.wave;
    }

    setShape(x: number, y: number): number[] {
        const index = Math.round(this.wave.length * x);
        if (this.wave[index] === y || index >= this.wave.length) return this.wave;
        this.wave[index] = y;
        if ((Date.now() - this.lastEdited) < 300) {
            const from = Math.min(index, this.lastIndex);
            const to = Math.max(index, this.lastIndex);
            const delta = (to - from);
            for (let i = 0; i < delta; i++) {
                this.wave[from + i] = this.wave[this.lastIndex] + ((y - this.wave[this.lastIndex]) * (1 - (i / delta)))
            }
        }
        this.lastIndex = index;
        this.lastEdited = Date.now();
        this.callbacks.forEach((callback) => callback(this.wave));
        return this.wave;
    }

    onSetShape(callback: callback): void {
        this.callbacks.push(callback);
    }

    constructor({ wave }: WaveShapeConstructor) {
        this.wave = wave
    }

}