-- Table: public.despesa

-- DROP TABLE IF EXISTS public.despesa;

CREATE TABLE IF NOT EXISTS public.despesa
(
    "numeroProtocolo" integer NOT NULL DEFAULT nextval('"despesa_numeroProtocolo_seq"'::regclass),
    "tipoDespesa" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "dataProtocolo" date NOT NULL,
    "dataVencimento" date NOT NULL,
    "credorDespesa" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "descricaoDespesa" text COLLATE pg_catalog."default" NOT NULL,
    "valorDespesa" double precision NOT NULL,
    status character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT despesa_pkey PRIMARY KEY ("numeroProtocolo")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.despesa
    OWNER to godlove;