import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { FaGithub } from "react-icons/fa"

export function SignInButtonGithub() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github", { redirectTo: "/dashboard" })
      }}
    >
      <Button type="submit" className="w-full">
        <FaGithub />
        Login with GitHub
      </Button>
    </form>
  )
}