import { useRef, useState, type ReactNode } from 'react';
import { profileStore, useProfile } from '../core/progress/store';
import type { Settings } from '../core/progress/profile';

function setSetting<K extends keyof Settings>(key: K, value: Settings[K]) {
  profileStore.update((p) => ({ ...p, settings: { ...p.settings, [key]: value } }));
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="field">
      <div>
        <label>{label}</label>
        {hint && <span className="dim">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <span className="switch">
      <input type="checkbox" role="switch" aria-label={label} checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span />
    </span>
  );
}

export function SettingsPage() {
  const p = useProfile();
  const s = p.settings;
  const [name, setName] = useState(p.name);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const saveName = () => {
    const n = name.trim().slice(0, 40);
    if (n && n !== p.name) profileStore.update((x) => ({ ...x, name: n }));
    else setName(p.name);
  };

  const doExport = () => {
    const blob = new Blob([profileStore.exportJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `driving-academy-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMsg({ ok: true, text: 'Copia de seguridad descargada.' });
  };

  const doImport = async (file: File) => {
    try {
      profileStore.importJson(await file.text());
      setName(profileStore.get().name);
      setMsg({ ok: true, text: 'Progreso restaurado correctamente.' });
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : String(e) });
    }
  };

  return (
    <>
      <header className="page-head">
        <div>
          <h1>Configuración</h1>
          <p className="muted">Los cambios se guardan automáticamente{profileStore.persistent ? '' : ' (el almacenamiento del navegador no está disponible: los datos se perderán al cerrar)'}.</p>
        </div>
      </header>

      <div className="grid grid-2">
        <div className="card">
          <h3>Perfil</h3>
          <Field label="Nombre del estudiante">
            <input type="text" value={name} maxLength={40} onChange={(e) => setName(e.target.value)} onBlur={saveName} onKeyDown={(e) => e.key === 'Enter' && (e.currentTarget as HTMLInputElement).blur()} aria-label="Nombre" />
          </Field>
          <h3 style={{ marginTop: 20 }}>Accesibilidad</h3>
          <Field label="Reducir animaciones">
            <Switch label="Reducir animaciones" checked={s.reducedMotion} onChange={(v) => setSetting('reducedMotion', v)} />
          </Field>
          <Field label="Textos del instructor" hint="Muestra las indicaciones en pantalla">
            <Switch label="Textos del instructor" checked={s.instructorText} onChange={(v) => setSetting('instructorText', v)} />
          </Field>
          <Field label="Voz del instructor" hint="Lee las indicaciones en voz alta (voz en español del sistema)">
            <Switch label="Voz del instructor" checked={s.instructorVoice} onChange={(v) => setSetting('instructorVoice', v)} />
          </Field>
        </div>

        <div className="card">
          <h3>Simulador</h3>
          <Field label="Calidad gráfica" hint="Nivel con el que empieza el simulador; después se ajusta solo según los FPS">
            <select value={s.quality} onChange={(e) => setSetting('quality', e.target.value as Settings['quality'])} aria-label="Calidad gráfica">
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </Field>
          <Field label="Sombras">
            <Switch label="Sombras" checked={s.shadows} onChange={(v) => setSetting('shadows', v)} />
          </Field>
          <Field label="Cámara inicial">
            <select value={s.defaultCamera} onChange={(e) => setSetting('defaultCamera', e.target.value as Settings['defaultCamera'])} aria-label="Cámara inicial">
              <option value="primera">Primera persona</option>
              <option value="tercera">Tercera persona</option>
            </select>
          </Field>
          <Field label="Sonido">
            <Switch label="Sonido" checked={s.sound} onChange={(v) => setSetting('sound', v)} />
          </Field>
          <Field label="Volumen">
            <input type="range" min={0} max={1} step={0.05} value={s.volume} disabled={!s.sound} onChange={(e) => setSetting('volume', Number(e.target.value))} aria-label="Volumen" />
          </Field>
        </div>
      </div>

      <div className="card section">
        <h3>Datos y copia de seguridad</h3>
        <p className="dim" style={{ margin: '4px 0 14px' }}>Todo tu progreso se guarda solo en este equipo. Exporta una copia para no perderlo.</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="btn primary" onClick={doExport}>Exportar progreso</button>
          <button className="btn" onClick={() => fileRef.current?.click()}>Importar progreso</button>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) void doImport(f); e.target.value = ''; }} />
          {!confirmReset ? (
            <button className="btn danger" onClick={() => setConfirmReset(true)}>Reiniciar progreso…</button>
          ) : (
            <>
              <button className="btn danger" onClick={() => { profileStore.reset(); setName(profileStore.get().name); setConfirmReset(false); setMsg({ ok: true, text: 'Progreso reiniciado.' }); }}>Sí, borrar todo</button>
              <button className="btn" onClick={() => setConfirmReset(false)}>Cancelar</button>
            </>
          )}
        </div>
        {confirmReset && <p className="dim" style={{ marginTop: 10, color: '#fca5a5' }}>Se borrará todo tu progreso de este equipo. No se puede deshacer salvo que tengas una copia exportada.</p>}
        {msg && <p style={{ marginTop: 12, color: msg.ok ? '#86efac' : '#fca5a5' }} role="status">{msg.text}</p>}
      </div>
    </>
  );
}
