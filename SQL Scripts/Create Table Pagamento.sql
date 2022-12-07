-- Table: public.pagamento

-- DROP TABLE IF EXISTS public.pagamento;

CREATE TABLE IF NOT EXISTS public.pagamento
(
    "anoPagamento" character(10) COLLATE pg_catalog."default" NOT NULL,
    "numeroPagamento" serial NOT NULL DEFAULT,
    "dataPagamento" date NOT NULL,
    "valorPagamento" double precision NOT NULL,
    observacao character(100) COLLATE pg_catalog."default" NOT NULL,
    "numeroEmpenho" integer NOT NULL,
    CONSTRAINT pagamento_pkey PRIMARY KEY ("numeroPagamento"),
    CONSTRAINT "anoPag_numEmp_key" UNIQUE ("anoPagamento", "numeroEmpenho"),
    CONSTRAINT "numeroEmpenho" FOREIGN KEY ("numeroEmpenho")
        REFERENCES public.empenho ("numeroEmpenho") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.pagamento
    OWNER to my_user;