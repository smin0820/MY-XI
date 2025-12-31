import supabase from "@/lib/supabase";

export async function createPlayer({
  name,
  nameEn,
  teamName,
}: {
  name: string;
  nameEn: string;
  teamName: string;
}) {
  const { data, error } = await supabase.from("player").insert({
    name,
    name_en: nameEn,
    team_name: teamName,
  });

  if (error) throw error;
  return data;
}
