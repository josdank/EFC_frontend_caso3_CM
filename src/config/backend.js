// Flexible backend adapter.
// If your backend differs (paths, token shape, id field, etc.), tweak here only.

export const BACKEND = {
  // If your server exposes e.g. http://localhost:3000 (no /api), leave basePath = ""
  // If it exposes http://localhost:3000/api, you can leave this "" and put the /api in VITE_API_BASE_URL
  // or set basePath:"" and keep VITE_API_BASE_URL with /api. Either way works.
  basePath: "",

  // Login endpoint and response mapping
  auth: {
    loginPath: "/auth/login",
    method: "POST",
    // Shape mapping for login response
    tokenField: "token",             // response[tokenField]
    userField: "user",               // response[userField]
  },

  // Default entity paths (override per case below if different)
  defaultEntityBase: "", // e.g., "" or "/v1"
  idField: "id",         // Change if your backend uses e.g. "_id" or "ID"

  // Optionally transform payloads before send (per entity)
  onBeforeSend(entityKey, payload) {
    // Example: convert string arrays to numbers for IDs
    const p = { ...payload }
    Object.keys(p).forEach(k => {
      const v = p[k]
      if (Array.isArray(v) && v.every(x => !isNaN(Number(x)))) {
        p[k] = v.map(Number)
      }
    })
    return p
  },

  // Optionally map responses from list/detail to UI-friendly format
  onAfterReceiveList(entityKey, data) {
    // If server wraps data: {items:[...]} or {data:[...]}, normalize here.
    if (Array.isArray(data)) return data
    if (data?.items) return data.items
    if (data?.data) return data.data
    return Array.isArray(data?.results) ? data.results : []
  },
  onAfterReceiveOne(entityKey, data) {
    // If server wraps data: {item:{...}} or {data:{...}}
    if (data?.item) return data.item
    if (data?.data) return data.data
    return data
  },

  // Case-specific entity path maps (keys must match those in cases.js)
  // If your backend uses pluralization/Spanish names shown here, it should work out of the box.
  cases: {
    1: { // Matrículas
      entities: {
        materias: "/materias",
        estudiantes: "/estudiantes",
        matriculas: "/matriculas",
        usuarios: "/usuarios",
      },
    },
    2: { // Renta de carros
      entities: {
        clientes: "/clientes",
        vehiculos: "/vehiculos",
        reservas: "/reservas",
        usuarios: "/usuarios",
      },
    },
    3: { // Citas médicas
      entities: {
        pacientes: "/pacientes",
        especialidades: "/especialidades",
        citas: "/citas",
        usuarios: "/usuarios",
      },
    },
    4: { // Tickets de asistencia
      entities: {
        tecnicos: "/tecnicos",
        clientes: "/clientes",
        tickets: "/tickets",
        usuarios: "/usuarios",
      },
    },
    5: { // Conferencias
      entities: {
        conferencistas: "/conferencistas",
        auditorios: "/auditorios",
        reservas: "/reservas",
        usuarios: "/usuarios",
      },
    },
  },
}
