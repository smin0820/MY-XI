import supabase from "@/lib/supabase";
import { uploadImage } from "./image";
import type { PlayerEntity } from "@/types/db";

export async function fetchPlayers() {
  const { data, error } = await supabase
    .from("player")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function fetchPlayersByIds(ids: number[]) {
  if (ids.length === 0) return [];

  const { data, error } = await supabase
    .from("player")
    .select("*")
    .in("id", ids);

  if (error) throw error;
  return data ?? [];
}

export async function fetchPlayersByKeyword({
  keyword,
  from,
  to,
}: {
  keyword: string;
  from: number;
  to: number;
}) {
  const { data, error } = await supabase
    .from("player")
    .select("*")
    .ilike("name", `%${keyword.trim()}%`)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;
  return data;
}

export async function createPlayer({
  name,
  nameEn,
  teamName,
}: {
  name: string;
  nameEn: string;
  teamName: string;
}) {
  const { data, error } = await supabase
    .from("player")
    .insert({
      name,
      name_en: nameEn,
      team_name: teamName,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createPlayerWithAvatar({
  name,
  nameEn,
  teamName,
  avatarFile,
  userId,
}: {
  name: string;
  nameEn: string;
  teamName: string;
  avatarFile?: File;
  userId: string;
}) {
  // 1 새로운 플레이어 생성
  const player = await createPlayer({ name, nameEn, teamName });
  if (!avatarFile) return player;

  try {
    // 2 storaged에 이미지 업로드
    const fileExtension = avatarFile.name.split(".").pop() || "webp";
    const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
    const avatarPath = `${userId}/${player.id}/${fileName}`;
    const avatarUrl = await uploadImage({
      file: avatarFile,
      filePath: avatarPath,
    });

    // 3 플레이어 정보 업데이트
    const updatedPlayer = await updatePlayer({
      id: player.id,
      avatar_url: avatarUrl,
    });

    return updatedPlayer;
  } catch (error) {
    await deletePlayer(player.id);
    throw error;
  }
}

export async function updatePlayer(
  player: Partial<PlayerEntity> & { id: number },
) {
  const { data, error } = await supabase
    .from("player")
    .update(player)
    .eq("id", player.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePlayer(id: number) {
  const { data, error } = await supabase
    .from("player")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
