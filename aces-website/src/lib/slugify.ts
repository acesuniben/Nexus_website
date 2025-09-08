export function slugify(s?: string): string {
  return (s || '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\x00-\x7F]/g, '') // strip non-ascii
    .replace(/[^\w\s-]/g, '') // remove punctuation except spaces and hyphens
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}
