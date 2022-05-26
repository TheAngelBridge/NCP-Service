## Changes

#### v0.0.5 ( 2022. 5. 27 )

- Hot Fix
  - ADD title, contents to sending long message is adjust reversed. **( bug )**
  - APPLY correctly order of paramter, and check works well.

- ADD attatch files to MMS
  - ADD optional file params to Send / Reserve / Schedule MMS
  - Developers can import MMS_FILE type from module and use for it

#### v0.0.3 ( 2022. 5. 27 )

- Delete ScheduleCode Util
  - scheduleCode is user-customizable values, not in the rule. so utilizing it is useless.

#### v0.0.2 ( 2022. 5. 26 )

- Merge send messaging methods ( SMS, LMS, MMS )
  - merge send message methods COMMON, AD
  - optional advertising supports reserveMessage / scheduleMessage, too