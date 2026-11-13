import { StrictMode, Component, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import './styles/global.css';

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error) {
    console.error('[Driving Academy]', error);
  }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{ padding: 32, maxWidth: 560, margin: '10vh auto' }} className="card">
        <h2>Algo ha fallado</h2>
        <p className="muted" style={{ margin: '10px 0 18px' }}>
          Tu progreso está guardado. Detalle técnico: {this.state.error.message}
        </p>
        <button className="btn primary" onClick={() => location.reload()}>Recargar</button>
      </div>
    );
  }
}

const root = document.getElementById('root');
if (!root) throw new Error('Falta el elemento #root');
createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
