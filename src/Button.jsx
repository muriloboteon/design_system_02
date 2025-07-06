import React from 'react';
import './styles.css';

// Icon SVG URLs from Figma assets (example, replace with actual as needed)
const ICON_INFO = 'http://localhost:3845/assets/8e8a776f3ff49065d0a2ac7447d63bb14e46e040.svg';
const ICON_DROPDOWN = 'http://localhost:3845/assets/ec18385fa09161bdb6ad7b6b71701170fa604998.svg';

/**
 * Button component supporting all Figma design system variants.
 *
 * Props:
 * - hierarchy: 'Primary' | 'Secondary' | 'Tertiary'
 * - iconOnly: boolean
 * - alternative: boolean
 * - state: 'Default' | 'Hover' | 'Active' | 'Focus' | 'Disabled'
 * - danger: boolean
 * - success: boolean
 * - label: string (button text)
 * - showDropdown: boolean (show dropdown icon)
 * - onClick: function
 */
function getButtonColors({ hierarchy, state, danger, success, alternative }) {
  // Base color logic from design tokens
  if (state === 'Disabled') {
    if (hierarchy === 'Primary') return { bg: 'var(--button-primary-disabled)', color: 'var(--button-disabled)', border: 'none' };
    if (hierarchy === 'Secondary') return { bg: 'var(--button-primary-disabled)', color: 'var(--button-disabled)', border: '1px solid var(--button-disabled)' };
    if (hierarchy === 'Tertiary') return { bg: 'var(--button-primary-disabled)', color: 'var(--button-disabled)', border: 'none' };
  }
  if (state === 'Hover') {
    if (danger) return { bg: 'var(--button-danger-hover)', color: 'var(--button-on-color)', border: 'none' };
    if (success) return { bg: 'var(--button-success-hover)', color: 'var(--button-on-color)', border: 'none' };
    if (hierarchy === 'Primary') return { bg: 'var(--button-primary-hover)', color: 'var(--button-on-color)', border: 'none' };
    if (hierarchy === 'Secondary') return { bg: 'var(--button-secondary-hover)', color: 'var(--button-on-color)', border: '1px solid var(--button-secondary-hover)' };
    if (hierarchy === 'Tertiary') return { bg: 'transparent', color: 'var(--button-tertiary-hover)', border: 'none' };
  }
  if (state === 'Active') {
    if (danger) return { bg: 'var(--button-danger-active)', color: 'var(--button-on-color)', border: 'none' };
    if (success) return { bg: 'var(--button-success-active)', color: 'var(--button-on-color)', border: 'none' };
    if (hierarchy === 'Primary') return { bg: 'var(--button-primary-active)', color: 'var(--button-on-color)', border: 'none' };
    if (hierarchy === 'Secondary') return { bg: 'var(--button-primary-disabled)', color: 'var(--button-secondary-active)', border: '1px solid var(--button-secondary-active)' };
    if (hierarchy === 'Tertiary') return { bg: 'var(--button-primary-disabled)', color: 'var(--button-tertiary-active)', border: 'none' };
  }
  if (state === 'Focus') {
    if (danger) return { bg: 'var(--button-danger)', color: 'var(--button-on-color)', border: '2px solid var(--button-danger)' };
    if (success) return { bg: 'var(--button-success)', color: 'var(--button-on-color)', border: '2px solid var(--button-success)' };
    if (hierarchy === 'Primary') return { bg: 'var(--button-primary)', color: 'var(--button-on-color)', border: '2px solid var(--button-primary)' };
    if (hierarchy === 'Secondary') return { bg: 'var(--button-primary)', color: 'var(--button-on-color)', border: '2px solid var(--button-primary)' };
    if (hierarchy === 'Tertiary') return { bg: 'transparent', color: 'var(--button-tertiary)', border: '2px solid var(--button-tertiary)' };
  }
  // Default state
  if (danger) return { bg: 'var(--button-danger)', color: 'var(--button-on-color)', border: 'none' };
  if (success) return { bg: 'var(--button-success)', color: 'var(--button-on-color)', border: 'none' };
  if (hierarchy === 'Primary') return { bg: 'var(--button-primary)', color: 'var(--button-on-color)', border: 'none' };
  if (hierarchy === 'Secondary') {
    if (alternative) return { bg: 'transparent', color: 'var(--button-secondary-alt)', border: '1px solid var(--button-secondary-alt)' };
    return { bg: 'transparent', color: 'var(--button-primary)', border: '1px solid var(--button-primary)' };
  }
  if (hierarchy === 'Tertiary') {
    if (alternative) return { bg: 'transparent', color: 'var(--button-tertiary-alt)', border: 'none' };
    return { bg: 'transparent', color: 'var(--button-tertiary)', border: 'none' };
  }
  return { bg: 'var(--button-primary)', color: 'var(--button-on-color)', border: 'none' };
}

const Button = React.forwardRef(function Button({
  hierarchy = 'Primary',
  iconOnly = false,
  alternative = false,
  state = 'Default',
  danger = false,
  success = false,
  label = 'Button',
  showDropdown = true,
  onClick,
  ...rest
}, ref) {
  const isDisabled = state === 'Disabled';
  const colors = getButtonColors({ hierarchy, state, danger, success, alternative });
  const ariaLabel = iconOnly ? label : undefined;

  return (
    <button
      className={`button${iconOnly ? ' button--icon-only' : ''}`}
      style={{
        background: colors.bg,
        color: colors.color,
        border: colors.border,
        pointerEvents: isDisabled ? 'none' : undefined,
        opacity: isDisabled ? 0.6 : 1,
      }}
      aria-label={ariaLabel}
      aria-disabled={isDisabled}
      disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      ref={ref}
      onClick={isDisabled ? undefined : onClick}
      {...rest}
    >
      {/* Icon (left) */}
      <span className="button__icon" aria-hidden="true">
        <img src={ICON_INFO} alt="" style={{ width: 16, height: 16 }} />
      </span>
      {/* Label */}
      {!iconOnly && <span className="button__label">{label}</span>}
      {/* Dropdown icon (right) */}
      {showDropdown && !iconOnly && (
        <span className="button__icon" aria-hidden="true">
          <img src={ICON_DROPDOWN} alt="" style={{ width: 10, height: 10 }} />
        </span>
      )}
    </button>
  );
});

export default Button; 