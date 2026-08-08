import RootShell, { sharedMetadata, sharedViewport } from '../../site/rootLayout'

export const metadata = sharedMetadata
export const viewport = sharedViewport

export default function RuLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="ru">{children}</RootShell>
}
