CREATE SEQUENCE public.oskari_email_expiry_id_seq;

CREATE TABLE public.oskari_email_expiry
(
  id bigint NOT NULL DEFAULT nextval('oskari_email_expiry_id_seq'::regclass),
  user_name character varying,
  email character varying,
  uuid character varying,
  expiry_timestamp timestamp with time zone,
  CONSTRAINT oskari_email_expiry_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
