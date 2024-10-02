export default defineNuxtRouteMiddleware((to) => {
    const nuxtApp = useNuxtApp(); // Acessa o contexto do Nuxt
    const locale = nuxtApp.$i18n.locale; // Obtém o código do idioma atual
    const locales = nuxtApp.$i18n.locales; // Obtém os idiomas disponíveis
    const setLocale = nuxtApp.$i18n.setLocale; // Função para alterar o idioma
  
    // Verifica se a rota tem um prefixo de idioma
    const localeCode = to.params.locale;
  
    // Caso não haja um código de idioma na rota, redireciona para o idioma padrão
    if (!localeCode || !locales.some(l => l.code === localeCode)) {
      return navigateTo(`/${locale}/`); // Redireciona para a rota com o idioma atual
    }
  
    // Caso o idioma seja diferente do atual, atualiza o locale
    if (localeCode !== locale) {
      setLocale(localeCode); // Atualiza o locale atual
    }
});