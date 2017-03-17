# react-user-manager
This is a simple ReactJS/Redux demo of an admin user module, such as what would be used as part of a larger platform.
Its purpose is to show an example of Kelly Keller-Heikkila's JavaScript development work.

Features of this demo include:

* Create new users, assign package licenses to them, remove licenses, and delete users
* Count of current licensed users vs. max licensed users is maintained throughout
* As the number of user licenses changes, the color of the license count will change from green to orange to red encouraging the admin user to purchase more licenses
* If the number of current licenses used reaches the max licenses, the UI will prevent further users from being licensed in that package
* Permissions are checked to see if you have access to create users or delete them (you do)
* An example second package "Other Package" is included to demo how multiple packages/modules would be structured in the code (you can access Other Package by going to the Packages dropdown above)
* Username must be in all capitals
* Table uses fixed headers
* Users displayed in alphabetical order, according to username
* Realtime validation of form data

The packages shown are dynamically generated and would normally be returned in the REST response. All data is mocked, so there is no actual REST API server behind this demo, though it would be trivial to create one in Python, PHP, etc.

If interested in how Kelly can help your development efforts, feel free to reach her at kelly@keller-heikkila.org.
