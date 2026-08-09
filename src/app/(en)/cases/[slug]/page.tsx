import { notFound } from 'next/navigation'
import CaseShell from '../../../../site/CaseShell'
import { caseMetadata, CASE_SLUGS } from '../../../../site/meta'
import { casePageBySlug } from '../../../../site/casePages'

export const dynamicParams = false
export function generateStaticParams() { return CASE_SLUGS }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = casePageBySlug(slug)
  return page ? caseMetadata('en', page) : {}
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = casePageBySlug(slug)
  if (!page) notFound()
  return <CaseShell lang="en" page={page} />
}
