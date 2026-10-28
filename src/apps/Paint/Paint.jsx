import { useEffect, useRef, useState } from 'react';
import styles from './Paint.module.css';

const COLORS = ['#242424', '#e01b24', '#ff7800', '#f6d32d', '#33d17a', '#3584e4', '#9141ac', '#ffffff'];
const INITIAL_SIZE = { width: 1000, height: 650 };

export default function Paint() {
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const historyRef = useRef([]);
  const [color, setColor] = useState(COLORS[0]);
  const [brushSize, setBrushSize] = useState(6);
  const [tool, setTool] = useState('brush');
  const [historyCount, setHistoryCount] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    historyRef.current = [canvas.toDataURL()];
    setHistoryCount(0);
  }, []);

  function recordSnapshot() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    historyRef.current = [...historyRef.current.slice(0, historyCount + 1), canvas.toDataURL()].slice(-21);
    setHistoryCount((count) => Math.min(count + 1, 20));
  }

  function getPoint(event) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * (canvas.width / rect.width),
      y: (event.clientY - rect.top) * (canvas.height / rect.height),
    };
  }

  function startDrawing(event) {
    if (event.button !== 0) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const point = getPoint(event);
    drawingRef.current = true;
    lastPointRef.current = point;
    canvas.setPointerCapture(event.pointerId);
    context.beginPath();
    context.arc(point.x, point.y, (tool === 'eraser' ? brushSize * 2.5 : brushSize) / 2, 0, Math.PI * 2);
    context.fillStyle = tool === 'eraser' ? '#ffffff' : color;
    context.fill();
  }

  function draw(event) {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const point = getPoint(event);
    const previous = lastPointRef.current;
    context.beginPath();
    context.moveTo(previous.x, previous.y);
    context.lineTo(point.x, point.y);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    context.lineWidth = tool === 'eraser' ? brushSize * 2.5 : brushSize;
    context.stroke();
    lastPointRef.current = point;
  }

  function stopDrawing(event) {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    lastPointRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    recordSnapshot();
  }

  function undo() {
    if (historyCount <= 0) return;
    const nextIndex = historyCount - 1;
    const image = new Image();
    image.onload = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
      setHistoryCount(nextIndex);
      historyRef.current = historyRef.current.slice(0, nextIndex + 1);
    };
    image.src = historyRef.current[nextIndex];
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    recordSnapshot();
    setMessage('Canvas cleared');
  }

  function exportImage() {
    const link = document.createElement('a');
    link.download = 'abhay-painting.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
    setMessage('PNG downloaded');
  }

  return (
    <div className={styles.paint}>
      <div className={styles.toolbar} role="toolbar" aria-label="Paint tools">
        <div className={styles.toolGroup} aria-label="Drawing tools">
          <button type="button" className={tool === 'brush' ? styles.selectedTool : ''} onClick={() => setTool('brush')} aria-label="Brush" title="Brush">
            <i className="fa-solid fa-paintbrush" />
          </button>
          <button type="button" className={tool === 'eraser' ? styles.selectedTool : ''} onClick={() => setTool('eraser')} aria-label="Eraser" title="Eraser">
            <i className="fa-solid fa-eraser" />
          </button>
        </div>

        <div className={styles.palette} role="group" aria-label="Brush color">
          {COLORS.map((swatch) => (
            <button
              type="button"
              key={swatch}
              className={`${styles.swatch} ${color === swatch ? styles.selectedSwatch : ''}`}
              style={{ '--swatch': swatch }}
              onClick={() => setColor(swatch)}
              aria-label={`Color ${swatch}`}
              aria-pressed={color === swatch}
            />
          ))}
          <label className={styles.customColor} title="Custom color">
            <i className="fa-solid fa-eye-dropper" />
            <input type="color" value={color} onChange={(event) => setColor(event.target.value)} aria-label="Custom color" />
          </label>
        </div>

        <label className={styles.sizeControl}>
          <span>Size</span>
          <input type="range" min="2" max="36" value={brushSize} onChange={(event) => setBrushSize(Number(event.target.value))} aria-label="Brush size" />
          <span className={styles.sizeValue}>{brushSize}</span>
        </label>

        <div className={styles.actions}>
          <button type="button" onClick={undo} disabled={historyCount <= 0} aria-label="Undo" title="Undo">
            <i className="fa-solid fa-arrow-rotate-left" />
          </button>
          <button type="button" onClick={clearCanvas} aria-label="Clear canvas" title="Clear canvas">
            <i className="fa-regular fa-trash-can" />
          </button>
          <button type="button" className={styles.export} onClick={exportImage} aria-label="Export PNG" title="Export PNG">
            <i className="fa-solid fa-download" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className={styles.canvasArea}>
        <div className={styles.canvasFrame}>
          <canvas
            ref={canvasRef}
            width={INITIAL_SIZE.width}
            height={INITIAL_SIZE.height}
            aria-label="Drawing canvas"
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerCancel={stopDrawing}
          />
        </div>
      </div>
      <div className={styles.status} aria-live="polite">
        <span><i className={`fa-solid ${tool === 'eraser' ? 'fa-eraser' : 'fa-paintbrush'}`} /> {tool === 'eraser' ? 'Eraser' : 'Brush'}</span>
        <span>{INITIAL_SIZE.width} × {INITIAL_SIZE.height}</span>
        <span>{message}</span>
      </div>
    </div>
  );
}
