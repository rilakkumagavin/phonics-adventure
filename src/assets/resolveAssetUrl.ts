export function resolveAssetUrl(src: string) {
  if (!src.startsWith('/') || src.startsWith('//')) {
    return src;
  }

  const baseUrl = import.meta.env.BASE_URL;

  if (baseUrl === '/') {
    return src;
  }

  return `${baseUrl}${src.slice(1)}`;
}
