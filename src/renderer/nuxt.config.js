/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */

module.exports = {
  mode: "spa", // or 'universal'
  head: {
    title: "pixipoc"
  },
  loading: false,
  plugins: [{ src: "~/plugins/pixijs", mode: "client", ssr: false }],
  buildModules: [],
  modules: []
};
