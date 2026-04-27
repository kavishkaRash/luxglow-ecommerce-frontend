import { createClient } from "@supabase/supabase-js";

const anonKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwdHVtcHJ3dXNuYWtqY2VpZmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxOTE5NTAsImV4cCI6MjA5Mjc2Nzk1MH0.kfwJrU8y5yTeJ9LOB46wog3j05OdGG5NPjQSD8xuskQ";

const supabaseUrl = "https://jptumprwusnakjceifca.supabase.co";

const supabase = createClient(supabaseUrl, anonKey);

export default function mediaUpload(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No File selected");
      return;
    }

    const timestamp = new Date().getTime();
    const fileName = timestamp + "-" + file.name;

    supabase.storage
      .from("images")
      .upload(fileName, file, {
        upsert: false,
        cacheControl: "3600",
      })
      .then(({ data, error }) => {
        if (error) {
          reject(error);
          return;
        }

        const publicUrl = supabase.storage
          .from("images")
          .getPublicUrl(fileName).data.publicUrl;

        resolve(publicUrl);
      })
      .catch((err) => {
        reject(err);
      });
  });
}