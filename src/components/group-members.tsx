"use client";

import { useDBQuery } from "@/hooks/use-db";
import { api } from "@/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { EnhancedGroupMember } from "@/types";
import { Doc, Id } from "@/_generated/dataModel";
import { useEffect } from "react";

interface GroupMembersProps {
    members: EnhancedGroupMember[];
}

export function GroupMembers({ members } : GroupMembersProps) {
    const currentUserData : any = useDBQuery(api.users.getCurrentUser);
    const currentUser : Doc<"users"> = currentUserData?.data;

    useEffect(() => {
        console.log("Current User:", currentUser);
        console.log("Group Members:", members);
    }, [currentUser, members]);

  if (!members || members.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        No members in this group
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {members.map((member) => {
        const isCurrentUser = member.id === currentUser?._id;
        const isAdmin = member.role === "admin";

        return (
          <div key={member.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={member.imageUrl} />
                {/* <AvatarFallback>{member?.name.charAt(0)}</AvatarFallback> */}
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {isCurrentUser ? "You" : member?.name}
                  </span>
                  {isCurrentUser && (
                    <Badge variant="outline" className="text-xs py-0 h-5">
                      You
                    </Badge>
                  )}
                </div>
                {isAdmin && (
                  <span className="text-xs text-muted-foreground">Admin</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}