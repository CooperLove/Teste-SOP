SELECT "credor" FROM public.pagamento,
(SELECT "numeroEmpenho" as numEmp, "credor" FROM public.empenho, 
(SELECT "credorDespesa" as credor, "numeroProtocolo" as num FROM public.despesa) as n
WHERE "num" = "numeroProtocolo") as q
WHERE "numemp" = "numeroEmpenho";