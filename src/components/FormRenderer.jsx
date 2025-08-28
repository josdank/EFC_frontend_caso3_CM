import React from 'react'

export default function FormRenderer({ fields, values, setValues, lookups }) {
  function update(key, value) {
    setValues(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map(f => {
        const common = {
          id: f.key,
          name: f.key,
          required: f.required,
          className: 'input',
          value: values[f.key] ?? (f.type === 'multiselect' ? [] : ''),
          onChange: e => update(f.key, e.target.value),
        }

        if (f.type === 'textarea') {
          return (
            <div key={f.key}>
              <label htmlFor={f.key} className="block text-sm font-medium mb-1">{f.label}</label>
              <textarea {...common} rows={3} />
            </div>
          )
        }

        if (f.type === 'select') {
          const options = f.options || lookups[f.ref] || []
          return (
            <div key={f.key}>
              <label className="block text-sm font-medium mb-1">{f.label}</label>
              <select {...common}>
                <option value="">Seleccione...</option>
                {options.map(opt => (
                  typeof opt === 'string'
                    ? <option key={opt} value={opt}>{opt}</option>
                    : <option key={opt.id} value={opt.id}>{opt.nombre || opt.email || ('ID ' + opt.id)}</option>
                ))}
              </select>
            </div>
          )
        }

        if (f.type === 'multiselect') {
          const options = lookups[f.ref] || []
          return (
            <div key={f.key}>
              <label className="block text-sm font-medium mb-1">{f.label}</label>
              <select
                className="input"
                multiple
                value={values[f.key] || []}
                onChange={e => {
                  const vals = Array.from(e.target.selectedOptions).map(o => o.value)
                  update(f.key, vals)
                }}
              >
                {options.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.nombre || ('ID ' + opt.id)}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Use Ctrl/Cmd para seleccionar múltiples.</p>
            </div>
          )
        }

        return (
          <div key={f.key}>
            <label htmlFor={f.key} className="block text-sm font-medium mb-1">{f.label}</label>
            <input type={f.type || 'text'} {...common} />
          </div>
        )
      })}
    </div>
  )
}
