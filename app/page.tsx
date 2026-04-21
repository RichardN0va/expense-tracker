import { auth } from "@/auth"
import { redirect } from "next/navigation"
export default async function page() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}