"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import {
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  Hash,
  Shield,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { UserWithDetails } from "@/modules/admin/server/users/actions";

interface UserDetailsDialogProps {
  user: UserWithDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UserDetailsDialog({
  user,
  open,
  onOpenChange,
}: UserDetailsDialogProps) {
  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getRoleColor = (isAdmin: boolean) => {
    return isAdmin
      ? "bg-blue-50 text-blue-700 border-blue-200"
      : "bg-gray-50 text-gray-700 border-gray-200";
  };

  const getVerificationColor = (verified: boolean) => {
    return verified
      ? "bg-green-50 text-green-700 border-green-200"
      : "bg-red-50 text-red-700 border-red-200";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <User className="h-6 w-6" />
              User Details
            </DialogTitle>
            <div className="flex gap-2">
              <Badge className={getRoleColor(user.isAdmin)} variant="outline">
                {user.isAdmin ? "Admin" : "User"}
              </Badge>
              <Badge
                className={getVerificationColor(user.emailVerified)}
                variant="outline"
              >
                {user.emailVerified ? "Verified" : "Unverified"}
              </Badge>
            </div>
          </div>
          <DialogDescription>
            Complete user information and account details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* User Profile */}
          <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl font-semibold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold">{user.name}</h3>
                {user.isAdmin && <Shield className="h-5 w-5 text-blue-500" />}
              </div>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.email}</span>
                  {user.emailVerified ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.dept}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Account Information */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Hash className="h-5 w-5" />
              Account Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">User ID</span>
                </div>
                <code className="text-xs bg-muted px-2 py-1 rounded break-all">
                  {user.id}
                </code>
              </div>

              <div className="border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Member Since</span>
                </div>
                <div className="text-sm">
                  <div>{format(new Date(user.createdAt), "MMMM dd, yyyy")}</div>
                  <div className="text-muted-foreground text-xs">
                    {format(new Date(user.createdAt), "h:mm a")}
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Last Updated</span>
                </div>
                <div className="text-sm">
                  <div>{format(new Date(user.updatedAt), "MMMM dd, yyyy")}</div>
                  <div className="text-muted-foreground text-xs">
                    {format(new Date(user.updatedAt), "h:mm a")}
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Account Role</span>
                </div>
                <Badge className={getRoleColor(user.isAdmin)} variant="outline">
                  {user.isAdmin ? "Administrator" : "Regular User"}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Account Status */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Account Status</h3>

            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    Email Verification
                  </span>
                </div>
                <Badge
                  className={getVerificationColor(user.emailVerified)}
                  variant="outline"
                >
                  {user.emailVerified ? "Verified" : "Unverified"}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    Administrative Access
                  </span>
                </div>
                <Badge className={getRoleColor(user.isAdmin)} variant="outline">
                  {user.isAdmin ? "Enabled" : "Disabled"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="font-medium mb-2">Account Summary</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                • User registered on{" "}
                {format(new Date(user.createdAt), "MMMM dd, yyyy")}
              </p>
              <p>
                • Email is {user.emailVerified ? "verified" : "not verified"}
              </p>
              <p>
                • Account role:{" "}
                {user.isAdmin ? "Administrator" : "Regular user"}
              </p>
              <p>• Department: {user.dept}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
