import UsefulPage from '../../../../site/UsefulPage'
import { usefulMetadata } from '../../../../site/meta'

export const metadata = usefulMetadata('ru')

export default function Page() {
  return <UsefulPage lang="ru" />
}
