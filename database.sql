CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(100) UNIQUE NOT NULL,
    "password" VARCHAR(250) NOT NULL,
    "security_clearance" INT NOT NULL
);



CREATE TABLE "projects" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(250) NOT NULL,
    "description" VARCHAR(1000),
    "year" VARCHAR(9) NOT NULL,
    "published" BOOLEAN NOT NULL,
    "date_created" DATE
);



CREATE TABLE "missions" (
    "id" SERIAL PRIMARY KEY,
    "project_id" INT REFERENCES "projects" NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "description" VARCHAR(500) NOT NULL
);



CREATE TABLE "goal_types" (
    "id" SERIAL PRIMARY KEY,
    "type" varchar(100) NOT NULL
);



CREATE TABLE "goals" (
    "id" SERIAL PRIMARY KEY,
    "mission_id" INT REFERENCES "missions" NOT NULL,
    "goal_type_id" INT REFERENCES "goal_types" NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "points" INT ,
    "how_many_max" INT ,
    "how_many_min" INT DEFAULT '0'
);



CREATE TABLE "teams" (
    "id" SERIAL PRIMARY KEY,
    "coach_user_id" INT REFERENCES "users" NOT NULL,
    "team_user_id" INT REFERENCES "users" NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "team_number" INT NOT NULL,
    "team_access" BOOLEAN NOT NULL
);



CREATE TABLE "team_members" (
    "id" SERIAL PRIMARY KEY,
    "team_id" INT REFERENCES "teams" NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "hidden" BOOLEAN NOT NULL DEFAULT 'false'
);



CREATE TABLE "runs" (
    "id" SERIAL PRIMARY KEY,
    "team_id" INT REFERENCES "teams" NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "date" DATE NOT NULL,
    "driver" INT REFERENCES "team_members" NOT NULL,
    "assistant" INT REFERENCES "team_members" NOT NULL,
    "score_keeper" INT REFERENCES "team_members"NOT NULL,
    "score" INT,
    "penalties" INT,
    "notes" VARCHAR(1000)
);



CREATE TABLE "selected_missions" (
    "id" SERIAL PRIMARY KEY,
    "mission_id" INT REFERENCES "missions" NOT NULL,
    "run_id" INT REFERENCES "runs" NOT NULL
);



CREATE TABLE "either_or" (
    "id" SERIAL PRIMARY KEY,
    "goal_id" INT REFERENCES "goals" NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "points" INT NOT NULL
);



CREATE TABLE "penalties" (
    "id" SERIAL PRIMARY KEY,
    "project_id" INT REFERENCES "projects" NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "points" INT NOT NULL,
    "max" INT NOT NULL
);



CREATE TABLE "goals_per_run" (
    "id" SERIAL PRIMARY KEY,
    "goal_id" INT REFERENCES "goals" NOT NULL,
    "selected_missions_id" INT REFERENCES "selected_missions" NOT NULL,
    "how_many_collected" INT,
    "is_completed" BOOLEAN
);


INSERT INTO "public"."projects"("id", "name", "description", "year", "published", "date_created") 
VALUES(1, 'Under Da Sea', 'We are going under the sea', '2016', TRUE, '5/20/19'); 

INSERT INTO "public"."penalties"("id", "project_id", "name", "points", "max") VALUES(1, 1, 'Touch Penalty', 3, 6) RETURNING "id", "project_id", "name", "points", "max";

INSERT INTO "public"."missions"("id", "project_id", "name", "description") 
VALUES(1, 1, 'Shark Shipment', 'In their usual environments, animals are very resilient. But in strange environments, they need a lot of care. As we ship our Bonnet-Head Shark in an aircraft, she needs impact avoidance, specific diet, clean water at proper pressure and temperature, and medical care along the way. She must not be upset. Move the shark to her new home not touching her tank''s walls.') 
RETURNING "id", "project_id", "name", "description";

INSERT INTO "public"."missions"("id", "project_id", "name", "description") VALUES(2, 1, 'Service Dog Action', 'Visually impaired people become experts at being able to tell when they are about to cross a road, but it''s harder to tell when a vehicle is coming.') RETURNING "id", "project_id", "name", "description";

INSERT INTO "public"."missions"("id", "project_id", "name", "description") VALUES(3, 1, 'Animal Conservation', 'Facilities often exchange behavioral study, mating, halth, efficiency, friendship, and the visiting public. Imagine how hard some animals are to transport.') RETURNING "id", "project_id", "name", "description";

INSERT INTO "public"."goal_types"("id", "type") VALUES(1, 'Yes/No') RETURNING "id", "type";
INSERT INTO "public"."goal_types"("id", "type") VALUES(2, 'Either/Or') RETURNING "id", "type";
INSERT INTO "public"."goal_types"("id", "type") VALUES(3, 'How Many') RETURNING "id", "type";

INSERT INTO "public"."goals"("id", "mission_id", "goal_type_id", "name", "points", "how_many_max", "how_many_min") VALUES(1, 1, 2, 'Tank and Shark', 0, 0, 0) RETURNING "id", "mission_id", "goal_type_id", "name", "points", "how_many_max", "how_many_min";
INSERT INTO "public"."goals"("id", "mission_id", "goal_type_id", "name", "points", "how_many_max", "how_many_min") VALUES(2, 1, 1, 'Bonus (added only if target is scored) Shark is touching only the tank floor and no wall', 20, 0, 0) RETURNING "id", "mission_id", "goal_type_id", "name", "points", "how_many_max", "how_many_min";
INSERT INTO "public"."goals"("id", "mission_id", "goal_type_id", "name", "points", "how_many_max", "how_many_min") VALUES(3, 2, 1, 'The warning fence is down', 15, 0, 0) RETURNING "id", "mission_id", "goal_type_id", "name", "points", "how_many_max", "how_many_min";
INSERT INTO "public"."goals"("id", "mission_id", "goal_type_id", "name", "points", "how_many_max", "how_many_min") VALUES(4, 3, 3, 'Two identical animals are completely on the same side', 20, 5, 0) RETURNING "id", "mission_id", "goal_type_id", "name", "points", "how_many_max", "how_many_min";

INSERT INTO "public"."either_or"("id", "goal_id", "name", "points") VALUES(1, 1, 'Tank and shark are completely in target 1', 7) RETURNING "id", "goal_id", "name", "points";
INSERT INTO "public"."either_or"("id", "goal_id", "name", "points") VALUES(2, 1, 'Tank and shark are completely in target 2', 10) RETURNING "id", "goal_id", "name", "points";
INSERT INTO "public"."users"("id", "username", "password", "security_clearance") VALUES(1, 'admin', 'admin', 1) RETURNING "id", "username", "password", "security_clearance";
INSERT INTO "public"."users"("id", "username", "password", "security_clearance") VALUES(2, 'coach', 'coach', 2) RETURNING "id", "username", "password", "security_clearance";
INSERT INTO "public"."users"("id", "username", "password", "security_clearance") VALUES(3, 'robotmasters', 'robotmasters', 3) RETURNING "id", "username", "password", "security_clearance";
INSERT INTO "public"."teams"("id", "coach_user_id", "team_user_id", "name", "team_number", "team_access") VALUES(1, 2, 3, 'Robot Masters', 1234, TRUE) RETURNING "id", "coach_user_id", "team_user_id", "name", "team_number", "team_access";
INSERT INTO "public"."team_members"("id", "team_id", "name", "hidden") VALUES(1, 1, 'Rowan', FALSE) RETURNING "id", "team_id", "name", "hidden";
INSERT INTO "public"."team_members"("id", "team_id", "name", "hidden") VALUES(2, 1, 'Brad', FALSE) RETURNING "id", "team_id", "name", "hidden";
INSERT INTO "public"."team_members"("id", "team_id", "name", "hidden") VALUES(3, 1, 'Nina', FALSE) RETURNING "id", "team_id", "name", "hidden";
INSERT INTO "public"."team_members"("id", "team_id", "name", "hidden") VALUES(4, 1, 'Chase', FALSE) RETURNING "id", "team_id", "name", "hidden";
INSERT INTO "public"."team_members"("id", "team_id", "name", "hidden") VALUES('5  ', 1, 'Rachel', FALSE) RETURNING "id", "team_id", "name", "hidden";
INSERT INTO "public"."runs"("id", "team_id", "name", "date", "driver", "assistant", "score_keeper", "score", "penalties") VALUES(1, 1, 'Run 1', '5/20/19', 1, 2, 3, 55, 3) RETURNING "id", "team_id", "name", "date", "driver", "assistant", "score_keeper", "score", "penalties";
INSERT INTO "public"."runs"("id", "team_id", "name", "date", "driver", "assistant", "score_keeper", "score", "penalties") VALUES(2, 1, 'Run 2', '5/20/19', 3, 4, 5, 123, 18) RETURNING "id", "team_id", "name", "date", "driver", "assistant", "score_keeper", "score", "penalties";

INSERT INTO "public"."selected_missions"("id", "mission_id", "run_id") VALUES(1, 1, 1) RETURNING "id", "mission_id", "run_id";
INSERT INTO "public"."selected_missions"("id", "mission_id", "run_id") VALUES(2, 2, 1) RETURNING "id", "mission_id", "run_id";
INSERT INTO "public"."selected_missions"("id", "mission_id", "run_id") VALUES(3, 3, 1) RETURNING "id", "mission_id", "run_id";
INSERT INTO "public"."selected_missions"("id", "mission_id", "run_id") VALUES(4, 1, 2) RETURNING "id", "mission_id", "run_id";
INSERT INTO "public"."selected_missions"("id", "mission_id", "run_id") VALUES(5, 2, 2) RETURNING "id", "mission_id", "run_id";
INSERT INTO "public"."selected_missions"("id", "mission_id", "run_id") VALUES(6, 3, 2) RETURNING "id", "mission_id", "run_id";
INSERT INTO "public"."goals_per_run"("id", "goal_id", "selected_missions_id", "how_many_collected", "is_completed") VALUES(1, 1, 1, 0, FALSE) RETURNING "id", "goal_id", "selected_missions_id", "how_many_collected", "is_completed";
INSERT INTO "public"."goals_per_run"("id", "goal_id", "selected_missions_id", "how_many_collected", "is_completed") VALUES(2, 2, 1, 0, FALSE) RETURNING "id", "goal_id", "selected_missions_id", "how_many_collected", "is_completed";
INSERT INTO "public"."goals_per_run"("id", "goal_id", "selected_missions_id", "how_many_collected", "is_completed") VALUES(3, 3, 2, 0, FALSE) RETURNING "id", "goal_id", "selected_missions_id", "how_many_collected", "is_completed";
INSERT INTO "public"."goals_per_run"("id", "goal_id", "selected_missions_id", "how_many_collected", "is_completed") VALUES(4, 4, 3, 1, TRUE) RETURNING "id", "goal_id", "selected_missions_id", "how_many_collected", "is_completed";
INSERT INTO "public"."goals_per_run"("id", "goal_id", "selected_missions_id", "how_many_collected", "is_completed") VALUES(5, 1, 4, 0, TRUE) RETURNING "id", "goal_id", "selected_missions_id", "how_many_collected", "is_completed";
INSERT INTO "public"."goals_per_run"("id", "goal_id", "selected_missions_id", "how_many_collected", "is_completed") VALUES(6, 2, 4, 0, TRUE) RETURNING "id", "goal_id", "selected_missions_id", "how_many_collected", "is_completed";
INSERT INTO "public"."goals_per_run"("id", "goal_id", "selected_missions_id", "how_many_collected", "is_completed") VALUES(7, 3, 5, 0, TRUE) RETURNING "id", "goal_id", "selected_missions_id", "how_many_collected", "is_completed";
INSERT INTO "public"."goals_per_run"("id", "goal_id", "selected_missions_id", "how_many_collected", "is_completed") VALUES(8, 4, 6, 5, TRUE) RETURNING "id", "goal_id", "selected_missions_id", "how_many_collected", "is_completed";
