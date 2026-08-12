import ServicesHub from '../../../site/ServicesHub'
import { servicesMetadata } from '../../../site/meta'

export const metadata = servicesMetadata('en')

export default function Page() {
  return <ServicesHub lang="en" />
}
