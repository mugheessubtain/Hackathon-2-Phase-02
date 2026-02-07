"use client";

// ============================================
// BUTTONS COMPONENTS
// ============================================

export function PrimaryButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold bg-[#00C853] text-black hover:bg-[#00E676] transition-all duration-300 shadow-lg shadow-[#00C853]/25 hover:shadow-[#00C853]/40 hover:scale-105 ${className}`}
    >
      {children}
      <svg 
        className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </button>
  );
}

export function SecondaryButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-medium border border-gray-700 text-white hover:bg-gray-900 hover:border-[#00C853]/50 transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-xl text-base font-medium text-gray-400 hover:text-[#00C853] hover:bg-[#00C853]/5 transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

export function IconButton({ icon, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-[#00C853] hover:border-[#00C853]/50 hover:bg-gray-800 transition-all duration-300 ${className}`}
    >
      {icon}
    </button>
  );
}

// ============================================
// CARD COMPONENTS
// ============================================

export function BasicCard({ title, children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/40 to-black/40 backdrop-blur-sm p-6 hover:border-[#00C853]/50 transition-all duration-300 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>}
      {children}
    </div>
  );
}

export function FeatureCard({ icon, title, description, className = "" }) {
  return (
    <div className={`group relative rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm p-8 hover:border-[#00C853]/50 transition-all duration-300 ${className}`}>
      <div className="absolute inset-0 rounded-2xl bg-[#00C853]/0 group-hover:bg-[#00C853]/5 transition-all duration-300"></div>
      
      <div className="relative">
        <div className="w-14 h-14 mb-5 mx-auto rounded-xl bg-[#00C853]/10 border border-[#00C853]/20 flex items-center justify-center group-hover:bg-[#00C853]/20 group-hover:scale-110 transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export function DashboardPanel({ title, action, children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {action && (
          <button className="text-sm text-[#00C853] hover:text-[#00E676] font-medium transition-colors">
            {action}
          </button>
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

// ============================================
// FORM COMPONENTS
// ============================================

export function TextInput({ label, placeholder, value, onChange, type = "text", className = "" }) {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/20 transition-all duration-300"
        placeholder={placeholder}
      />
    </div>
  );
}

export function TextArea({ label, placeholder, value, onChange, rows = 4, className = "" }) {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>}
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/20 transition-all duration-300 resize-none"
        placeholder={placeholder}
      />
    </div>
  );
}

export function Checkbox({ label, checked, onChange, className = "" }) {
  return (
    <label className={`flex items-center cursor-pointer group ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 rounded border-gray-700 bg-gray-900 text-[#00C853] focus:ring-2 focus:ring-[#00C853]/20 transition-all duration-300"
      />
      <span className="ml-3 text-sm text-gray-300 group-hover:text-white transition-colors">
        {label}
      </span>
    </label>
  );
}

export function Select({ label, options, value, onChange, className = "" }) {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/20 transition-all duration-300"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ============================================
// BADGE COMPONENTS
// ============================================

export function StatusBadge({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#00C853]/10 text-[#00C853] border border-[#00C853]/20 ${className}`}>
      {children}
    </span>
  );
}

export function CountBadge({ count, className = "" }) {
  return (
    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-[#00C853] text-black ${className}`}>
      {count}
    </span>
  );
}

// ============================================
// LOADING COMPONENTS
// ============================================

export function Spinner({ className = "" }) {
  return (
    <div className={`inline-block w-6 h-6 border-2 border-gray-700 border-t-[#00C853] rounded-full animate-spin ${className}`}></div>
  );
}

export function Skeleton({ className = "" }) {
  return (
    <div className={`animate-pulse space-y-4 ${className}`}>
      <div className="h-4 bg-gray-800 rounded w-3/4"></div>
      <div className="h-4 bg-gray-800 rounded w-1/2"></div>
    </div>
  );
}

// ============================================
// NAVIGATION COMPONENTS
// ============================================

export function Navbar({ logo, navLinks, ctaButtons }) {
  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#00C853]/10 rounded-lg border border-[#00C853]/20 flex items-center justify-center">
              {logo}
            </div>
            <span className="font-bold text-lg text-white">TodoApp</span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks?.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-900 transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center space-x-3">{ctaButtons}</div>
        </div>
      </div>
    </nav>
  );
}

// ============================================
// ALERT/NOTIFICATION COMPONENTS
// ============================================

export function Alert({ type = "info", title, message, onClose }) {
  const styles = {
    success: "bg-[#00C853]/10 border-[#00C853]/30 text-[#00C853]",
    error: "bg-red-500/10 border-red-500/30 text-red-400",
    warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
    info: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  };

  return (
    <div className={`rounded-xl border p-4 ${styles[type]}`}>
      <div className="flex items-start justify-between">
        <div>
          {title && <h4 className="font-semibold mb-1">{title}</h4>}
          <p className="text-sm opacity-90">{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-4 opacity-70 hover:opacity-100 transition-opacity">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================
// MODAL COMPONENT
// ============================================

export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl max-w-md w-full mx-4 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="text-gray-300">{children}</div>
      </div>
    </div>
  );
}