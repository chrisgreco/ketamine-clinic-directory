import { NextRequest, NextResponse } from "next/server";
import { insertLead } from "@/lib/supabase";
import { resend } from "@/lib/resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, condition, insurance_type, message, listing_id, city, state } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const { error } = await insertLead({
      listing_id: listing_id || null,
      name,
      email,
      phone: phone || "",
      city: city || "",
      state: state || "",
      condition: condition || "",
      insurance_type: insurance_type || "",
      message: message || "",
    });

    if (error) {
      console.error("Lead insert error:", error);
      return NextResponse.json(
        { error: "Failed to save lead." },
        { status: 500 }
      );
    }

    // Send notification email (non-blocking)
    try {
      await resend.emails.send({
        from: "KetamineClinics <noreply@ketamineclinics.com>",
        to: ["admin@ketamineclinics.com"],
        subject: `New Lead: ${name} - ${condition || "General Inquiry"}`,
        html: `
          <h2>New Consultation Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Condition:</strong> ${condition || "Not specified"}</p>
          <p><strong>Insurance:</strong> ${insurance_type || "Not specified"}</p>
          <p><strong>Location:</strong> ${city ? `${city}, ${state}` : "Not specified"}</p>
          <p><strong>Message:</strong> ${message || "None"}</p>
          <p><strong>Listing ID:</strong> ${listing_id || "General (no specific clinic)"}</p>
          <hr />
          <p style="color: #999; font-size: 12px;">This is an automated notification from KetamineClinics.com</p>
        `,
      });
    } catch (emailError) {
      // Non-critical: log but don't fail the request
      console.error("Email notification failed:", emailError);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
