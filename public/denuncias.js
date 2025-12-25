app.get('/api/denuncias', async (req, res) => {
  const [rows] = await db.query(
    'SELECT gravidade, latitude, longitude FROM denuncias'
  );
  res.json(rows);
});
