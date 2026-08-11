/**
 * The image loader for the static export, and it exists because of a bug that
 * only appears when the site is served from a subpath.
 *
 * `output: 'export'` needs next/image to stop pointing at the optimiser route,
 * and the obvious way to do that is `images.unoptimized: true`. That flag
 * bypasses the loader entirely, and the loader is what prepends `basePath`. The
 * result builds cleanly, passes every check on a root-served preview, and then
 * requests every one of the site's SVGs from `/images/...` instead of
 * `/veloris-lab/images/...` the moment it is served from a project page. Caught
 * by serving the export under the real subpath and counting broken images: 4 of
 * them on the first page checked.
 *
 * So the export uses a custom loader instead of the flag. It optimises nothing,
 * which is correct for a static host, and it does the one thing the flag threw
 * away.
 *
 * `width` and `quality` are accepted and ignored on purpose: the signature is
 * fixed by next/image, and there is nothing on the other side of a static host
 * to resize anything.
 */
export default function staticImageLoader({ src }: { src: string; width: number; quality?: number }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  /* Absolute URLs and data URIs are already complete. Only a root-relative path
     needs the prefix, and it must not be applied twice if Next has already
     resolved one. */
  if (!src.startsWith('/') || src.startsWith(basePath + '/')) return src
  return `${basePath}${src}`
}
