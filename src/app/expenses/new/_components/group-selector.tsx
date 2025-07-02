"use client";

import { useState, useEffect } from "react";
import { useDBQuery } from "@/hooks/use-db";
import { api } from "@/_generated/api";
import { BarLoader } from "react-spinners";
import { Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Doc, Id } from "@/_generated/dataModel";
import { SelectedGroup, ShortGroup } from "@/types";

interface GroupSelectorProps {
    onChange: (group: SelectedGroup) => void;
}

type GroupData = {
    selectedGroup: SelectedGroup | null;
    groups: ShortGroup[];
}

export function GroupSelector({ onChange }: GroupSelectorProps) {
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");

  // Single query to get all data regarding groups in database
  const GroupsList : any = useDBQuery(api.grpExpenses.getGroupOrMembers, 
    selectedGroupId ? { groupId: selectedGroupId } : {}
  );

  const data : GroupData = GroupsList.data;
  const isLoading : boolean = GroupsList.isLoading;

  // When group data changes, notify parent
  useEffect(() => {
    if (data?.selectedGroup && onChange) {
      onChange(data.selectedGroup);
    }
  }, [data, onChange]);

  const handleGroupChange = (groupId : Id<"groups">) => {
    setSelectedGroupId(groupId);
  };

  if (isLoading) {
    return <BarLoader width={"100%"} color="#36d7b7" />;
  }

  if (!data?.groups || data.groups.length === 0) {
    return (
      <div className="text-sm text-amber-600 p-2 bg-amber-50 rounded-md">
        You need to create a group first before adding a group expense.
      </div>
    );
  }

  return (
    <div>
      <Select value={selectedGroupId} onValueChange={handleGroupChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a group" />
        </SelectTrigger>
        <SelectContent>
          {data.groups.map((group) => (
            <SelectItem key={group.id} value={group.id}>
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-1 rounded-full">
                  <Users className="h-3 w-3 text-primary" />
                </div>
                <span>{group.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({group.memberCount} members)
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {isLoading && selectedGroupId && (
        <div className="mt-2">
          <BarLoader width={"100%"} color="#36d7b7" />
        </div>
      )}
    </div>
  );
}