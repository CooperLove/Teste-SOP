-- Substituir 'credor' e/ou 'dataProtocolo' pelos valores reais
-- Busca por credor ou tipo despesa com data
SELECT * FROM (SELECT * FROM public.despesa 
        WHERE "credorDespesa" LIKE '%credor%' 
        OR "tipoDespesa" LIKE '%credor%') AS n 
        WHERE "dataProtocolo" = 'dataProtocolo' 
        ORDER BY "numeroProtocolo";

-- Busca por credor ou tipo despesa
	SELECT * FROM public.despesa 
      WHERE "credorDespesa" LIKE '%credor%' 
      OR "tipoDespesa" LIKE '%credor%';
	  
-- Busca por data
	  SELECT * FROM public.despesa 
      WHERE "dataProtocolo" = '${dataProtocolo}';