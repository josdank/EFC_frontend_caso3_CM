import React from 'react'
import { Link } from 'react-router-dom'

export default function DataTable({ columns, data, basePath, onDelete }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-[1200px] bg-white rounded-2xl shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(col => (
                <td
                  key={col.key}
                  className="px-4 py-2 text-left text-sm font-semibold text-gray-700 whitespace-nowrap min-w-[150px]"
                >
                  {col.label}
                </td>
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
                  if (col.key === 'Pacientes') {
                    cellContent = row.pacientesNombre || '—'
                  }
                  // Mostrar nombres de especialidades
                  else if (col.key === 'especialidadIds') {
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
                    onClick={() => onDelete(row.id)}
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