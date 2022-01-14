interface AnimationLoopConstructor {
    duration: number;
};

export class AnimationLoop {

    playing = false;

    private startTime: number;

    private duration: number;

    private loopCallbacks: ((progress: number) => void)[] = [];

    private playCallbacks: (() => void)[] = [];

    private stopCallbacks: (() => void)[] = [];

    private loop() {
        const progress = ((Date.now() - this.startTime) / this.duration) % 1;
        if (this.playing) {
            this.loopCallbacks.forEach((callback) => callback(progress));
            requestAnimationFrame(() => this.loop());
        }
    }

    constructor({ duration }: AnimationLoopConstructor) {
        this.duration = duration;
    }

    play() {
        if (this.playing === false) {
            this.playCallbacks.forEach((callback) => callback());
            this.startTime = Date.now();
            this.playing = true;
            this.loop();
        }
    }

    stop() {
        if (this.playing === true) {
            this.stopCallbacks.forEach((callback) => callback());
            this.playing = false;
        }
    }

    onStart(callback: () => void) {
        this.playCallbacks.push(callback);
    }

    onStop(callback: () => void) {
        this.stopCallbacks.push(callback);
    }

    onLoop(callback: (progress: number) => void) {
        this.loopCallbacks.push(callback);
    }
}