"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/app/components";
import axios from "axios";
import ms from "ms";
import React, { useEffect, useState } from "react";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: ms("1h"),
    retry: 3,
  });

  if (isLoading) return <Skeleton height="2rem" />;
  if (error) return null;

  const setAssignee = (userId: string) =>
    axios.patch("/api/issues/" + issue.id, {
      assignedToUserId: userId === "#" ? null : userId,
    });

  return (
    <Select.Root
      onValueChange={setAssignee}
      defaultValue={issue.assignedToUserId || "#"}
    >
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="#">Unassign</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
