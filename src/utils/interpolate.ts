const interpolate = (inputArray: number[], arrayLength: number) => new Array(arrayLength).fill(0).map((x, i) => {
    const progress = (i / (arrayLength - 1) * (inputArray.length - 1));
    const baseValue = inputArray[Math.floor(progress)];
    const nextValue = inputArray[Math.ceil(progress)];
    const interpolatedValue = progress % 1;
    return baseValue + ((nextValue - baseValue) * interpolatedValue);
});

export default interpolate;