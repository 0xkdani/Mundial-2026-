import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Camera, Scan, Info } from 'lucide-react';
import { CountryInfo } from './CountryInfo';
import { countriesData } from '../data/countries';

interface ARScannerProps {
  onBack: () => void;
}

export function ARScanner({ onBack }: ARScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      
      if (error instanceof DOMException) {
        if (error.name === 'NotAllowedError') {
          setCameraError('permission');
        } else if (error.name === 'NotFoundError') {
          setCameraError('notfound');
        } else if (error.name === 'NotReadableError') {
          setCameraError('inuse');
        } else {
          setCameraError('general');
        }
      } else {
        setCameraError('general');
      }
    }
  };

  const handleScan = (countryCode: string) => {
    setIsScanning(true);
    setTimeout(() => {
      setSelectedCountry(countryCode);
      setIsScanning(false);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        setCameraActive(false);
      }
    }, 1500);
  };

  const handleReset = () => {
    setSelectedCountry(null);
    setCameraActive(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  if (selectedCountry) {
    return <CountryInfo countryCode={selectedCountry} onBack={handleReset} />;
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-full font-bold text-sm uppercase mb-4 border border-purple-500">
            Realidad aumentada
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Escaner de banderas
          </h2>
          <p className="text-xl text-gray-400">
            {cameraActive ? 'Apunta tu camara a una bandera para saber mas' : 'Activa tu camara para comenzar'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-black rounded-3xl p-8 shadow-xl mb-8 border border-purple-900">
          {/* Camera View */}
          <div className="relative bg-slate-900 rounded-2xl overflow-hidden mb-6 border-2 border-purple-700" style={{ aspectRatio: '16/9' }}>
            {!cameraActive ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-black">
                {!cameraError ? (
                  <>
                    <Camera className="w-24 h-24 text-purple-500 mb-6" />
                    <button
                      onClick={startCamera}
                      className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg border-2 border-purple-500"
                    >
                      Activar camara
                    </button>
                  </>
                ) : (
                  <div className="max-w-md px-6">
                    <div className="bg-red-50 border-2 border-red-200 text-red-900 rounded-2xl p-6 mb-6">
                      <div className="text-4xl mb-3 text-center">⚠️</div>
                      <h3 className="text-xl font-bold mb-3 text-center">
                        {cameraError === 'permission' && 'Permiso de camara denegado'}
                        {cameraError === 'notfound' && 'No se encontro camara'}
                        {cameraError === 'inuse' && 'Camara en uso'}
                        {cameraError === 'general' && 'Error de camara'}
                      </h3>
                      <p className="text-center mb-4 text-sm">
                        {cameraError === 'permission' && 'Permite el acceso a la camara en la configuracion del navegador para usar esta funcion.'}
                        {cameraError === 'notfound' && 'No se detecto ninguna camara en tu dispositivo.'}
                        {cameraError === 'inuse' && 'La camara esta siendo usada por otra aplicacion.'}
                        {cameraError === 'general' && 'Ocurrio un error al acceder a la camara.'}
                      </p>
                      
                      {cameraError === 'permission' && (
                        <div className="bg-white rounded-xl p-4 mb-4 text-left">
                          <p className="text-sm font-bold mb-2">Como habilitar la camara:</p>
                          <ul className="text-sm space-y-1 list-disc list-inside text-slate-600">
                            <li>Busca el icono de camara en la barra de direcciones</li>
                            <li>Haz clic y selecciona "Permitir"</li>
                            <li>Recarga la pagina si es necesario</li>
                          </ul>
                        </div>
                      )}
                      
                      <button
                        onClick={startCamera}
                        className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold transition-colors"
                      >
                        Intentar de nuevo
                      </button>
                    </div>
                    
                    <div className="bg-blue-50 border-2 border-blue-200 text-blue-900 rounded-2xl p-6">
                      <p className="text-center font-bold mb-2">
                        💡 Continue without camera
                      </p>
                      <p className="text-center text-sm">
                        Desplazate hacia abajo para seleccionar un pais manualmente
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                
                {/* Scanning overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative w-64 h-64 border-4 border-white/50 rounded-2xl">
                    <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-blue-500 rounded-tl-2xl"></div>
                    <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-blue-500 rounded-tr-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-blue-500 rounded-bl-2xl"></div>
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-blue-500 rounded-br-2xl"></div>
                    
                    {isScanning && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-1 bg-purple-500 shadow-lg"></div>
                      </div>
                    )}
                  </div>
                </div>

                {isScanning && (
                  <div className="absolute bottom-6 left-0 right-0 text-center">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-full font-bold shadow-xl border-2 border-purple-500">
                      <Scan className="w-5 h-5 animate-spin" />
                      Escaneando...
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Country Selection for Demo */}
          {cameraActive && !isScanning && (
            <div>
              <div className="flex items-center gap-3 bg-purple-900/50 border border-purple-700 text-white px-6 py-3 rounded-xl mb-6">
                <Info className="w-5 h-5" />
                <p className="font-semibold text-sm">Selecciona un pais para simular el escaneo:</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.keys(countriesData).map((countryCode) => (
                  <button
                    key={countryCode}
                    onClick={() => handleScan(countryCode)}
                    className="bg-slate-800 hover:bg-slate-700 border-2 border-purple-700 hover:border-purple-500 rounded-xl p-4 transition-all hover-lift"
                  >
                    <div className="text-5xl mb-2">{countriesData[countryCode].flag}</div>
                    <div className="text-sm font-semibold text-white">{countriesData[countryCode].name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Manual selection on error */}
          {!cameraActive && cameraError && (
            <div>
              <div className="flex items-center gap-3 bg-purple-900/50 border border-purple-700 text-white px-6 py-3 rounded-xl mb-6">
                <Info className="w-5 h-5" />
                <p className="font-semibold text-sm">Selecciona un pais para ver informacion:</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.keys(countriesData).map((countryCode) => (
                  <button
                    key={countryCode}
                    onClick={() => handleScan(countryCode)}
                    className="bg-slate-800 hover:bg-slate-700 border-2 border-purple-700 hover:border-purple-500 rounded-xl p-4 transition-all hover-lift"
                  >
                    <div className="text-5xl mb-2">{countriesData[countryCode].flag}</div>
                    <div className="text-sm font-semibold text-white">{countriesData[countryCode].name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-black rounded-2xl p-8 shadow-lg border border-purple-900">
          <h3 className="text-2xl font-bold text-white mb-4">Como funciona</h3>
          <ol className="space-y-4 text-gray-300">
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm border border-purple-400">1</span>
              <span className="pt-1">Activa la camara de tu dispositivo</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm border border-purple-400">2</span>
              <span className="pt-1">Apunta a una bandera o selecciona un pais</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm border border-purple-400">3</span>
              <span className="pt-1">Obtiene informacion instantanea del equipo y sus mejores jugadores</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
