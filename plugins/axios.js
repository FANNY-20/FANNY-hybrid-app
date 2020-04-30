export default function ({ $axios, env }) {
  if (env.AUTHORIZATION_TOKEN) {
    $axios.setToken(env.AUTHORIZATION_TOKEN, "Bearer");
  }
}
