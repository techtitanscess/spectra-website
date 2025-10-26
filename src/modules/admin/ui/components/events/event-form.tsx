"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { DatetimePicker } from "@/components/ui/datetime-picker";
import { LoadingSwap } from "@/components/ui/loading-swap";
import {
  useCreateEvent,
  useUpdateEvent,
} from "@/modules/admin/server/events/hooks";
import { authClient } from "@/lib/auth-client";
import { Event } from "./event-columns";
import { useEffect } from "react";

const formSchema = z
  .object({
    name: z.string().min(1).min(3).max(100),
    startDate: z.date(),
    endDate: z.date(),
    description: z.string(),
    imageUrl: z.string().url().optional().or(z.literal("")),
    whatsappUrl: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val || val === "") return true;
          try {
            const url = new URL(val);
            return (
              url.hostname === "chat.whatsapp.com" || url.hostname === "wa.me"
            );
          } catch {
            return false;
          }
        },
        {
          message:
            "Please enter a valid WhatsApp group link (chat.whatsapp.com or wa.me)",
        }
      ),
    totalHours: z.number().min(1),
    ticketCost: z.number().min(0),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after or equal to start date",
    path: ["endDate"],
  });

interface EventFormProps {
  event?: Event | null;
  onSuccess?: () => void;
}

export default function EventForm({ event, onSuccess }: EventFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: event?.name || "",
      startDate: event ? new Date(event.startDate) : new Date(),
      endDate: event ? new Date(event.endDate) : new Date(),
      description: event?.description || "",
      imageUrl: event?.imageUrl || "",
      whatsappUrl: event?.whatsappUrl || "",
      totalHours: event?.totalHours || 1,
      ticketCost: event?.ticketCost || 0,
    },
  });

  const { data } = authClient.useSession();
  const { isSubmitting } = form.formState;
  const createEventMutation = useCreateEvent();
  const updateEventMutation = useUpdateEvent();

  const isEditing = !!event;

  // Populate form with event data when editing
  useEffect(() => {
    if (event) {
      form.reset({
        name: event.name,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        description: event.description,
        imageUrl: event.imageUrl || "",
        whatsappUrl: event.whatsappUrl || "",
        totalHours: event.totalHours,
        ticketCost: event.ticketCost,
      });
    }
  }, [event, form]);

  // Calculate total hours when start or end date changes
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name === "startDate" || name === "endDate") {
        const startDate = value.startDate;
        const endDate = value.endDate;

        if (startDate && endDate && endDate >= startDate) {
          const diffInMs = endDate.getTime() - startDate.getTime();
          const diffInHours = Math.ceil(diffInMs / (1000 * 60 * 60));
          form.setValue("totalHours", diffInHours);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!data && !isEditing) {
      toast.error("You must be logged in to create an event");
      return;
    }

    try {
      if (isEditing && event) {
        // Update existing event
        const eventData = {
          id: event.id,
          ...values,
          imageUrl: values.imageUrl || undefined,
        };
        await updateEventMutation.mutateAsync(eventData);
        onSuccess?.();
      } else {
        // Create new event
        const eventData = {
          ...values,
          imageUrl: values.imageUrl || undefined,
          createdBy: data?.user?.id || "",
        };
        await createEventMutation.mutateAsync(eventData);
        form.reset();
        onSuccess?.();
      }
    } catch (error) {
      // Error is handled in the mutation hooks
      console.error("Form submission error", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date & Time</FormLabel>
              <FormControl>
                <DatetimePicker
                  value={field.value}
                  onChange={field.onChange}
                  format={[
                    ["months", "days", "years"],
                    ["hours", "minutes", "am/pm"],
                  ]}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End Date & Time</FormLabel>
              <FormControl>
                <DatetimePicker
                  value={field.value}
                  onChange={field.onChange}
                  format={[
                    ["months", "days", "years"],
                    ["hours", "minutes", "am/pm"],
                  ]}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/image.jpg"
                  type="url"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                URL of the event banner/poster image
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="whatsappUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp Group URL (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://chat.whatsapp.com/..."
                  type="url"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                WhatsApp group link for approved ticket holders to join
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="totalHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Hours</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="8"
                      type="number"
                      min="1"
                      {...field}
                      value={field.value}
                      readOnly
                      className="bg-muted"
                    />
                  </FormControl>
                  <FormDescription>
                    Automatically calculated from start and end date/time
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="ticketCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket Cost (INR)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Leave 0 for free events</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder=""
                  className="resize-none"
                  rows={7}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {isEditing ? (
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onSuccess}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 font-semibold tracking-tight"
              disabled={isSubmitting || updateEventMutation.isPending}
            >
              <LoadingSwap
                isLoading={isSubmitting || updateEventMutation.isPending}
              >
                Update Event
              </LoadingSwap>
            </Button>
          </div>
        ) : (
          <Button
            type="submit"
            className="w-full font-semibold tracking-tight"
            disabled={isSubmitting || createEventMutation.isPending}
          >
            <LoadingSwap
              isLoading={isSubmitting || createEventMutation.isPending}
            >
              Create Event
            </LoadingSwap>
          </Button>
        )}
      </form>
    </Form>
  );
}
