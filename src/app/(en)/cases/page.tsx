import CasesHub from '../../../site/CasesHub'
import { casesMetadata } from '../../../site/meta'

export const metadata = casesMetadata('en')

export default function Page() {
  return <CasesHub lang="en" />
}
