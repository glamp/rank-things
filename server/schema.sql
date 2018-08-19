drop table if exists polls;
create table polls(
  id varchar primary key,
  name varchar not null
);

insert into polls values ('566723h', 'Potent Potables');

drop table if exists rankables;
create table rankables(
  id varchar primary key,
  poll_id varchar not null,
  title varchar not null,
  description varchar
);

insert into rankables values ('abcd', '566723h', 'One', 'A Royale with cheese!');
insert into rankables values ('jklm', '566723h', 'Another', 'Now that is a tasty burger');
insert into rankables values ('efgh', '566723h', 'The Other', 'It will change your life. Swear to God.');

drop table if exists matchups;
create table matchups(
  id varchar primary key,
  poll_id varchar not null,
  winner_id varchar not null,
  loser_id varchar not null,
  ts bigint not null
);

