const CASE_ID = Number(import.meta.env.VITE_CASE_ID || 1)

const commonLogin = {
  emailField: 'email',
  passwordField: 'password',
}

const CASES = {
  1: {
    id: 1,
    name: 'Citas médicas',
    modulesTitle: 'Módulos',
    entities: [
      {
        key: 'pacientes',
        name: 'Pacientes',
        fields: [
          { key: 'nombre', label: 'Nombre', type: 'text', required: true },
          { key: 'apellido', label: 'Apellido', type: 'text', required: true },
          { key: 'nacimiento', label: 'Fecha de nacimiento', type: 'date', required: true },
          { key: 'genero', label: 'Genero', type: 'text', required: true },
          { key: 'ciudad', label: 'Ciudad', type: 'text', required: true },
          { key: 'direccion', label: 'Dirección', type: 'text', required: true },
          { key: 'telefono', label: 'Telefono', type: 'number', required: true },
          { key: 'email', label: 'Email', type: 'email', required: true },
        ],
      },
      {
        key: 'especialidades',
        name: 'Especialidades',
        fields: [
          { key: 'codigo', label: 'Código', type: 'string', required: true },
          { key: 'nombre', label: 'Nombre', type: 'text', required: true },
          { key: 'descripcion', label: 'Descripción', type: 'textarea' },
        ],
      },
      {
        key: 'citas',
        name: 'Citas',
        fields: [
          { key: 'codigo', label: 'Código', type: 'string', required: true },
          { key: 'descripcion', label: 'Descripción', type: 'textarea' },
          { key: 'pacientes', label: 'Pacientes', type: 'select', ref: 'pacientes', required: true },
          { key: 'especialidadIds', label: 'Especialidades', type: 'multiselect', ref: 'especialidades', required: true },
          { key: 'fecha', label: 'Fecha', type: 'datetime-local', required: true },
        ],
      },
      {
        key: 'usuarios',
        name: 'Usuarios',
        fields: [
          { key: 'nombre', label: 'Nombre', type: 'text', required: true },
          { key: 'apellido', label: 'Apellido', type: 'text', required: true },
          { key: 'email', label: 'Email', type: 'email', required: true },
          { key: 'password', label: 'Clave', type: 'password', required: true },
        ],
      },
    ],
    login: commonLogin,
  },
}

export const CASE = CASES[CASE_ID] || CASES[1]
export const ALL_CASES = CASES
