import { authOptions } from '../utils/authOptions'
import { getServerSession } from 'next-auth'

export default async function page() {
    const session = await getServerSession( authOptions)
  return (
    JSON.stringify(session)
  )
}
