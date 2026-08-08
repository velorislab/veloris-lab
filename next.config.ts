import type { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    // Next 16 restricts this list to [75] by default and silently coerces any
    // other `quality` prop to the nearest allowed value, so 85 has to be
    // declared here or it never takes effect. The founder photograph is a
    // detailed street frame where 75 shows blocking in the cobbles and the
    // brickwork; nothing else on the page is a photograph.
    qualities: [75, 85],
  },
}

export default config
