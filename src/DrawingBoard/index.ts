const ns = 'http://www.w3.org/2000/svg';
import styles from './styles.css'

interface DrawingBoardConstructor {
  onDraw: ((x: number, y: number) => void),
  width: number,
  height: number
};

const makeGridLine = (x1: number, y1: number, x2: number, y2: number) => {
  const gridLine = document.createElementNS(ns, 'line');
  gridLine.setAttribute('x1', x1.toString());
  gridLine.setAttribute('y1', y1.toString());
  gridLine.setAttribute('x2', x2.toString());
  gridLine.setAttribute('y2', y2.toString());
  gridLine.setAttribute('class', styles.grid);
  return gridLine;
}

export default class DrawingBoard {
  private svg: SVGElement;

  private line: SVGPathElement;

  private width: number;

  private height: number;

  private progressDot: SVGCircleElement;

  private onDrawCallbacks: ((x: number, y: number) => void)[] = [];

  wave: number[];

  private initLine() {
    const line = document.createElementNS(ns, 'path');
    line.setAttribute('class', styles.line);
    this.svg.append(line);
    return line;
  }

  private handleLineDraw(e: MouseEvent) {
    const {
      width, height, top, left,
    } = this.svg.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
      this.onDrawCallbacks.forEach((callback) => callback(x, y));
    }
  }

  private initProgressDot() {
    const circle = document.createElementNS(ns, 'circle');
    circle.setAttribute('r', '5');
    circle.setAttribute('cx', '-99');
    circle.setAttribute('cy', '-99');
    circle.setAttribute('class', styles.progressDot);
    this.svg.append(circle);
    return circle;
  }

  private initSvg() {
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('class', styles.svg);
    svg.setAttribute('viewBox', `0 0 ${this.width}  ${this.height}`);
    svg.addEventListener('mousedown', () => {
      const onMousemove = this.handleLineDraw.bind(this);
      const offMousemove = () => {
        document.removeEventListener('mouseup', offMousemove);
        document.removeEventListener('mousemove', onMousemove);
      };
      document.addEventListener('mousemove', onMousemove);
      document.addEventListener('mouseup', offMousemove);
    });
    for (let i = 1; i < 16; i++) {
      svg.append(makeGridLine(i * (this.width / 16), 0, i * (this.width / 16), this.height));
      svg.append(makeGridLine(0, i * (this.height / 16), this.width, i * (this.height / 16)));
    }
    return svg;
  }

  constructor({ onDraw, width, height }: DrawingBoardConstructor) {
    this.width = width;
    this.height = height;
    this.onDrawCallbacks.push(onDraw)
    this.svg = this.initSvg();
    this.line = this.initLine();
    this.progressDot = this.initProgressDot();
  }

  setWave(wave: number[]) {
    this.wave = wave;
    this.line.setAttribute('d', wave.map((x, i) => (i === 0 ? (
      `M ${0} ${x * this.height}`
    ) : (
      wave[i - 1] === x ? '' : `L${(i / wave.length) * this.width} ${x * this.height}`
    ))).join(' '));
  }

  appendTo(target: HTMLElement) {
    target.append(this.svg);
  }

  setProgressDot(x: number, y: number) {
    this.progressDot.setAttribute('cx', (x * this.width).toString());
    this.progressDot.setAttribute('cy', (y * this.height).toString());
  }
}
