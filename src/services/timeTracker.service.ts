import { api } from "./api";

export async function getTimeTracks(params?: {
  person?: string;
  sourceSystem?: string;
  startTime?: string;
  endTime?: string;
  status?: string;
  project?: string;
}) {
  const { data } = await api.get("/timetracks", {
    params,
  });
  return data;
}
