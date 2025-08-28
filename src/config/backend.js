export const BACKEND = {
  basePath: "",
  auth: { loginPath: "/usuarios/login", method: "POST", tokenField: "token", userField: "user" },
  cases: {
    1: {
      entities: {
        pacientes: "/pacientes",
        especialidades: "/especialidades",
        citas: "/citas",
        usuarios: "/usuarios",
      },
    },
  },
}
