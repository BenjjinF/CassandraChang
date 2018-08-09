export default async ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    app.store.state.loading = true
    next()
  })
  app.router.afterEach((to, from) => {
    app.store.state.loading = false
    if (from.name) {
      app.store.state.fromInDomain = true
    }
  })
}
