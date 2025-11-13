-- Drop existing connections and recreate everything cleanly
DO
$$
BEGIN
   -- Disconnect active connections if database exists
   IF EXISTS (SELECT FROM pg_database WHERE datname = 'demo_db') THEN
      PERFORM pg_terminate_backend(pid)
      FROM pg_stat_activity
      WHERE datname = 'demo_db';
   END IF;
END
$$;

-- Drop database and user if they exist
DROP DATABASE IF EXISTS demo_db;
DROP ROLE IF EXISTS demo;

-- Create fresh user and database
CREATE USER demo WITH PASSWORD 'demo_pass';
CREATE DATABASE demo_db OWNER demo;

\connect demo_db;

-- Create table
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

-- Set ownership and permissions
ALTER TABLE users OWNER TO demo;
GRANT ALL PRIVILEGES ON TABLE users TO demo;
GRANT ALL PRIVILEGES ON SEQUENCE users_id_seq TO demo;

