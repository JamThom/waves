interface AnimationLoopConstructor {
    duration: number;
};

export class AnimationLoop {

    playing = false;

    private startTime: number;

    private duration: number;

    private loopCallbacks: ((progress: number) => void)[] = [];

    private loop() {
        const progress = ((Date.now() - this.startTime) / this.duration) % 1;
        this.loopCallbacks.forEach((callback) => callback(progress));
        if (this.playing) {
            requestAnimationFrame(() => this.loop());
        }
    }

    constructor({ duration }: AnimationLoopConstructor) {
        this.duration = duration;
    }

    playLoop() {
        if (this.playing === false) {
            this.startTime = Date.now();
            this.playing = true;
            this.loop();
        }
    }

    stop() {
        if (this.playing === true) {
            this.startTime = Date.now();
            this.playing = false;
        }
    }

    onLoop(callback: (progress: number) => void) {
        this.loopCallbacks.push(callback);
    }
}