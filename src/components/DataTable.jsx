import React from 'react'
import { Link } from 'react-router-dom'

export default function DataTable({ columns, data, basePath, onDelete }) {
  return (
    <div className="overflow-x-auto w-full max-w-full bg-white rounded-2xl shadow">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-50">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="px-4 py-2 text-left text-sm font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">
                {col.label}
              </th>
            ))}
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 whitespace-nowrap min-w-[120px]">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {columns.map(col => {
                const cellContent = Array.isArray(row[col.key])
                  ? row[col.key].join(', ')
                  : String(row[col.key] ?? '')
                const isLong = cellContent.length > 30

                return (
                  <td
                    key={col.key}
                    className="px-4 py-2 text-sm text-gray-800 max-w-[200px] truncate relative group whitespace-nowrap"
                    title={cellContent}
                  >
                    <span className="inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                      {cellContent}
                    </span>
                    {isLong && (
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gray-600">
                        ➡️
                      </span>
                    )}
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
  )
}