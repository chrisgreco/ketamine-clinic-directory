import { NextRequest, NextResponse } from "next/server";
import { insertListing, getAllListings } from "@/lib/supabase";
import { resend } from "@/lib/resend";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET() {
  try {
    const listings = await getAllListings();
    return NextResponse.json({ listings }, { status: 200 });
  } catch (err) {
    console.error("Listings GET error:", err);
    return NextResponse.json(
      { error: "Failed to fetch listings." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      business_name,
      contact_name,
      email,
      phone,
      website,
      address,
      city,
      state,
      zip_code,
      description,
      conditions_treated,
      treatment_types,
      accepts_insurance,
      telehealth_available,
      price_per_session_low,
      price_per_session_high,
    } = body;

    if (!business_name || !email || !city || !state) {
      return NextResponse.json(
        { error: "Business name, email, city, and state are required." },
        { status: 400 }
      );
    }

    const slug = slugify(`${business_name}-${city}-${state}`);

    const { data, error } = await insertListing({
      slug,
      business_name,
      description: description || "",
      city,
      state,
      address: address || "",
      zip_code: zip_code || "",
      phone: phone || "",
      email,
      website: website || "",
      image_url: "",
      conditions_treated: conditions_treated || [],
      treatment_types: treatment_types || [],
      accepts_insurance: accepts_insurance || false,
      telehealth_available: telehealth_available || false,
      price_per_session_low: price_per_session_low || 0,
      price_per_session_high: price_per_session_high || 0,
      rating: 0,
      review_count: 0,
      featured: false,
      verified: false,
      latitude: 0,
      longitude: 0,
    });

    if (error) {
      console.error("Listing insert error:", error);
      return NextResponse.json(
        { error: "Failed to save listing." },
        { status: 500 }
      );
    }

    // Notify admin
    try {
      await resend.emails.send({
        from: "KetamineClinics <noreply@ketamineclinics.com>",
        to: ["admin@ketamineclinics.com"],
        subject: `New Listing Submission: ${business_name}`,
        html: `
          <h2>New Clinic Listing Submitted</h2>
          <p><strong>Clinic:</strong> ${business_name}</p>
          <p><strong>Contact:</strong> ${contact_name || "Not provided"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Location:</strong> ${city}, ${state} ${zip_code}</p>
          <p><strong>Website:</strong> ${website || "Not provided"}</p>
          <p><strong>Description:</strong> ${description || "None"}</p>
          <hr />
          <p>Review and approve this listing in the <a href="https://ketamineclinics.com/admin">admin dashboard</a>.</p>
        `,
      });
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
    }

    return NextResponse.json({ success: true, slug }, { status: 201 });
  } catch (err) {
    console.error("Listings POST error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
