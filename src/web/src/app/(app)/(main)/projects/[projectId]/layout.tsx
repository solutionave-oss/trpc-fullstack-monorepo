"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import type { ReactNode } from "react";

export default function Index({ children }:{children: ReactNode}) {
  const params = useParams<{projectId: string}>();
  return <div>
    <div className="flex item-center gap-2">
      <Link href={ `/projects/${params.projectId}` }>Project</Link>
      <Link href={ `/projects/${params.projectId}/stakeholders` }>Stakeholders</Link>
      <Link href={ `/projects/${params.projectId}/milestones` }>Milestones</Link>
      <Link href={ `/projects/${params.projectId}/epics` }>Epics</Link>
      <Link href={ `/projects/${params.projectId}/tickets` }>Tickets</Link>
      <Link href={ `/projects/${params.projectId}/repositories` }>Repositories</Link>
    </div>
    <div>{ children }</div>
  </div>;
}