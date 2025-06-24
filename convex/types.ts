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

type ContactData = {
    users : Doc<"users">[];
    groups : Doc<"groups">[];
}

// export above created types
export type { GroupMember, GroupData, ExpenseData, GroupExpenseData, ContactData};