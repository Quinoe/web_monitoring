import { useEffect } from "preact/hooks";

export function SignoutPage() {
    useEffect(() => {
       window.location.replace('/login')
    }, [])
    return (
      <div/>
    )
}