create database book_club
    with owner postgres;

create sequence public.club_id_seq
    as integer;

alter sequence public.club_id_seq owner to postgres;

create sequence public.club_member_id_seq
    as integer;

alter sequence public.club_member_id_seq owner to postgres;

create sequence public.club_book_id_seq
    as integer;

alter sequence public.club_book_id_seq owner to postgres;

create sequence public.reviews_id_seq
    as integer;

alter sequence public.reviews_id_seq owner to postgres;

create sequence public.club_book_vote_id_seq
    as integer;

alter sequence public.club_book_vote_id_seq owner to postgres;

create table public.club
(
    id                 bigint  default nextval('club_id_seq'::regclass) not null
        primary key,
    name               varchar(255)                                     not null,
    read_time          integer                                          not null,
    numberparticipants integer default 0,
    reviews            integer default 0
);

alter table public.club
    owner to postgres;

alter sequence public.club_id_seq owned by public.club.id;

create table public.club_member
(
    id      bigint       default nextval('club_member_id_seq'::regclass) not null
        primary key,
    name    varchar(255)                                                 not null,
    email   varchar(255)                                                 not null
        unique,
    club_id bigint
        references public.club
            on delete cascade,
    status  varchar(255) default 'ACTIVO'::character varying
);

alter table public.club_member
    owner to postgres;

alter sequence public.club_member_id_seq owned by public.club_member.id;

create table public.club_book
(
    id          bigint  default nextval('club_book_id_seq'::regclass) not null
        primary key,
    club_id     bigint
        references public.club
            on delete cascade,
    name        varchar(255)                                          not null,
    description varchar(255)                                          not null,
    is_current  boolean default false
);

alter table public.club_book
    owner to postgres;

alter sequence public.club_book_id_seq owned by public.club_book.id;

create table public.reviews
(
    id        bigint default nextval('reviews_id_seq'::regclass) not null
        primary key,
    club_id   bigint
        references public.club
            on delete cascade,
    member_id bigint
        references public.club_member
            on delete cascade,
    content   varchar(255)                                       not null
);

alter table public.reviews
    owner to postgres;

alter sequence public.reviews_id_seq owned by public.reviews.id;

create table public.club_book_vote
(
    id         bigint  default nextval('club_book_vote_id_seq'::regclass) not null
        primary key,
    club_id    bigint
        references public.club
            on delete cascade,
    book_id    bigint
        references public.club_book
            on delete cascade,
    vote_count integer default 0
);

alter table public.club_book_vote
    owner to postgres;

alter sequence public.club_book_vote_id_seq owned by public.club_book_vote.id;

