# Endpoins
- /api/details/all
    returns details for all providers
- /api/details/openstreetmap
    returns details for provider openstreetmap
- /api/details/velopark
    returns details for provider velopark
# Format
```json
{
  "id": int,
  "source": string, // openstreetmap, velopark, etc.
  "latitude",
  "longitude",
  "capacity": int | null, // null if unknown.
  "covered": bool, // true if it has roof/ is covered.
  "type": string | null, // Type of the parking, e.g. stands, safe_loops, etc. null if unknown.
  "isFree" bool // true if free, null if unknown.
}
```