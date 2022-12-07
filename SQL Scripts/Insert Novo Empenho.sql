INSERT INTO public.empenho
		("anoEmpenho",
		 "dataEmpenho",
		 "valorEmpenho",
		 "observacao",
		 "numeroProtocolo")
        VALUES (?, ?, ?, ?, ?) RETURNING *