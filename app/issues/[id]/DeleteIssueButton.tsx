import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import React from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color="red" style={{minWidth:"8rem"}}>
      <TrashIcon />
      Delete Issue
    </Button>
  );
};

export default DeleteIssueButton;
