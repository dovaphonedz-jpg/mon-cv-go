import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UploadCloud, Download, RefreshCw, CheckCircle2, ArrowLeft, Camera, ZoomIn, RotateCw, MoveHorizontal, Wand2, Sparkles, Loader2, Eraser } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import SEO from '../components/SEO';

export default function StudioPhoto() {
  const { updatePersonal, cvData } = useResume();
  const navigate = useNavigate();

  const [imageSrc, setImageSrc] = useState(cvData?.personal?.photo || null);
  const [activeTab, setActiveTab] = useState('background'); // Start on background/détourage tab
  
  // Crop & Ratio states
  const [aspectRatio, setAspectRatio] = useState('1:1'); // '1:1' | '3.5:4.5'
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);

  // AI Background removal (Détourage IA) states
  const [isRemoving, setIsRemoving] = useState(false);
  const [isBgRemoved, setIsBgRemoved] = useState(false);
  const [removedBgSrc, setRemovedBgSrc] = useState(null);

  // Frames & Badges Pro states
  const [selectedFrame, setSelectedFrame] = useState('round-gold');
  const [selectedBg, setSelectedBg] = useState('original');
  const [activeFilter, setActiveFilter] = useState('normal');
  const [intensity, setIntensity] = useState(100);

  // Retouche adjustments
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);

  // Position & Zoom
  const [zoom, setZoom] = useState(0.65);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const fileInputRef = useRef(null);

  // Professional Frames & Badges Collection
  const FRAMES = [
    { id: 'none', name: 'Standard (Aucun Cadre)', shape: 'rect', color: 'transparent' },
    { id: 'round-gold', name: 'Cercle Corporate Doré', shape: 'circle', color: '#eab308' },
    { id: 'round-silver', name: 'Cercle Argent Électrique', shape: 'circle', color: '#94a3b8' },
    { id: 'badge-executive', name: 'Badge RH Executive', shape: 'badge', color: '#3b82f6' },
    { id: 'squircle-blue', name: 'Squircle iOS Bleu Pro', shape: 'squircle', color: '#2563eb' }
  ];

  // Backgrounds Collection
  const BACKGROUNDS = [
    { id: 'original', name: 'Fond Translucide (Détouré)', color: 'transparent' },
    { id: 'studio-white', name: 'Studio Blanc Pur', color: '#FFFFFF' },
    { id: 'studio-gray', name: 'Studio Gris Minimalist', color: '#E2E8F0' },
    { id: 'gradient-blue', name: 'Dégradé Bleu Executive', color: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' },
    { id: 'gradient-indigo', name: 'Dégradé Indigo Tech', color: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)' },
    { id: 'bokeh-office', name: 'Open Space Flouté (Bokeh)', color: 'linear-gradient(135deg, #64748b 0%, #334155 100%)' }
  ];

  // Filters Collection
  const FILTERS = [
    { id: 'normal', name: 'Original', brightness: 100, contrast: 100, sepia: 0, grayscale: 0 },
    { id: 'studio-pro', name: 'Studio Pro (Éclat)', brightness: 115, contrast: 115, sepia: 0, grayscale: 0 },
    { id: 'bw-executive', name: 'Noir & Blanc Exécutif', brightness: 105, contrast: 130, sepia: 0, grayscale: 100 },
    { id: 'warm-classic', name: 'Chaud & Élégant', brightness: 105, contrast: 105, sepia: 35, grayscale: 0 },
    { id: 'cool-tech', name: 'Cool Tech (Frais)', brightness: 108, contrast: 112, sepia: 0, grayscale: 0 }
  ];

  // Combined CSS filter string
  const currentFilterObj = FILTERS.find(f => f.id === activeFilter) || FILTERS[0];
  const effInt = intensity / 100;
  const computedBrightness = Math.round(100 + ((currentFilterObj.brightness - 100) * effInt) + (brightness - 100));
  const computedContrast = Math.round(100 + ((currentFilterObj.contrast - 100) * effInt) + (contrast - 100));
  const computedGrayscale = Math.round(currentFilterObj.grayscale * effInt);
  const computedSepia = Math.round(currentFilterObj.sepia * effInt);

  const cssFilterString = `brightness(${computedBrightness}%) contrast(${computedContrast}%) grayscale(${computedGrayscale}%) sepia(${computedSepia}%) saturate(${saturation}%)`;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setImageSrc(evt.target.result);
        setRemovedBgSrc(null);
        setIsBgRemoved(false);
        setPosition({ x: 0, y: 0 });
        setZoom(0.65);
        setRotation(0);
      };
      reader.readAsDataURL(file);
    }
  };

  // 🪄 True AI Background Removal using dynamic import of @imgly/background-removal
  const processAIBgRemoval = async () => {
    if (!imageSrc) return;
    setIsRemoving(true);
    try {
      const { removeBackground } = await import('@imgly/background-removal');
      const blob = await removeBackground(imageSrc);
      const transparentUrl = URL.createObjectURL(blob);
      setRemovedBgSrc(transparentUrl);
      setIsBgRemoved(true);
    } catch (err) {
      console.error("Erreur lors du détourage IA", err);
      alert("Erreur lors du détourage IA. Veuillez réessayer.");
    } finally {
      setIsRemoving(false);
    }
  };

  // Dragging photo logic
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };
  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };
  const handleMouseUp = () => setIsDragging(false);

  const activeSrc = isBgRemoved && removedBgSrc ? removedBgSrc : imageSrc;

  // HD Export via Canvas HTML5
  const generateHDDataUrl = () => {
    return new Promise((resolve) => {
      if (!activeSrc) return resolve(null);

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      let outW = 600;
      let outH = 600;
      if (aspectRatio === '3.5:4.5') outH = 771;

      canvas.width = outW;
      canvas.height = outH;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // 1. Draw Background
      const bgObj = BACKGROUNDS.find(b => b.id === selectedBg);
      if (bgObj && bgObj.id !== 'original') {
        if (bgObj.color.startsWith('linear-gradient')) {
          const grad = ctx.createLinearGradient(0, 0, outW, outH);
          if (bgObj.id === 'gradient-blue') {
            grad.addColorStop(0, '#1e293b');
            grad.addColorStop(1, '#0f172a');
          } else if (bgObj.id === 'gradient-indigo') {
            grad.addColorStop(0, '#312e81');
            grad.addColorStop(1, '#1e1b4b');
          } else {
            grad.addColorStop(0, '#64748b');
            grad.addColorStop(1, '#334155');
          }
          ctx.fillStyle = grad;
        } else {
          ctx.fillStyle = bgObj.color;
        }
        ctx.fillRect(0, 0, outW, outH);
      }

      // 2. Draw Head Photo with Filters
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.save();

        const frameObj = FRAMES.find(f => f.id === selectedFrame);
        if (frameObj && frameObj.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(outW / 2, outH / 2, outW / 2 - 8, 0, Math.PI * 2);
          ctx.clip();
        }

        ctx.filter = cssFilterString;
        ctx.translate(outW / 2 + position.x * (outW / 360), outH / 2 + position.y * (outH / 360));
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.scale(flipH ? -1 : 1, 1);

        const drawWidth = outW * zoom;
        const drawHeight = outH * zoom;
        ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
        ctx.restore();

        // 3. Draw Frame Stroke Overlay
        if (frameObj && frameObj.id !== 'none') {
          ctx.save();
          ctx.strokeStyle = frameObj.color;
          ctx.lineWidth = 8;
          if (frameObj.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(outW / 2, outH / 2, outW / 2 - 8, 0, Math.PI * 2);
            ctx.stroke();
          }
          ctx.restore();
        }

        resolve(canvas.toDataURL('image/png', 0.95));
      };
      img.src = activeSrc;
    });
  };

  const handleDownload = async () => {
    const dataUrl = await generateHDDataUrl();
    if (dataUrl) {
      const link = document.createElement('a');
      link.download = `Photo_CV_Studio_${aspectRatio.replace(':', 'x')}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  const handleApplyToCV = async () => {
    const dataUrl = await generateHDDataUrl();
    if (dataUrl && updatePersonal) {
      updatePersonal('photo', dataUrl);
      navigate('/create');
    }
  };

  const frameObj = FRAMES.find(f => f.id === selectedFrame);

  return (
    <>
      <SEO title="Studio Photo CV Gratuit | Détourage IA & Retouche - Mon CV Go" description="Découpez et détourez votre photo de CV avec intelligence artificielle : Suppression de fond IA 1-clic, Recadrage Passeport, Cadres Corporate." url="https://www.moncvgo.com/studio-photo" />
      
      <div className="min-h-screen bg-slate-950 text-white pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-slate-800 pb-6">
            <div>
              <Link to="/create" className="inline-flex items-center gap-2 text-xs font-black uppercase text-blue-400 hover:text-blue-300 mb-2">
                <ArrowLeft className="w-4 h-4" /> Retour à l'Éditeur CV
              </Link>
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight flex items-center gap-3">
                <Camera className="w-8 h-8 text-yellow-400" /> Studio Photo & Détourage IA
              </h1>
              <p className="text-sm text-slate-400 mt-1 font-bold">
                Détourage IA 1-Clic, Découpage Passeport, Cadres Corporate & Retouche Studio
              </p>
            </div>

            {imageSrc && (
              <div className="flex gap-3 w-full sm:w-auto">
                <button 
                  onClick={handleDownload} 
                  className="flex-1 sm:flex-initial px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase tracking-wider rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Télécharger HD
                </button>
                <button 
                  onClick={handleApplyToCV} 
                  className="flex-1 sm:flex-initial px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-yellow-400/20 flex items-center justify-center gap-2 transition-all transform hover:scale-105 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" /> Injecter dans Mon CV
                </button>
              </div>
            )}
          </div>

          {/* Main Editor Grid */}
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* LEFT / CENTER: Photo Preview Box */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-2xl min-h-[480px]">
              
              {!imageSrc ? (
                <div className="text-center max-w-md p-8">
                  <div className="w-20 h-20 bg-blue-600/20 border-2 border-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <UploadCloud className="w-10 h-10 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2">Importez votre Photo</h3>
                  <p className="text-xs text-slate-400 mb-6 font-medium">
                    Sélectionnez un portrait pour détruire son arrière-plan grâce à notre IA gratuite.
                  </p>
                  <button 
                    onClick={() => fileInputRef.current?.click()} 
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    Sélectionner une photo
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center w-full">
                  
                  {/* Viewport Box */}
                  <div 
                    className={`relative overflow-hidden shadow-2xl bg-slate-950 cursor-grab active:cursor-grabbing select-none transition-all duration-300 ${
                      frameObj?.shape === 'circle' 
                        ? 'rounded-full border-4 border-yellow-400' 
                        : frameObj?.shape === 'squircle' 
                        ? 'rounded-3xl border-4 border-blue-500' 
                        : 'rounded-2xl border-4 border-yellow-400'
                    } ${
                      aspectRatio === '3.5:4.5' 
                        ? 'w-[280px] h-[360px] sm:w-[310px] sm:h-[400px]' 
                        : 'w-[320px] h-[320px] sm:w-[360px] sm:h-[360px]'
                    }`}
                    style={{ borderColor: frameObj?.color !== 'transparent' ? frameObj?.color : undefined }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  >
                    {/* Background Layer */}
                    <div 
                      className="absolute inset-0 z-0" 
                      style={{ 
                        background: BACKGROUNDS.find(b => b.id === selectedBg)?.color || 'transparent' 
                      }} 
                    />

                    {/* Head Photo Layer */}
                    <img
                      src={activeSrc}
                      alt="CV Portrait"
                      className="absolute inset-0 max-w-none pointer-events-none transition-all duration-75"
                      style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${zoom}) rotate(${rotation}deg) scaleX(${flipH ? -1 : 1})`,
                        transformOrigin: 'center center',
                        filter: cssFilterString
                      }}
                    />

                    {/* Crop Grid Visual Lines */}
                    <div className="absolute inset-0 border border-yellow-400/30 pointer-events-none z-30 grid grid-cols-3 grid-rows-3">
                      <div className="border-r border-b border-yellow-400/20" />
                      <div className="border-r border-b border-yellow-400/20" />
                      <div className="border-b border-yellow-400/20" />
                      <div className="border-r border-b border-yellow-400/20" />
                      <div className="border-r border-b border-yellow-400/20" />
                      <div className="border-b border-yellow-400/20" />
                    </div>
                  </div>

                  {/* Positioning Controls */}
                  <div className="flex flex-col gap-3 mt-6 bg-slate-800/80 px-6 py-4 rounded-2xl border border-slate-700 w-full max-w-md">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-300 w-24 shrink-0 flex items-center gap-1">
                        <ZoomIn className="w-3.5 h-3.5 text-yellow-400" /> Zoom :
                      </span>
                      <input 
                        type="range" 
                        min="0.2" 
                        max="2.0" 
                        step="0.02" 
                        value={zoom} 
                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                        className="w-full accent-yellow-400 cursor-pointer"
                      />
                    </div>

                    <div className="flex justify-between items-center border-t border-slate-700/60 pt-2">
                      <span className="text-[11px] text-slate-400">💡 Glissez la photo à la souris pour cadrer.</span>
                      <button 
                        onClick={() => { setZoom(0.65); setPosition({ x: 0, y: 0 }); setRotation(0); setFlipH(false); }} 
                        className="text-[10px] font-black text-yellow-400 hover:underline uppercase"
                      >
                        Reset Position
                      </button>
                    </div>
                  </div>

                </div>
              )}

              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>

            {/* RIGHT: Editing Controls Tabs */}
            <div className="lg:col-span-5 flex flex-col bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              
              {/* Tabs Navigation */}
              <div className="grid grid-cols-5 gap-1 p-1 bg-slate-950 rounded-2xl border border-slate-800 mb-6 text-center">
                <button
                  onClick={() => setActiveTab('background')}
                  className={`py-2.5 px-1 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'background' ? 'bg-yellow-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🌆 Fond & IA
                </button>
                <button
                  onClick={() => setActiveTab('crop')}
                  className={`py-2.5 px-1 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'crop' ? 'bg-yellow-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ✂️ Découper
                </button>
                <button
                  onClick={() => setActiveTab('frame')}
                  className={`py-2.5 px-1 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'frame' ? 'bg-yellow-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🛡️ Cadres
                </button>
                <button
                  onClick={() => setActiveTab('filters')}
                  className={`py-2.5 px-1 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'filters' ? 'bg-yellow-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🎨 Filtres
                </button>
                <button
                  onClick={() => setActiveTab('adjust')}
                  className={`py-2.5 px-1 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'adjust' ? 'bg-yellow-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🎛️ Lumière
                </button>
              </div>

              {/* TAB 2: BACKGROUNDS & AI BACKGROUND REMOVAL */}
              {activeTab === 'background' && (
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                    Détourage IA & Remplacement de Fond Studio
                  </h3>

                  {/* 🤖 TRUE AI BACKGROUND REMOVAL BOX */}
                  <div className="bg-slate-950 p-4 rounded-2xl border-2 border-blue-500/40 mb-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-yellow-400 flex items-center gap-1.5">
                        <Wand2 className="w-4 h-4" /> Outil IA Détourage Ultra-Précis
                      </span>
                      {isBgRemoved && (
                        <span className="text-[10px] font-bold bg-green-500/20 text-green-400 px-2 py-0.5 rounded border border-green-500/30">
                          IA DÉTOURÉ
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={processAIBgRemoval}
                        disabled={isRemoving}
                        className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                      >
                        {isRemoving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-yellow-300" /> IA en cours de détourage...
                          </>
                        ) : (
                          <>
                            <Wand2 className="w-4 h-4 text-yellow-300" /> Supprimer le Fond avec l'IA (1-Clic)
                          </>
                        )}
                      </button>

                      {isBgRemoved && (
                        <button
                          onClick={() => { setIsBgRemoved(false); setRemovedBgSrc(null); }}
                          className="px-3 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl cursor-pointer"
                          title="Restaurer la photo initiale"
                        >
                          <Eraser className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Studio Background Picker */}
                  <h4 className="text-xs font-bold text-slate-400 uppercase">Choisir un nouveau fond Studio :</h4>
                  <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
                    {BACKGROUNDS.map(bg => (
                      <button
                        key={bg.id}
                        onClick={() => setSelectedBg(bg.id)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          selectedBg === bg.id 
                            ? 'bg-blue-600/20 border-blue-500 text-white ring-2 ring-blue-500/40' 
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="w-full h-8 rounded-lg mb-2 border border-slate-700" style={{ background: bg.color }} />
                        <h4 className="text-xs font-bold text-white">{bg.name}</h4>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 0: CROPPING & ASPECT RATIOS */}
              {activeTab === 'crop' && (
                <div className="space-y-5">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                    Format & Ratio de Découpage
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      onClick={() => setAspectRatio('1:1')}
                      className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        aspectRatio === '1:1' 
                          ? 'bg-yellow-400 text-slate-950 font-black border-yellow-400 shadow-lg shadow-yellow-400/20' 
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <h4 className="text-xs font-bold uppercase">Square 1:1 (Format Standard CV & Rond)</h4>
                        <p className="text-[11px] opacity-80 font-medium">Recommandé pour les CV modernes avec badge photo rond</p>
                      </div>
                      <div className="w-7 h-7 rounded border-2 border-current shrink-0" />
                    </button>

                    <button
                      onClick={() => setAspectRatio('3.5:4.5')}
                      className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        aspectRatio === '3.5:4.5' 
                          ? 'bg-yellow-400 text-slate-950 font-black border-yellow-400 shadow-lg shadow-yellow-400/20' 
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <h4 className="text-xs font-bold uppercase">Passeport 3.5x4.5 (CV Officiel / Europe)</h4>
                        <p className="text-[11px] opacity-80 font-medium">Format officiel d'identité pour candidature formelle</p>
                      </div>
                      <div className="w-6 h-8 rounded border-2 border-current shrink-0" />
                    </button>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 mt-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase">Orientation & Rotation</h4>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setRotation((prev) => (prev + 90) % 360)}
                        className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <RotateCw className="w-4 h-4 text-yellow-400" /> Tourner 90°
                      </button>
                      <button
                        onClick={() => setFlipH(!flipH)}
                        className={`flex-1 py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer ${
                          flipH ? 'bg-yellow-400 text-slate-950 font-black' : 'bg-slate-800 hover:bg-slate-700 text-white'
                        }`}
                      >
                        <MoveHorizontal className="w-4 h-4" /> Miroir
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 1: FRAMES & BADGES */}
              {activeTab === 'frame' && (
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                    Cadres & Badges Corporate Pro
                  </h3>
                  <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto pr-1">
                    {FRAMES.map(f => (
                      <button
                        key={f.id}
                        onClick={() => setSelectedFrame(f.id)}
                        className={`p-3.5 rounded-2xl border text-left flex items-center gap-4 transition-all cursor-pointer ${
                          selectedFrame === f.id 
                            ? 'bg-yellow-400 text-slate-950 font-black border-yellow-400 shadow-lg shadow-yellow-400/20' 
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div 
                          className="w-10 h-10 border-4 shrink-0 flex items-center justify-center font-bold text-xs" 
                          style={{ borderColor: f.color, borderRadius: f.shape === 'circle' ? '9999px' : f.shape === 'squircle' ? '12px' : '4px' }} 
                        />
                        <div>
                          <h4 className="text-xs font-bold">{f.name}</h4>
                          <p className="text-[10px] opacity-75">Bordure haute précision style exécutif</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: FILTERS & INTENSITY */}
              {activeTab === 'filters' && (
                <div className="space-y-5">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Filtres Artistiques & Studio
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {FILTERS.map(f => (
                      <button
                        key={f.id}
                        onClick={() => setActiveFilter(f.id)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          activeFilter === f.id 
                            ? 'bg-yellow-400 text-slate-950 font-black border-yellow-400 shadow-lg shadow-yellow-400/20' 
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <h4 className="text-xs font-bold">{f.name}</h4>
                      </button>
                    ))}
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 mt-4">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400">Intensité du filtre :</span>
                      <span className="text-yellow-400">{intensity}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={intensity} 
                      onChange={(e) => setIntensity(parseInt(e.target.value))}
                      className="w-full accent-yellow-400 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: LIGHTING ADJUSTMENTS */}
              {activeTab === 'adjust' && (
                <div className="space-y-5">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Réglages Manuels de Lumière
                  </h3>

                  <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-400">Luminosité :</span>
                        <span className="text-yellow-400">{brightness}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="50" 
                        max="150" 
                        value={brightness} 
                        onChange={(e) => setBrightness(parseInt(e.target.value))}
                        className="w-full accent-yellow-400 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-400">Contraste :</span>
                        <span className="text-yellow-400">{contrast}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="50" 
                        max="150" 
                        value={contrast} 
                        onChange={(e) => setContrast(parseInt(e.target.value))}
                        className="w-full accent-yellow-400 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-400">Saturation :</span>
                        <span className="text-yellow-400">{saturation}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="200" 
                        value={saturation} 
                        onChange={(e) => setSaturation(parseInt(e.target.value))}
                        className="w-full accent-yellow-400 cursor-pointer"
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => { setBrightness(100); setContrast(100); setSaturation(100); setActiveFilter('normal'); setIntensity(100); }} 
                    className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    Réinitialiser la lumière
                  </button>
                </div>
              )}

              {/* Change photo button */}
              {imageSrc && (
                <button 
                  onClick={() => fileInputRef.current?.click()} 
                  className="w-full mt-6 py-3 bg-slate-950 hover:bg-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider rounded-2xl border border-slate-800 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" /> Changer de Photo
                </button>
              )}

            </div>

          </div>

          {/* SEO Description & Guide Section */}
          <div className="mt-16 border-t border-slate-800 pt-12 text-slate-300 space-y-12">
            
            {/* Main Title & Features Grid */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                Le Studio Photo CV & Détourage IA n°1 en France
              </h2>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                Transformez n'importe quel portrait en une photo de CV de niveau studio professionnel en quelques secondes. 
                Profitez d'un détourage automatique par intelligence artificielle, de fonds de studio haut de gamme et d'un découpage aux normes passeport et CV web.
              </p>
            </div>

            {/* 4 Steps Guide */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
                <div className="w-10 h-10 bg-yellow-400/20 text-yellow-400 rounded-xl flex items-center justify-center font-black text-lg">1</div>
                <h3 className="font-bold text-white text-sm uppercase">1. Importation & Sécurité</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Importez votre photo depuis votre téléphone ou ordinateur. Vos données restent 100% privées et traitées localement dans votre navigateur.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
                <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center font-black text-lg">2</div>
                <h3 className="font-bold text-white text-sm uppercase">2. Détourage IA 1-Clic</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  L'Intelligence Artificielle analyse votre portrait pixel par pixel et supprime l'arrière-plan avec précision autour des cheveux et des épaules.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
                <div className="w-10 h-10 bg-pink-500/20 text-pink-400 rounded-xl flex items-center justify-center font-black text-lg">3</div>
                <h3 className="font-bold text-white text-sm uppercase">3. Fond Studio & Cadres</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Sélectionnez un fond Studio Blanc Pur, Gris Minimaliste ou Dégradé Executive, puis appliquez un cadre rond corporate ou un badge RH.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
                <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center font-black text-lg">4</div>
                <h3 className="font-bold text-white text-sm uppercase">4. Injection dans le CV</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Téléchargez votre photo HD retravaillée ou injectez-la en 1 clic directement dans notre générateur de CV en ligne gratuit.
                </p>
              </div>
            </div>

            {/* SEO Deep Content Section (800+ words) */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-10">
              
              <div className="border-b border-slate-800 pb-8 space-y-4">
                <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-yellow-400" /> Le Guide Complet : Réussir sa Photo de CV Professionnelle en 2026
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Dans un marché de l'emploi hautement concurrentiel, la photo de CV est l'un des premiers éléments visuels analysés par les recruteurs et responsables RH. 
                  Grâce aux récentes avancées en **Intelligence Artificielle et vision par ordinateur**, il n'est plus nécessaire de dépenser des dizaines d'euros chez un photographe professionnel en studio. 
                  Découvrez comment notre outil gratuit vous permet d'obtenir un rendu digne d'un portrait professionnel directement depuis votre smartphone.
                </p>
              </div>

              {/* H3 Section 1 */}
              <div className="grid md:grid-cols-2 gap-8 text-xs text-slate-300 leading-relaxed">
                <div className="space-y-3">
                  <h3 className="text-sm font-extrabold text-yellow-400 uppercase tracking-wider">
                    1. Pourquoi le Détourage IA est une Révolution pour votre CV ?
                  </h3>
                  <p>
                    Prendre une photo chez soi pose souvent le problème du fond d'arrière-plan : papier peint, pièces sombres, meubles visibles ou ombres encombrantes. 
                    Notre algorithme de **suppression d'arrière-plan par IA** (`ONNX WebAssembly`) analyse votre portrait avec une précision au pixel près.
                  </p>
                  <p>
                    Il isole les détails complexes tels que les mèche de cheveux, le col de la chemise ou les épaules pour les placer sur des **fonds de studio professionnels neutres** (Blanc Pur, Gris Minimaliste, Dégradé Bleu Corporate ou Open Space flouté).
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-extrabold text-blue-400 uppercase tracking-wider">
                    2. Formats & Normes : Passeport (3.5x4.5) vs Square Carré (1:1)
                  </h3>
                  <p>
                    Selon le secteur dans lequel vous postulez, les exigences de format varient :
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-slate-400">
                    <li><strong>Format Passeport (3.5 x 4.5 cm) :</strong> Recommandé pour les institutions, le droit, la finance et les grands groupes traditionnels en Europe.</li>
                    <li><strong>Format Carré Square (1:1) & Rond :</strong> Idéal pour la tech, le marketing, la communication et les profils LinkedIn.</li>
                  </ul>
                </div>
              </div>

              {/* H3 Section 2 */}
              <div className="border-t border-slate-800/80 pt-8 space-y-6">
                <h3 className="text-sm font-extrabold text-emerald-400 uppercase tracking-wider">
                  3. Conseils RH pour une Photo de CV Irréprochable
                </h3>
                <div className="grid sm:grid-cols-3 gap-6 text-xs text-slate-400">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <h4 className="font-bold text-white uppercase">La Posture & Le Sourire</h4>
                    <p>Tenez-vous droit, le regard ancré vers l'objectif avec un léger sourire naturel. Cela transmet spontanéité et confiance en soi.</p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <h4 className="font-bold text-white uppercase">L'Éclairage du Visage</h4>
                    <p>Privilégiez une lumière naturelle de face (devant une fenêtre). Utilisez notre curseur de lumière pour ré-équilibrer le contraste.</p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <h4 className="font-bold text-white uppercase">Tenue & Cadres Corporate</h4>
                    <p>Optez pour une tenue vestimentaire soignée et ajoutez un **cadre rond doré ou un badge argenté** pour structurer la photo sur votre CV.</p>
                  </div>
                </div>
              </div>

              {/* FAQ SEO Section */}
              <div className="border-t border-slate-800/80 pt-8 space-y-6">
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider text-center">
                  Foire Aux Questions (FAQ) - Photo de CV & Détourage IA
                </h3>

                <div className="grid md:grid-cols-2 gap-6 text-xs">
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                    <h4 className="font-bold text-yellow-400 text-xs">Mon image est-elle envoyée sur un serveur externe ?</h4>
                    <p className="text-slate-400 leading-relaxed">
                      Non, absolument pas. Tout le processus de détourage IA, de découpage et de retouche s'exécute localement dans votre navigateur web. Vos données personnelles et portraits restent 100% confidentiels.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                    <h4 className="font-bold text-yellow-400 text-xs">Le studio photo est-il vraiment 100% gratuit ?</h4>
                    <p className="text-slate-400 leading-relaxed">
                      Oui, le Studio Photo CV est un outil entièrement gratuit offert par <em>Mon CV Go</em>. Vous pouvez détourer, retoucher et télécharger vos photos en haute définition sans aucun frais.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                    <h4 className="font-bold text-yellow-400 text-xs">Comment injecter la photo directement dans mon CV ?</h4>
                    <p className="text-slate-400 leading-relaxed">
                      Une fois votre photo retravaillée, cliquez simplement sur le bouton <strong>"Injecter dans Mon CV"</strong>. Votre portrait sera immédiatement appliqué à votre CV dans notre <Link to="/create" className="text-blue-400 font-bold underline">créateur de CV interactif</Link>.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                    <h4 className="font-bold text-yellow-400 text-xs">Puis-je utiliser cette photo sur LinkedIn et mon Portfolio ?</h4>
                    <p className="text-slate-400 leading-relaxed">
                      Tout à fait ! Vous pouvez télécharger votre photo au format PNG HD avec fond studio pour l'utiliser sur LinkedIn, votre <Link to="/portfolio" className="text-blue-400 font-bold underline">Portfolio Professionnel</Link> ou vos badges d'entreprise.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}
