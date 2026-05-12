import { createClient } from "gorth-base/cores/supabase-js";
// import type { Server as SocketIOServer } from "socket.io";
import { models } from "@/lib/constants";
import { Logger } from "gorth-base/lib/logger";

let isRealtimeBootstrapped = false;

export async function createRealtime() {
  if (isRealtimeBootstrapped) {
    return;
  }

  isRealtimeBootstrapped = true;

  const supabase = createClient(
    process.env.EXPRESS_PUBLIC_SUPABASE_URL!,
    process.env.EXPRESS_PRIVATE_SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      },
      realtime: {
        params: {
          eventsPerSecond: 20
        },
      },
      global: {
        headers: {
          'User-Agent': 'Express-Server',
        },
      },
    }
  )

  const channel = supabase.channel(`db-realtime`);

  models.forEach((table) => {
    channel.on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table
      },
      (payload) => {
        if (payload.errors?.length) {
          console.error(Logger(`[Realtime] ${table} subscription error: ${payload.errors}`, 'error', 'red'));
          return;
        }

        console.log(Logger(`[Realtime] Change in ${table}: ${JSON.stringify(payload)}`, "info", "cyan"));

        // Broadcast to all Socket.IO clients
        // io.emit("supabase", {
        //   table,
        //   data: payload,
        // });
      }
    );
  });

  channel.subscribe((status) => {
    if (status === "SUBSCRIBED") {
      console.log(Logger(`[Realtime] db channel status: ${status}`, 'info', 'green'));
      return;
    }

    if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
      console.error(Logger(`[Realtime] db channel status: ${status}`, 'error', 'red'));
    }
  });
}
