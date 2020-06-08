# diary-cli

## commands

- **[add]**
  - **[entry]** _[string]_ Adds new entry to diary
  - **[training]** _[string]_ Adds new training entry to diary
  - **[gratefulness]** _[string]_ Adds something you are grateful for to diary
- **[remove]**
  - **[entry]** _[id]_ _[YYYY-MM-DD?]_ Removes entry with given id. Optionally you can pass diary date as first argument
  - **[training]** _[id]_ _[YYYY-MM-DD?]_ Removes training entry with given id. Optionally you can pass diary date as first argument
  - **[gratefulness]** _[id]_ _[YYYY-MM-DD?]_ Removes something you are grateful for with given id. Optionally you can pass diary date as first argument
- **[read]**
  - **[diary]** _[YYYY-MM-DD?]_ Loggs todays diary entries including training and things your are grateful for. Optionally pass date as an argument to read another date than today
- **[flush]**
  - **[diary]** _[YYYY-MM-DD?]_ Deletes an entire day. Optionally pass date as an argument to delete another date than today
