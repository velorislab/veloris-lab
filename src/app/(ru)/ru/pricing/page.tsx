import PricingShell from '../../../../site/PricingShell'
import { pricingMetadata } from '../../../../site/meta'

export const metadata = pricingMetadata('ru')

export default function Page() {
  return <PricingShell lang="ru" />
}
