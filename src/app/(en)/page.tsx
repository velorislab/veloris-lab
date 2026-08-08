import LabPage from '../../site/Page'
import { labMetadata } from '../../site/meta'

export const metadata = labMetadata('en')

export default function Page() {
  return <LabPage lang="en" />
}
