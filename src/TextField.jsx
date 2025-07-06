import React from 'react';
import './styles.css';

// Design tokens (should match styles.css)
const BORDER_RADIUS = '5px';
const FONT_FAMILY = 'Open Sans, sans-serif';
const FONT_SIZE = '14px';
const LABEL_FONT_SIZE = '11px';
const COLORS = {
  border: '#232323',
  borderSelected: '#5568f2',
  borderHover: '#5a6eff',
  borderError: '#ef576b',
  borderSuccess: '#00a078',
  borderDisabled: '#c9cfff',
  bg: '#fff',
  bgDisabled: '#eff1ff',
  text: '#232323',
  label: '#232323',
  labelSelected: '#5568f2',
  labelError: '#cf455c',
  labelSuccess: '#008563',
  errorText: '#cf455c',
};

// SVG icon URLs (replace with your asset URLs as needed)
const ERROR_ICON = 'http://localhost:3845/assets/65ffbff36836155170efab6294fadb9adb03b111.svg';
const SUCCESS_ICON = 'http://localhost:3845/assets/059e0dd28382f409c3fcb87e17c5a58b31135134.svg';

export default function TextField({
  state = 'Default',
  floatingLabel = false,
  label = 'Label',
  value = '',
  placeholder = '',
  errorMessage = 'Error message',
  disabled = false,
  onChange,
}) {
  // Determine styles based on state
  let borderColor = COLORS.border;
  let labelColor = COLORS.label;
  let bgColor = COLORS.bg;
  let showError = false;
  let showSuccess = false;
  let showCheck = false;
  let showErrorIcon = false;

  if (state === 'Hover') borderColor = COLORS.borderHover;
  if (state === 'Selected') {
    borderColor = COLORS.borderSelected;
    labelColor = COLORS.labelSelected;
  }
  if (state === 'Error') {
    borderColor = COLORS.borderError;
    labelColor = COLORS.labelError;
    showError = true;
    showErrorIcon = true;
  }
  if (state === 'Success') {
    borderColor = COLORS.borderSuccess;
    labelColor = COLORS.labelSuccess;
    showSuccess = true;
    showCheck = true;
  }
  if (state === 'Disabled') {
    borderColor = COLORS.borderDisabled;
    bgColor = COLORS.bgDisabled;
    disabled = true;
  }
  if (state === 'Filled') {
    borderColor = COLORS.border;
  }

  // Floating label logic
  const showFloating = floatingLabel && (state !== 'Default' || value);

  return (
    <div className="textfield-root" style={{ width: 280, fontFamily: FONT_FAMILY }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: floatingLabel ? 10 : 4 }}>
        {floatingLabel && (
          <label
            className="textfield-label"
            style={{
              fontSize: LABEL_FONT_SIZE,
              color: labelColor,
              marginBottom: -6,
              marginLeft: 8,
              background: COLORS.bg,
              padding: '0 4px',
              position: 'relative',
              top: showFloating ? 0 : 18,
              transition: 'top 0.2s, color 0.2s',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          >
            {label}
          </label>
        )}
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            className="textfield-input"
            type="text"
            value={value}
            placeholder={floatingLabel ? '' : placeholder}
            disabled={disabled}
            onChange={onChange}
            style={{
              width: '100%',
              height: 28,
              border: `1px solid ${borderColor}`,
              borderRadius: BORDER_RADIUS,
              background: bgColor,
              fontFamily: FONT_FAMILY,
              fontSize: FONT_SIZE,
              color: COLORS.text,
              padding: '0 8px',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
          />
          {showCheck && (
            <img src={SUCCESS_ICON} alt="Success" style={{ position: 'absolute', right: 8, top: 6, width: 16, height: 16 }} />
          )}
        </div>
        {showError && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: COLORS.errorText, fontSize: LABEL_FONT_SIZE, marginTop: 2 }}>
            {showErrorIcon && <img src={ERROR_ICON} alt="Error" style={{ width: 16, height: 16 }} />}
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
} 