# API guidance

Routes must validate input, enforce authentication and authorization, return DTOs rather than raw
database rows, and avoid leaking internal errors. Add HTTP tests for success, invalid input,
unauthorized access and failures. Keep configuration in the validated environment module.
