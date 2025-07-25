"use client";

import { useParams, useRouter } from "next/navigation";
import { api } from "@/_generated/api";
import { useDBQuery } from "@/hooks/use-db";
import { BarLoader } from "react-spinners";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users } from "lucide-react";
import SettlementForm from "./_components/settlement-form";
import { GroupSettlement, SettlementData, UserSettlement } from "@/types";

export default function SettlementPage() {
  const params = useParams();
  const router = useRouter();
  const type = params.type as "user" | "group";
  const id = params.id as string;

  const settlementsData : any = useDBQuery( api.settlements.getSettlementData,{
      entityType: type,
      entityId: id,
    }
  );

  const data : SettlementData = settlementsData?.data;
  const isLoading : boolean = settlementsData.isLoading || !data;

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <BarLoader width={"100%"} color="#36d7b7" />
      </div>
    );
  }

  // Function to handle after successful settlement creation
  const handleSuccess = () => {
    // Redirect based on type
    if (type === "user") {
      router.push(`/person/${id}`);
    } else if (type === "group") {
      router.push(`/group/${id}`);
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-lg">
      <Button
        variant="outline"
        size="sm"
        className="mb-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="mb-6">
        <h1 className="text-5xl gradient-title">Record a settlement</h1>
        <p className="text-muted-foreground mt-1">
          {type === "user"
            ? `Settling up with ${(data as UserSettlement)?.counterpart?.name ?? ""}`
            : `Settling up in ${(data as GroupSettlement)?.group?.name ?? ""}`}
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            {type === "user" ? (
              <Avatar className="h-10 w-10">
                <AvatarImage src={(data as any)?.counterpart?.imageUrl} />
                <AvatarFallback>
                  {(data as any)?.counterpart?.name?.charAt(0) || "?"}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="bg-primary/10 p-2 rounded-md">
                <Users className="h-6 w-6 text-primary" />
              </div>
            )}
            <CardTitle>
              {type === "user" ? (data as any)?.counterpart?.name : (data as any)?.group?.name}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <SettlementForm
            entityType={type}
            entityData={data}
            onSuccess={handleSuccess}
          />
        </CardContent>
      </Card>
    </div>
  );
}