'use client';

import { forwardRef } from 'react';
import { ReactSketchCanvas, ReactSketchCanvasProps, ReactSketchCanvasRef } from 'react-sketch-canvas';

const SketchCanvas = forwardRef<ReactSketchCanvasRef, ReactSketchCanvasProps>((props, ref) => {
  return <ReactSketchCanvas ref={ref} {...props} />;
});

SketchCanvas.displayName = 'SketchCanvas';

export default SketchCanvas;
