// src/lib/utils.ts

export function getImageUrl(path: string) {
  if (!path) return path;
  // Видаляємо початковий слеш, щоб не було подвійних слешів (напр. /base//images/...)
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}
