import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Navbar({ children }: any) {
  return (
    <div style={{
        position: 'fixed',
        zIndex: 100000
    }} className="h-[64px] top-0 sticky text-[#151D48] items-center pl-4 pr-4 bg-[white] w-full flex flex-row">
        {children}
    </div>
  );
}
