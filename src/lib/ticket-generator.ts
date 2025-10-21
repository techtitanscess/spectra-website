import { jsPDF } from 'jspdf';
import { format } from 'date-fns';
import QRCode from 'qrcode';

export interface TicketData {
    id: string;
    name: string;
    phoneNumber: string;
    status: "pending" | "approved";
    createdAt: Date;
    event: {
        id: string;
        name: string;
        description: string;
        startDate: Date;
        endDate: Date;
        ticketCost: number;
        totalHours: number;
    };
}

export const generateTicketPDF = async (ticket: TicketData): Promise<void> => {
    const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    });


    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();


    const ticketWidth = 250;
    const ticketHeight = 100;
    const ticketX = (pageWidth - ticketWidth) / 2;
    const ticketY = (pageHeight - ticketHeight) / 2;


    pdf.setFillColor(0, 0, 0);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');


    pdf.setFillColor(6, 0, 16);
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * pageWidth;
        const y = Math.random() * pageHeight;
        const size = Math.random() * 2 + 0.5;
        pdf.circle(x, y, size, 'F');
    }


    pdf.setFillColor(10, 10, 10);
    pdf.roundedRect(ticketX, ticketY, ticketWidth, ticketHeight, 3, 3, 'F');


    pdf.setDrawColor(156, 255, 0);
    pdf.setLineWidth(0.5);
    pdf.roundedRect(ticketX, ticketY, ticketWidth, ticketHeight, 3, 3, 'S');


    const leftSectionWidth = ticketWidth * 0.75;


    pdf.setFillColor(156, 255, 0);
    pdf.rect(ticketX + 5, ticketY + 5, leftSectionWidth - 10, 15, 'F');

    // Terminal dots (like terminal window controls)
    pdf.setFillColor(255, 95, 87); // Red
    pdf.circle(ticketX + 10, ticketY + 12.5, 1.5, 'F');
    pdf.setFillColor(255, 189, 46); // Yellow
    pdf.circle(ticketX + 15, ticketY + 12.5, 1.5, 'F');
    pdf.setFillColor(39, 201, 63); // Green
    pdf.circle(ticketX + 20, ticketY + 12.5, 1.5, 'F');


    pdf.setFont('courier', 'bold');
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    pdf.text('SPECTRA EVENT TICKET', ticketX + 30, ticketY + 15);


    pdf.setFont('courier', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(156, 255, 0);

    let yPos = ticketY + 28;
    pdf.text('> Generating your event ticket...', ticketX + 8, yPos);

    yPos += 6;
    pdf.text('> Ticket details loaded successfully!', ticketX + 8, yPos);

    yPos += 6;
    pdf.setFont('courier', 'bold');
    pdf.setFontSize(12);
    pdf.text(`> Event: ${ticket.event.name.toUpperCase()}`, ticketX + 8, yPos);

    yPos += 8;
    pdf.setFont('courier', 'normal');
    pdf.setFontSize(8);
    pdf.text(`> Date: ${format(ticket.event.startDate, 'MMMM dd, yyyy')}`, ticketX + 8, yPos);

    yPos += 5;
    pdf.text(`> Time: ${format(ticket.event.startDate, 'h:mm a')} - ${format(ticket.event.endDate, 'h:mm a')}`, ticketX + 8, yPos);

    yPos += 5;
    pdf.text(`> Duration: ${ticket.event.totalHours} hours`, ticketX + 8, yPos);

    yPos += 5;
    pdf.text(`> Ticket Holder: ${ticket.name.toUpperCase()}`, ticketX + 8, yPos);

    yPos += 5;
    pdf.text(`> Contact: ${ticket.phoneNumber}`, ticketX + 8, yPos);

    yPos += 8;
    const isApproved = ticket.status === "approved";
    // Green for approved, amber for pending
    isApproved ? pdf.setTextColor(39, 201, 63) : pdf.setTextColor(255, 189, 46);
    pdf.text(`> Status: ${isApproved ? "CONFIRMED ✓" : "PENDING ⏳"}`, ticketX + 8, yPos);


    const separatorX = ticketX + leftSectionWidth;
    pdf.setDrawColor(156, 255, 0);
    for (let y = ticketY + 10; y < ticketY + ticketHeight - 10; y += 4) {
        pdf.line(separatorX, y, separatorX, y + 2);
    }


    const rightSectionX = separatorX + 5;
    const rightSectionWidth = ticketWidth - leftSectionWidth - 10;


    try {
        const qrData = JSON.stringify({
            ticketId: ticket.id,
            eventId: ticket.event.id,
            holderName: ticket.name,
            eventName: ticket.event.name,
            date: format(ticket.event.startDate, 'yyyy-MM-dd')
            // Consider adding a server-generated signature instead
        });

        const qrCodeDataURL = await QRCode.toDataURL(qrData, {
            width: 120,
            margin: 4,
            color: {
                dark: '#000000',      // Black for maximum contrast
                light: '#FFFFFF'      // White background
            }
        });

        const qrSize = 35;
        const qrX = rightSectionX + (rightSectionWidth - qrSize) / 2;
        const qrY = ticketY + 15;
        // White backing (quiet zone)
        pdf.setFillColor(255, 255, 255);
        pdf.rect(qrX - 2, qrY - 2, qrSize + 4, qrSize + 4, 'F');
        pdf.addImage(qrCodeDataURL, 'PNG', qrX, qrY, qrSize, qrSize);
    } catch (error) {

        pdf.setFillColor(20, 20, 20);
        pdf.rect(rightSectionX + 5, ticketY + 15, 35, 35, 'F');
        pdf.setDrawColor(156, 255, 0);
        pdf.rect(rightSectionX + 5, ticketY + 15, 35, 35, 'S');
        pdf.setFont('courier', 'normal');
        pdf.setFontSize(6);
        pdf.setTextColor(156, 255, 0);
        pdf.text('QR_CODE', rightSectionX + 22.5, ticketY + 35, { align: 'center' });
    }


    pdf.setFont('courier', 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(100, 100, 100);
    pdf.text('TICKET PRICE', rightSectionX + rightSectionWidth / 2, ticketY + 58, { align: 'center' });

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(20);
    pdf.setTextColor(156, 255, 0);


    const centerX = rightSectionX + rightSectionWidth / 2;
    const priceAmount = ticket.event.ticketCost.toString();
    const fullText = `Rs. ${priceAmount}`;

    pdf.text(fullText, centerX, ticketY + 68, { align: 'center' });


    pdf.setFont('courier', 'normal');
    pdf.setFontSize(6);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`ID: ${ticket.id.slice(0, 8).toUpperCase()}`, rightSectionX + rightSectionWidth / 2, ticketY + 78, { align: 'center' });

    // Generation timestamp
    pdf.setFontSize(5);
    pdf.text(`${format(new Date(), 'yyyy-MM-dd HH:mm')}`, rightSectionX + rightSectionWidth / 2, ticketY + 85, { align: 'center' });


    pdf.setFillColor(20, 20, 20);
    pdf.rect(ticketX + 5, ticketY + ticketHeight - 12, leftSectionWidth - 10, 7, 'F');

    pdf.setFont('courier', 'normal');
    pdf.setFontSize(6);
    pdf.setTextColor(156, 255, 0);
    pdf.text('> Please bring this ticket to the event venue for entry', ticketX + 8, ticketY + ticketHeight - 7);


    pdf.setDrawColor(156, 255, 0);
    pdf.setLineWidth(1);


    pdf.line(ticketX, ticketY + 8, ticketX, ticketY);
    pdf.line(ticketX, ticketY, ticketX + 8, ticketY);


    pdf.line(ticketX + ticketWidth - 8, ticketY, ticketX + ticketWidth, ticketY);
    pdf.line(ticketX + ticketWidth, ticketY, ticketX + ticketWidth, ticketY + 8);


    pdf.line(ticketX, ticketY + ticketHeight - 8, ticketX, ticketY + ticketHeight);
    pdf.line(ticketX, ticketY + ticketHeight, ticketX + 8, ticketY + ticketHeight);


    pdf.line(ticketX + ticketWidth - 8, ticketY + ticketHeight, ticketX + ticketWidth, ticketY + ticketHeight);
    pdf.line(ticketX + ticketWidth, ticketY + ticketHeight, ticketX + ticketWidth, ticketY + ticketHeight - 8);


    const fileName = `Spectra_Ticket_${ticket.event.name.replace(/\s+/g, '_')}_${ticket.id.slice(0, 8)}.pdf`;
    pdf.save(fileName);
};