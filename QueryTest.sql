DECLARE @cols AS NVARCHAR(MAX),
@query AS NVARCHAR(MAX)

Select @cols = STUFF((SELECT ‘,’  + QUOTENAME(‘TYPE’)
			   FROM cars
			   GROUP BY brand
			   ORDER BY brand
		FOR XML PATH(‘’), TYPE
		).value(‘.’, ’NVARCHAR(MAX)’) ,1, 1, ‘’)

Set @query = N’SELECT brand,’ + @cols + N’ FROM  
                       ( SELECT brand, concat(type, ‘ : ’ price) type from cars 
                       ) x pivot
                       (
			for brand (‘+ @cols + N’)
			) p ‘
Exec sp_executesql @query