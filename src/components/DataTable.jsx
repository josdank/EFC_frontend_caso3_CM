import React from 'react'
import { Link } from 'react-router-dom'

export default function DataTable({ columns, data, basePath, onDelete }) {
  function renderCell(col, row) {
    const value = row[col.key];
    // If the column key ends with 'Id', try to show a human label using common conventions
    if (value != null && /Id$/.test(col.key)) {
      const base = col.key.replace(/Id$/, '')
      // Try variations: object with nombre/name, or sibling string fields
      const obj = row[base]
      if (obj && (obj.nombre || obj.name)) return obj.nombre || obj.name
      if (row[base + 'Nombre']) return row[base + 'Nombre']
      if (row[base + 'Name']) return row[base + 'Name']
    }
    // Custom mapping for citas (common backends often return related objects or denormalized names)
    if (col.key === 'pacienteId' && (row.pacienteNombre || (row.paciente && (row.paciente.nombre || row.pacienteName)))) {
      return row.pacienteNombre || row?.paciente?.nombre || row?.pacienteName
    }
    if (col.key === 'especialidadId' && (row.especialidadNombre || (row.especialidad && (row.especialidad.nombre || row.especialidadName)))) {
      return row.especialidadNombre || row?.especialidad?.nombre || row?.especialidadName
    }
    // Patch for citas nombre/especialidad
    if (col.key === 'nombre' && row.nombre) {
      return row.nombre
    }
    if (col.key === 'especialidad' && row.especialidad) {
      return row.especialidad
    }
    return value == null ? '' : String(value)
  }
  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-[1200px] bg-white rounded-2xl shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  className="px-4 py-2 text-left text-sm font-semibold text-gray-700 whitespace-nowrap min-w-[150px]"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 whitespace-nowrap min-w-[150px]">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                {columns.map(col => {
                  let cellContent = ''

                  // Mostrar nombre del paciente
                  if (col.key === 'Nombre' && row.pacientes) {
                    cellContent = row.pacientes || '—'
                  }
                  // Mostrar nombres de especialidades
                  else if (col.key === 'EspecialidadIds') {
                    cellContent = row.especialidadesTexto || '—'
                  }
                  // Mostrar contenido normal
                  else {
                    cellContent = Array.isArray(row[col.key])
                      ? row[col.key].join(', ')
                      : String(row[col.key] ?? '')
                  }

                  const isLong = cellContent.length > 30

                  return (
                    <td
                      key={col.key}
                      className="px-4 py-2 text-sm text-gray-800 max-w-[180px] truncate relative group whitespace-nowrap"
                      title={cellContent}
                    >
                      <div className="flex items-center">
                        <span className="inline-block overflow-hidden text-ellipsis whitespace-nowrap">
                          {cellContent}
                        </span>
                        {isLong && (
                          <span className="ml-1 text-gray-400 group-hover:text-gray-600">
                            ➡️
                          </span>
                        )}
                      </div>
                    </td>
                  )
                })}
                <td className="px-4 py-2 text-sm text-gray-800 whitespace-nowrap space-x-2">
                  <Link to={`${basePath}/${row.id}`} className="btn !px-3 !py-1">
                    Editar
                  </Link>
                  <button
                    onClick={() => { if (confirm('¿Seguro que deseas eliminar este registro?')) onDelete(row.id) }}
                    className="btn !bg-red-600 hover:!bg-red-700 !px-3 !py-1"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}