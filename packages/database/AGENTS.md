# Database guidance

All schema changes require a migration and rollback consideration. Never store production data in
fixtures. Sensitive tokens require an explicit encryption and retention decision. Tests must use a
temporary isolated database.
