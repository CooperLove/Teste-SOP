SELECT SUM("valorPagamento") FROM public.pagamento,
      (SELECT "numeroEmpenho" as num 
      FROM public.empenho WHERE "numeroProtocolo" = ${numeroProtocolo}) as n
      WHERE "numeroEmpenho" = "num";