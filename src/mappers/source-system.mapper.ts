export function mapSourceSystemToApi(
  sourceSystem?: string
): string | undefined {
  if (!sourceSystem || sourceSystem === "All") return undefined;

  const map: Record<string, string> = {
    IZIT: "iZit",
    "Azure DevOps": "Azure DevOps",
  };

  return map[sourceSystem];
}
