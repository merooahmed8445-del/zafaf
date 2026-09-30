'use client';

import { useState, useRef } from 'react';
import { InvitationFormData } from '@/types/database';
import { uploadInvitationPhoto, uploadInvitationAudio } from '@/lib/storage';
import { Card, CardBody } from '@/components/ui/Card';

interface Step3MediaProps {
  data: InvitationFormData;
  errors: Record<string, string>;
  onChange: (updates: Partial<InvitationFormData>) => void;
  userId: string;
}

type AudioSource = 'none' | 'preset' | 'url' | 'file';

export function Step3Media({ data, errors, onChange, userId }: Step3MediaProps) {
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingAudio, setUploadingAudio] = useState(false);
  const [photoError, setPhotoError] = useState('');
  const [audioError, setAudioError] = useState('');
  const [audioSource, setAudioSource] = useState<AudioSource>(
    data.audio_url ? 'url' : 'none'
  );
  const [customAudioUrl, setCustomAudioUrl] = useState(data.audio_url || '');

  const photoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const audioPreviewRef = useRef<HTMLAudioElement>(null);

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    setPhotoError('');

    const { url, error } = await uploadInvitationPhoto(userId, file);

    if (error) {
      setPhotoError(error);
    } else if (url) {
      onChange({ photo_url: url });
    }

    setUploadingPhoto(false);
    if (photoInputRef.current) photoInputRef.current.value = '';
  }

  async function handleAudioUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAudio(true);
    setAudioError('');

    const { url, error } = await uploadInvitationAudio(userId, file);

    if (error) {
      setAudioError(error);
    } else if (url) {
      onChange({ audio_url: url });
      setCustomAudioUrl(url);
    }

    setUploadingAudio(false);
    if (audioInputRef.current) audioInputRef.current.value = '';
  }

  function handleAudioSourceChange(source: AudioSource) {
    setAudioSource(source);
    setAudioError('');

    if (source === 'none') {
      onChange({ audio_url: '' });
    } else if (source === 'preset') {
      // preset harp كقيمة مبدئية
      onChange({ audio_url: 'preset:harp' });
    } else if (source === 'url') {
      onChange({ audio_url: customAudioUrl });
    }
  }

  function handleUrlChange(url: string) {
    setCustomAudioUrl(url);
    onChange({ audio_url: url });
  }

  function testAudio() {
    if (audioPreviewRef.current && data.audio_url && !data.audio_url.startsWith('preset:')) {
      audioPreviewRef.current.volume = data.audio_volume;
      audioPreviewRef.current.play().catch(() => {});
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center pb-6 border-b border-parchment-200">
        <div className="text-5xl mb-3">🎵</div>
        <h2 className="text-2xl font-bold text-maroon-900 mb-2 font-display">
          الصورة والموسيقى
        </h2>
        <p className="text-sm text-maroon-900/60">
          اللمسات الإبداعية اللي هتخلي دعوتك مميزة
        </p>
      </div>

      {/* ===== Photo Section ===== */}
      <Card>
        <CardBody className="p-6">
          <h3 className="text-lg font-bold text-maroon-900 mb-4 flex items-center gap-2">
            <span>📸</span> صورة العروسين
          </h3>

          {data.photo_url ? (
            <div className="space-y-4">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-gold-300 shadow-lg">
                <img
                  src={data.photo_url}
                  alt="صورة العروسين"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => onChange({ photo_url: '' })}
                className="text-sm text-red-600 hover:text-red-700 font-semibold"
              >
                🗑️ حذف الصورة
              </button>
            </div>
          ) : (
            <label className="block border-2 border-dashed border-gold-300 hover:border-gold-400 rounded-2xl p-8 text-center cursor-pointer transition-all bg-gold-50/30">
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                disabled={uploadingPhoto}
                className="hidden"
              />
              {uploadingPhoto ? (
                <>
                  <div className="w-12 h-12 mx-auto mb-3 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
                  <p className="text-sm font-bold text-maroon-900">جاري الرفع...</p>
                </>
              ) : (
                <>
                  <div className="text-4xl mb-3">📤</div>
                  <p className="text-sm font-bold text-maroon-900 mb-1">
                    اضغط لاختيار صورة
                  </p>
                  <p className="text-xs text-maroon-900/60">
                    JPG أو PNG — الحد الأقصى 5MB
                  </p>
                </>
              )}
            </label>
          )}

          {photoError && (
            <p className="text-sm text-red-600 mt-3">⚠️ {photoError}</p>
          )}
        </CardBody>
      </Card>

      {/* ===== Audio Section ===== */}
      <Card>
        <CardBody className="p-6">
          <h3 className="text-lg font-bold text-maroon-900 mb-4 flex items-center gap-2">
            <span>🎵</span> موسيقى الخلفية
          </h3>

          {/* Source Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            {[
              { key: 'none', label: 'بدون موسيقى', icon: '🔇' },
              { key: 'preset', label: 'موسيقى جاهزة', icon: '🎼' },
              { key: 'url', label: 'رابط MP3', icon: '🔗' },
              { key: 'file', label: 'رفع ملف', icon: '📁' },
            ].map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => handleAudioSourceChange(opt.key as AudioSource)}
                className={[
                  'flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all text-xs font-bold',
                  audioSource === opt.key
                    ? 'border-gold-500 bg-gold-50 text-maroon-900'
                    : 'border-parchment-200 bg-white text-maroon-900/60 hover:border-gold-300',
                ].join(' ')}
              >
                <span className="text-2xl">{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>

          {/* Preset */}
          {audioSource === 'preset' && (
            <div className="space-y-3">
              <p className="text-sm text-maroon-900/60">
                هنعمل 3 مقاطع موسيقية مولّدة (قريباً)
              </p>
              <div className="p-4 rounded-xl bg-gold-50 border border-gold-200">
                <p className="text-sm font-bold text-maroon-900">
                  🎼 موسيقى هارب ملكية (قريباً)
                </p>
              </div>
            </div>
          )}

          {/* URL */}
          {audioSource === 'url' && (
            <div className="space-y-3">
              <label className="block text-sm font-bold text-maroon-900 mb-1">
                رابط MP3 مباشر
              </label>
              <input
                type="url"
                value={customAudioUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://example.com/music.mp3"
                dir="ltr"
                className="w-full px-4 py-2.5 rounded-xl border border-parchment-300 bg-parchment-50 text-maroon-950 text-left focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
              <p className="text-xs text-maroon-900/60">
                الصق رابط مباشر لملف MP3
              </p>
            </div>
          )}

          {/* File Upload */}
          {audioSource === 'file' && (
            <label className="block border-2 border-dashed border-gold-300 hover:border-gold-400 rounded-2xl p-6 text-center cursor-pointer transition-all bg-gold-50/30">
              <input
                ref={audioInputRef}
                type="file"
                accept="audio/*"
                onChange={handleAudioUpload}
                disabled={uploadingAudio}
                className="hidden"
              />
              {uploadingAudio ? (
                <>
                  <div className="w-12 h-12 mx-auto mb-3 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
                  <p className="text-sm font-bold text-maroon-900">جاري الرفع...</p>
                </>
              ) : (
                <>
                  <div className="text-4xl mb-3">🎵</div>
                  <p className="text-sm font-bold text-maroon-900 mb-1">
                    اضغط لاختيار ملف صوتي
                  </p>
                  <p className="text-xs text-maroon-900/60">
                    MP3 أو M4A — الحد الأقصى 10MB
                  </p>
                </>
              )}
            </label>
          )}

          {audioError && (
            <p className="text-sm text-red-600 mt-3">⚠️ {audioError}</p>
          )}

          {/* Preview */}
          {data.audio_url && !data.audio_url.startsWith('preset:') && (
            <div className="mt-4 p-4 rounded-xl bg-gold-50 border border-gold-200">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-maroon-900">🎧 معاينة</p>
                <button
                  type="button"
                  onClick={testAudio}
                  className="text-xs px-3 py-1 rounded-lg bg-gold-500 text-maroon-950 font-bold"
                >
                  ▶ تشغيل
                </button>
              </div>
              <audio
                ref={audioPreviewRef}
                src={data.audio_url}
                controls
                className="w-full"
              />
            </div>
          )}

          {/* Volume */}
          {data.audio_url && (
            <div className="mt-4">
              <label className="block text-sm font-bold text-maroon-900 mb-2">
                مستوى الصوت: {Math.round((data.audio_volume || 0.8) * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={data.audio_volume}
                onChange={(e) => onChange({ audio_volume: parseFloat(e.target.value) })}
                className="w-full accent-gold-500 cursor-pointer"
              />
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}