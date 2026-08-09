import PricingShell from '../../../site/PricingShell'
import { pricingMetadata } from '../../../site/meta'

export const metadata = pricingMetadata('en')

export default function Page() {
  return <PricingShell lang="en" />
}
