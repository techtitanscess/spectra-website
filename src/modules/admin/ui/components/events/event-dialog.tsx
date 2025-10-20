import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EventForm from "./event-form";

export default function EventDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New Event</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Event</DialogTitle>
          <DialogDescription>
            Please fill in the details for the new event.
          </DialogDescription>
        </DialogHeader>
        <EventForm />
      </DialogContent>
    </Dialog>
  );
}
