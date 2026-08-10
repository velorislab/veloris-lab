import { notFound } from 'next/navigation'
import SolutionPage from '../../../../../site/SolutionPage'
import { solutionMetadata, SOLUTION_SLUGS } from '../../../../../site/meta'
import { solutionBySlug } from '../../../../../site/solutions'

export const dynamicParams = false
export function generateStaticParams() { return SOLUTION_SLUGS }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = solutionBySlug(slug)
  return page ? solutionMetadata('ru', page) : {}
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = solutionBySlug(slug)
  if (!page) notFound()
  return <SolutionPage lang="ru" page={page} />
}
