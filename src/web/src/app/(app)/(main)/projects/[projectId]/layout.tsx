"use client";

import clsx from "clsx";
import Link from "next/link";
import { useParams, } from "next/navigation";
import { useState, type ReactNode, } from "react";

export default function Index({ children, }: {children: ReactNode}) {
  const [ activeRoute, setActiveRoute, ] = useState('');
  const params = useParams<{projectId: string}>();

  const _setActiveRoute = (route: string) => setActiveRoute(route);

  return <div className="flex flex-col gap-4">
    <div className="flex item-center gap-2">
      <Link onClick={ () => _setActiveRoute("projects") } className={ clsx("border px-2 py-0.5", activeRoute === 'projects' ? "border-black" : 'border-neutral-300') } href={ `/projects/${params.projectId}` }>Project</Link>
      <Link onClick={ () => _setActiveRoute("stakeholders") } className={ clsx("border px-2 py-0.5") } href={ `/projects/${params.projectId}/stakeholders` }>Stakeholders</Link>
      <Link onClick={ () => _setActiveRoute("milestones") } className={ clsx("border px-2 py-0.5") } href={ `/projects/${params.projectId}/milestones` }>Milestones</Link>
      <Link onClick={ () => _setActiveRoute("epics") } className={ clsx("border px-2 py-0.5") } href={ `/projects/${params.projectId}/epics` }>Epics</Link>
      <Link onClick={ () => _setActiveRoute("tickets") } className={ clsx("border px-2 py-0.5") } href={ `/projects/${params.projectId}/tickets` }>Tickets</Link>
      <Link onClick={ () => _setActiveRoute("repositories") } className={ clsx("border px-2 py-0.5") } href={ `/projects/${params.projectId}/repositories` }>Repositories</Link>
    </div>
    <div>{ activeRoute }</div>
    <div>{ children }</div>
  </div>;
}