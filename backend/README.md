# Endpoins
### /api/details/all
    returns details for all providers
### /api/details/openstreetmap
    returns details for provider openstreetmap
### /api/details/velopark
    returns details for provider velopark
### /api/filter/all/?{params}
    returns filtered results for all providers
    available filters:
    - isCovered=true shows only covered places
    - isFree=true shows only covered places
    - type={string} shows only the places where the type is {string}
    - minCapacity={int} shows only the places where the minimum capacity is {int}
    Example usage `?isCovered=true&isFree=true&minCapacity=50`

# Format
```json
{
  "id": int,
  "source": string, // openstreetmap, velopark, etc.
  "latitude",
  "longitude",
  "capacity": int | null, // null if unknown.
  "isCovered": bool, // true if it has roof/ is covered.
  "type": string | null, // Type of the parking, e.g. stands, safe_loops, etc. null if unknown.
  "isFree" bool // true if free, null if unknown.
}
```