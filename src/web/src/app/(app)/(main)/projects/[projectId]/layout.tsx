"use client";

import clsx from "clsx";
import Link from "next/link";
import { useParams, usePathname, } from "next/navigation";
import { type ReactNode, } from "react";

export default function Index({ children, }: { children: ReactNode }) {
  const params = useParams<{ projectId: string }>();
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        { [
          {
            name: "Project", path: `/projects/${params.projectId}`,
          },
          {
            name: "Stakeholders", path: `/projects/${params.projectId}/stakeholders`,
          },
          {
            name: "Milestones", path: `/projects/${params.projectId}/milestones`,
          },
          {
            name: "Epics", path: `/projects/${params.projectId}/epics`,
          },
          {
            name: "Tickets", path: `/projects/${params.projectId}/tickets`,
          },
          {
            name: "Repositories", path: `/projects/${params.projectId}/repositories`,
          },
        ].map(({ name, path, }) => (
          <Link
            key={ path }
            className={ clsx(
              "border px-2 py-0.5",
              pathname === path ? "border-black" : "border-neutral-300"
            ) }
            href={ path }>
            { name }
          </Link>
        )) }
      </div>
      <div>{ children }</div>
    </div>
  );
}