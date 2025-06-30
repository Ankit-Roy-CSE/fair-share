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

type Split = {
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

export type MonthlySpending = {
  month: string; // ISO date string
  total: number;
};


// export above created types
export type { GroupMember, GroupData, ExpenseData, GroupExpenseData, ContactData};