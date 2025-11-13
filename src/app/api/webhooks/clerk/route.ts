import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  // Get the Svix headers for verification
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("CLERK_WEBHOOK_SECRET is not set");
    return new Response("Webhook secret not configured", {
      status: 500,
    });
  }

  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === "user.created") {
    const {
      id,
      email_addresses,
      first_name,
      last_name,
      image_url,
      created_at,
    } = evt.data;

    try {
      const supabase = createAdminClient();

      // Insert user into Supabase
      const { error } = await supabase.from("users").insert({
        clerk_id: id,
        email: email_addresses[0]?.email_address || null,
        first_name: first_name || null,
        last_name: last_name || null,
        image_url: image_url || null,
        created_at: new Date(created_at).toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Error inserting user into Supabase:", error);
        return new Response("Error creating user in Supabase", {
          status: 500,
        });
      }

      return new Response("User created successfully", { status: 200 });
    } catch (error) {
      console.error("Error processing user.created webhook:", error);
      return new Response("Error processing webhook", {
        status: 500,
      });
    }
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    try {
      const supabase = createAdminClient();

      // Update user in Supabase
      const { error } = await supabase
        .from("users")
        .update({
          email: email_addresses[0]?.email_address || null,
          first_name: first_name || null,
          last_name: last_name || null,
          image_url: image_url || null,
          updated_at: new Date().toISOString(),
        })
        .eq("clerk_id", id);

      if (error) {
        console.error("Error updating user in Supabase:", error);
        return new Response("Error updating user in Supabase", {
          status: 500,
        });
      }

      return new Response("User updated successfully", { status: 200 });
    } catch (error) {
      console.error("Error processing user.updated webhook:", error);
      return new Response("Error processing webhook", {
        status: 500,
      });
    }
  }

  return new Response("Webhook received", { status: 200 });
}
