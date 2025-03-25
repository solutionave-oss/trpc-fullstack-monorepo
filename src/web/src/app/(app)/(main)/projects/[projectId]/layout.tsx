import Link from "next/link";
import { ReactNode } from "react";

export default function Index({children}:{children: ReactNode}) {
  return <div>
      <div className="flex item-center gap-2">
        <Link href={'/projects/abc'}>Project</Link>
        <Link href={'/projects/abc/stakeholders'}>Stakeholders</Link>
        <Link href={'/projects/abc/milestones'}>Milestones</Link>
        <Link href={'/projects/abc/epics'}>Epics</Link>
        <Link href={'/projects/abc/tickets'}>Tickets</Link>
      </div>




      
      <div>{children}</div>
    
    </div>
}