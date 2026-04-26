import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Camera, Scan, Info, Cpu, Target } from 'lucide-react';

interface ARScannerProps {
  onBack: () => void;
}

export function ARScanner({ onBack }: ARScannerProps) {
  const [arActive, setArActive] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [fGray, setFGray] = useState(false);
  const [fSepia, setFSepia] = useState(false);
  const [fInvert, setFInvert] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [videoPos, setVideoPos] = useState<{ top: number; left: number } | null>(null);
  const [videoSize, setVideoSize] = useState<{ width: number; height: number }>({ width: 420, height: 236 });
  const draggingRef = useRef(false);
  const resizingRef = useRef(false);
  const dragStartRef = useRef<any>({ x: 0, y: 0, left: 0, top: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const posRef = useRef<{ left: number; top: number } | null>(null);
  const sizeRef = useRef<{ width: number; height: number }>(videoSize);
  const rafRef = useRef<number | null>(null);
  const resizeDirRef = useRef<string | null>(null);
  const hoverEdgeRef = useRef<string | null>(null);
  const resizingVideoRef = useRef<HTMLVideoElement | null>(null);
  const originalFilterRef = useRef<string | null>(null);

  useEffect(() => {
    if (videoOpen && videoPos === null && typeof window !== 'undefined') {
      const defaultWidth = Math.min(440, Math.floor(window.innerWidth * 0.45));
      const defaultHeight = Math.max(160, Math.floor(defaultWidth * 9 / 16));
      const defaultTop = Math.max(72, Math.floor(window.innerHeight * 0.1));
      setVideoSize({ width: defaultWidth, height: defaultHeight });
      setVideoPos({ top: defaultTop, left: Math.max(12, Math.floor((window.innerWidth - defaultWidth) / 2)) });
    }
  }, [videoOpen, videoPos]);

  // Apply DOM styles immediately when position/size change to avoid reflows
  useEffect(() => {
    if (containerRef.current && videoPos) {
      containerRef.current.style.transform = `translate(${videoPos.left}px, ${videoPos.top}px)`;
    }
    if (containerRef.current && videoSize) {
      containerRef.current.style.width = `${videoSize.width}px`;
      const videoArea = containerRef.current.querySelector('.video-area') as HTMLElement | null;
      if (videoArea) videoArea.style.height = `${videoSize.height}px`;
    }
  }, [videoPos, videoSize]);

  // Use requestAnimationFrame and direct DOM updates for smooth dragging/resizing
  const onMouseMove = (e: MouseEvent) => {
    if (rafRef.current !== null) return; // already scheduled
    rafRef.current = window.requestAnimationFrame(() => {
      if (draggingRef.current && dragStartRef.current) {
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;
        const left = Math.max(8, dragStartRef.current.left + dx);
        const top = Math.max(8, dragStartRef.current.top + dy);
        posRef.current = { left, top };
        if (containerRef.current) {
          containerRef.current.style.transform = `translate(${left}px, ${top}px)`;
        }
      } else if (resizingRef.current && dragStartRef.current) {
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;
        let newW = dragStartRef.current.width;
        let newH = dragStartRef.current.height || Math.round(dragStartRef.current.width * 9 / 16);
        let newLeft = dragStartRef.current.left;
        let newTop = dragStartRef.current.top;
        const dir = resizeDirRef.current;
        if (dir === 'right') {
          newW = Math.max(220, dragStartRef.current.width + dx);
        } else if (dir === 'left') {
          newW = Math.max(220, dragStartRef.current.width - dx);
          newLeft = Math.max(8, dragStartRef.current.left + dx);
        } else if (dir === 'bottom') {
          newH = Math.max(120, dragStartRef.current.height + dy);
          newW = Math.max(220, Math.round(newH * 16 / 9));
        } else if (dir === 'top') {
          newH = Math.max(120, dragStartRef.current.height - dy);
          newTop = Math.max(8, dragStartRef.current.top + dy);
          newW = Math.max(220, Math.round(newH * 16 / 9));
        } else {
          // default: bottom-right
          newW = Math.max(220, dragStartRef.current.width + dx);
        }
        newH = Math.max(120, Math.round(newW * 9 / 16));
        sizeRef.current = { width: newW, height: newH };
        posRef.current = { left: newLeft, top: newTop };
        if (containerRef.current) {
          containerRef.current.style.width = `${newW}px`;
          containerRef.current.style.transform = `translate(${newLeft}px, ${newTop}px)`;
          const videoArea = containerRef.current.querySelector('.video-area') as HTMLElement | null;
          if (videoArea) videoArea.style.height = `${newH}px`;
        }
      }
      rafRef.current && window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    });
  };

  const onMouseUp = () => {
    draggingRef.current = false;
    resizingRef.current = false;
    resizeDirRef.current = null;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    // commit final positions to state to keep React in sync
    if (posRef.current) {
      setVideoPos(posRef.current);
    }
    if (sizeRef.current) {
      setVideoSize(sizeRef.current);
    }
    // restore video filters if we altered them during resize
    if (resizingVideoRef.current) {
      const vid = resizingVideoRef.current;
      const applied = `${fGray ? 'grayscale(100%)' : ''} ${fSepia ? 'sepia(60%)' : ''} ${fInvert ? 'invert(100%)' : ''} brightness(${brightness}%)`.trim();
      try { vid.style.filter = applied; } catch (err) { /* ignore */ }
      try { vid.style.willChange = ''; } catch (err) { /* ignore */ }
      resizingVideoRef.current = null;
      originalFilterRef.current = null;
    }
  };

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'AR_BACK') setArActive(false);
      if (e.data?.type === 'AR_OPEN_VIDEO') {
        setVideoUrl(e.data?.url || null);
        setVideoOpen(true);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-full font-bold text-sm uppercase mb-4 border border-purple-500 tracking-widest">
            Realidad aumentada
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight">
            Escaner de escudos
          </h2>
          <p className="text-lg text-gray-400 max-w-lg mx-auto">
            Apunta la camara al escudo de un equipo y aparecera la Copa del Mundial en 3D sobre el.
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-black rounded-3xl p-8 shadow-xl mb-6 border border-purple-900 text-center">
          {!arActive ? (
            <>
              <div className="text-4xl mb-4 select-none font-black text-purple-300" aria-hidden>AR</div>
              <h3 className="text-2xl font-bold text-white mb-2">Copa 3D sobre tu escudo</h3>
              <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                Usa tu camara para detectar escudos de equipos participantes en el Mundial 2026 y ve la copa animada en realidad aumentada.
              </p>
              <button
                onClick={() => setArActive(true)}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg border-2 border-purple-500"
              >
                <Camera className="w-5 h-5" />
                Iniciar escaner AR
              </button>
            </>
          ) : (
            <div className="fixed inset-0 z-[70] bg-black">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-[200] flex items-center justify-between p-4 pt-[max(1rem,env(safe-area-inset-top))]">
                <p className="rounded-full bg-black/60 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm">Escaner AR activo</p>
                <button
                  onClick={() => setArActive(false)}
                  className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-purple-500 bg-black/70 px-4 py-2 text-sm font-semibold text-purple-200 backdrop-blur-sm transition-colors hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Cerrar escaner
                </button>
              </div>

              <div className="relative h-full w-full">
                <iframe
                  src="/ar.html?autostart=1"
                  title="Escaner AR"
                  className="h-full w-full border-0"
                  allow="camera *; fullscreen *; accelerometer *; gyroscope *"
                />
              </div>
              {/* Video modal opened from AR iframe via postMessage - positioned over iframe container */}
              {videoOpen && videoPos && (
                <div
                  ref={containerRef}
                  onMouseMove={(e) => {
                    if (!containerRef.current) return;
                    const rect = containerRef.current.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const threshold = 10;
                    const nearLeft = x <= threshold;
                    const nearRight = rect.width - x <= threshold;
                    const nearTop = y <= threshold;
                    const nearBottom = rect.height - y <= threshold;
                    let edge: string | null = null;
                    if ((nearLeft && nearTop) || (nearRight && nearBottom)) {
                      edge = 'corner';
                      containerRef.current.style.cursor = 'nwse-resize';
                    } else if (nearLeft && nearBottom) {
                      edge = 'corner';
                      containerRef.current.style.cursor = 'nesw-resize';
                    } else if (nearRight && nearTop) {
                      edge = 'corner';
                      containerRef.current.style.cursor = 'nesw-resize';
                    } else if (nearLeft) {
                      edge = 'left';
                      containerRef.current.style.cursor = 'ew-resize';
                    } else if (nearRight) {
                      edge = 'right';
                      containerRef.current.style.cursor = 'ew-resize';
                    } else if (nearTop) {
                      edge = 'top';
                      containerRef.current.style.cursor = 'ns-resize';
                    } else if (nearBottom) {
                      edge = 'bottom';
                      containerRef.current.style.cursor = 'ns-resize';
                    } else {
                      edge = null;
                      containerRef.current.style.cursor = 'grab';
                    }
                    hoverEdgeRef.current = edge;
                  }}
                  onMouseLeave={() => {
                    if (containerRef.current) containerRef.current.style.cursor = 'grab';
                    hoverEdgeRef.current = null;
                  }}
                  onMouseDown={(e) => {
                    // Allow starting a resize by mousedown when near an edge
                    if (hoverEdgeRef.current) {
                      e.stopPropagation();
                      resizingRef.current = true;
                      const dir = hoverEdgeRef.current === 'corner' ? 'right' : hoverEdgeRef.current;
                      resizeDirRef.current = dir;
                      dragStartRef.current = { x: (e as React.MouseEvent).clientX, y: (e as React.MouseEvent).clientY, width: videoSize.width, height: videoSize.height, left: videoPos?.left, top: videoPos?.top };
                      window.addEventListener('mousemove', onMouseMove);
                      window.addEventListener('mouseup', onMouseUp);
                    }
                  }}
                  style={{ position: 'absolute', left: 0, top: 0, zIndex: 90, pointerEvents: 'auto', width: videoSize.width }}
                >
                  <div
                    style={{
                      position: 'relative', width: '100%', height: 'auto', overflow: 'hidden', borderRadius: 12,
                      boxShadow: '0 12px 40px rgba(7,4,22,0.7)', border: '1px solid rgba(167,139,250,0.12)',
                      background: 'linear-gradient(180deg, rgba(13,10,30,0.95), rgba(6,4,18,0.9))', userSelect: 'none'
                    }}
                  >
                    <div
                      onMouseDown={(e) => {
                        draggingRef.current = true;
                        dragStartRef.current = { x: e.clientX, y: e.clientY, left: videoPos.left, top: videoPos.top, width: videoSize.width };
                        window.addEventListener('mousemove', onMouseMove);
                        window.addEventListener('mouseup', onMouseUp);
                        // temporarily remove heavy CSS filters for smoother resize
                        try {
                          const vid = containerRef.current?.querySelector('video') as HTMLVideoElement | null;
                          if (vid) {
                            resizingVideoRef.current = vid;
                            originalFilterRef.current = vid.style.filter || null;
                            vid.style.filter = 'none';
                            vid.style.willChange = 'transform';
                          }
                        } catch (err) {}
                      }}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: 'linear-gradient(90deg,#7c3aed,#6d28d9)', borderTopLeftRadius: 12, borderTopRightRadius: 12, cursor: 'grab' }}
                    >
                      <div style={{ width: 10, height: 10, borderRadius: 4, background: 'rgba(255,255,255,0.25)', boxShadow: '0 0 8px rgba(124,58,237,0.6)' }} />
                      <strong style={{ color: '#fff', fontSize: 14 }}>Reproductor</strong>
                      <div style={{ flex: 1 }} />
                      <button onClick={() => { setVideoOpen(false); setVideoUrl(null); }} style={{ background: 'transparent', border: 'none', color: '#f3e8ff', fontWeight: 700, cursor: 'pointer' }}>Cerrar ✕</button>
                    </div>
                    <div style={{ padding: 10 }}>
                      <div style={{ background: '#000', borderRadius: 8, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: videoSize.height }}>
                        {videoUrl?.endsWith('.mp4') || videoUrl?.endsWith('.webm') ? (
                          <video src={videoUrl || undefined} controls autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'contain', filter: `${fGray ? 'grayscale(100%)' : ''} ${fSepia ? 'sepia(60%)' : ''} ${fInvert ? 'invert(100%)' : ''} brightness(${brightness}%)` }} />
                        ) : (
                          <iframe src={(videoUrl||'').replace('watch?v=', 'embed/')} title="video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ width: '100%', height: '100%', border: 0 }} />
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 10, color: '#dfe7ff', fontSize: 13 }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}><input type="checkbox" checked={fGray} onChange={e => setFGray(e.target.checked)} />Grayscale</label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}><input type="checkbox" checked={fSepia} onChange={e => setFSepia(e.target.checked)} />Sepia</label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}><input type="checkbox" checked={fInvert} onChange={e => setFInvert(e.target.checked)} />Invert</label>
                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ color: '#c7d2ff' }}>Brillo</span>
                          <input type="range" min={50} max={150} value={brightness} onChange={e => setBrightness(Number(e.target.value))} />
                        </div>
                      </div>
                    </div>
                    {/* resize handles */}
                    <div
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        resizingRef.current = true;
                        resizeDirRef.current = 'right';
                        dragStartRef.current = { x: e.clientX, y: e.clientY, width: videoSize.width, height: videoSize.height, left: videoPos?.left, top: videoPos?.top };
                        window.addEventListener('mousemove', onMouseMove);
                        window.addEventListener('mouseup', onMouseUp);
                        try {
                          const vid = containerRef.current?.querySelector('video') as HTMLVideoElement | null;
                          if (vid) {
                            resizingVideoRef.current = vid;
                            originalFilterRef.current = vid.style.filter || null;
                            vid.style.filter = 'none';
                            vid.style.willChange = 'transform';
                          }
                        } catch (err) {}
                      }}
                      style={{ position: 'absolute', right: 6, bottom: 6, width: 18, height: 18, background: 'rgba(255,255,255,0.06)', borderRadius: 4, cursor: 'nwse-resize', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <div style={{ width: 10, height: 10, transform: 'rotate(45deg)', borderLeft: '2px solid rgba(255,255,255,0.25)', borderBottom: '2px solid rgba(255,255,255,0.25)' }} />
                    </div>
                    <div
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        resizingRef.current = true; resizeDirRef.current = 'left';
                        dragStartRef.current = { x: e.clientX, y: e.clientY, width: videoSize.width, height: videoSize.height, left: videoPos?.left, top: videoPos?.top };
                        window.addEventListener('mousemove', onMouseMove);
                        window.addEventListener('mouseup', onMouseUp);
                        try {
                          const vid = containerRef.current?.querySelector('video') as HTMLVideoElement | null;
                          if (vid) {
                            resizingVideoRef.current = vid;
                            originalFilterRef.current = vid.style.filter || null;
                            vid.style.filter = 'none';
                            vid.style.willChange = 'transform';
                          }
                        } catch (err) {}
                      }}
                      style={{ position: 'absolute', left: 6, bottom: 6, width: 18, height: 18, background: 'rgba(255,255,255,0.03)', borderRadius: 4, cursor: 'ew-resize' }}
                    />
                    <div
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        resizingRef.current = true; resizeDirRef.current = 'top';
                        dragStartRef.current = { x: e.clientX, y: e.clientY, width: videoSize.width, height: videoSize.height, left: videoPos?.left, top: videoPos?.top };
                        window.addEventListener('mousemove', onMouseMove);
                        window.addEventListener('mouseup', onMouseUp);
                        try {
                          const vid = containerRef.current?.querySelector('video') as HTMLVideoElement | null;
                          if (vid) {
                            resizingVideoRef.current = vid;
                            originalFilterRef.current = vid.style.filter || null;
                            vid.style.filter = 'none';
                            vid.style.willChange = 'transform';
                          }
                        } catch (err) {}
                      }}
                      style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 6, width: 30, height: 10, background: 'rgba(255,255,255,0.03)', borderRadius: 4, cursor: 'ns-resize' }}
                    />
                    <div
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        resizingRef.current = true; resizeDirRef.current = 'bottom';
                        dragStartRef.current = { x: e.clientX, y: e.clientY, width: videoSize.width, height: videoSize.height, left: videoPos?.left, top: videoPos?.top };
                        window.addEventListener('mousemove', onMouseMove);
                        window.addEventListener('mouseup', onMouseUp);
                          try {
                            const vid = containerRef.current?.querySelector('video') as HTMLVideoElement | null;
                            if (vid) {
                              resizingVideoRef.current = vid;
                              originalFilterRef.current = vid.style.filter || null;
                              vid.style.filter = 'none';
                              vid.style.willChange = 'transform';
                            }
                          } catch (err) {}
                      }}
                      style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 6, width: 30, height: 10, background: 'rgba(255,255,255,0.03)', borderRadius: 4, cursor: 'ns-resize' }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-black rounded-2xl p-8 shadow-lg border border-purple-900 mb-6">
          <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <Info className="w-5 h-5 text-purple-400" />
            Como funciona
          </h3>
          <ol className="space-y-4 text-gray-300">
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-700 text-white rounded-full flex items-center justify-center font-bold text-sm border border-purple-500">1</span>
              <span className="pt-1">Pulsa <strong className="text-white">Iniciar escaner AR</strong> y acepta el permiso de camara.</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-700 text-white rounded-full flex items-center justify-center font-bold text-sm border border-purple-500">2</span>
              <span className="pt-1">Apunta la camara a un <strong className="text-white">escudo de equipo</strong> de futbol soccer.</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-700 text-white rounded-full flex items-center justify-center font-bold text-sm border border-purple-500">3</span>
              <span className="pt-1">La <strong className="text-white">Copa del Mundial en 3D</strong> aparecera sobre el escudo y girara automaticamente.</span>
            </li>
          </ol>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: <Scan className="w-6 h-6" />, title: 'MindAR', desc: 'Reconocimiento de imagenes en tiempo real' },
            { icon: <Cpu className="w-6 h-6" />, title: 'A-Frame', desc: 'Renderizado 3D en el navegador sin instalar nada' },
            { icon: <Target className="w-6 h-6" />, title: 'GLTF/GLB', desc: 'Modelo copa.glb cargado desde el proyecto' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-slate-900/80 border border-purple-900/50 rounded-xl p-5 flex flex-col items-center text-center gap-2">
              <div className="text-purple-400">{icon}</div>
              <p className="text-white font-bold text-sm">{title}</p>
              <p className="text-gray-400 text-xs">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
