-- Table: public.empenho

-- DROP TABLE IF EXISTS public.empenho;

CREATE TABLE IF NOT EXISTS public.empenho
(
    "anoEmpenho" integer NOT NULL,
    "numeroEmpenho" serial NOT NULL,
    "dataEmpenho" date NOT NULL,
    "valorEmpenho" double precision NOT NULL,
    observacao character(100) COLLATE pg_catalog."default" NOT NULL,
    "numeroProtocolo" integer,
    CONSTRAINT empenho_pkey PRIMARY KEY ("numeroEmpenho"),
    CONSTRAINT "anoEmp_numProt_key" UNIQUE ("anoEmpenho", "numeroProtocolo"),
    CONSTRAINT "numeroProtocolo" FOREIGN KEY ("numeroProtocolo")
        REFERENCES public.despesa ("numeroProtocolo") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.empenho
    OWNER to godlove;