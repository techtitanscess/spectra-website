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
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { useUpdateEvent } from "@/hooks/use-events";
import { Event } from "./event-columns";
import { useEffect } from "react";

const formSchema = z
  .object({
    name: z.string().min(1).min(3).max(100),
    startDate: z.date(),
    endDate: z.date(),
    description: z.string(),
    imageUrl: z.string().url().optional().or(z.literal("")),
    totalHours: z.number().min(1),
    ticketCost: z.number().min(0),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after or equal to start date",
    path: ["endDate"],
  });

interface EditEventFormProps {
  event: Event;
  onSuccess?: () => void;
}

export default function EditEventForm({ event, onSuccess }: EditEventFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      startDate: new Date(),
      endDate: new Date(),
      description: "",
      imageUrl: "",
      totalHours: 1,
      ticketCost: 0,
    },
  });

  const { isSubmitting } = form.formState;
  const updateEventMutation = useUpdateEvent();

  // Populate form with event data when component mounts or event changes
  useEffect(() => {
    if (event) {
      form.reset({
        name: event.name,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        description: event.description,
        imageUrl: event.imageUrl || "",
        totalHours: event.totalHours,
        ticketCost: event.ticketCost,
      });
    }
  }, [event, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const eventData = {
        id: event.id,
        ...values,
        imageUrl: values.imageUrl || undefined,
      };

      await updateEventMutation.mutateAsync(eventData);
      onSuccess?.();
    } catch (error) {
      // Error is handled in the mutation hook
      console.error("Form submission error", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-3xl mx-auto py-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter event name" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

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
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Duration of the event in hours
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
                      placeholder="0"
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
                  placeholder="Describe your event"
                  className="resize-none"
                  rows={7}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
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
      </form>
    </Form>
  );
}