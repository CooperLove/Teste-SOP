SELECT "credor" FROM public.empenho, 
(SELECT "credorDespesa" as credor, "numeroProtocolo" as num FROM public.despesa) as n
WHERE "num" = ?;