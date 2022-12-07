SELECT SUM("valorPagamento") FROM 
        public.pagamento,
        (SELECT "numeroEmpenho" as num FROM public.empenho 
        WHERE "numeroEmpenho" = ${numeroEmpenho}) as n
        WHERE "numeroEmpenho" = "num";