"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { authClient } from "@/lib/auth-client";
import { useCreateTicket } from "@/modules/admin/server/tickets/hooks";
import { LoadingSwap } from "@/components/ui/loading-swap";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(1).min(3).max(100),
  phone: z.string().min(10).max(13),
});

export default function TicketForm({
  eventId,
  onSuccess,
}: {
  eventId: string;
  onSuccess?: () => void;
}) {
  const { data } = authClient.useSession();
  const createTicketMutation = useCreateTicket();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.user?.name || "",
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!data?.user?.id) {
      toast.error("You must be logged in to request a ticket");
      return;
    }

    try {
      createTicketMutation.mutate(
        {
          name: values.name,
          phoneNumber: values.phone,
          eventId: eventId,
          userId: data.user.id,
        },
        {
          onSuccess: () => {
            form.reset();
            onSuccess?.();
          },
        }
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name of Payee (as on card/upi)</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" {...field} />
              </FormControl>
              <FormDescription>
                PLEASE ENTER THE NAME OF THE PERSON THE PAYMENT WILL BE MADE UNDER (ACCOUNT NAME)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Phone number</FormLabel>
              <FormControl className="w-full">
                <PhoneInput {...field} defaultCountry="IN" />
              </FormControl>
              <FormDescription>
                This number may receive a call for ticket approval.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-center">
          <Image src="/assets/gpay.jpeg" alt="gpay" width={200} height={200} className="rounded-lg" />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={createTicketMutation.isPending}
        >
          <LoadingSwap isLoading={createTicketMutation.isPending}>
            Request Ticket
          </LoadingSwap>
        </Button>
      </form>
    </Form>
  );
}
