/** Real asset, or a placeholder in dev builds only. Production shows neither until `ready: true`. */
export const showMedia = (media) => media.ready || import.meta.env.DEV;
