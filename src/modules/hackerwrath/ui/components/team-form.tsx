"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TagsInput } from "@/components/ui/tags-input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  useCreateTeam,
  useSearchUsers,
} from "@/modules/hackerwrath/server/teams/hooks";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Loader2, Users, Mail } from "lucide-react";

const teamFormSchema = z.object({
  name: z
    .string()
    .min(2, "Team name must be at least 2 characters")
    .max(50, "Team name must be less than 50 characters"),
  memberEmails: z
    .array(z.string().email("Invalid email address"))
    .max(3, "Maximum 3 team members allowed"),
});

type TeamFormData = z.infer<typeof teamFormSchema>;

interface TeamFormProps {
  onSuccess?: () => void;
}

export default function TeamForm({ onSuccess }: TeamFormProps) {
  const { data: session } = authClient.useSession();
  const [emailQuery, setEmailQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const createTeamMutation = useCreateTeam();
  const { data: searchResults = [] } = useSearchUsers(
    emailQuery,
    showSuggestions && emailQuery.length >= 2
  );

  const form = useForm<TeamFormData>({
    resolver: zodResolver(teamFormSchema),
    defaultValues: {
      name: "",
      memberEmails: [],
    },
  });

  const onSubmit = async (data: TeamFormData) => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to create a team");
      return;
    }

    try {
      await createTeamMutation.mutateAsync({
        name: data.name,
        teamLeaderId: session.user.id,
        memberEmails: data.memberEmails,
      });

      toast.success("Team created successfully! Invitations sent to members.");
      form.reset();
      onSuccess?.();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create team"
      );
    }
  };

  const handleEmailSelect = (email: string) => {
    const currentEmails = form.getValues("memberEmails");
    if (!currentEmails.includes(email) && currentEmails.length < 3) {
      form.setValue("memberEmails", [...currentEmails, email]);
    }
    setEmailQuery("");
    setShowSuggestions(false);
  };

  const filteredSuggestions = searchResults.filter((user) => {
    const currentEmails = form.getValues("memberEmails");
    return (
      !currentEmails.includes(user.email) && user.email !== session?.user?.email
    );
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Team Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your team name"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormDescription>
                Choose a unique name for your team (2-50 characters)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Team Leader
          </Label>
          <Input
            value={session?.user?.name || "Loading..."}
            disabled
            className="bg-muted"
          />
          <p className="text-sm text-muted-foreground">
            You will be the team leader
          </p>
        </div>

        <FormField
          control={form.control}
          name="memberEmails"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Team Members
              </FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <TagsInput
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Type email address..."
                    maxItems={3}
                    className="w-full"
                  />

                  <div className="relative">
                    <Input
                      value={emailQuery}
                      onChange={(e) => {
                        setEmailQuery(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      placeholder="Search and add members by email..."
                      className="w-full"
                    />

                    {showSuggestions &&
                      emailQuery.length >= 2 &&
                      filteredSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 z-50 mt-1">
                          <Command className="rounded-md border shadow-lg bg-popover">
                            <CommandList>
                              <CommandGroup>
                                {filteredSuggestions.slice(0, 5).map((user) => (
                                  <CommandItem
                                    key={user.id}
                                    onSelect={() =>
                                      handleEmailSelect(user.email)
                                    }
                                    className="cursor-pointer"
                                  >
                                    <div className="flex flex-col">
                                      <span className="font-medium">
                                        {user.name}
                                      </span>
                                      <span className="text-sm text-muted-foreground">
                                        {user.email}
                                      </span>
                                    </div>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                              {filteredSuggestions.length === 0 &&
                                emailQuery.length >= 2 && (
                                  <CommandEmpty>No users found</CommandEmpty>
                                )}
                            </CommandList>
                          </Command>
                        </div>
                      )}
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Add up to 3 team members by their email addresses. Click on
                suggestions or type manually.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={createTeamMutation.isPending}
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={createTeamMutation.isPending}
            className="min-w-[120px]"
          >
            {createTeamMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Team"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
