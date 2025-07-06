import React, { useState } from 'react';
import Button from './Button';
import './styles.css';

// All possible values for each variant
const HIERARCHIES = ['Primary', 'Secondary', 'Tertiary'];
const STATES = ['Default', 'Hover', 'Active', 'Focus', 'Disabled'];

// Helper to generate JSX code for the current button config
function getButtonJSX(props) {
  const {
    hierarchy,
    iconOnly,
    alternative,
    state,
    danger,
    success,
    label,
    showDropdown,
  } = props;
  let code = `<Button\n`;
  code += `  hierarchy=\"${hierarchy}\"\n`;
  code += `  iconOnly={${iconOnly}}\n`;
  code += `  alternative={${alternative}}\n`;
  code += `  state=\"${state}\"\n`;
  code += `  danger={${danger}}\n`;
  code += `  success={${success}}\n`;
  if (!iconOnly) code += `  label=\"${label}\"\n`;
  code += `  showDropdown={${showDropdown}}\n`;
  code += `/>`;
  return code;
}

export default function ButtonPlayground() {
  // Playground state
  const [hierarchy, setHierarchy] = useState('Primary');
  const [iconOnly, setIconOnly] = useState(false);
  const [alternative, setAlternative] = useState(false);
  const [state, setState] = useState('Default');
  const [danger, setDanger] = useState(false);
  const [success, setSuccess] = useState(false);
  const [label, setLabel] = useState('Button');
  const [showDropdown, setShowDropdown] = useState(true);
  const [tab, setTab] = useState('preview');
  const [copyMsg, setCopyMsg] = useState('');

  // Generate all combinations for the matrix
  const matrix = [];
  for (const h of HIERARCHIES) {
    for (const s of STATES) {
      for (const io of [false, true]) {
        for (const alt of [false, true]) {
          for (const d of [false, true]) {
            for (const suc of [false, true]) {
              // Only show valid combinations (e.g., don't show both danger and success)
              if (d && suc) continue;
              matrix.push({
                hierarchy: h,
                state: s,
                iconOnly: io,
                alternative: alt,
                danger: d,
                success: suc,
              });
            }
          }
        }
      }
    }
  }

  // Copy code to clipboard
  function handleCopy(code) {
    navigator.clipboard.writeText(code);
    setCopyMsg('Copied!');
    setTimeout(() => setCopyMsg(''), 1200);
  }

  // Current button props
  const buttonProps = {
    hierarchy,
    iconOnly,
    alternative,
    state,
    danger,
    success,
    label,
    showDropdown,
  };

  // Storybook-like palette
  const palette = {
    sidebar: '#f7f7fa',
    border: '#e2e4ea',
    background: '#f8f9fa',
    tabActive: '#5568f2',
    tabInactive: '#bfc3d9',
    text: '#232323',
    toolbar: '#f4f6fa',
    toolbarIcon: '#bfc3d9',
    toolbarIconActive: '#5568f2',
    divider: '#e2e4ea',
    contentPadding: '24px',
    contentMaxWidth: '1100px',
    tableHeader: '#fafbfc',
  };

  // Toolbar icons (SVGs as placeholders)
  const ToolbarIcon = ({ d, active, label }) => (
    <span title={label} style={{ display: 'inline-block', marginRight: 16, cursor: 'pointer' }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d={d} fill={active ? palette.toolbarIconActive : palette.toolbarIcon} />
      </svg>
    </span>
  );

  return (
    <div style={{ display: 'flex', height: '100vh', background: palette.background }}>
      {/* Sidebar: navigation only (no search bar) */}
      <aside style={{ width: 240, background: palette.sidebar, borderRight: `1px solid ${palette.border}`, padding: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ borderBottom: `1px solid ${palette.border}`, padding: '20px 0 12px 0', textAlign: 'center', fontWeight: 700, fontSize: 18, letterSpacing: 1 }}>
          Components
        </div>
        <nav style={{ borderBottom: `1px solid ${palette.border}` }}>
          <div style={{ padding: '12px 24px', fontWeight: 600, background: '#fff', borderLeft: `4px solid ${palette.tabActive}` }}>Button</div>
        </nav>
        {/* Future: add more components here as needed */}
      </aside>
      {/* Main content: tabs, preview, controls (toolbar removed) */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: `1px solid ${palette.border}`, background: '#fff' }}>
          <button onClick={() => setTab('preview')} style={{
            border: 'none',
            background: 'none',
            padding: '16px 32px',
            fontWeight: 600,
            color: tab === 'preview' ? palette.tabActive : palette.tabInactive,
            borderBottom: tab === 'preview' ? `3px solid ${palette.tabActive}` : '3px solid transparent',
            cursor: 'pointer',
            fontSize: 16,
          }}>Preview</button>
          <button onClick={() => setTab('matrix')} style={{
            border: 'none',
            background: 'none',
            padding: '16px 32px',
            fontWeight: 600,
            color: tab === 'matrix' ? palette.tabActive : palette.tabInactive,
            borderBottom: tab === 'matrix' ? `3px solid ${palette.tabActive}` : '3px solid transparent',
            cursor: 'pointer',
            fontSize: 16,
          }}>Matrix</button>
          <button onClick={() => setTab('code')} style={{
            border: 'none',
            background: 'none',
            padding: '16px 32px',
            fontWeight: 600,
            color: tab === 'code' ? palette.tabActive : palette.tabInactive,
            borderBottom: tab === 'code' ? `3px solid ${palette.tabActive}` : '3px solid transparent',
            cursor: 'pointer',
            fontSize: 16,
          }}>Show Code</button>
        </div>
        {/* Tab content */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          background: palette.background,
          padding: `0 ${palette.contentPadding}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}>
          {tab === 'preview' && (
            <>
              {/* Preview area: strictly left-aligned, no card, minimal margin */}
              <div style={{ margin: '32px 0 16px 0', minHeight: 60 }}>
                <Button {...buttonProps} />
              </div>
              {/* Divider */}
              <div style={{ width: '100%' }}>
                <hr style={{ border: 0, borderTop: `1px solid ${palette.divider}`, margin: 0 }} />
              </div>
              {/* Controls table: strictly left-aligned, no card, minimal padding */}
              <div style={{ margin: '24px 0 0 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15, background: 'transparent' }}>
                  <thead>
                    <tr style={{ background: palette.tableHeader }}>
                      <th style={{ textAlign: 'left', padding: '8px 8px', fontWeight: 700, borderBottom: `1px solid ${palette.border}` }}>Name</th>
                      <th style={{ textAlign: 'left', padding: '8px 8px', fontWeight: 700, borderBottom: `1px solid ${palette.border}` }}>Control</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '8px 8px' }}>hierarchy</td>
                      <td style={{ padding: '8px 8px' }}>
                        {HIERARCHIES.map(h => (
                          <label key={h} style={{ marginRight: 8, fontWeight: 400 }}>
                            <input type="radio" name="hierarchy" value={h} checked={hierarchy === h} onChange={() => setHierarchy(h)} /> {h}
                          </label>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '8px 8px' }}>state</td>
                      <td style={{ padding: '8px 8px' }}>
                        {STATES.map(s => (
                          <label key={s} style={{ marginRight: 8, fontWeight: 400 }}>
                            <input type="radio" name="state" value={s} checked={state === s} onChange={() => setState(s)} /> {s}
                          </label>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '8px 8px' }}>iconOnly</td>
                      <td style={{ padding: '8px 8px' }}>
                        <input type="checkbox" checked={iconOnly} onChange={e => setIconOnly(e.target.checked)} />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '8px 8px' }}>alternative</td>
                      <td style={{ padding: '8px 8px' }}>
                        <input type="checkbox" checked={alternative} onChange={e => setAlternative(e.target.checked)} />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '8px 8px' }}>danger</td>
                      <td style={{ padding: '8px 8px' }}>
                        <input type="checkbox" checked={danger} onChange={e => setDanger(e.target.checked)} disabled={success} />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '8px 8px' }}>success</td>
                      <td style={{ padding: '8px 8px' }}>
                        <input type="checkbox" checked={success} onChange={e => setSuccess(e.target.checked)} disabled={danger} />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '8px 8px' }}>showDropdown</td>
                      <td style={{ padding: '8px 8px' }}>
                        <input type="checkbox" checked={showDropdown} onChange={e => setShowDropdown(e.target.checked)} disabled={iconOnly} />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '8px 8px' }}>label</td>
                      <td style={{ padding: '8px 8px' }}>
                        <input type="text" value={label} onChange={e => setLabel(e.target.value)} disabled={iconOnly} style={{ width: 120 }} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
          {tab === 'matrix' && (
            <>
              {/* Matrix area: no card, minimal margin */}
              <div style={{ margin: '32px 0 0 0' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 15, background: 'transparent' }}>
                  <thead>
                    <tr style={{ background: palette.tableHeader }}>
                      <th>Hierarchy</th>
                      <th>State</th>
                      <th>Icon Only</th>
                      <th>Alternative</th>
                      <th>Danger</th>
                      <th>Success</th>
                      <th>Preview</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matrix.map((props, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                        <td>{props.hierarchy}</td>
                        <td>{props.state}</td>
                        <td>{props.iconOnly ? 'Yes' : 'No'}</td>
                        <td>{props.alternative ? 'Yes' : 'No'}</td>
                        <td>{props.danger ? 'Yes' : 'No'}</td>
                        <td>{props.success ? 'Yes' : 'No'}</td>
                        <td>
                          <Button
                            {...props}
                            label={props.iconOnly ? 'Info' : 'Button'}
                            showDropdown={!props.iconOnly}
                            state={props.state}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {tab === 'code' && (
            <>
              {/* Code area: no card, minimal margin */}
              <div style={{ margin: '32px 0 0 0', position: 'relative', minWidth: 320, width: '100%' }}>
                <pre style={{ background: '#f4f6fa', borderRadius: 6, padding: 20, fontSize: 15, fontFamily: 'Menlo, monospace', margin: 0, overflowX: 'auto' }}>
                  {getButtonJSX(buttonProps)}
                </pre>
                <button
                  onClick={() => handleCopy(getButtonJSX(buttonProps))}
                  style={{ position: 'absolute', top: 16, right: 16, background: palette.tabActive, color: '#fff', border: 'none', borderRadius: 4, padding: '6px 14px', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}
                >
                  Copy code
                </button>
                {copyMsg && <span style={{ position: 'absolute', top: 16, right: 110, color: palette.tabActive, fontWeight: 600 }}>{copyMsg}</span>}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
} 