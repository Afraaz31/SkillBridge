backend/
├── .env                  ← secret/config values (DB url, JWT secret, port)
├── .env.example          ← same as .env but without real secrets (for sharing)
├── .gitignore            ← tells git to ignore node_modules/ and .env
├── package.json          ← project info + dependencies list
├── node_modules/         ← installed packages (auto-generated, never touch)
│
└── src/                  ← ALL your code lives here
    ├── server.js         ← entry point — starts the app (not created yet)
    ├── config/           ← configuration files
    │   ├── db.js         ← MongoDB connection logic
    │   └── roles.js      ← predefined role templates data
    │
    ├── models/           ← database schemas (shape of your data)
    │   ├── User.js
    │   ├── Skill.js
    │   ├── Project.js
    │   └── RoleTemplate.js
    │
    ├── routes/            ← URL endpoints (which URL does what)
    ├── controllers/       ← actual logic (what happens when a URL is hit)
    ├── middleware/         ← functions that run BEFORE your route logic
    │   ├── auth.js        ← checks if user is logged in
    │   └── errorHandler.js ← catches errors in one place
    │
    ├── services/          ← business logic (readiness score, gap analysis)
    └── utils/             ← small helper functions
        └── asyncHandler.js ← wraps async functions to auto-catch errors


What each folder does (simple explanation):
Folder	Think of it as	Example
config/	Settings	"Connect to this database", "These are the roles"
models/	Database blueprints	"A User has name, email, password"
routes/	Address book	"POST /api/auth/register goes to register function"
controllers/	Workers	"Take the request, save user to DB, send response"
middleware/	Security guards	"Check JWT token before allowing access"
services/	Brain/logic	"Calculate readiness score"
utils/	Toolbox	Small reusable helper functions
How a request flows:

User sends request
    → routes/ (which URL?)
        → middleware/ (is user allowed?)
            → controllers/ (do the work)
                → models/ (talk to database)
                    → send response back
Example: User hits POST /api/auth/register

routes/auth.js — matches the URL, sends to controller
controllers/authController.js — takes name/email/password from request
models/User.js — creates new user in MongoDB
Response sent back with JWT token