const ns = 'http://www.w3.org/2000/svg';
import WaveShape from "./WaveShape";

interface WavePointConstructor {
  waveShape: WaveShape;
};

export default class WavePoint {
  private svg: SVGElement;

  private line: SVGPathElement;

  private waveShape: WaveShape;

  private width: number;

  private height: number;

  private initLine() {
    const line = document.createElementNS(ns, 'path');
    line.setAttribute('stroke', '1');
    this.svg.append(line);
    return line;
  }

  private handleLineDraw(e: MouseEvent) {
    const {
      width, height, top, left,
    } = this.svg.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    this.waveShape.setShape(x, y);
  }

  onValueUpdate(wave: number[]) {
    this.line.setAttribute('d', wave.map((x, i) => (i === 0 ? (
      `M ${0} ${wave[0]}`
    ) : (
      `L${(i / wave.length) * this.width} ${x * this.height}`
    ))).join(' '));
  }

  private initSvg() {
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', `0 0 ${this.width}  ${this.height}`);
    svg.addEventListener('mousedown', () => {
      const onMousemove = this.handleLineDraw.bind(this);
      const offMousemove = () => {
        svg.removeEventListener('mouseup', offMousemove);
        svg.removeEventListener('mousemove', onMousemove);
      };
      svg.addEventListener('mousemove', onMousemove);
      svg.addEventListener('mouseup', offMousemove);
    });
    return svg;
  }

  constructor({
    waveShape,
  } : WavePointConstructor) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.svg = this.initSvg();
    this.line = this.initLine();
    this.waveShape = waveShape;
    this.waveShape.onUpdate(this.onValueUpdate.bind(this));
  }
}
