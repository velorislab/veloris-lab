import { notFound } from 'next/navigation'
import ServiceShell from '../../../../site/ServiceShell'
import { serviceMetadata, SERVICE_SLUGS } from '../../../../site/meta'
import { servicePageBySlug } from '../../../../site/servicePages'

export const dynamicParams = false
export function generateStaticParams() { return SERVICE_SLUGS }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = servicePageBySlug(slug)
  return page ? serviceMetadata('en', page) : {}
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = servicePageBySlug(slug)
  if (!page) notFound()
  return <ServiceShell lang="en" page={page} />
}
