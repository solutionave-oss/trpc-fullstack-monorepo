import { ProjectStatus, } from "@prisma/client";
import type { FC, JSX, } from "react";

import { api, } from "../../client/trpc";
import { Dropdown, } from "../Dropdown";

const statuses = Object.values(ProjectStatus) as [keyof typeof ProjectStatus];

export const ProjectStatusChanger: FC<
  {projectId: string, loadData: () => void, children: JSX.Element}
> = ({ projectId, loadData, children, }) => {
  return (
    <Dropdown
      options={ statuses.map((status) => ({
        label: status.replace(/_/g, ' '), value: status,
      })) }
      onClick={ async (data) => {
        api.projectRouter.updateStatus.mutate({
          projectId,
          status: data.value,
        }).then(loadData);
      } }>
      { children }
    </Dropdown>
  );
};
