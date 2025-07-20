// @ts-nocheck
import { User } from "@clerk/nextjs/server";
import type { Doc , Id } from  "./_generated/dataModel";

type GroupMember = {
    userId: Id<"users">;
    role: "admin" | "member";
    joinedAt: number;
}

type GroupData = {
        name: string;
        description: string;
        createdBy: Id<"users">;
        members: GroupMember[];
    };

export type RawSplit = {
    userId: Id<"users">;
    name: string;
    email: string;
    imageUrl?: string;
    amount: number;
    percentage: number;
    paid: boolean; // Indicates if the user has paid their share
}

export type Split = {
    userId: Id<"users">;
    amount: number;
    paid: boolean;
}

type ExpenseData = {
    description: string;
    amount: number;
    category: string;
    date: number;
    paidByUserId: Id<"users">
    splitType: string;
    splits: Split[];
    groupId?: Id<"groups"> ;
    createdBy: Id<"users">;
};

type GroupExpenseData = {
    description: string;
    amount: number;
    category: string;
    date: number;
    paidByUserId: Id<"users">
    splitType: string;
    splits: Split[];
    groupId?: Id<"groups"> ;
    createdBy: Id<"users">;
}

// create a type Contact , that can be either a user or a group

type UserContact = {
    _id: Id<"users">;
    name: string;
    email: string;
    imageUrl?: string;
    type: "user";
}

type GroupContact = {
    _id: Id<"groups">;
    name: string;
    description?: string;
    memberCount: number;
    type: "group";
}

type ContactData = {
    users : UserContact[] ;
    groups : GroupContact[];
}

// DASHBOARD TYPES

type OweDetail = {
    userId: string;
    name: string;
    imageUrl?: string;
    amount: number;
};

export type Balances = {
  totalBalance: number;
  youAreOwed: number;
  youOwe: number;
  oweDetails: {
    youAreOwedBy: OweDetail[];
    youOwe: OweDetail[];
  };
};

export type EnhancedGroup = {
  id: string;
  name: string;
  members: Doc<"users">[];
  balance?: number; // Optional balance for the group
};

export type EnhancedGroupMember = {
  id: Id<"users">;
  name: string;
  imageUrl: string;
  role?: "admin" | "member";
}

export type EnhancedBalance = {
    totalBalance: number;
    owes: {
        to: string;
        amount: number;
    }[];
    owedBy: {
        from: string;
        amount: number;
    }[];
    id: Id<"users">;
    name: string;
    imageUrl: string;
    role: string;
}

export type MonthlySpending = {
  month: string; // ISO date string
  total: number;
};

// GROUP Page types
export type GroupInfo = {
    id: Id<"groups">;
    name: string;
    description: string | undefined;
}

export type GroupExpenseInfo = {
    group: GroupInfo;
    members: EnhancedGroupMember[];
    expenses: Doc<"expenses">[];
    settlements: Doc<"settlements">[];
    balances: EnhancedBalance[];
    userLookupMap: Record<Id<"users">, EnhancedGroupMember>;
}

export type ShortUser = {
    id: Id<"users">;
    name: string;
    imageUrl: string;
    email: string;
    role?: "admin" | "member";
}

export type SelectedGroup = {
    id: Id<"groups">;
    name: string;
    description: string | undefined;
    members: ShortUser[];
}

export type PersonalExpenseInfo = {
    expenses: Doc<"expenses">[];
    settlements: Doc<"settlements">[];
    otherUser: ShortUser;
    balance: number;
}

export type ShortGroup = {
    id: Id<"groups">;
    name: string;
    description: string | undefined;
    memberCount: number;
}

// Settlement types
export type UserSettlement = {
    type: "user";
    counterpart: {
        userId: Id<"users">;
        name: string;
        email: string;
        imageUrl: string;
    };
    youAreOwed: number;
    youOwe: number;
    netBalance: number; // + => you should receive, − => you should pay
}

export type BalanceDetail = {
    userId: Id<"users">;
    name: string;
    imageUrl: string | undefined;
    youAreOwed: number;
    youOwe: number;
    netBalance: number;
}

export type GroupSettlement = {
    type: "group";
    group: {
        id: Id<"groups">;
        name: string;
        description: string;
    };
    balances: BalanceDetail[];
}

export type SettlementData  = UserSettlement | GroupSettlement;

// export above created types
export type { GroupMember, GroupData, ExpenseData, GroupExpenseData, ContactData};