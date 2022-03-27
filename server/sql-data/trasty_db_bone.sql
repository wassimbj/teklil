-- Adminer 4.7.7 PostgreSQL dump
DROP TABLE IF EXISTS "users";

DROP SEQUENCE IF EXISTS users_id_seq;

CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."users" (
    "id" integer DEFAULT nextval('users_id_seq') NOT NULL,
    "fullname" character varying(50) NOT NULL,
    "image" character varying(250) NOT NULL,
    "email" character varying(200) NOT NULL,
    "points" integer,
    "password" character varying(50),
    CONSTRAINT "users_email" UNIQUE ("email")
) WITH (oids = false);

CREATE INDEX "users_id" ON "public"."users" USING btree ("id");

-- 2021-02-24 11:38:11.374245+00
-- Adminer 4.7.7 PostgreSQL dump
DROP TABLE IF EXISTS "posts";

DROP SEQUENCE IF EXISTS posts_id_seq;

CREATE SEQUENCE posts_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."posts" (
    "id" integer DEFAULT nextval('posts_id_seq') NOT NULL,
    "lat" character varying(10) NOT NULL,
    "long" character varying(10) NOT NULL,
    "image" character varying(200) NOT NULL,
    "is_cleaned" boolean NOT NULL DEFAULT false
) WITH (oids = false);

CREATE INDEX "posts_id" ON "public"."posts" USING btree ("id");

-- 2021-02-24 11:38:11.374245+00
