import RootShell, { sharedMetadata, sharedViewport } from '../../site/rootLayout'

export const metadata = sharedMetadata
export const viewport = sharedViewport

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>
}
